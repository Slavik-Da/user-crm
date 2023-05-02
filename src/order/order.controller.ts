import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entities/order.entity";
import { AuthGuard } from "@nestjs/passport";
import { UserDecorator } from "../auth/decorators/user.decorator";
import { JwtPayload } from "../types";
import { DeleteResult } from "typeorm";

@Controller("users/orders")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.CREATED)
  createOrder(
    @Body() newOrder: CreateOrderDto,
    @UserDecorator() user: JwtPayload,
  ): Promise<Order> {
    return this.orderService.createOrder(newOrder.name, user.sub);
  }

  @Delete(":orderId")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.CREATED)
  deleteOrder(
    @Body() newOrder: CreateOrderDto,
    @UserDecorator() user: JwtPayload,
    @Param("orderId") orderId: string
  ): Promise<DeleteResult> {
    return this.orderService.deleteOrder(user.sub, orderId);
  }

  @Put(":orderId")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.CREATED)
  updateOrder(
    @Body() newOrder: CreateOrderDto,
    @UserDecorator() user: JwtPayload,
    @Param("orderId") orderId: string
  ): Promise<Order> {
    return this.orderService.updateOrder(user.sub, orderId, newOrder.name );
  }
}
