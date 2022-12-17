import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
} from "@mikro-orm/core";
import { Metafield } from "./Metafield.entity";

@Entity()
export class Customer {
  @PrimaryKey()
  id: string;

  @Property({ nullable: true })
  accepts_marketing: boolean;

  @Property({ nullable: true })
  accepts_marketing_updated_at: Date;

  @OneToMany(() => Address, (address) => address.customer_id)
  addresses: Address[];

  @Property({ nullable: true })
  currency: string;

  @Property({ nullable: true })
  created_at: Date;

  @ManyToOne()
  default_address: Address;

  @Property()
  email: string;

  // @Property()
  // email_marketing_consent: EmailMarketingConsent;

  @Property({ nullable: true })
  first_name: string;

  @Property({ nullable: true })
  last_name: string;

  @Property({ nullable: true })
  last_order_id: string;

  @Property({ nullable: true })
  last_order_name: string;

  // @Property()
  // metafield: Metafield;

  @Property({ nullable: true })
  marketing_opt_in_level: string;

  @Property({ nullable: true })
  multipass_identifier: string;

  @Property({ nullable: true })
  note: string;

  @Property({ nullable: true })
  orders_count: number;

  @Property({ nullable: true })
  password: string;

  @Property({ nullable: true })
  password_confirmation: string;

  @Property({ nullable: true })
  phone: string;

  // @Property()
  // sms_marketing_consent: SMSMarketingConsent;

  @Property({ nullable: true })
  state: string;

  @Property({ nullable: true })
  tags: string;

  @Property({ nullable: true })
  tax_exempt: boolean;

  @Property({ nullable: true })
  tax_exemptions: string[];

  @Property({ nullable: true })
  total_spent: number;

  @Property({ nullable: true })
  updated_at: Date;

  @Property({ nullable: true })
  verified_email: boolean;
}

@Entity()
export class Address {
  @PrimaryKey()
  id: string;

  @ManyToOne()
  customer_id!: Customer;

  @Property({ nullable: true })
  first_name: string;

  @Property({ nullable: true })
  last_name: string;

  @Property({ nullable: true })
  company: string;

  @Property({ nullable: true })
  address1: string;

  @Property({ nullable: true })
  address2: string;

  @Property({ nullable: true })
  city: string;

  @Property({ nullable: true })
  province: string;

  @Property({ nullable: true })
  country: string;

  @Property({ nullable: true })
  zip: string;

  @Property({ nullable: true })
  phone: string;

  @Property({ nullable: true })
  province_code: string;

  @Property({ nullable: true })
  country_code: string;

  @Property({ nullable: true })
  country_name: string;

  @Property({ nullable: true })
  default: boolean;
}

// @Entity()
// export class EmailMarketingConsent {
//   @Property()
//   state: string;

//   @Property()
//   opt_in_level: string;

//   @Property()
//   consent_updated_at: Date;
// }
