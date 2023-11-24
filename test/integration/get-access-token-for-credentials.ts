import { INestApplication } from "@nestjs/common";
import request from "supertest";

export async function getAccessTokenForCredentials(
  app: INestApplication,
  credentials: {
    username: string;
    password: string;
  },
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post("/api/v1/login")
    .send(credentials)
    .set("Content-Type", "application/json");
  if (response.status !== 200) {
    throw new Error(
      `Login request failed for credentials: ${JSON.stringify(credentials)}`,
    );
  }
  const { accessToken } = response.body;
  return accessToken;
}
