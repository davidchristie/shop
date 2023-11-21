import { Controller, Get } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator.js';
import { UsersService } from '../users/users.service.js';

@Controller('api/v1/admin')
export class AdminController {
  public constructor(public readonly usersService: UsersService) {}

  @Get('users')
  @Roles(['ADMIN'])
  public async getUsers() {
    const users = await this.usersService.findMany();
    return users.map((user) => ({
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      givenName: user.givenName,
      familyName: user.familyName,
      email: user.email,
      role: user.role,
    }));
  }
}
