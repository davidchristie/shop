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
      include: {
        image: true,
        variants: true,
      },
      skip: input.offset,
      take: input.limit,
    });
  }
}
