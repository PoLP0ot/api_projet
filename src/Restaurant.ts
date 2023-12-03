import { IsString, IsNotEmpty, IsOptional,  IsLatitude, IsLongitude, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

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
        this.adressecomplete = this.adresse1 || this.adresse2;
        return
    }

    constructor(data?: any) {
        if (data) {

            this.nomoffre = data.nomoffre;
            this.type = data.type;
            this.categorie = data.categorie;
            this.adresse1 = data.adresse1;
            this.adresse2 = data.adresse2;
            this.adresse3 = data.adresse3;
            this.codepostal = data.codepostal;
            this.commune = data.commune;
            this.latitude = data.latitude;
            this.longitude = data.longitude;
            this.commtel = data.commtel;
            this.commmail = data.commmail;
            this.commweb = data.commweb;
            this.videosurl = data.videosurl;
            this.plateformeurl = data.plateformeurl;
            this.languesparleesaccueil = data.languesparleesaccueil;
            this.accueilgroupe = data.accueilgroupe;
            this.tarifs = data.tarifs;
            this.modepaiement = data.modepaiement;
            this.adressecomplete = this.getCompleteAdresse();
        }
    }
}
