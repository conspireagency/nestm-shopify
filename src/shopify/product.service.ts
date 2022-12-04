import { Injectable } from "@nestjs/common";

import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

import { ShopService } from "./shop.service";
import { Product, Variant } from "./entities";

@Injectable()
export class ProductService {
  constructor(
    private readonly em: EntityManager,
    private readonly orm: MikroORM,
    private shopService: ShopService
  ) {}

  // this gets all products and variants from the shopify api and saves them to the db
  async getProductsAndSave(shopName: string) {
    // could probably turn this into a more elegant hook than having in a Shop service
    const { shop, shopify } = await this.shopService.getShop(shopName);
    const products = await this.getProducts(shopify);
    const products_to_save = await this.getProductsToSave(shop, products);
    const variants_to_save = await this.getVariantsFromProducts(products);

    console.log(
      `Saving ${products_to_save.length} products and ${variants_to_save.length} variants`
    );
    await this.saveProductsAndVariants(products_to_save, variants_to_save);
  }

  async saveProductsAndVariants(products_to_save, variants_to_save) {
    const result_products = await this.saveProducts(products_to_save);
    const result_variants = await this.saveVariants(variants_to_save);
    return;
  }

  async getProductsFromDB() {
    const products = await this.em.find(
      Product,
      {},
      { populate: ["variants"] }
    );
  }

  async getProducts(shopify) {
    let products = [];

    // Shopify Plus has 2x the rate limit of regular Shopify
    let params = { limit: 100, status: "active" };

    do {
      const result = await shopify.product.list(params);
      products = products.concat(result);

      console.log(shopify.callLimits);
      params = result.nextPageParameters;
    } while (params !== undefined);

    return products;
  }

  async getVariantsFromProducts(products) {
    let variants_to_save = [];
    products.forEach((product) => {
      product.variants.forEach((variant) => {
        variant.id = variant.id.toString();
        const new_variant = new Variant(
          this.em.getReference(Product, product.id),
          variant
        );
        variants_to_save.push(new_variant);
      });
    });

    return variants_to_save;
  }

  async getProductsToSave(shop, products) {
    const products_to_save = products.map((product) => {
      // apparently some products don't have images so we should check for that
      // TODO we could update entity to make image optional
      product.id = product.id.toString();
      if (!product.image || !product.image.src) {
        product.image = {
          src: "",
        };
      }

      return new Product(shop, product);
    });
    return products_to_save;
  }

  async saveProducts(products_to_save: Product[]) {
    // since we're using querybuilder we need to remove the variant property from the objects
    const products_to_save_no_variants = products_to_save.map((product) => {
      delete product.variants;
      return product;
    });

    const result = await this.em
      .createQueryBuilder(Product)
      .insert(products_to_save_no_variants)
      .onConflict("id")
      .merge([
        "title",
        "body_html",
        "vendor",
        "product_type",
        "created_at",
        "handle",
        "updated_at",
        "published_at",
        "template_suffix",
        "published_scope",
        "tags",
        "admin_graphql_api_id",
        "image",
      ])
      .execute();

    return result;
  }

  async saveVariants(variants_to_save: Variant[]) {
    console.log(variants_to_save.length);

    // iterate through variants and upsert
    for (let i = 0; i < variants_to_save.length; i++) {
      const variant = variants_to_save[i];
      const result = await this.em.upsert(Variant, variant);
      console.log(i);
    }

    // TODO figure out why this bulk query isn't working, would be way faster than above "for" loop
    // await this.em
    //   .createQueryBuilder(Variant)
    //   .insert(variants_to_save)
    //   .onConflict('id')
    //   .merge([
    //     'title',
    //     'price',
    //     'sku',
    //     'position',
    //     'inventory_policy',
    //     'compare_at_price',
    //     'fulfillment_service',
    //     'inventory_management',
    //     'option1',
    //     'option2',
    //     'option3',
    //   ])
    //   .execute();
  }

  // todo make this more dynamic
  async updateProductsOptionsAndVariants(shopName: string) {
    const { shop, shopify } = await this.shopService.getShop(shopName);
    const products = await this.getProducts(shopify);
    const productIdsToIgnore = [7405562659009];

    for (const product of products) {
      try {
        if (
          product.variants.length === 1 &&
          !productIdsToIgnore.includes(product.id)
        ) {
          product.id = Number(product.id);
          let params = { options: [], variants: [] };
          let sampleSKUPrefix = "S-";
          let existingVariant = product.variants[0];
          let {
            id,
            created_at,
            updated_at,
            inventory_item_id,
            admin_graphql_api_id,
            ...newVariantProps
          } = existingVariant;

          params.options = [
            {
              ...product.options[0],
              name: "Size",
              values: ["Box", "Sample"],
            },
          ];
          params.variants = [
            {
              ...existingVariant,
              id: Number(existingVariant.id),
              product_id: Number(existingVariant.product_id),
              option1: "Box",
            },
            {
              ...newVariantProps,
              title: "Sample",
              price: "3.00",
              weight: "0.5",
              option1: "Sample",
              sku: `${sampleSKUPrefix}${existingVariant.sku}`,
            },
          ];

          const result = await shopify.product.update(product.id, params);
          const products_to_save = await this.getProductsToSave(shopName, [
            product,
          ]);
          const variants_to_save = await this.getVariantsFromProducts([
            product,
          ]);
          await this.saveProductsAndVariants(
            products_to_save,
            variants_to_save
          );
          // sleep for 1 sec to avoid Shopify rate limits
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (e) {
        console.log("error updating products and variants e", e);
        console.log("error with product", product);
      }
    }
  }
}
