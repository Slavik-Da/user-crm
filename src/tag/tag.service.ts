import { Injectable } from "@nestjs/common";
@Injectable()
export class TagService {
  async createTag(name: string, color: string) {
    return {name, color}
  }

}
