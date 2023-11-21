import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export async function getAdminAccessToken(
  app: INestApplication,
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/api/v1/login')
    .send({ username: 'jane.doe@domain.com', password: 'Pa$$word123' })
    .set('Content-Type', 'application/json');
  if (response.status !== 200) {
    throw new Error('Login request failed.');
  }
  const { accessToken } = response.body;
  return accessToken;
}
