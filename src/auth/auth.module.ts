import {
  ConfigurableModuleBuilder,
  DynamicModule,
  Module,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigService } from "@nestjs/config";

export interface AuthModuleOptions {
  configService: ConfigService;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AuthModuleOptions>().build();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule extends ConfigurableModuleClass {}
