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
            "id": "174c7683-63c4-484d-818f-df415ff244c8",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "45f9486c-a152-48ed-b188-659b43f51c85",
                "name": "Tasty",
              },
            },
            "quantity": 1,
          },
          {
            "id": "f3dd7571-0ee5-4099-8cf1-5abf98fbfe8e",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "eb2f9126-d4d7-4408-977a-471599a0767e",
                "name": "Ergonomic",
              },
            },
            "quantity": 2,
          },
          {
            "id": "aa5d3f2a-7f0a-447d-a028-9f7d64867394",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "8a862e14-6483-4750-b0c4-e6dc8ae8b072",
                "name": "Ergonomic",
              },
            },
            "quantity": 3,
          },
        ],
        "id": "fc778083-0af1-423a-98c4-3f9d077c960c",
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
