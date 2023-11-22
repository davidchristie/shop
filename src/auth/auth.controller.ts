import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { LocalAuthGuard } from "./local-auth.guard.js";
import { Public } from "./public.decorator.js";

@Controller("api/v1")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post("login")
  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  public async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @Get("profile")
  public getProfile(@Request() request: any) {
    return {
      id: request.user.id,
      givenName: request.user.givenName,
      familyName: request.user.familyName,
      email: request.user.email,
      role: request.user.role,
    };
  }
}
