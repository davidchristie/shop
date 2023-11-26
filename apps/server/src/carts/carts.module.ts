import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { CartsController } from "./carts.controller.js";
import { CartsService } from "./carts.service.js";

@Module({
  controllers: [CartsController],
  providers: [CartsService, PrismaService],
})
export class CartsModule {}
