import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";

import { ConfigurableModuleClass } from "./AuthConfigurableModuleClass";

@Module({
  providers: [AuthService, AuthMiddleware],
  controllers: [AuthController],
  exports: [AuthService, AuthMiddleware],
})
export class AuthModule extends ConfigurableModuleClass {}
