import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { Config } from "./config/config.schema.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Config>);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(configService.getOrThrow("PORT"));
}

bootstrap();
