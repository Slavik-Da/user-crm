import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/users.entity";
import { DeleteResult } from "typeorm";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.register(newUser);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(":userId")
  getById(@Param("userId") userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Delete(":userId")
  deleteById(@Param("userId") userId: string): Promise<DeleteResult> {
    return this.usersService.deleteById(userId);
  }
}
