import {
  ConfigurableModuleBuilder,
  DynamicModule,
  Module,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";

export interface AuthModuleOptions {
  cookie: string;
  secret: string;
  scopes: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AuthModuleOptions>().build();

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
  exports: [AuthService, AuthMiddleware],
})
export class AuthModule extends ConfigurableModuleClass {}
