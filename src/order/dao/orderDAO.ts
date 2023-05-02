import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { CreateOrderDto } from "../dto/create-order.dto";

@Injectable()
export class OrderDAO {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  createOrder(order: CreateOrderDto ): Order {
    return this.orderRepository.create(order);
  }

  findOwnOrderById(userId: string, orderId: string): Promise<Order> {
    return this.orderRepository.findOneBy({id: orderId, user: {id: userId}})
  }

  deleteOrderById(id: string): Promise<DeleteResult>  {
    return this.orderRepository.delete({id})
  }

  saveOrder(order: CreateOrderDto ): Promise<Order> {
    return this.orderRepository.save(order);
  }
}
