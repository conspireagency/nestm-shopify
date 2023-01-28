import { Entity, OneToOne, PrimaryKey, Property, Rel } from "@mikro-orm/core";
import { ShopifyID } from "../entity-types/ShopifyID";

// note this is for a manual collection as
// custom collections are different
// TODO need to add custom collection fields and create smart colleciton as well
@Entity()
export class Collection {
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @Property({ nullable: true })
  body_html: string;

  @Property()
  handle: string;

  @OneToOne({ nullable: true })
  image?: Rel<CollectionImage>;

  @Property()
  published_at: Date;

  @Property({ nullable: true })
  published_scope: string;

  @Property({ nullable: true })
  sort_order: string;

  @Property()
  template_suffix: string;

  @Property()
  title: string;

  @Property()
  updated_at: Date;
}

@Entity()
export class CollectionImage {
  @OneToOne()
  collection: Rel<Collection>;

  @Property()
  src: string;

  @Property()
  alt: string;

  @Property()
  width: number;

  @Property()
  height: number;

  @Property()
  created_at: Date;
}
