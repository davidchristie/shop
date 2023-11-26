import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module.js";

export async function createApp(): Promise<INestApplication> {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  return app;
}
