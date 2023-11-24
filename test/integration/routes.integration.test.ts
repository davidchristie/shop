import { INestApplication } from "@nestjs/common";
import { beforeEach, expect, it } from "vitest";
import { createApp } from "./create-app.js";
import { getRoutes } from "./get-routes.js";

let app: INestApplication;

beforeEach(async () => {
  app = await createApp();
});

it("only exposes expected routes", () => {
  const routes = getRoutes(app);
  expect(routes).toMatchInlineSnapshot(`
    [
      {
        "method": "get",
        "path": "/api/v1/admin/users",
      },
      {
        "method": "post",
        "path": "/api/v1/login",
      },
      {
        "method": "get",
        "path": "/api/v1/profile",
      },
      {
        "method": "get",
        "path": "/api/v1/healthcheck",
      },
      {
        "method": "get",
        "path": "/api/v1/products",
      },
    ]
  `);
});
