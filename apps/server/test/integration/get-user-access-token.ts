import { INestApplication } from "@nestjs/common";
import { getAccessTokenForCredentials } from "./get-access-token-for-credentials.js";

export function getUserAccessToken(app: INestApplication): Promise<string> {
  return getAccessTokenForCredentials(app, {
    username: "john.doe@domain.com",
    password: "guess",
  });
}
