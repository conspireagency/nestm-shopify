import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface ShopifyModuleOptions {
  //folder: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ShopifyModuleOptions>().build();
