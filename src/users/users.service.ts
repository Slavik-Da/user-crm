import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { HashedRefreshToken } from "../auth/entities/refreshTokens.entity";
import { CreateUserDto } from "./dto/create-user.dto";
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
    const user: User = await this.usersDAO.getUserByEmail(newUser.email);
    if (user) {
      throw new HttpException("User exists", HttpStatus.CONFLICT);
    }
    const hashedPass = await hashData(newUser.password);

    await this.usersDAO.saveUser({
      email: newUser.email,
      hashedPassword: hashedPass,
    });

    return this.usersDAO.getUserByEmail(newUser.email);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
