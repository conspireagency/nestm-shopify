import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Redirect {
  @PrimaryKey()
  id: number;

  @Property()
  path: string;

  @Property()
  target: string;
}
