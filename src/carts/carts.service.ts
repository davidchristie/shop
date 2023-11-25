import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";

@Injectable()
export class CartsService {
  public constructor(private readonly prismaService: PrismaService) {}

  public getCurrentCart(input: { userId: string }) {
    return this.prismaService.cart.findFirst({
      include: {
        cartLines: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: input.userId,
      },
    });
  }
}
