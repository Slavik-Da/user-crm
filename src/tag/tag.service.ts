import { Injectable } from "@nestjs/common";
@Injectable()
export class TagService {
  async addUserTag(userIdFromJWT: string, userIdFromParams: string,name: string, color: string) {
    return {name, color, userIdFromJWT}
  }

}
