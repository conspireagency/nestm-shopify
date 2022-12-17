import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Shopify } from '@shopify/shopify-api';

async function validateRequest(req, res) {
  try {
    const bearerPresent = req.headers.authorization?.match(/Bearer (.*)/);
    if (bearerPresent) {
      if (bearerPresent) {
        // get shop from the bearer token payload
        const payload = Shopify.Utils.decodeSessionToken(bearerPresent[1]);
        const shop = payload.dest.replace('https://', '');
        // compare shop from the bearer token payload to the shop in the request
        const session = await Shopify.Utils.loadCurrentSession(req, res, false);
        if (session.shop === shop) {
          console.log('validated request');
          return true;
        }
        // redirect to auth if no session, no session.shop, or request shop is different than session shop
      }
    }
  } catch (e) {
    console.error('failed to validate request', e);
    return false;
  }
}

@Injectable()
export class ShopifyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    // if returns true the request will continue otherwise it will be denied
    return validateRequest(request, response);
  }
}
