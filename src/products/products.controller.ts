import { Controller, Get, Query } from "@nestjs/common";
import { Public } from "../auth/public.decorator.js";
import { ProductsService } from "./products.service.js";

@Controller("api/v1/products")
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  public async getProducts(
    @Query("limit") limit?: string,
    @Query("offset") offset?: string,
  ) {
    const products = await this.productsService.findMany({
      limit: limit ? Number(limit) : 100,
      offset: offset ? Number(offset) : undefined,
    });
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      variants: product.variants.map((variant) => ({
        id: variant.id,
        name: variant.id,
        price: variant.price,
      })),
    }));
  }
}
