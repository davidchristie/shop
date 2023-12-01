import { Controller, Get, Query } from "@nestjs/common";
import { Public } from "../auth/public.decorator.js";
import { ProductsService } from "./products.service.js";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  priceRange: {
    maxVariantPrice: {
      amount: string;
    };
    minVariantPrice: {
      amount: string;
    };
  };
  variants: {
    id: string;
    name: string;
    price: {
      amount: string;
    };
  }[];
};

@Controller("api/v1/products")
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  public async getProducts(
    @Query("limit") limit?: string,
    @Query("offset") offset?: string,
  ): Promise<Product[]> {
    const products = await this.productsService.findMany({
      limit: limit ? Number(limit) : 100,
      offset: offset ? Number(offset) : undefined,
    });
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      priceRange: {
        maxVariantPrice: {
          amount:
            product.variants.length > 0
              ? Math.max(
                  ...product.variants.map((variant) => variant.price),
                ).toFixed(2)
              : "0.00",
        },
        minVariantPrice: {
          amount:
            product.variants.length > 0
              ? Math.min(
                  ...product.variants.map((variant) => variant.price),
                ).toFixed(2)
              : "0.00",
        },
      },
      variants: product.variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        price: {
          amount: variant.price.toFixed(2),
        },
      })),
    }));
  }
}
