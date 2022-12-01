import { Injectable } from "@nestjs/common";

import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

import { Shop } from "./entities/shop.entity";

@Injectable()
export class ShopService {
  constructor(
    private readonly em: EntityManager,
    private readonly orm: MikroORM
  ) {}

  async getShop(shopName: string) {
    const shop = await this.em.findOneOrFail(Shop, {
      shop: shopName,
    });
    const Shopify = require("shopify-api-node");
    const shopify = new Shopify({
      shopName: shop.shop,
      accessToken: shop.accesstoken,
      apiVersion: "2022-10",
    });
    return { shop, shopify };
  }
}
