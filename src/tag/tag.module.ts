import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { TagDAO } from "./dao/tagDAO";
import { UsersDAO } from "../users/dao/usersDAO";
import { User } from "../users/entities/users.entity";

@Module({
  controllers: [TagController],
  providers: [TagService, TagDAO, UsersDAO],
  imports: [TypeOrmModule.forFeature([Tag, User])],
  exports: [],
})
export class TagModule {}
