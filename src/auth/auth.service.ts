import { Inject, Injectable } from "@nestjs/common";
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

import { ApiVersion, Shopify } from "@shopify/shopify-api";

import { MODULE_OPTIONS_TOKEN } from "./config.module-definition";
import { AuthModuleOptions } from "./interfaces/config-module-options.interface";

import topLevelAuthRedirect from "./top-level-auth-redirect";
import { Shop } from "../shopify/entities";

@Injectable()
export class AuthService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: AuthModuleOptions,
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {
    Shopify.Context.initialize({
      API_KEY: this.options.api_key,
      API_SECRET_KEY: this.options.secret,
      SCOPES: this.options.scopes.split(","),
      HOST_NAME: this.options.host.replace(/https?:\/\//, ""),
      HOST_SCHEME: this.options.host.split("://")[0],
      API_VERSION: ApiVersion.October22,
      IS_EMBEDDED_APP: true,
      SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
        this.storeCallback.bind(this),
        this.loadCallback.bind(this),
        this.deleteCallback.bind(this)
      ),
    });
  }

  async storeCallback(session) {
    try {
      console.log("storeCallback in middleware");

      const shop = new Shop(
        session.id,
        session.shop,
        session.state,
        session.isOnline,
        session.scope,
        session.accessToken
      );

      await this.em.upsert(Shop, shop);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async loadCallback(id) {
    try {
      // Inside our try, we use `getAsync` to access the method by id
      // If we receive data back, we parse and return it
      // If not, we return `undefined`
      console.log("loadCallback in middleware");
      const result = await this.em.findOneOrFail(Shop, { id: id });

      if (result) {
        return {
          id: result.id,
          shop: result.shop,
          state: result.state,
          isOnline: result.isonline,
          scope: result.scope,
          accessToken: result.accesstoken,
        };
      } else {
        return undefined;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteCallback(id) {
    try {
      console.log("delete callback");
      // Inside our try, we use the `delAsync` method to delete our session.
      // This method returns a boolean (true if successful, false if not)
      const response = await this.em.nativeDelete(Shop, { id: id });
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  async auth(req, res) {
    const needsTop = req.signedCookies[`${this.options.cookie}`] ? false : true;
    if (needsTop) {
      console.log("no cookie, redirecting to toplevel");
      return res.redirect(
        `/api/auth/toplevel?${new URLSearchParams(req.query).toString()}`
      );
    }
    console.log("cookie found, beginAuth redirect");
    const redirectUrl = await Shopify.Auth.beginAuth(
      req,
      res,
      req.query.shop,
      "/api/auth/callback",
      false
    );

    console.log(redirectUrl);

    return res.redirect(redirectUrl);
  }

  async topLevelAuth(req, res) {
    console.log("seting cookie in top level");
    res.cookie(this.options.cookie, "1", {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    });

    res.set("Content-Type", "text/html");

    console.log("redirecting to top level helper then back to auth");
    return res.send(
      topLevelAuthRedirect({
        apiKey: Shopify.Context.API_KEY,
        hostName: Shopify.Context.HOST_NAME,
        host: req.query.host,
        query: req.query,
      })
    );
  }

  async getAuthCallback(req, res) {
    try {
      console.log("authcallback verify session, this calls store session");
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );
      const host = req.query.host;
      // Redirect to app with shop parameter upon auth
      res.redirect(`/?shop=${session.shop}&host=${host}`);
    } catch (e) {
      console.log("ERROR IN CALLBACK", e);
      return res.status(500).send();
    }
  }
}
