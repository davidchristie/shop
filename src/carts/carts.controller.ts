import { Controller, Get, Request } from "@nestjs/common";
import { CartsService } from "./carts.service.js";

@Controller("api/v1")
export class CartsController {
  public constructor(private readonly cartsService: CartsService) {}

  @Get("cart")
  public async getCart(@Request() request: any) {
    const cart = await this.cartsService.getCurrentCart({
      userId: request.user.id,
    });
    return cart !== null
      ? {
          id: cart.id,
          cartLines:
            cart?.cartLines.map((cartLine) => ({
              id: cartLine.id,
              product: {
                id: cartLine.variant.product.id,
                name: cartLine.variant.product.name,
                variant: {
                  id: cartLine.variant.id,
                  name: cartLine.variant.name,
                },
              },
            })) ?? [],
        }
      : null;
  }
}
