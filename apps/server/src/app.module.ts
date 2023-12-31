import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { CartsModule } from "./carts/carts.module.js";
import { configModuleOptions } from "./config/config-module-options.js";
import { HealthModule } from "./health/health.module.js";
import { ProductsModule } from "./products/products.module.js";
import { UsersModule } from "./users/users.module.js";

@Module({
  imports: [
    AdminModule,
    AuthModule,
    CartsModule,
    ConfigModule.forRoot(configModuleOptions),
    HealthModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
