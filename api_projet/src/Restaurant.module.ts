import { Controller, Get, Query, Param } from '@nestjs/common';
import { RestaurantService } from './Restaurant.service';
import { Restaurant } from './Restaurant';
@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Get()
    getAllRestaurants(): Restaurant[] {
        return this.restaurantService.findAll();
    }

    @Get('/by-city')
    getRestaurantsByCity(
        @Query('city') city: string,
        @Query('postalCode') postalCode: number
    ): Restaurant[] {
        return this.restaurantService.findByCityAndPostalCode(city, postalCode);
    }

    @Get('/by-name/:name')
    getRestaurantByName(@Param('name') name: string): Restaurant | undefined {
        return this.restaurantService.findByName(name);
    }
}
