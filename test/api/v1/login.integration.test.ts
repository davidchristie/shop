import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { AppModule } from "../../../src/app.module.js";

let app: INestApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});

describe("POST /api/v1/login", () => {
  it("returns status 200 for valid credentials", async () => {
    const response = await request(app.getHttpServer())
      .post("/api/v1/login")
      .send({ username: "jane.doe@domain.com", password: "Pa$$word123" })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      accessToken: expect.any(String),
    });
  });

  it("returns status 401 for invalid credentials", async () => {
    const response = await request(app.getHttpServer())
      .post("/api/v1/login")
      .send({ username: "john", password: "wrong_password" })
      .set("Content-Type", "application/json");
    expect(response.status).toBe(401);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "message": "Unauthorized",
        "statusCode": 401,
      }
    `);
  });
});
