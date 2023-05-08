import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TagDAO } from "./dao/tagDAO";
import { UsersDAO } from "../users/dao/usersDAO";
import type { Tag } from "./entities/tag.entity";
@Injectable()
export class TagService {
  constructor(
    private readonly tagDAO: TagDAO,
    private readonly userDAO: UsersDAO
  ) {}

  async addUserTag(userIdFromJWT: string, userIdFromParams: string,name: string, color: string): Promise<Tag> {
    if (userIdFromJWT !==userIdFromParams) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    const user= await this.userDAO.findUserById(userIdFromParams)
    if(!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    let tag = await this.tagDAO.findTagByNameAndColor({name, color})
    if (!tag) {
      const newTag =  this.tagDAO.createTag({name, color})
      tag = await this.tagDAO.saveTag(newTag)
    }
    user.tags.push(tag)
    await this.userDAO.saveUser(user)
    return tag
  }

}
