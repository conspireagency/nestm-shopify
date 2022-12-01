import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ShopService } from "./shop.service";

@Module({
  controllers: [],
  providers: [ShopService, ProductService],
  exports: [ShopService, ProductService],
})
export class ShopifyModule {}
