import {Controller, Get, Post, Delete, Body, Param, Query} from '@nestjs/common';
import { RestaurantService } from './Restaurant.service';
import { Restaurant } from './Restaurant';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Get()
    getAllRestaurants(): Restaurant[] {
        return this.restaurantService.findAll();
    }

    @Post()
    addRestaurant(@Body() restaurant: Restaurant): string {
        return this.restaurantService.addRestaurant(restaurant);
    }

    @Delete('/:name')
    deleteRestaurant(@Param('name') name: string): string {
        return this.restaurantService.deleteRestaurant(name);
    }

    @Post('favorites/:restaurantId')
    addFavorite(@Param('restaurantId') restaurantId: string): string {
        return this.restaurantService.addFavorite(restaurantId);
    }

    @Delete('favorites/:restaurantId')
    removeFavorite(@Param('restaurantId') restaurantId: string): string {
        return this.restaurantService.removeFavorite(restaurantId);
    }

    @Get('favorites')
    getFavorites(): Restaurant[] {
        return this.restaurantService.getFavorites();
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

