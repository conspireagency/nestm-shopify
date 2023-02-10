import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Price } from "../entity-types/Price";
import { ShopifyID } from "../entity-types/ShopifyID";

@Entity()
export class DraftOrder {
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @Property({ type: ShopifyID, nullable: true })
  order_id: number;

  @Property()
  created_at: Date;

  @Property({ nullable: true })
  updated_at: Date;

  @Property({ nullable: true })
  currency: string;

  @Property({ nullable: true })
  invoice_sent_at: Date;

  @Property({ length: 1000, nullable: true })
  invoice_url: string;

  @Property({ nullable: true })
  email: string;

  @Property({ nullable: true })
  discount_codes: any;

  @Property({ nullable: true })
  note: string;

  @Property({ nullable: true })
  status: string;

  @Property({ type: Price, nullable: true })
  total_price: number;

  @Property({ nullable: true })
  name: string;
}

@Entity()
export class PaymentTerms {
  // create an entity based on the json above

  @OneToOne()
  draft_order: DraftOrder;

  @Property()
  currency: string;

  @Property()
  payment_terms_name: string;

  @Property()
  payment_terms_type: string;

  @Property()
  due_in_days: number;

  @OneToMany(
    () => PaymentSchedules,
    (paymentSchedules) => paymentSchedules.payment_terms
  )
  payment_schedules = new Collection<PaymentSchedules>(this);
}

export class PaymentSchedules {
  @ManyToOne()
  payment_terms: PaymentTerms;

  @Property({ type: Price })
  amount: number;

  @Property()
  currency: string;

  @Property()
  issued_at: Date;

  @Property()
  due_at: Date;

  @Property()
  completed_at: Date;

  @Property()
  expected_payment_method: string;
}
