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

  async saveTag(tag: Tag): Promise<Tag> {
    return await this.tagRepository.save(tag)
  }

  async findTagByNameAndColor(tag: CreateTagDto): Promise<Tag | null> {
    return await this.tagRepository.findOneBy({name: tag.name, color: tag.color})
  }

}
