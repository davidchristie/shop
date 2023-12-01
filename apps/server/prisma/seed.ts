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
  const users = await prisma.user.findMany();
  await prisma.image.createMany({
    data: Array(1000)
      .fill(null)
      .map(() => ({
        id: faker.string.uuid(),
        createdAt: new Date("2023-11-19T06:31:46.208Z"),
        updatedAt: new Date("2023-11-19T06:31:46.208Z"),
        url: `https://picsum.photos/id/${faker.number.int({
          min: 1,
          max: 1000,
        })}/300/200`,
      })),
  });
  const images = await prisma.image.findMany();
  await prisma.product.createMany({
    data: Array(1000)
      .fill(null)
      .map((_, index) => ({
        id: faker.string.uuid(),
        createdAt: new Date("2023-11-19T06:31:46.208Z"),
        updatedAt: new Date("2023-11-19T06:31:46.208Z"),
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        imageId: images[index].id,
      })),
  });
  const products = await prisma.product.findMany();
  await prisma.variant.createMany({
    data: Array(3000)
      .fill(null)
      .map((_, index) => ({
        id: faker.string.uuid(),
        createdAt: new Date("2023-11-19T06:31:46.208Z"),
        updatedAt: new Date("2023-11-19T06:31:46.208Z"),
        name: faker.commerce.productAdjective(),
        price: faker.number.int({ min: 10, max: 1000 }),
        productId: products[Math.floor(index / 3)].id,
      })),
  });
  const variants = await prisma.variant.findMany();
  await prisma.cart.create({
    data: {
      id: faker.string.uuid(),
      userId: users[1].id,
      createdAt: new Date("2023-11-19T06:31:46.208Z"),
      updatedAt: new Date("2023-11-19T06:31:46.208Z"),
      cartLines: {
        createMany: {
          data: [
            {
              id: faker.string.uuid(),
              createdAt: new Date("2023-11-19T06:31:46.208Z"),
              updatedAt: new Date("2023-11-19T06:31:46.208Z"),
              variantId: variants[0].id,
              quantity: 1,
            },
            {
              id: faker.string.uuid(),
              createdAt: new Date("2023-11-19T06:31:46.208Z"),
              updatedAt: new Date("2023-11-19T06:31:46.208Z"),
              variantId: variants[1].id,
              quantity: 2,
            },
            {
              id: faker.string.uuid(),
              createdAt: new Date("2023-11-19T06:31:46.208Z"),
              updatedAt: new Date("2023-11-19T06:31:46.208Z"),
              variantId: variants[2].id,
              quantity: 3,
            },
          ],
        },
      },
    },
  });
}

seed();
