import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  controllers: [AppController],
  imports: [AuthModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}
