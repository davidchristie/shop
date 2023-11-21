import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma.service.js";

export type { User };

@Injectable()
export class UsersService {
  public constructor(private readonly prisma: PrismaService) {}

  public findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  public findOneById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
