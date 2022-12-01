import { Module } from "@nestjs/common";
import { ConfigurableModuleClass } from "./shopify.module-definition";

import { ProductService } from "./product.service";
import { ShopService } from "./shop.service";

@Module({
  controllers: [],
  providers: [ShopService, ProductService],
  exports: [ShopService, ProductService],
})
export class ShopifyModule extends ConfigurableModuleClass {}
