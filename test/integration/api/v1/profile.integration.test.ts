import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../create-app.js";
import { getUserAccessToken } from "../../get-user-access-token.js";

let app: INestApplication;

beforeEach(async () => {
  app = await createApp();
});

describe("POST /api/v1/profile", () => {
  it("returns status 200 when authenticated", async () => {
    const accessToken = await getUserAccessToken(app);
    const response = await request(app.getHttpServer())
      .get("/api/v1/profile")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "email": "john.doe@domain.com",
        "familyName": "Doe",
        "givenName": "John",
        "id": "1678d317-6f84-4c13-8629-2d9b00f2ff01",
        "role": "USER",
      }
    `);
  });

  it("returns status 401 when unauthenticated", async () => {
    const response = await request(app.getHttpServer()).get("/api/v1/profile");
    expect(response.status).toBe(401);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "message": "Unauthorized",
        "statusCode": 401,
      }
    `);
  });
});
