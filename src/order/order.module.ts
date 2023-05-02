import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/users.entity";
import { Order } from "./entities/order.entity";
import { OrderService } from "./order.service";
import { UsersDAO } from "../users/dao/usersDAO";
import { OrderDAO } from "./dao/orderDAO";

@Module({
  controllers: [OrderController],
  providers: [OrderService, UsersDAO, OrderDAO],
  imports: [TypeOrmModule.forFeature([Order,User])],
  exports: [],
})
export class OrderModule {}
