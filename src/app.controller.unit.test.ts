import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthService } from './auth/auth.service.js';
import { PrismaService } from './prisma.service.js';
import { UsersService } from './users/users.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        JwtService,
        PrismaService,
        UsersService,
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('getHello()', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
