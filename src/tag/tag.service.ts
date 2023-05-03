import { Injectable } from "@nestjs/common";
@Injectable()
export class TagService {
  async createUserTag(userIdFromJWT: string, userIdFromParams: string,name: string, color: string) {
    return {name, color, userIdFromJWT}
  }

}
