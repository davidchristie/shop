import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from "@nestjs/common";
import { Public } from "../auth/public.decorator.js";
import { ProductWithVariants, ProductsService } from "./products.service.js";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  featuredImage: {
    url: string;
  };
  images: {
    url: string;
  }[];
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
    return products.map(this.formatProduct);
  }

  @Get(":productId")
  @Public()
  public async getProduct(
    @Param("productId") productId: string,
  ): Promise<Product> {
    const product = await this.productsService.findOne({
      id: productId,
    });
    if (product === null) {
      throw new NotFoundException(`Product not found: ${productId}`);
    }
    return this.formatProduct(product);
  }

  private formatProduct(product: ProductWithVariants): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      featuredImage: {
        url: product.image.url,
      },
      images: [
        {
          url: product.image.url,
        },
      ],
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
    };
  }
}
