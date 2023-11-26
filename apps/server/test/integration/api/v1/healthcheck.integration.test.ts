import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../create-app.js";

const baseUrl = "/api/v1/healthcheck";

let app: INestApplication;

beforeEach(async () => {
  app = await createApp();
});

describe(`GET ${baseUrl}`, () => {
  it("returns status 200", async () => {
    const response = await request(app.getHttpServer()).get(baseUrl);
    expect(response.status).toBe(200);
    expect(response.body).toMatchInlineSnapshot(
      `
      {
        "details": {
          "postgres": {
            "status": "up",
          },
        },
        "error": {},
        "info": {
          "postgres": {
            "status": "up",
          },
        },
        "status": "ok",
      }
    `,
    );
  });
});
