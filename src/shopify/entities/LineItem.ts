import { Entity, Property, ManyToMany } from "@mikro-orm/core";
import { Price } from "../entity-types/Price";
import { ShopifyID } from "../entity-types/ShopifyID";
import { Metafield } from "./Metafield.entity";

@Entity()
export class LineItem {
  @Property({ type: ShopifyID })
  id: number;

  @Property({ type: ShopifyID })
  product_id: number;

  @Property({ type: ShopifyID })
  variant_id: number;

  @Property()
  title: string;

  @Property()
  quantity: number;

  @Property({ type: Price })
  price: number;

  @Property()
  grams: number;

  @Property()
  sku: string;

  @Property()
  variant_title: string;

  @Property()
  vendor: string;

  @Property()
  fulfillment_service: string;

  @Property()
  requires_shipping: boolean;

  @Property()
  taxable: boolean;

  @Property()
  gift_card: boolean;

  @Property()
  name: string;

  @Property()
  variant_inventory_management: string;

  @Property()
  properties: any;

  @Property()
  product_exists: boolean;

  @Property()
  fulfillable_quantity: number;

  @Property({ type: Price })
  total_discount: number;

  @Property()
  fulfillment_status: string;

  @Property()
  tax_lines: any;

  @Property()
  origin_location: any;

  @Property()
  destination_location: any;

  @Property()
  discount_allocations: any;

  @Property()
  admin_graphql_api_id: string;
}
