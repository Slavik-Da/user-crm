import {
  Entity,
  Column, Index, ManyToMany
} from "typeorm";
import { BaseEntity } from "../../common/entities/baseEntity";
import { User } from "../../users/entities/users.entity";

@Entity()
@Index(["name", "color"], { unique: true })
export class Tag extends BaseEntity {
  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToMany(() => User, user => user.tags)
  users: User[];
}
