import { Product } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";

@Injectable()
export class ProductsService {
  public constructor(private readonly prismaService: PrismaService) {}

  public findMany(input: {
    limit?: number;
    offset?: number;
  }): Promise<Product[]> {
    return this.prismaService.product.findMany({
      skip: input.offset,
      take: input.limit,
    });
  }
}
