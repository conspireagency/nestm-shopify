import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Metafield } from "./Metafield.entity";

@Entity()
export class Page {
  // get fields for page from Shopify admin rest api
  // https://shopify.dev/docs/admin-api/rest/reference/online-store/page

  @PrimaryKey()
  id: string;

  @Property()
  author: string;

  @Property()
  body_html: string;

  @Property()
  created_at: Date;

  @Property()
  handle: string;

  @Property()
  published_at: Date;

  @Property()
  shop_id: string;

  @Property({ nullable: true })
  template_suffix: string;

  @Property()
  title: string;

  @Property()
  updated_at: Date;

  @Property()
  admin_graphql_api_id: string;

  @OneToOne()
  metafield: Metafield;
}
