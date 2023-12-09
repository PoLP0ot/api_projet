import { Module } from '@nestjs/common';
import { RestaurantService } from './Restaurant.service';
import { RestaurantController } from './Restaurant.controller';
import { HttpModule } from '@nestjs/axios';
// Module Restaurant
@Module({
    // Importation du module HttpModule pour pouvoir faire des requêtes HTTP.
    imports: [HttpModule],
    // Déclaration des controllers et des services.
    controllers: [RestaurantController],
    providers: [RestaurantService],
})
export class RestaurantModule {}



