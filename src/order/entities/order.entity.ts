import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/entities/baseEntity";
import { User } from "../../users/entities/users.entity";

@Entity()
export class Order extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, user => user.orders)
  user: User;
}
