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
      createdAt: '2023-11-19T06:31:46.208Z',
      deletedAt: null,
      email: 'jane.doe@domain.com',
      familyName: 'Doe',
      givenName: 'Jane',
      id: '24af37e5-a17e-4826-830c-8240314dd160',
      passwordHash:
        '$2b$10$ASLNQYd1Q/r8DBgAg3ZfzeTgVtuch5xw9ZGqvay/YThvBTn3NSPy.',
      updatedAt: '2023-11-19T06:31:46.208Z',
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
