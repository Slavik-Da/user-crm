import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../entities/tag.entity";
import type { CreateTagDto } from "../dto/create-tag.dto";


@Injectable()
export class TagDAO {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>
  ) {}

  createTag(tag: CreateTagDto ): Tag {
    return this.tagRepository.create(tag);
  }


}
