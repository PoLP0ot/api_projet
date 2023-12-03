import { Module } from '@nestjs/common';
import { RestaurantService } from './Restaurant.service';
import { RestaurantController } from './Restaurant.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [RestaurantController],
    providers: [RestaurantService],
})
export class RestaurantModule {}



