import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export async function getUserAccessToken(
  app: INestApplication,
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/api/v1/login')
    .send({ username: 'john.doe@domain.com', password: 'guess' })
    .set('Content-Type', 'application/json');
  if (response.status !== 200) {
    throw new Error('Login request failed.');
  }
  const { accessToken } = response.body;
  return accessToken;
}
