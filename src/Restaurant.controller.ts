import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
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

    @Delete('/:nomoffre')
    deleteRestaurant(@Param('nomoffre') nomoffre: string): string {
        return this.restaurantService.deleteRestaurant(nomoffre);
    }

    @Post('favorites/:nomoffre')
    addFavorite(@Param('nomoffre') nomoffre: string): string {
        return this.restaurantService.addFavorite(nomoffre);
    }

    @Delete('favorites/:nomoffre')
    removeFavorite(@Param('nomoffre') nomoffre: string): string {
        return this.restaurantService.removeFavorite(nomoffre);
    }

    @Get('favorites')
    getFavorites(): Restaurant[] {
        return this.restaurantService.getFavorites();
    }

    @Get('/commune')
    getRestaurantsByCity(
        @Query('commune') commune: string,
        @Query('codepostal') postalCode: number
    ): Restaurant[] {
        return this.restaurantService.findByCityAndPostalCode(commune, postalCode);
    }

    @Get('/nomoffre/:nomoffre')
    getRestaurantByName(@Param('nomoffre') nomoffre: string): Restaurant | undefined {
        return this.restaurantService.findByName(nomoffre);
    }
}