import { NestFactory } from '@nestjs/core';
import { RestaurantModule } from './restaurant.module';
import { ValidationPipe } from '@nestjs/common';

//fichier main
async function bootstrap() {
    const app = await NestFactory.create(RestaurantModule);
    app.useGlobalPipes(new ValidationPipe());
    const port = process.env.PORT ?? 3000;

    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();