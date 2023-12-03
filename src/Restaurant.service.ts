import { Injectable, OnModuleInit } from '@nestjs/common';
import { Restaurant } from './Restaurant';
//import { promises as fs } from 'fs';
import { HttpService } from '@nestjs/axios';
import {  firstValueFrom, map, tap } from 'rxjs';
@Injectable()
export class RestaurantService implements OnModuleInit {
    private restaurants: Array<Restaurant> = [];
    private favorites: Array<String> = []; // Liste des noms de restaurants favoris
    constructor(private readonly httpService: HttpService) {}
    async onModuleInit() {
        //await this.loadRestaurantsFromFile();
        await this.loadRestaurantsFromServer();
        console.log(`Storage contains ${this.restaurants.length} restaurants`);
    }

   /* private async loadRestaurantsFromFile() {
        try {
            const data = await fs.readFile('src/dataset.json', 'utf-8');
            const restaurantsData: Array<any> = JSON.parse(data);
            this.restaurants = restaurantsData.map(restaurantData => new Restaurant(restaurantData));
        } catch (error) {
            console.error('Erreur lors du chargement des données des restaurants:', error);
        }
    }*/

    private async loadRestaurantsFromServer(): Promise<void> {
        return firstValueFrom(
            this.httpService.get('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/234400034_070-008_offre-touristique-restaurants-rpdl@paysdelaloire/records?limit=20').pipe(
                map(response => response.data),
                tap((restaurants: any[]) => {
                    restaurants.forEach(restaurantData => {
                        const restaurant = new Restaurant({
                            nomoffre: restaurantData.nomoffre,
                            type: restaurantData.type,
                            categorie: restaurantData.categorie,
                            adresse1: restaurantData.adresse1,
                            adresse2: restaurantData.adresse2,
                            adresse3: restaurantData.adresse3,
                            codepostal: restaurantData.codepostal,
                            commune: restaurantData.commune,
                            latitude: restaurantData.latitude,
                            longitude: restaurantData.longitude,
                            commtel: restaurantData.commtel,
                            commmail: restaurantData.commmail,
                            commweb: restaurantData.commweb,
                            videosurl: restaurantData.videosurl,
                            plateformeurl: restaurantData.plateformeurl,
                            languesparleesaccueil: restaurantData.languesparleesaccueil,
                            accueilgroupe: restaurantData.accueilgroupe,
                            tarifs: restaurantData.tarifs,
                            modepaiement: restaurantData.modepaiement,
                            adresseComplete: this.computeCompleteAddress(restaurantData)
                            // Ajoutez d'autres champs si nécessaire
                        });
                        this.addRestaurant(restaurant);
                    });
                }),
                map(() => undefined),
            ),
        );
    }

    private computeCompleteAddress(data: any): string {
        // Retourne 'adresse1' si elle n'est pas vide, sinon 'adresse2'
        return data.adresse1 || data.adresse2;
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
