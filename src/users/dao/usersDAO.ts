import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { SaveUserDto } from "../dto/save-user.dto";
import { User } from "../entities/users.entity";

@Injectable()
export class UsersDAO {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  getUserByEmail(userEmail: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ email: userEmail });
  }

  saveUser(user: SaveUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  findUserById(userId: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ id: userId });
  }
}
