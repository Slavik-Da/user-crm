import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { OrderModule } from "./order/order.module";
import { TagModule } from "./tag/tag.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    OrderModule,
    TagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
