import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { DeleteResult } from "typeorm";
import { HashedRefreshToken } from "../auth/entities/refreshTokens.entity";
import type { CreateUserDto } from "./dto/create-user.dto";
import { UsersDAO } from "./dao/usersDAO";
import { hashData } from "../common/libs/hashData";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    @InjectRepository(HashedRefreshToken)
    public hashedRefreshTokenRepository: Repository<HashedRefreshToken>,
    public usersDAO: UsersDAO,
  ) {}

  async register(newUser: CreateUserDto): Promise<User> {
    const user: User | null = await this.usersDAO.getUserByEmail(newUser.email);
    if (user) {
      throw new HttpException("User exists", HttpStatus.CONFLICT);
    }
    const hashedPass = await hashData(newUser.password);

    return await this.usersDAO.saveUser({
      email: newUser.email,
      hashedPassword: hashedPass,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
