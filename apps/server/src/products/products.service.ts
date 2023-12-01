import { Image, Product, Variant } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";

export type ProductWithVariants = Product & {
  image: Image;
  variants: Variant[];
};

@Injectable()
export class ProductsService {
  public constructor(private readonly prismaService: PrismaService) {}

  public findMany(input: {
    limit?: number;
    offset?: number;
  }): Promise<ProductWithVariants[]> {
    return this.prismaService.product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        image: true,
        variants: true,
      },
      skip: input.offset,
      take: input.limit,
    });
  }

  public async findOne(input: {
    id: string;
  }): Promise<ProductWithVariants | null> {
    try {
      return await this.prismaService.product.findUnique({
        where: {
          id: input.id,
        },
        include: {
          image: true,
          variants: true,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes("Inconsistent column data: Error creating UUID")
      ) {
        return null;
      }
      throw error;
    }
  }
}
