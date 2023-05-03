import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserDecorator } from "../auth/decorators/user.decorator";
import { JwtPayload } from "../types";
import { TagService } from "./tag.service";

@Controller()
export class TagController {
  constructor(
    private readonly tagService: TagService
  ) {}

  @Post("users/:userId/tags")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.CREATED)
  async createUserTag(
    @Body() newTag,
    @UserDecorator() user: JwtPayload,
    @Param("userId") userId: string
  ) {
    return await this.tagService.addUserTag(user.sub, userId, newTag.name, newTag.color);
  }

}
