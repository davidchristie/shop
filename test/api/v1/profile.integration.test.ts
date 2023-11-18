import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppModule } from '../../../src/app.module.js';
import { getAccessToken } from '../../get-access-token.js';

let app: INestApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});

describe('POST /api/v1/profile', () => {
  it('returns status 200 when authenticated', async () => {
    const accessToken = await getAccessToken(app);
    const response = await request(app.getHttpServer())
      .get('/api/v1/profile')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      userId: 1,
      username: 'john',
    });
  });

  it('returns status 401 when unauthenticated', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/profile');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });
});
