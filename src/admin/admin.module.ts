import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller.js";
import { UsersModule } from "../users/users.module.js";

@Module({
  controllers: [AdminController],
  imports: [UsersModule],
})
export class AdminModule {}
