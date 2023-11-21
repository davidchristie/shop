import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppModule } from '../../../../src/app.module.js';
import { getAdminAccessToken } from '../../../get-admin-access-token.js';
import { getUserAccessToken } from '../../../get-user-access-token.js';

const baseUrl = '/api/v1/admin/users';

let app: INestApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});

describe(`GET ${baseUrl}`, () => {
  it('returns status 200 when authenticated as admin', async () => {
    const accessToken = await getAdminAccessToken(app);
    const response = await request(app.getHttpServer())
      .get(baseUrl)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchInlineSnapshot(`
      [
        {
          "createdAt": "2023-11-19T06:31:46.208Z",
          "deletedAt": null,
          "email": "jane.doe@domain.com",
          "familyName": "Doe",
          "givenName": "Jane",
          "id": "24af37e5-a17e-4826-830c-8240314dd160",
          "role": "ADMIN",
          "updatedAt": "2023-11-19T06:31:46.208Z",
        },
        {
          "createdAt": "2023-11-19T06:31:46.208Z",
          "deletedAt": null,
          "email": "john.doe@domain.com",
          "familyName": "Doe",
          "givenName": "John",
          "id": "1678d317-6f84-4c13-8629-2d9b00f2ff01",
          "role": "USER",
          "updatedAt": "2023-11-19T06:31:46.208Z",
        },
      ]
    `);
  });

  it('returns status 403 when authenticated as user', async () => {
    const accessToken = await getUserAccessToken(app);
    const response = await request(app.getHttpServer())
      .get(baseUrl)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(403);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "error": "Forbidden",
        "message": "Forbidden resource",
        "statusCode": 403,
      }
    `);
  });

  it('returns status 401 when unauthenticated', async () => {
    const response = await request(app.getHttpServer()).get(baseUrl);
    expect(response.status).toBe(401);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "message": "Unauthorized",
        "statusCode": 401,
      }
    `);
  });
});
