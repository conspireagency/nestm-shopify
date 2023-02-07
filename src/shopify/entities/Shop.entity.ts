import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ShopifyID } from "../entity-types/ShopifyID";

@Entity()
export class Shop {
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @Property()
  shop: string;

  @Property({ nullable: true })
  state: string;

  @Property()
  isonline: boolean;

  @Property({ nullable: true })
  scope: string;

  @Property({ nullable: true })
  expires: number;

  @Property({ nullable: true })
  onlineaccessinfo: string;

  @Property({ nullable: true })
  accesstoken: string;
}
