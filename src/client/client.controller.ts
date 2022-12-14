import { Controller, Get, Req, Res } from "@nestjs/common";
import * as httpProxy from "http-proxy";

@Controller("")
export class ClientController {
  constructor() {}

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
