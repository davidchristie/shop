import { INestApplication } from "@nestjs/common";
import { getAccessTokenForCredentials } from "./get-access-token-for-credentials.js";

export function getAdminAccessToken(app: INestApplication): Promise<string> {
  return getAccessTokenForCredentials(app, {
    username: "jane.doe@domain.com",
    password: "Pa$$word123",
  });
}
