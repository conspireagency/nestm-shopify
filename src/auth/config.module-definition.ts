import { ConfigurableModuleBuilder } from "@nestjs/common";
import { AuthModuleOptions } from "./interfaces/config-module-options.interface";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AuthModuleOptions>().build();
