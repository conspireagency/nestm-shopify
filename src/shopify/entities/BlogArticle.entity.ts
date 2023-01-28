import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Rel,
} from "@mikro-orm/core";
import { ShopifyID } from "../entity-types/ShopifyID";
import { Metafield } from "./Metafield.entity";

@Entity()
export class BlogArticle {
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @Property({ nullable: true })
  author: string;

  @Property({ type: ShopifyID })
  blog_id: number;

  @Property({ nullable: true })
  body_html: string;

  @Property()
  created_at: Date;

  @Property({ nullable: true })
  handle: string;

  @OneToOne({ nullable: true })
  image?: Rel<BlogImage>;

  @Property()
  published: boolean;

  @Property()
  published_at: Date;

  @Property({ nullable: true })
  summary_html: string;

  @Property({ nullable: true })
  tags: string;

  @Property({ nullable: true })
  template_suffix: string;

  @Property({ nullable: true })
  title: string;

  @Property({ nullable: true })
  updated_at: Date;
}

export class BlogImage {
  @OneToOne()
  blog: Rel<BlogArticle>;

  @Property()
  src: string;

  @Property()
  created_at: Date;
}
