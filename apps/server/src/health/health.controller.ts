import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
  PrismaHealthIndicator,
} from "@nestjs/terminus";
import { PrismaService } from "../prisma.service.js";
import { Public } from "../auth/public.decorator.js";

@Controller("api/v1/healthcheck")
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly prismaHealthIndicator: PrismaHealthIndicator,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () =>
        this.prismaHealthIndicator.pingCheck("postgres", this.prismaService),
    ]);
  }
}
