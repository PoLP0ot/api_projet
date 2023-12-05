import { IsString, IsNotEmpty, IsOptional, IsLatitude, IsLongitude, IsInt } from 'class-validator';
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

    imageUrl: string;

    adressecomplete: string;

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
        this.imageUrl = this.assignImageUrl(restaurantData.categorie);
    }

    private getCompleteAdresse(): string {
        // Retourne 'adresse1' si elle n'est pas vide, sinon 'adresse2'
        this.adressecomplete = this.adresse1 || this.adresse2 || this.adresse3;
        return this.adressecomplete;
    }

    private assignImageUrl(categorie: string): string {
        return this.getImageUrlForCategory(categorie);
    }

    private getImageUrlForCategory(categorie: string): string {
        const categoryImageUrls: { [category: string]: string } = {
            'Bistrot / bar à vin': 'https://us.123rf.com/450wm/benidict83/benidict831912/benidict83191200003/134858243-restauration-de-bistrot-lin%C3%A9aire-rond-avec-verre-%C3%A0-vin.jpg?ver=6',
            'Brasserie': 'https://upload.wikimedia.org/wikipedia/commons/4/44/LOGO_BRASSERIE_BELGE_2017.png',
            'Cafétéria': 'https://img.freepik.com/vecteurs-premium/insigne-cafe-dans-style-vintage_476121-79.jpg',
            'Coffee-shop': 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coffee-shop-logos-design-template-cda8575e146cc5ba17cd3c1a24d65ba1_screen.jpg?ts=1638177256',
            'Crêperie': 'https://dcassetcdn.com/design_img/3913264/831606/25845633/dzg96vtjax2j19zth8xvvjsmxg_image.jpg',
            'Cuisine du Monde': 'https://media.istockphoto.com/id/1349349294/vector/global-chef-vector-logo-design-cooking-planet-vector-logo-design-template.jpg?s=612x612&w=0&k=20&c=oQhUu6md_K5vOKNWnxa86lBrNClYWkAgtp9TUHi_NYQ=',
            'Cuisine traditionnelle': 'https://img.freepik.com/vecteurs-premium/modele-logo-cuisine-traditionnelle-restaurant_545399-738.jpg',
            'Fruits de mer': 'https://static.vecteezy.com/ti/vecteur-libre/p3/5513180-logo-premium-du-restaurant-de-fruits-de-mer-frais-vectoriel.jpg',
            'Grill - Rôtisserie': 'https://i.pinimg.com/originals/05/d6/0f/05d60f05460e059b19084a1e4d1991b7.png',
            'Guinguette': 'https://animations-entreprise.fr/wp-content/uploads/2020/04/balmaga-animations-logo-activite-guinguette-paillette.jpg',
            'Pizzeria': 'https://static.vecteezy.com/ti/vecteur-libre/p3/4854343-melting-pizza-logo-pizzeria-restaurant-avec-melting-cheese-logo-icon-template-illustration-vectoriel.jpg',
            'Restaurant gastronomique - cuisine raffinée': 'https://www.zarla.com/images/zarla-le-jardin-toil-1x1-2400x2400-20220425-vy6fyg394htmd47kd8f9.png?crop=1:1,smart&width=250&dpr=2',
            'Restauration rapide': 'https://img.freepik.com/vecteurs-premium/creation-logo-restaurant-restauration-rapide-hamburger-cuillere-signe-fourchette-plat-vert-orange_364304-437.jpg',
            'Salon de thé': 'https://graphiste.com/blog/wp-content/uploads/sites/4/2016/11/logo-salon-the-1.png',
        };

        return categoryImageUrls[categorie];
    }
}
