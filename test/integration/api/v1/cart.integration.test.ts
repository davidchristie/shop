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
            "id": "23d7d9ea-5baf-44c8-b8b5-db066a61edaf",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "61de2f49-1c57-4077-81f4-f473b36ebe19",
                "name": "Handmade",
              },
            },
          },
          {
            "id": "4b3d7777-a7fc-4a23-8cc3-832776eed298",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "2276d80b-cd21-4ddc-b9f0-a13059668e8f",
                "name": "Unbranded",
              },
            },
          },
          {
            "id": "13d55397-a98b-4338-9163-ab5be6c6263e",
            "product": {
              "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "name": "Tuna",
              "variant": {
                "id": "60e2be5f-85f3-4c66-ad6e-b14326742342",
                "name": "Intelligent",
              },
            },
          },
        ],
        "id": "2e2d5bc0-b6cb-46f3-b198-d33fa19fc518",
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
