import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health.controller.js";
import { PrismaService } from "../prisma.service.js";

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [PrismaService],
})
export class HealthModule {}
