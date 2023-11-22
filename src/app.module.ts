import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { HealthModule } from "./health/health.module.js";
import { UsersModule } from "./users/users.module.js";

@Module({
  imports: [
    AdminModule,
    AuthModule,
    ConfigModule.forRoot(),
    HealthModule,
    UsersModule,
  ],
})
export class AppModule {}
