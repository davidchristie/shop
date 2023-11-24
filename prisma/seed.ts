import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

async function seed(): Promise<void> {
  faker.seed(0);
  const prisma = new PrismaClient();
  await prisma.user.createMany({
    data: [
      {
        id: "24af37e5-a17e-4826-830c-8240314dd160",
        createdAt: new Date("2023-11-19T06:31:46.208Z"),
        updatedAt: new Date("2023-11-19T06:31:46.208Z"),
        givenName: "Jane",
        familyName: "Doe",
        email: "jane.doe@domain.com",
        passwordHash:
          "$2b$10$ASLNQYd1Q/r8DBgAg3ZfzeTgVtuch5xw9ZGqvay/YThvBTn3NSPy.", // Pa$$word123
        role: "ADMIN",
      },
      {
        id: "1678d317-6f84-4c13-8629-2d9b00f2ff01",
        createdAt: new Date("2023-11-19T06:31:46.208Z"),
        updatedAt: new Date("2023-11-19T06:31:46.208Z"),
        givenName: "John",
        familyName: "Doe",
        email: "john.doe@domain.com",
        passwordHash:
          "$2b$10$Vjbw2X0s7gkwE.ctQHOyWOZtlwZ4G1zqDiuYe5QSjoxB31saQ8K7S", // guess
      },
    ],
  });
  await prisma.product.createMany({
    data: Array(1000)
      .fill(null)
      .map(() => ({
        id: faker.string.uuid(),
        createdAt: new Date("2023-11-19T06:31:46.208Z"),
        updatedAt: new Date("2023-11-19T06:31:46.208Z"),
        name: faker.commerce.product(),
      })),
  });
}

seed();
