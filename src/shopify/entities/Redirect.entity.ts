import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ShopifyID } from "../entity-types/ShopifyID";

@Entity()
export class Redirect {
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @Property()
  path: string;

  @Property()
  target: string;
}
