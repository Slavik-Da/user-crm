import {
  Entity,
  Column,
  OneToMany, ManyToMany, JoinTable
} from "typeorm";
import { HashedRefreshToken } from "../../auth/entities/refreshTokens.entity";
import { BaseEntity } from "../../common/entities/baseEntity";
import { Exclude } from "class-transformer";
import { Order } from "../../order/entities/order.entity";
import { Tag } from "../../tag/entities/tag.entity";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  hashedPassword: string;

  @OneToMany(
    () => HashedRefreshToken,
    (hashedRefreshToken) => hashedRefreshToken.user,
    { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  hashedRefreshToken: HashedRefreshToken[];

  @OneToMany(() => Order, order => order.user, {eager: true})
  orders: Order[];

  @ManyToMany(() => Tag, tag => tag.users, {eager: true, cascade: true})
  @JoinTable()
  tags: Tag[];
}
