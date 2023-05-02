import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersDAO } from "../users/dao/usersDAO";
import { OrderDAO } from "./dao/orderDAO";
import { Order } from "./entities/order.entity";
import { DeleteResult } from "typeorm";


@Injectable()
export class OrderService {
  constructor(
    private usersDAO: UsersDAO,
    private orderDAO: OrderDAO
  ) {}

  async createOrder(name: string, currentUserId: string) {
    const currentUser = await this.usersDAO.findUserById(currentUserId)
    if(!currentUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const currentOrder = await this.orderDAO.saveOrder({name})
    currentUser.orders.push(currentOrder)
    await this.usersDAO.saveUser(currentUser)
    return currentOrder
  }

  async updateOrder(userId: string, orderId: string, newOrderName: string): Promise<Order> {
    const currentOrder = await this.orderDAO.findOwnOrderById(userId, orderId)
    if (!currentOrder) {
      throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
    }
    currentOrder.name = newOrderName
    return this.orderDAO.saveOrder(currentOrder)
  }

  async deleteOrder(userId: string, orderId: string): Promise<DeleteResult> {
    const currentOrder = await this.orderDAO.findOwnOrderById(userId, orderId)
    if (!currentOrder) {
      throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
    }
    return this.orderDAO.deleteOrderById(currentOrder.id)
  }

}
