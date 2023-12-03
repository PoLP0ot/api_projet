import { Injectable, OnModuleInit } from '@nestjs/common';
import { Restaurant } from './Restaurant';
import { promises as fs } from 'fs';

@Injectable()
export class RestaurantService implements OnModuleInit {
    private restaurants: Array<Restaurant> = [];
    private favorites: Array<String> = []; // Liste des noms de restaurants favoris
    async onModuleInit() {
        await this.loadRestaurantsFromFile();
        console.log(`Storage contains ${this.restaurants.length} restaurants`);
    }

    private async loadRestaurantsFromFile() {
        try {
            const data = await fs.readFile('src/dataset.json', 'utf-8');
            const restaurantsData: Array<any> = JSON.parse(data);
            this.restaurants = restaurantsData.map(restaurantData => new Restaurant(restaurantData));
        } catch (error) {
            console.error('Erreur lors du chargement des données des restaurants:', error);
        }
    }

    // Récupère tous les restaurants
    findAll(): Restaurant[] {
        return this.restaurants;
    }

    // Récupère les restaurants par ville et code postal
    findByCityAndPostalCode(city: string, postalCode: number): Restaurant[] {
        return this.restaurants.filter(restaurant =>
            restaurant.commune === city && restaurant.codepostal === postalCode
        );
    }

    // Récupère un restaurant par nom
    findByName(name: string): Restaurant | undefined {
        return this.restaurants.find(restaurant =>
            restaurant.nomoffre.toLowerCase() === name.toLowerCase()
        );
    }

    addRestaurant(restaurant: Restaurant): string {
        this.restaurants.push(restaurant);
        return 'Restaurant ajouté avec succès';
    }

    deleteRestaurant(name: string): string {
        const index = this.restaurants.findIndex(r => r.nomoffre.toLowerCase() === name.toLowerCase());
        if (index > -1) {
            this.restaurants.splice(index, 1);
            return 'Restaurant supprimé avec succès';
        } else {
            return 'Restaurant non trouvé';
        }
    }



    addFavorite(nomOffre: string): string {
        const restaurantExists = this.restaurants.some(restaurant => restaurant.nomoffre === nomOffre);
        if (!restaurantExists) {
            return 'Restaurant non trouvé';
        }
        if (!this.favorites.includes(nomOffre)) {
            this.favorites.push(nomOffre);
            return 'Restaurant ajouté aux favoris';
        }
        return 'Restaurant déjà en favoris';
    }

    removeFavorite(restaurantId: string): string {
        const index = this.favorites.indexOf(restaurantId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            return 'Restaurant retiré des favoris';
        }
        return 'Restaurant non trouvé dans les favoris';
    }

    getFavorites(): Restaurant[] {
        return this.restaurants.filter(restaurant => this.favorites.includes(restaurant.nomoffre));
    }


}
