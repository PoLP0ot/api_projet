import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { RestaurantService } from './Restaurant.service';
import { Restaurant } from './Restaurant';

@Controller('restaurant')
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) {}
    // Méthode GET pour récupérer tous les restaurants.
    @Get()
    getAllRestaurants(): Restaurant[] {
        return this.restaurantService.findAll();
    }
    //Méthode POST pour ajouter un restaurant.
    @Post()
    addRestaurant(@Body() restaurant: Restaurant): string {
        return this.restaurantService.addRestaurant(restaurant);
    }
    // Méthode DELETE pour supprimer un restaurant.
    @Delete('/:nomoffre')
    deleteRestaurant(@Param('nomoffre') nomoffre: string): string {
        return this.restaurantService.deleteRestaurant(nomoffre);
    }
    // Méthode GET pour récupérer les restaurants favoris.
    @Post('favorites/:nomoffre')
    addFavorite(@Param('nomoffre') nomoffre: string): string {
        return this.restaurantService.addFavorite(nomoffre);
    }
    // Méthode DELETE pour supprimer un restaurant des favoris.
    @Delete('favorites/:nomoffre')
    removeFavorite(@Param('nomoffre') nomoffre: string): string {
        return this.restaurantService.removeFavorite(nomoffre);
    }
    // Méthode GET pour récupérer les restaurants favoris.
    @Get('favorites')
    getFavorites(): Restaurant[] {
        return this.restaurantService.getFavorites();
    }
    // Méthode GET pour récupérer les restaurants par ville et code postal.
    @Get('/commune')
    getRestaurantsByCity(
        @Query('commune') commune: string,
        @Query('codepostal') postalCode: number
    ): Restaurant[] {
        return this.restaurantService.findByCityAndPostalCode(commune, postalCode);
    }
    // Méthode GET pour récupérer les restaurants par nom.
    @Get('/nomoffre/:nomoffre')
    getRestaurantByName(@Param('nomoffre') nomoffre: string): Restaurant | undefined {
        return this.restaurantService.findByName(nomoffre);
    }
}