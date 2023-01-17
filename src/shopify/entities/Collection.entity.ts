import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Numeric } from "../entity-types/Numeric";

// note this is for a manual collection as
// custom collections are different
// TODO need to add custom collection fields and create smart colleciton as well
@Entity()
export class Collection {
  @PrimaryKey({ type: Numeric })
  id: Numeric;

  @Property({ nullable: true })
  body_html: string;

  @Property()
  handle: string;

  @OneToOne({ nullable: true })
  image: CollectionImage;

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
  collection: Collection;

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
