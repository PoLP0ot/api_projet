import { Injectable, OnModuleInit } from '@nestjs/common';
import { Restaurant } from './Restaurant';
import { RestaurantDTO } from './RestaurantDTO';
//import { promises as fs } from 'fs';
import { HttpService } from '@nestjs/axios';
import {  firstValueFrom, map, tap } from 'rxjs';


@Injectable()
export class RestaurantService implements OnModuleInit {
    private restaurants = new Map<string, Restaurant>();
    private favorites: Set<string> = new Set(); // Utilisation d'un Set pour optimiser les recherches

    constructor(private readonly httpService: HttpService) {}

    async onModuleInit() {
        await this.loadRestaurantsFromServer();
        console.log(`Storage contains ${this.restaurants.size} restaurants`);
    }



    private async loadRestaurantsFromServer(): Promise<void> {
        return firstValueFrom(
            this.httpService.get('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/234400034_070-008_offre-touristique-restaurants-rpdl@paysdelaloire/records?limit=20').pipe(
                map(response => {
                    // Vérification de l'existence de response.data et response.data.results
                    if (response.data && response.data.results) {
                        console.log(`Total de restaurants disponibles: ${response.data.total_count}`);
                        return response.data.results.map(record => {
                            // Création d'un objet RestaurantDTO à partir de chaque enregistrement
                            const restaurantData: RestaurantDTO = {

                                nomoffre: record.nomoffre,
                                type: record.type,
                                categorie: record.categorie,
                                adresse1: record.adresse1,
                                adresse2: record.adresse2,
                                adresse3: record.adresse3,
                                codepostal: record.codepostal,
                                cedex: record.cedex,
                                spbureaudistributeur: record.spbureaudistributeur,
                                commune: record.commune,
                                codeinseecommune: record.codeinseecommune,
                                latitude: record.latitude,
                                longitude: record.longitude,
                                acces: record.acces,
                                commmob: record.commmob,
                                commtel: record.commtel,
                                commfax: record.commfax,
                                commmail: record.commmail,
                                commweb: record.commweb,
                                videosurl: record.videosurl,
                                plateformeurl: record.plateformeurl,
                                tripadwidget: record.tripadwidget,
                                spvideosembed: record.spvideosembed,
                                classementguides: record.classementguides,
                                labelsclassementlogis: record.labelsclassementlogis,
                                labeltourismehandicap: record.labeltourismehandicap,
                                animauxacceptes: record.animauxacceptes,
                                animauxinfo: record.animauxinfo,
                                labels: record.labels,
                                services: record.services,
                                capacitenbcouverts: record.capacitenbcouverts,
                                capacitenbsalles: record.capacitenbsalles,
                                capacitenbcouvertsterrasse: record.capacitenbcouvertsterrasse,
                                capacitenbsallesreunion: record.capacitenbsallesreunion,
                                capacitenbsallesclim: record.capacitenbsallesclim,
                                spaccueilveloiti: record.spaccueilveloiti,
                                languesparleesaccueil: record.languesparleesaccueil,
                                accueilgroupe: record.accueilgroupe,
                                accueilgroupemin: record.accueilgroupemin,
                                accueilgroupemax: record.accueilgroupemax,
                                ouverturealannee: record.ouverturealannee,
                                ouverturegranule: record.ouverturegranule,
                                resadirecte: record.resadirecte,
                                resaenligneouinon: record.resaenligneouinon,
                                resaenligne: record.resaenligne,
                                tarifs: record.tarifs,
                                modepaiement: record.modepaiement,
                                localisation: record.localisation,
                                departement: record.departement,
                            };
                            return restaurantData;
                        });
                    } else {
                        // Gérer le cas où response.data.results est undefined ou n'a pas la structure attendue
                        console.error('Données inattendues de l\'API:', response);
                        return [];
                    }
                }),
                tap((restaurants: RestaurantDTO[]) => {
                    restaurants.forEach(restaurantData => {
                        const restaurant = new Restaurant(restaurantData);
                        this.addRestaurant(restaurant);
                    });
                }),
                map(() => undefined),
            ),
        );
    }

    private computeCompleteAddress(data: any): string {
        return data.adresse1 || data.adresse2 || data.adresse3;
    }

    findAll(): Restaurant[] {
        return Array.from(this.restaurants.values());
    }

    findByCityAndPostalCode(city: string, postalCode: number): Restaurant[] {
        return Array.from(this.restaurants.values()).filter(restaurant =>
            restaurant.commune === city && restaurant.codepostal === postalCode
        );
    }

    findByName(name: string): Restaurant | undefined {
        return this.restaurants.get(name);
    }

    addRestaurant(restaurant: Restaurant): string {
        this.restaurants.set(restaurant.nomoffre, restaurant);
        return 'Restaurant ajouté avec succès';
    }

    deleteRestaurant(name: string): string {
        if (this.restaurants.has(name)) {
            this.restaurants.delete(name);
            return 'Restaurant supprimé avec succès';
        } else {
            return 'Restaurant non trouvé';
        }
    }

    addFavorite(nomOffre: string): string {
        if (!this.restaurants.has(nomOffre)) {
            return 'Restaurant non trouvé';
        }
        if (!this.favorites.has(nomOffre)) {
            this.favorites.add(nomOffre);
            return 'Restaurant ajouté aux favoris';
        }
        return 'Restaurant déjà en favoris';
    }

    removeFavorite(restaurantId: string): string {
        if (this.favorites.has(restaurantId)) {
            this.favorites.delete(restaurantId);
            return 'Restaurant retiré des favoris';
        }
        return 'Restaurant non trouvé dans les favoris';
    }

    getFavorites(): Restaurant[] {
        return Array.from(this.favorites).map(favorite => this.restaurants.get(favorite));
    }
}
