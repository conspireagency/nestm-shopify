import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface AuthModuleOptions {
  cookie: string;
  secret: string;
  scopes: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AuthModuleOptions>().build();
