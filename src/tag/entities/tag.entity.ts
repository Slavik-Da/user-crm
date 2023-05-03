import {
  Entity,
  Column, Index
} from "typeorm";
import { BaseEntity } from "../../common/entities/baseEntity";

@Entity()
@Index(["name", "color"], { unique: true })
export class Tag extends BaseEntity {
  @Column()
  name: string;

  @Column()
  color: string;

}
