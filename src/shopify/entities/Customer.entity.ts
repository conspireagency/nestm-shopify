import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Customer {
  @PrimaryKey()
  id: string;

  @Property()
  email: string;

  @Property()
  first_name: string;

  @Property()
  last_name: string;

  @Property()
  last_order_id: string;
}
