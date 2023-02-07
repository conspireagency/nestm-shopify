import { Inject, Injectable } from "@nestjs/common";
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

import { ApiVersion, Shopify } from "@shopify/shopify-api";

import { MODULE_OPTIONS_TOKEN } from "./config.module-definition";
import { AuthModuleOptions } from "./interfaces/config-module-options.interface";

@Injectable()
export class AuthService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: AuthModuleOptions,
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {}
}
