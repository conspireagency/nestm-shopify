import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ShopifyID } from "../entity-types/ShopifyID";

@Entity()
export class ShopDetail {
  @PrimaryKey({ type: ShopifyID })
  id: number;

  @Property()
  address1: string;

  @Property()
  address2: string;

  @Property()
  checkout_api_supported: boolean;

  @Property()
  city: string;

  @Property()
  country: string;

  @Property()
  country_code: string;

  @Property()
  country_name: string;

  @Property()
  county_taxes: any;

  @Property()
  created_at: Date;

  @Property()
  customer_email: string;

  @Property()
  currency: string;

  @Property()
  domain: string;

  @Property()
  enabled_presentment_currencies: string[];

  @Property()
  eligible_for_card_reader_giveaway: boolean;

  @Property()
  eligible_for_payments: boolean;

  @Property()
  email: string;

  @Property()
  finances: boolean;

  @Property()
  force_ssl: boolean;

  @Property()
  google_apps_domain: any;

  @Property()
  google_apps_login_enabled: any;

  @Property()
  has_discounts: boolean;

  @Property()
  has_gift_cards: boolean;

  @Property()
  has_storefront: boolean;

  @Property()
  iana_timezone: string;

  @Property()
  latitude: number;

  @Property()
  longitude: number;

  @Property()
  money_format: string;

  @Property()
  money_in_emails_format: string;

  @Property()
  money_with_currency_format: string;

  @Property()
  money_with_currency_in_emails_format: string;

  @Property()
  multi_location_enabled: boolean;

  @Property()
  myshopify_domain: string;

  @Property()
  name: string;

  @Property()
  password_enabled: boolean;

  @Property()
  phone: any;

  @Property()
  plan_display_name: string;

  @Property()
  pre_launch_enabled: boolean;

  @Property()
  cookie_consent_level: string;

  @Property()
  plan_name: string;

  @Property()
  primary_locale: string;

  @Property()
  primary_location_id: number;

  @Property()
  province: string;

  @Property()
  province_code: string;

  @Property()
  requires_extra_payments_agreement: boolean;

  @Property()
  setup_required: boolean;

  @Property()
  shop_owner: string;

  @Property()
  source: any;

  @Property()
  taxes_included: any;

  @Property()
  tax_shipping: any;

  @Property()
  timezone: string;

  @Property()
  transactional_sms_disabled: boolean;

  @Property()
  updated_at: Date;

  @Property()
  weight_unit: string;

  @Property()
  zip: string;

  @Property()
  marketing_sms_consent_enabled_at_checkout: boolean;
}
