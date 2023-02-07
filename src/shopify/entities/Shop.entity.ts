import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Shop {
  @PrimaryKey()
  id!: number;

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
  access_token: string;

  @Property({ nullable: true })
  app: string;
}
