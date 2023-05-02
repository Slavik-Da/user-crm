import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { validateEnv } from "../validateEnv";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get("PORT") || 5000;
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(PORT);

  console.log('yoyo! Server started on port ', PORT)
}
bootstrap();
