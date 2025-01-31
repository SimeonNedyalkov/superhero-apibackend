import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 3000;
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? PORT);
    console.log(`App ready to use on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
