import { Controller, Get, Inject, Req, Res } from "@nestjs/common";
import { join } from "path";
import * as httpProxy from "http-proxy";
import {
  AuthModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from "../auth/AuthConfigurableModuleClass";

@Controller("")
export class ClientController {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: AuthModuleOptions
  ) {}

  proxy = httpProxy.createProxyServer();
  @Get("*")
  async test(@Req() req, @Res() res) {
    if (process.env.NODE_ENV === "production") {
      // dont do anything here, in view module we have serve static in producton
      console.log("production hit in controller, not what we want");
    } else {
      console.log("catch all request, proxying", req.url);
      this.proxy.web(req, res, {
        target: "http://localhost:5173/",
      });
    }
  }
}
