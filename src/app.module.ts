import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { AdminModule } from './admin/admin.module.js';

@Module({
  controllers: [AppController],
  imports: [AdminModule, AuthModule, ConfigModule.forRoot(), UsersModule],
  providers: [AppService],
})
export class AppModule {}
