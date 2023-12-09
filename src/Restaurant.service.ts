import { Injectable, OnModuleInit } from '@nestjs/common';
import { Restaurant } from './Restaurant';
import { RestaurantDTO } from './RestaurantDTO';
//import { promises as fs } from 'fs';
import { HttpService } from '@nestjs/axios';
import {  firstValueFrom, map, tap } from 'rxjs';


@Injectable()
export class RestaurantService implements OnModuleInit {
    //Déclaration d'une Map pour stocker les restaurants.
    private restaurants = new Map<string, Restaurant>();
    private favorites: Set<string> = new Set(); // Utilisation d'un Set pour optimiser les recherches

    constructor(private readonly httpService: HttpService) {}

    // Méthode pour charger les restaurants depuis le fichier JSON ou le lien
    async onModuleInit() {
        await this.loadRestaurantsFromServer();
        console.log(`Storage contains ${this.restaurants.size} restaurants`);
    }
    // Méthode pour charger les restaurants depuis le lien avec seulement 300 restaurants
    private async loadRestaurantsFromServer(): Promise<void> {
        let start = 0;
        const limit = 100; // Nombre de restaurants par page
        let totalRestaurantsToLoad = 200; // Nombre total de restaurants à charger

        do {
            const url = `https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/234400034_070-008_offre-touristique-restaurants-rpdl@paysdelaloire/records?start=${start}&limit=${limit}`;
            await firstValueFrom(
                this.httpService.get(url).pipe(
                    map(response => {
                        if (response.data && response.data.results) {
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
        } while (this.restaurants.size < totalRestaurantsToLoad);

        console.log(`Total de restaurants chargés: ${this.restaurants.size}`);
    }

/*  // Méthode pour charger les restaurants depuis le lien avec tous les restaurants (3000 restaurants)
    // Nous avons du limité le nombre de restaurant car sur l'appli nous avions de sproblèmes d mémoire

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
    */

    //Méthode pour avoir une adresse complète
    private computeCompleteAddress(data: any): string {
        return data.adresse1 || data.adresse2 || data.adresse3;
    }
    //Méthode pour avoir les restaurants
    findAll(): Restaurant[] {
        return Array.from(this.restaurants.values());
    }
    //Méthode pour avoir les restaurants par ville et code postal
    findByCityAndPostalCode(commune: string, codepostal: number): Restaurant[] {
        return Array.from(this.restaurants.values()).filter(restaurant =>
            restaurant.commune === commune && restaurant.codepostal === codepostal
        );
    }
    //Méthode pour avoir les restaurants par nom
    findByName(nomoffre: string): Restaurant | undefined {
        return this.restaurants.get(nomoffre);
    }
    //Méthode pour ajouter un restaurant
    addRestaurant(restaurant: Restaurant): string {
        this.restaurants.set(restaurant.nomoffre, restaurant);
        return 'Restaurant ajouté avec succès';
    }
    //Méthode pour supprimer un restaurant
    deleteRestaurant(nomoffre: string): string {
        if (this.restaurants.has(nomoffre)) {
            this.restaurants.delete(nomoffre);
            return 'Restaurant supprimé avec succès';
        } else {
            return 'Restaurant non trouvé';
        }
    }
    //Méthode pour ajouter un restaurant aux favoris
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
    //Méthode pour supprimer un restaurant des favoris
    removeFavorite(restaurantId: string): string {
        if (this.favorites.has(restaurantId)) {
            this.favorites.delete(restaurantId);
            return 'Restaurant retiré des favoris';
        }
        return 'Restaurant non trouvé dans les favoris';
    }
    //Méthode pour avoir les restaurants favoris
    getFavorites(): Restaurant[] {
        return Array.from(this.favorites).map(favorite => this.restaurants.get(favorite));
    }
}
