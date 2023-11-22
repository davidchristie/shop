import { describe, expect, it } from "vitest";

describe("healthcheck", () => {
  it(`returns status "ok"`, async () => {
    const response = await fetch("http://localhost:3000/api/v1/healthcheck");
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchInlineSnapshot(`
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
    `);
  });
});
