import {
  BigIntType,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Shop } from "./Shop.entity";
import { ShopifyID } from "../entity-types/ShopifyID";
import { Price } from "../entity-types/Price";

@Entity()
export class Product {
  // API RETURNS AN INTEGER, BUT IT'S
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @ManyToOne(() => Shop)
  shop: Shop;

  @Property()
  title!: string;

  @Property({ length: 10000 })
  body_html!: string;

  @Property({ nullable: true })
  vendor?: string;

  @Property()
  product_type!: string;

  @Property()
  created_at!: Date;

  @Property()
  handle!: string;

  @Property({ nullable: true })
  updated_at?: Date;

  @Property({ nullable: true })
  published_at?: Date;

  @Property({ nullable: true })
  template_suffix?: string;

  @Property({ nullable: true })
  published_scope?: string;

  @Property({ nullable: true, length: 2000 })
  tags?: string;

  @Property()
  admin_graphql_api_id!: string;

  @OneToMany("Variant", "product_id")
  variants = new Collection<Variant>(this);

  //   @Property()
  //   options!: string;

  // can always add images later, but right now we don't really care about them
  //   @Property()
  //   images!: string;

  // library returns an object for this, but thinking we should just use the src
  @Property({ nullable: true, length: 1000 })
  image?: string;

  constructor(shop: Shop, product: any) {
    this.shop = shop;
    this.id = product.id;
    this.title = product.title;
    this.body_html = product.body_html;
    this.vendor = product.vendor;
    this.product_type = product.product_type;
    this.created_at = product.created_at;
    this.handle = product.handle;
    this.updated_at = product.updated_at;
    this.published_at = product.published_at;
    this.template_suffix = product.template_suffix;
    this.published_scope = product.published_scope;
    this.tags = product.tags;
    this.admin_graphql_api_id = product.admin_graphql_api_id;
    this.image = product.image.src;
  }
}

@Entity()
export class Variant {
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @ManyToOne()
  product_id!: Product;

  @Property()
  title!: string;

  @Property({ type: Price })
  price!: number;

  @Property({ nullable: true })
  sku?: string;

  @Property()
  position!: number;

  @Property({ nullable: true })
  inventory_policy?: string;

  @Property({ nullable: true })
  compare_at_price?: string;

  @Property()
  fulfillment_service!: string;

  @Property({ nullable: true })
  inventory_management?: string;

  @Property({ nullable: true })
  option1?: string;

  @Property({ nullable: true })
  option2?: string;

  @Property({ nullable: true })
  option3?: string;

  @Property()
  created_at!: Date;

  @Property({ nullable: true })
  updated_at?: Date;

  @Property({ nullable: true })
  taxable?: boolean;

  @Property({ nullable: true })
  barcode?: string;

  @Property({ nullable: true })
  grams?: number;

  @Property({ nullable: true })
  image_id?: string;

  @Property({ nullable: true })
  weight?: number;

  @Property({ nullable: true })
  weight_unit?: string;

  @Property({ nullable: true })
  inventory_item_id?: string;

  @Property({ nullable: true })
  inventory_quantity?: number;

  @Property({ nullable: true })
  old_inventory_quantity?: number;

  @Property({ nullable: true })
  requires_shipping?: boolean;

  @Property()
  admin_graphql_api_id?: string;

  constructor(product: Product, variant: any) {
    this.id = variant.id;
    this.product_id = product;
    this.title = variant.title;
    this.price = variant.price;
    this.sku = variant.sku;
    this.position = variant.position;
    this.inventory_policy = variant.inventory_policy;
    this.compare_at_price = variant.compare_at_price;
    this.fulfillment_service = variant.fulfillment_service;
    this.inventory_management = variant.inventory_management;
    this.option1 = variant.option1;
    this.option2 = variant.option2;
    this.option3 = variant.option3;
    this.created_at = variant.created_at;
    this.updated_at = variant.updated_at;
    this.taxable = variant.taxable;
    this.barcode = variant.barcode;
    this.grams = variant.grams;
    this.image_id = variant.image_id;
    this.weight = variant.weight;
    this.weight_unit = variant.weight_unit;
    this.inventory_item_id = variant.inventory_item_id;
    this.inventory_quantity = variant.inventory_quantity;
    this.old_inventory_quantity = variant.old_inventory_quantity;
    this.requires_shipping = variant.requires_shipping;
    this.admin_graphql_api_id = variant.admin_graphql_api_id;
  }
}

// @Entity()
// export class Options {
//   @PrimaryKey()
//   id!: string;

//   @Property()
//   product_id!: string;

//   @Property()
//   name!: string;

//   @Property()
//   position!: number;

//   // THIS IS AN ARRAY OF STRINGS, NEED TO HANDLE THIS
//   @Property()
//   values!: string;
// }
