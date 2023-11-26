import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../create-app.js";

const baseUrl = "/api/v1/login";

let app: INestApplication;

beforeEach(async () => {
  app = await createApp();
});

describe(`POST ${baseUrl}`, () => {
  it("returns status 200 for valid credentials", async () => {
    const response = await request(app.getHttpServer())
      .post(baseUrl)
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
