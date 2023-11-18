import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import { AuthService } from './auth/auth.service.js';
import { LocalAuthGuard } from './auth/local-auth.guard.js';
import { Public } from './auth/public.js';

@Controller('api/v1')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @Get('profile')
  getProfile(@Request() request: any) {
    return request.user;
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
