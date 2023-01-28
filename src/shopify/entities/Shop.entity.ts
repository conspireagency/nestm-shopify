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

  constructor(
    id: number,
    shop: string,
    state: string,
    isonline: boolean,
    scope: string,
    accesstoken: string
  ) {
    this.id = id;
    this.shop = shop;
    this.state = state;
    this.isonline = isonline;
    this.scope = scope;
    this.accesstoken = accesstoken;
  }
}
