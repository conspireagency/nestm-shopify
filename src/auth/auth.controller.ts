import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/")
  async auth(@Req() req: Request, @Res() res: Response) {
    console.log("hit");
    //return await this.authService.auth(req, res);
  }

  @Get("/callback")
  async getAuthCallback(@Req() req: Request, @Res() res: Response) {
    //return await this.authService.getAuthCallback(req, res);
  }

  @Get("toplevel")
  async topLevelAuth(@Req() req: Request, @Res() res: Response) {
    console.log("toplevel in the controller");
    //return await this.authService.topLevelAuth(req, res);
  }
}
