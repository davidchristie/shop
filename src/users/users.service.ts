import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      passwordHash:
        '$2b$10$ASLNQYd1Q/r8DBgAg3ZfzeTgVtuch5xw9ZGqvay/YThvBTn3NSPy.', // Pa$$word123
    },
    {
      userId: 2,
      username: 'maria',
      passwordHash:
        '$2b$10$Vjbw2X0s7gkwE.ctQHOyWOZtlwZ4G1zqDiuYe5QSjoxB31saQ8K7S', // guess
    },
  ];

  async findOne(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) ?? null;
  }
}
