//Ici on définit le type de données que l'on va récupérer de l'API
export interface RestaurantDTO {
    nomoffre: string;
    type: string;
    categorie: string;
    adresse1: string;
    adresse2: string;
    adresse3: string;
    codepostal: number;
    cedex: string;
    spbureaudistributeur: string;
    commune: string;
    codeinseecommune: number;
    latitude: number;
    longitude: number;
    acces: string;
    commmob: string;
    commtel: string;
    commfax: string;
    commmail: string;
    commweb: string;
    videosurl: string;
    plateformeurl: string;
    tripadwidget: string;
    spvideosembed: string;
    classementguides: string;
    labelsclassementlogis: string;
    labeltourismehandicap: string;
    animauxacceptes: string;
    animauxinfo: string;
    labels: string;
    services: string;
    capacitenbcouverts: number;
    capacitenbsalles: number;
    capacitenbcouvertsterrasse: number;
    capacitenbsallesreunion: number;
    capacitenbsallesclim: number;
    spaccueilveloiti: string;
    languesparleesaccueil: string;
    accueilgroupe: string;
    accueilgroupemin: number;
    accueilgroupemax: number;
    ouverturealannee: string;
    ouverturegranule: string;
    resadirecte: string;
    resaenligneouinon: string;
    resaenligne: string;
    tarifs: string;
    modepaiement: string;
    localisation: Localisation;
    departement: string;
}

interface Localisation {
    lon: number;
    lat: number;
}

