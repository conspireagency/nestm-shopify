import {
  DynamicModule,
  Global,
  Inject,
  Module,
  ModuleMetadata,
} from "@nestjs/common";

import { ProductService } from "./product.service";
import { ShopService } from "./shop.service";

//import { ConfigurableModuleClass } from "./shopify.module-definition";
//import { MikroOrmModule } from "@mikro-orm/nestjs";

// @Module({
//   imports: [],
//   controllers: [],
//   providers: [ShopService, ProductService],
//   exports: [ShopService, ProductService],
// })
// export class ShopifyModule extends ConfigurableModuleClass {}

export interface ShopifyModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports" | "providers"> {
  inject?: any[];
}

export const SHOPIFY_MODULE_OPTIONS = Symbol("shopify-module-options");

@Global()
@Module({})
export class ShopifyModule {
  constructor(
    @Inject(SHOPIFY_MODULE_OPTIONS)
    private readonly options: ShopifyModuleAsyncOptions
  ) {}

  static async forRootAsync(
    options: ShopifyModuleAsyncOptions
  ): Promise<DynamicModule> {
    return {
      module: ShopifyModule,
      imports: options.imports || [],
      providers: [ShopService, ProductService],
      exports: [ShopService, ProductService],
    };
  }
}
