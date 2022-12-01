import {
  DynamicModule,
  Global,
  Inject,
  Module,
  ModuleMetadata,
} from "@nestjs/common";

import { ProductService } from "./product.service";
import { ShopService } from "./shop.service";

import { ConfigurableModuleClass } from "./shopify.module-definition";
import { MikroOrmModule } from "@mikro-orm/nestjs";

@Module({
  imports: [MikroOrmModule],
  controllers: [],
  providers: [ShopService, ProductService],
  exports: [ShopService, ProductService],
})
export class ShopifyModule extends ConfigurableModuleClass {}

// export interface ShopifyModuleAsyncOptions
//   extends Pick<ModuleMetadata, "imports" | "providers"> {
//   inject?: any[];
// }

// @Global()
// @Module({})
// export class ShopifyModule {
//   constructor(private readonly options: ShopifyModuleAsyncOptions) {}

//   static async forRootAsync(
//     options: ShopifyModuleAsyncOptions
//   ): Promise<DynamicModule> {
//     console.log(options);
//     return {
//       module: ShopifyModule,
//       imports: options.imports || [],
//       providers: [ShopService, ProductService],
//       exports: [ShopService, ProductService],
//     };
//   }
// }
