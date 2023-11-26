import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { User, UsersService } from "../users/users.service.js";

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(user: User) {
    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user === null) {
      return null;
    }
    const isPasswordCorrect = await compare(password, user.passwordHash);
    return isPasswordCorrect ? user : null;
  }
}
