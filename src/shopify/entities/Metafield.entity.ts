import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ShopifyID } from "../entity-types/ShopifyID";

@Entity()
export class Metafield {
  // create an entity definition based on the Shopify metafield resource found here https://shopify.dev/api/admin-rest/2022-10/resources/metafield

  @PrimaryKey({ type: ShopifyID })
  id: number;

  @Property()
  namespace: string;

  @Property()
  key: string;

  @Property()
  value: string;

  @Property()
  type: string;

  @Property()
  description: string;

  @Property()
  owner_id: string;

  @Property()
  owner_resource: string;

  @Property()
  created_at: Date;

  @Property()
  updated_at: Date;
}
