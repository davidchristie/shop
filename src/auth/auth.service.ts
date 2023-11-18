import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  public constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (user === null) {
      return null;
    }
    const isPasswordCorrect = await compare(password, user.passwordHash);
    return isPasswordCorrect ? user : null;
  }
}
