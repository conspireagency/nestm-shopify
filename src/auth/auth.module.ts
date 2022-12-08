import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "../client/middleware/auth.middleware";

import { ConfigurableModuleClass } from "./config.module-definition";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule extends ConfigurableModuleClass {}
