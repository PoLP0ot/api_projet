// Importation
import { NestFactory } from '@nestjs/core';
import { RestaurantModule } from './Restaurant.module';
import { ValidationPipe } from '@nestjs/common';

//fonction principale du serveur.
async function bootstrap() {
    //Instance de l'application NestJS
    const app = await NestFactory.create(RestaurantModule);

    // Configuration d'un ValidationPipe global pour l'application.
    app.useGlobalPipes(new ValidationPipe());

    // Récupération du port sur lequel l'application doit écouter.
    const port = process.env.PORT ?? 3000;

    // Démarrage de l'application sur le port récupéré.
    await app.listen(port);

    // Affichage dans la console de l'URL sur laquelle l'application est accessible.
    console.log(`Application is running on: ${await app.getUrl()}`);
}
// Appel de la fonction principale.
bootstrap();
