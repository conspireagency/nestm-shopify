import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Numeric } from "../entity-types/Numeric";

@Entity()
export class DraftOrder {
  @PrimaryKey({ type: Numeric })
  id: Numeric;

  @Property({ type: Numeric, nullable: true })
  order_id: Numeric;

  @Property()
  created_at: Date;

  @Property({ nullable: true })
  updated_at: Date;

  @Property({ nullable: true })
  currency: string;

  @Property({ nullable: true })
  invoice_sent_at: Date;

  @Property({ nullable: true })
  invoice_url: string;

  @Property({ nullable: true })
  email: string;

  @Property({ nullable: true })
  discount_codes: any;

  @Property({ nullable: true })
  note: string;

  @Property({ nullable: true })
  status: string;

  @Property({ nullable: true })
  total_price: string;
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

  @Property()
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
