import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from '../src/Restaurant.controller';
import { RestaurantService } from '../src/Restaurant.service';
import { RestaurantModule } from '../src/Restaurant.module';
import { Restaurant } from '../src/Restaurant';
import { RestaurantDTO } from '../src/RestaurantDTO';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [{
        provide: RestaurantService,
        useValue: {
          addRestaurant: jest.fn().mockReturnValue('Restaurant ajouté avec succès'),
          deleteRestaurant: jest.fn().mockReturnValue('Restaurant supprimé avec succès'),
          addFavorite: jest.fn().mockReturnValue('Restaurant ajouté aux favoris'),
          removeFavorite: jest.fn().mockReturnValue('Restaurant retiré des favoris'),

        }
      }]
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should add a restaurant', () => {
    const fakeRestaurantDTO = {
      nomoffre: 'La Bonne Fourchette',
      type: 'Restaurant',
      categorie: 'Gastronomique',
      adresse1: '10 rue de la Gastronomie',
      adresse2: '',
      adresse3: '',
      codepostal: 75000,
      cedex: '',
      spbureaudistributeur: '',
      commune: 'Paris',
      codeinseecommune: 12345,
      latitude: 48.8566,
      longitude: 2.3522,
      acces: 'Métro, bus, parking',
      commmob: '0612345678',
      commtel: '0123456789',
      commfax: '0123456798',
      commmail: 'contact@labonnefourchette.fr',
      commweb: 'www.labonnefourchette.fr',
      videosurl: 'www.youtube.com/labonnefourchette',
      plateformeurl: 'www.labonnefourchette.fr/reservation',
      tripadwidget: '',
      spvideosembed: '',
      classementguides: '3 étoiles',
      labelsclassementlogis: 'Logis de France',
      labeltourismehandicap: 'Accessible',
      animauxacceptes: 'Oui',
      animauxinfo: 'Animaux de petite taille acceptés',
      labels: 'Label Bio',
      services: 'Wi-Fi, Terrasse',
      capacitenbcouverts: 50,
      capacitenbsalles: 2,
      capacitenbcouvertsterrasse: 20,
      capacitenbsallesreunion: 1,
      capacitenbsallesclim: 2,
      spaccueilveloiti: 'Parking vélo',
      languesparleesaccueil: 'Français, Anglais, Espagnol',
      accueilgroupe: 'Oui',
      accueilgroupemin: 10,
      accueilgroupemax: 40,
      ouverturealannee: 'Toute l\'année',
      ouverturegranule: '',
      resadirecte: 'Disponible',
      resaenligneouinon: 'Oui',
      resaenligne: 'www.labonnefourchette.fr/reservation',
      tarifs: 'Plats à partir de 15€',
      modepaiement: 'Carte, Espèces, Chèque',
      localisation: {
        lat: 48.8566,
        lon: 2.3522
      },
      departement: 'Paris'
    };

    const restaurant = new Restaurant(fakeRestaurantDTO);

    expect(controller.addRestaurant(restaurant)).toBe('Restaurant ajouté avec succès');
    expect(service.addRestaurant).toHaveBeenCalledWith(restaurant);
  });

  // Test pour la suppression d'un restaurant
  it('should delete a restaurant', () => {
    expect(controller.deleteRestaurant('NomOffre')).toBe('Restaurant supprimé avec succès');
    expect(service.deleteRestaurant).toHaveBeenCalledWith('NomOffre');
  });

  // Ajoutez des tests supplémentaires pour les autres méthodes de façon similaire...
});