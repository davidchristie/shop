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
            "id": "3fb67158-61b7-499d-b01f-354bdedecb68",
            "product": {
              "id": "61de2f49-1c57-4077-81f4-f473b36ebe19",
              "name": "Fish",
              "variant": {
                "id": "279faf6b-c6cb-4800-999d-4d32ce8afc37",
                "name": "Recycled",
              },
            },
            "quantity": 1,
          },
          {
            "id": "b42e58cd-c37c-4643-be61-9de26fd7ee02",
            "product": {
              "id": "61de2f49-1c57-4077-81f4-f473b36ebe19",
              "name": "Fish",
              "variant": {
                "id": "72a2b2ed-4474-49d1-9418-585664155a42",
                "name": "Incredible",
              },
            },
            "quantity": 2,
          },
          {
            "id": "122d05bc-c17c-4a33-a87f-a05d6ab621b5",
            "product": {
              "id": "61de2f49-1c57-4077-81f4-f473b36ebe19",
              "name": "Fish",
              "variant": {
                "id": "ef66dedc-ed18-460d-b1a5-e6b04a7ce6bf",
                "name": "Recycled",
              },
            },
            "quantity": 3,
          },
        ],
        "id": "48b878ef-bd16-4c12-8b98-fff2515e44b3",
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
