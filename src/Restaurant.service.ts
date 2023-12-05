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
        let start = 0;
        const limit = 100; // Nombre de restaurants par page
        let total = 0;

        do {
            const url = `https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/234400034_070-008_offre-touristique-restaurants-rpdl@paysdelaloire/records?start=${start}&limit=${limit}`;
            await firstValueFrom(
                this.httpService.get(url).pipe(
                    map(response => {
                        if (response.data && response.data.results) {
                            if (total === 0) {
                                total = response.data.total_count;
                            }
                            return response.data.results.map(record => {
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
                            console.error('Données inattendues de l\'API:', response);
                            return [];
                        }
                    }),
                    tap((restaurants: RestaurantDTO[]) => {
                        restaurants.forEach(restaurantData => {
                            const restaurant = new Restaurant(restaurantData);
                            this.addRestaurant(restaurant);
                        });
                    })
                )
            );

            start += limit;
        } while (start < total);

        console.log(`Total de restaurants chargés: ${this.restaurants.size}`);
    }

    private computeCompleteAddress(data: any): string {
        return data.adresse1 || data.adresse2 || data.adresse3;
    }

    findAll(): Restaurant[] {
        return Array.from(this.restaurants.values());
    }

    findByCityAndPostalCode(commune: string, codepostal: number): Restaurant[] {
        return Array.from(this.restaurants.values()).filter(restaurant =>
            restaurant.commune === commune && restaurant.codepostal === codepostal
        );
    }

    findByName(nomoffre: string): Restaurant | undefined {
        return this.restaurants.get(nomoffre);
    }

    addRestaurant(restaurant: Restaurant): string {
        this.restaurants.set(restaurant.nomoffre, restaurant);
        return 'Restaurant ajouté avec succès';
    }

    deleteRestaurant(nomoffre: string): string {
        if (this.restaurants.has(nomoffre)) {
            this.restaurants.delete(nomoffre);
            return 'Restaurant supprimé avec succès';
        } else {
            return 'Restaurant non trouvé';
        }
    }

    addFavorite(nomoffre: string): string {
        if (!this.restaurants.has(nomoffre)) {
            return 'Restaurant non trouvé';
        }
        if (!this.favorites.has(nomoffre)) {
            this.favorites.add(nomoffre);
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
