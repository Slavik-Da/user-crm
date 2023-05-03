import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { DeleteResult } from "typeorm";
import { Order } from "../entities/order.entity";
import type { CreateOrderDto } from "../dto/create-order.dto";

@Injectable()
export class OrderDAO {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>
  ) {}

  createOrder(order: CreateOrderDto ): Order {
    return this.orderRepository.create(order);
  }

  async findOwnOrderById(userId: string, orderId: string): Promise<Order> {
    return await this.orderRepository.findOneByOrFail({id: orderId, user: {id: userId}})
  }

  async deleteOrderById(id: string): Promise<DeleteResult>  {
    return await this.orderRepository.delete({id})
  }

  async saveOrder(order: CreateOrderDto ): Promise<Order> {
    return await this.orderRepository.save(order);
  }
}
