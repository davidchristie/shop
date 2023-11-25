import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../create-app.js";
import { getUserAccessToken } from "../../get-user-access-token.js";

const baseUrl = "/api/v1/cart";

let app: INestApplication;

beforeEach(async () => {
  app = await createApp();
});

describe(`POST ${baseUrl}`, () => {
  it("returns status 200 when authenticated", async () => {
    const accessToken = await getUserAccessToken(app);
    const response = await request(app.getHttpServer())
      .get(baseUrl)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "cartLines": [
          {
            "id": "3905405b-7970-4c7c-8de6-61a224da840d",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "45f9486c-a152-48ed-b188-659b43f51c85",
                "name": "Tasty",
              },
            },
          },
          {
            "id": "30c627f4-1a55-4653-8e95-28d5769c77f6",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "4eb2f912-6d4d-4740-b877-a471599a0767",
                "name": "Incredible",
              },
            },
          },
          {
            "id": "d1568b02-61bc-4f16-bf94-0324c6556c86",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "038a862e-1464-4837-9500-c4e6dc8ae8b0",
                "name": "Rustic",
              },
            },
          },
        ],
        "id": "06950f80-a158-4bb2-8757-63897088a318",
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
