import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ClientController } from "./client.controller";

import { join } from "path";
import { AuthMiddleware } from "./middleware/auth.middleware";

require("dotenv").config();

const modules = [];
const controllers = [];

if (process.env.NODE_ENV == undefined) {
  throw new Error("NODE_ENV is not set in client module");
}

// TODO clean this up, probably a better way
if (process.env.NODE_ENV === "production") {
  modules.push(
    ServeStaticModule.forRoot({
      rootPath: join(`${process.cwd()}/client/dist/`),
      exclude: ["/api/(.*)"],
    })
  );
} else {
  controllers.push(ClientController);
}

@Module({
  imports: modules,
  controllers: controllers,
  providers: [AuthMiddleware],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: "/api/(.*)", method: RequestMethod.ALL })
      .forRoutes(ClientController);
  }
}
