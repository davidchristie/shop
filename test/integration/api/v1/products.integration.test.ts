import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../create-app.js";

const baseUrl = "/api/v1/products";

let app: INestApplication;

beforeEach(async () => {
  app = await createApp();
});

describe(`GET ${baseUrl}`, () => {
  it("returns status 200", async () => {
    const response = await request(app.getHttpServer()).get(baseUrl);
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });

  it("respects 'limit' query parameter", async () => {
    const response = await request(app.getHttpServer()).get(
      baseUrl + "?limit=10",
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });

  it("respects 'offset' query parameter", async () => {
    const response = await request(app.getHttpServer()).get(
      baseUrl + "?offset=10",
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });
});
