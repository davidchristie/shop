import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { AppModule } from "../../../../src/app.module.js";
import { getUserAccessToken } from "../../get-user-access-token.js";

const baseUrl = "/api/v1/healthcheck";

let app: INestApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});

describe(`GET ${baseUrl}`, () => {
  it("returns status 200", async () => {
    const accessToken = await getUserAccessToken(app);
    const response = await request(app.getHttpServer())
      .get(baseUrl)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.text).toMatchInlineSnapshot('"{\\"status\\":\\"OK\\"}"');
  });
});
