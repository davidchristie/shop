import { Test, TestingModule } from "@nestjs/testing";
import { afterEach } from "node:test";
import { beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("JWT_SECRET environment variable is less than 32 characters", () => {
  beforeEach(() => {
    vi.stubEnv("JWT_SECRET", "x".repeat(31));
  });

  it("throws validation error on application start", async () => {
    await expect(async () => {
      const { AppModule } = await import("../../src/app.module.js");
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      const app = moduleFixture.createNestApplication();
      await app.init();
    }).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Config validation error: [
        {
          \\"code\\": \\"too_small\\",
          \\"minimum\\": 32,
          \\"type\\": \\"string\\",
          \\"inclusive\\": true,
          \\"exact\\": false,
          \\"message\\": \\"String must contain at least 32 character(s)\\",
          \\"path\\": [
            \\"JWT_SECRET\\"
          ]
        }
      ]"
    `);
  });
});

describe("JWT_SECRET environment variable is 32 characters", () => {
  beforeEach(() => {
    vi.stubEnv("JWT_SECRET", "x".repeat(32));
  });

  it("starts the application", async () => {
    const { AppModule } = await import("../../src/app.module.js");
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication();
    await app.init();
  });
});
