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

describe(`GET ${baseUrl}/:productId`, () => {
  const productId = "007eb52f-f503-454a-9948-68416b25489a";

  it("returns status 200", async () => {
    const response = await request(app.getHttpServer()).get(
      `${baseUrl}/${productId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });

  describe("if product does not exist", () => {
    it("returns status 404", async () => {
      const response = await request(app.getHttpServer()).get(
        `${baseUrl}/00000000-0000-0000-0000-000000000000`,
      );
      expect(response.status).toBe(404);
      expect(response.body).toMatchSnapshot();
    });
  });

  describe("invalid product ID", () => {
    it("returns status 404", async () => {
      const response = await request(app.getHttpServer()).get(
        `${baseUrl}/invalid_product_id`,
      );
      expect(response.status).toBe(404);
      expect(response.body).toMatchSnapshot();
    });
  });
});
