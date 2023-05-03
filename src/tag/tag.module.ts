import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [],
  exports: [],
})
export class TagModule {}
