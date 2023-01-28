import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ShopifyID } from "../entity-types/ShopifyID";
import { Metafield } from "./Metafield.entity";

@Entity()
export class Page {
  // get fields for page from Shopify admin rest api
  // https://shopify.dev/docs/admin-api/rest/reference/online-store/page

  @PrimaryKey({ type: ShopifyID })
  id: number;

  @Property({ nullable: true })
  author: string;

  @Property({ nullable: true })
  body_html: string;

  @Property()
  created_at: Date;

  @Property()
  handle: string;

  @Property()
  published_at: Date;

  @Property({ nullable: true })
  template_suffix: string;

  @Property({ nullable: true })
  title: string;

  @Property()
  updated_at: Date;

  @Property()
  admin_graphql_api_id: string;
}
