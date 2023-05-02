import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { HashedRefreshToken } from "../auth/entities/refreshTokens.entity";
import { UsersDAO } from "./dao/usersDAO";
import { Order } from "../order/entities/order.entity";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersDAO],
  imports: [TypeOrmModule.forFeature([User, HashedRefreshToken, Order])],
  exports: [UsersService],
})
export class UsersModule {}
