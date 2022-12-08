import { Inject, Injectable } from "@nestjs/common";
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

import { Shopify } from "@shopify/shopify-api";

import topLevelAuthRedirect from "./top-level-auth-redirect";
import {
  AuthModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from "./AuthConfigurableModuleClass";

@Injectable()
export class AuthService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: AuthModuleOptions,
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}

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
