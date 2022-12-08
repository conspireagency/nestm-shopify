import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import * as crypto from "crypto";
import { MikroORM, UseRequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { ApiVersion, Shopify } from "@shopify/shopify-api";

import { Shop } from "../../shopify/entities/Shop.entity";
import {
  AuthModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from "../AuthConfigurableModuleClass";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: AuthModuleOptions,
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}

  verifyHmac(querystring: string, hmac: string) {
    let query_hmac_stripped = querystring
      .replace("hmac=", "")
      .replace(hmac + "&", "");

    console.log(query_hmac_stripped);

    let gen_hmac = crypto
      .createHmac("sha256", this.options.secret)
      .update(query_hmac_stripped)
      .digest("hex");

    console.log(hmac, gen_hmac, "hmac, gen_hmac");

    if (gen_hmac === hmac) {
      console.log("hmac verified in auth middleware");
      return true;
    } else {
      console.log("hmac not verified");
      return false;
    }
  }

  // CHECK FOR FOLLOWING IF NOT REDIRECT TO AUTH GRANT ROUTE

  async needsAuth(shop) {
    // should probably change this to in memory for performance
    // as every request will get checked, even for frontend assets
    // just need to make sure on server restart it gets updated, and on new shop install it gets updated to keep in sync
    console.log("needsAuth in middleware", shop);

    const shop_to_check = await this.em.findOne(Shop, { shop });

    console.log("results of needs auth db lookup", shop_to_check);

    // Check Your app doesn't have a token for that shop.
    if (shop_to_check === null || shop_to_check.accesstoken === null) {
      return true;
    }
    // TODO Your app has a token for that shop, but it was created before you rotated the app's secret.
    // TODO Your app uses online tokens and the token for that shop has expired.

    // check your app has a token for that shop, but your app now requires scopes that differ from the scopes granted with that token.
    if (shop_to_check.scope !== this.options.scopes) {
      console.log(
        "scopes dont match need auth",
        shop_to_check.scope,
        this.options.scopes
      );
      return true;
    }
    console.log("auth passed");
    return false;
  }

  @UseRequestContext()
  async use(req, res, next) {
    console.log("middleware hit");

    const shop = req.query.shop;
    console.log(Shopify.Context.IS_EMBEDDED_APP, "IS_EMBEDDED_APP");
    if (Shopify.Context.IS_EMBEDDED_APP && shop) {
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${shop} https://admin.shopify.com;`
      );
    } else {
      res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
    }

    if (!req.query.shop) console.log("no shop in query");
    const needsAuth = await this.needsAuth(shop);

    // Detect whether we need to reinstall the app, any request from Shopify will
    // include a shop in the query parameters.
    if (needsAuth && shop) {
      console.log("has shop and needs auth");
      return res.redirect(
        `/api/auth?${new URLSearchParams(req.query).toString()}`
      );
    } else {
      console.log("reached end of middleware, passing request on");
      next();
    }
  }
}
