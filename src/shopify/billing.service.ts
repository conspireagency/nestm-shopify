import { Injectable } from "@nestjs/common";
import { Shopify } from "@shopify/shopify-api";
import { GraphqlClient } from "@shopify/shopify-api/dist/clients/graphql";
import { Shop } from "./entities";

let isProd;

@Injectable()
export class BillingService {
  async ensureBilling(
    shop: Shop,
    { chargeName, amount, currencyCode, interval, trialDays }
  ) {
    if (!Object.values(BillingInterval).includes(interval)) {
      throw `Unrecognized billing interval '${interval}'`;
    }

    let hasPayment;
    let confirmationUrl = null;

    if (await this.hasActivePayment(shop, { chargeName, interval })) {
      hasPayment = true;
    } else {
      hasPayment = false;
      confirmationUrl = await this.requestPayment(shop, {
        chargeName,
        amount,
        currencyCode,
        interval,
        trialDays,
      });
    }

    return [hasPayment, confirmationUrl];
  }

  async hasActivePayment(shop: Shop, { chargeName, interval }) {
    const client = new Shopify.Clients.Graphql(shop.shop, shop.access_token);

    if (this.isRecurring(interval)) {
      const currentInstallations: any = await client.query({
        data: RECURRING_PURCHASES_QUERY,
      });
      const subscriptions =
        currentInstallations.body.data.currentAppInstallation
          .activeSubscriptions;

      for (let i = 0, len = subscriptions.length; i < len; i++) {
        if (
          subscriptions[i].name === chargeName &&
          (!isProd || !subscriptions[i].test)
        ) {
          return true;
        }
      }
    } else {
      let purchases;
      let endCursor = null;
      do {
        const currentInstallations: any = await client.query({
          data: {
            query: ONE_TIME_PURCHASES_QUERY,
            variables: { endCursor },
          },
        });
        purchases =
          currentInstallations.body.data.currentAppInstallation
            .oneTimePurchases;

        for (let i = 0, len = purchases.edges.length; i < len; i++) {
          const node = purchases.edges[i].node;
          if (
            node.name === chargeName &&
            (!isProd || !node.test) &&
            node.status === "ACTIVE"
          ) {
            return true;
          }
        }

        endCursor = purchases.pageInfo.endCursor;
      } while (purchases.pageInfo.hasNextPage);
    }

    return false;
  }

  async requestPayment(
    shop: Shop,
    { chargeName, amount, currencyCode, interval, trialDays }
  ) {
    const client = new Shopify.Clients.Graphql(shop.shop, shop.access_token);
    const returnUrl = `https://${Shopify.Context.HOST_NAME}?shop=${
      shop.shop
    }&host=${btoa(`${shop.shop}/admin`)}`;

    let data;
    if (this.isRecurring(interval)) {
      const mutationResponse = await this.requestRecurringPayment(
        client,
        returnUrl,
        {
          chargeName,
          amount,
          currencyCode,
          interval,
          trialDays,
        }
      );
      data = mutationResponse.body.data.appSubscriptionCreate;
    } else {
      const mutationResponse: any = await this.requestSinglePayment(
        client,
        returnUrl,
        {
          chargeName,
          amount,
          currencyCode,
        }
      );
      data = mutationResponse.body.data.appPurchaseOneTimeCreate;
    }

    if (data.userErrors.length) {
      throw new ShopifyBillingError(
        "Error while billing the store",
        data.userErrors
      );
    }

    return data.confirmationUrl;
  }

  async requestRecurringPayment(
    client: GraphqlClient,
    returnUrl,
    { chargeName, amount, currencyCode, interval, trialDays }
  ) {
    const mutationResponse: any = await client.query({
      data: {
        query: RECURRING_PURCHASE_MUTATION,
        variables: {
          name: chargeName,
          trialDays: trialDays,
          lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  interval,
                  price: { amount, currencyCode },
                },
              },
            },
          ],
          returnUrl,
          test: !isProd,
        },
      },
    });

    if (mutationResponse.body.errors && mutationResponse.body.errors.length) {
      throw new ShopifyBillingError(
        "Error while billing the store",
        mutationResponse.body.errors
      );
    }

    return mutationResponse;
  }

  async requestSinglePayment(
    client: GraphqlClient,
    returnUrl,
    { chargeName, amount, currencyCode }
  ) {
    const mutationResponse: any = await client.query({
      data: {
        query: ONE_TIME_PURCHASE_MUTATION,
        variables: {
          name: chargeName,
          price: { amount, currencyCode },
          returnUrl,
          test: process.env.NODE_ENV !== "production",
        },
      },
    });

    if (mutationResponse.body.errors && mutationResponse.body.errors.length) {
      throw new ShopifyBillingError(
        "Error while billing the store",
        mutationResponse.body.errors
      );
    }

    return mutationResponse;
  }

  isRecurring(interval) {
    return RECURRING_INTERVALS.includes(interval);
  }
}

export function ShopifyBillingError(message: string, errorData) {
  this.name = "ShopifyBillingError";
  this.stack = new Error().stack;

  this.message = message;
  this.errorData = errorData;
}
ShopifyBillingError.prototype = new Error();

export const BillingInterval = {
  OneTime: "ONE_TIME",
  Every30Days: "EVERY_30_DAYS",
  Annual: "ANNUAL",
};

const RECURRING_INTERVALS = [
  BillingInterval.Every30Days,
  BillingInterval.Annual,
];

const RECURRING_PURCHASES_QUERY = `
  query appSubscription {
    currentAppInstallation {
      activeSubscriptions {
        name, test
      }
    }
  }
`;

const ONE_TIME_PURCHASES_QUERY = `
  query appPurchases($endCursor: String) {
    currentAppInstallation {
      oneTimePurchases(first: 250, sortKey: CREATED_AT, after: $endCursor) {
        edges {
          node {
            name, test, status
          }
        }
        pageInfo {
          hasNextPage, endCursor
        }
      }
    }
  }
`;

const RECURRING_PURCHASE_MUTATION = `
  mutation test(
    $name: String!
    $trialDays: Int!
    $lineItems: [AppSubscriptionLineItemInput!]!
    $returnUrl: URL!
    $test: Boolean
  ) {
    appSubscriptionCreate(
      name: $name
      trialDays: $trialDays
      lineItems: $lineItems
      returnUrl: $returnUrl
      test: $test
    ) {
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;

const ONE_TIME_PURCHASE_MUTATION = `
  mutation test(
    $name: String!
    $price: MoneyInput!
    $returnUrl: URL!
    $test: Boolean
  ) {
    appPurchaseOneTimeCreate(
      name: $name
      price: $price
      returnUrl: $returnUrl
      test: $test
    ) {
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
