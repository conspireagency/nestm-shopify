import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ShopifyID } from "../entity-types/ShopifyID";
import { Shop } from "./Shop.entity";

@Entity()
export class ShopDetail {
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @OneToOne(() => Shop, (shop) => shop.detail)
  shop: Shop;

  @Property({ nullable: true })
  address1: string;

  @Property({ nullable: true })
  address2: string;

  @Property({ nullable: true })
  checkout_api_supported: boolean;

  @Property({ nullable: true })
  city: string;

  @Property({ nullable: true })
  cookie_consent_level: string;

  @Property({ nullable: true })
  country: string;

  @Property({ nullable: true })
  country_code: string;

  @Property({ nullable: true })
  country_name: string;

  @Property({ nullable: true })
  county_taxes: boolean;

  @Property({ nullable: true })
  created_at: string;

  @Property({ nullable: true })
  currency: string;

  @Property({ nullable: true })
  customer_email: string;

  @Property({ nullable: true })
  domain: string;

  @Property({ nullable: true })
  eligible_for_card_reader_giveaway: boolean;

  @Property({ nullable: true })
  eligible_for_payments: boolean;

  @Property({ nullable: true })
  email: string;

  @Property({ nullable: true })
  enabled_presentment_currencies: string[];

  @Property({ nullable: true })
  finances: boolean;

  @Property({ nullable: true })
  force_ssl: boolean;

  @Property({ nullable: true })
  google_apps_domain: string;

  @Property({ nullable: true })
  google_apps_login_enabled: boolean;

  @Property({ nullable: true })
  has_discounts: boolean;

  @Property({ nullable: true })
  has_gift_cards: boolean;

  @Property({ nullable: true })
  has_storefront: boolean;

  @Property({ nullable: true })
  iana_timezone: string;

  @Property({ nullable: true })
  latitude: number;

  @Property({ nullable: true })
  longitude: number;

  @Property({ nullable: true })
  money_format: string;

  @Property({ nullable: true })
  money_in_emails_format: string;

  @Property({ nullable: true })
  money_with_currency_format: string;

  @Property({ nullable: true })
  money_with_currency_in_emails_format: string;

  @Property({ nullable: true })
  myshopify_domain: string;

  @Property({ nullable: true })
  name: string;

  @Property({ nullable: true })
  password_enabled: boolean;

  @Property({ nullable: true })
  phone: string;

  @Property({ nullable: true })
  plan_display_name: string;

  @Property({ nullable: true })
  plan_name: string;

  @Property({ nullable: true })
  pre_launch_enabled: boolean = false;

  @Property({ nullable: true })
  primary_locale: string;

  @Property({ nullable: true })
  primary_location_id: number;

  @Property({ nullable: true })
  province: string;

  @Property({ nullable: true })
  province_code: string;

  @Property({ nullable: true })
  requires_extra_payments_agreement: boolean = false;

  @Property({ nullable: true })
  setup_required: boolean = true;

  @Property({ nullable: true })
  shop_owner: string;

  @Property({ nullable: true })
  source: string | null;

  @Property({ nullable: true })
  tax_shipping: boolean | null;

  @Property({ nullable: true })
  taxes_included: true | null;

  @Property({ nullable: true })
  timezone: string;

  @Property({ nullable: true })
  transactional_sms_disabled: boolean;

  @Property({ nullable: true })
  updated_at: Date;

  @Property({ nullable: true })
  weight_unit: string;

  @Property({ nullable: true })
  zip: string;
}
