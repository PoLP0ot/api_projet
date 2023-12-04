import { IsString, IsNotEmpty, IsOptional,  IsLatitude, IsLongitude, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { RestaurantDTO } from './RestaurantDTO';

export class Restaurant {
    @IsNotEmpty()
    @IsString()
    nomoffre: string;

    @IsOptional()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    categorie: string;

    @IsOptional()
    @IsString()
    adresse1: string;

    @IsOptional()
    @IsString()
    adresse2: string;

    @IsOptional()
    @IsString()
    adresse3: string;

    adressecomplete: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    codepostal: number;

    @IsOptional()
    @IsString()
    commune: string;

    @IsNotEmpty()
    @IsLatitude()
    latitude: number;

    @IsNotEmpty()
    @IsLongitude()
    longitude: number;

    @IsOptional()
    @IsString()
    commtel: string;

    @IsOptional()
    @IsString()
    commmail: string;

    @IsOptional()
    @IsString()
    commweb: string;

    @IsOptional()
    @IsString()
    videosurl: string;

    @IsOptional()
    @IsString()
    plateformeurl: string;

    @IsOptional()
    @IsString()
    languesparleesaccueil: string;

    @IsOptional()
    @IsString()
    accueilgroupe: string;

    @IsOptional()
    @IsString()
    tarifs: string;

    @IsOptional()
    @IsString()
    modepaiement: string;


    private getCompleteAdresse(): string {
        // Retourne 'adresse1' si elle n'est pas vide, sinon 'adresse2'
        this.adressecomplete = this.adresse1 || this.adresse2 || this.adresse3;
        return this.adressecomplete;
    }

    constructor(restaurantData: RestaurantDTO) {
        this.nomoffre = restaurantData.nomoffre;
        this.type = restaurantData.type;
        this.categorie = restaurantData.categorie;
        this.adresse1 = restaurantData.adresse1;
        this.adresse2 = restaurantData.adresse2;
        this.adresse3 = restaurantData.adresse3;
        this.codepostal = restaurantData.codepostal;
        this.commune = restaurantData.commune;
        this.latitude = restaurantData.latitude;
        this.longitude = restaurantData.longitude;
        this.commtel = restaurantData.commtel;
        this.commmail = restaurantData.commmail;
        this.commweb = restaurantData.commweb;
        this.videosurl = restaurantData.videosurl;
        this.plateformeurl = restaurantData.plateformeurl;
        this.languesparleesaccueil = restaurantData.languesparleesaccueil;
        this.accueilgroupe = restaurantData.accueilgroupe;
        this.tarifs = restaurantData.tarifs;
        this.modepaiement = restaurantData.modepaiement;
        this.adressecomplete = this.getCompleteAdresse();
    }

}
