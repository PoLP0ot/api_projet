import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from '../src/restaurant.controller';
import { RestaurantService } from '../src/restaurant.service';
import { Restaurant } from '../src/restaurant';

describe('RestaurantModule', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [RestaurantService],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  // Tests pour RestaurantService
  describe('RestaurantService', () => {
    it('should add a restaurant', () => {
      const restaurant = new Restaurant({
        nomoffre: 'Chez Mireille',
        type: 'Café',
        categorie: 'Café et Thé',
        adresse1: '123 rue du Port',
        adresse2: '',
        adresse3: '',
        codepostal: 44000,
        commune: 'Nantes',
        latitude: 47.218371,
        longitude: -1.553621,
        commtel: '0240123456',
        commmail: 'contact@chezmireille.com',
        commweb: 'www.chezmireille.com'
      });
      service.addRestaurant(restaurant);
      expect(service.findAll()).toContain(restaurant);
    });

    it('should delete a restaurant', () => {
      const restaurant = new Restaurant({
        nomoffre: 'Chez Mireille',
        type: 'Café',
        categorie: 'Café et Thé',
        adresse1: '123 rue du Port',
        adresse2: '',
        adresse3: '',
        codepostal: 44000,
        commune: 'Nantes',
        latitude: 47.218371,
        longitude: -1.553621,
        commtel: '0240123456',
        commmail: 'contact@chezmireille.com',
        commweb: 'www.chezmireille.com'
      });
      service.addRestaurant(restaurant);
      expect(service.deleteRestaurant('Chez Mireille')).toBe('Restaurant supprimé avec succès');
      expect(service.findAll()).not.toContain(restaurant);
    });

    // ... autres tests pour le service...
  });

  // Tests pour RestaurantController
  describe('RestaurantController', () => {
    it('should add a restaurant', () => {
      const restaurant = new Restaurant({
        nomoffre: 'Chez Mireille',
        type: 'Café',
        categorie: 'Café et Thé',
        adresse1: '123 rue du Port',
        adresse2: '',
        adresse3: '',
        codepostal: 44000,
        commune: 'Nantes',
        latitude: 47.218371,
        longitude: -1.553621,
        commtel: '0240123456',
        commmail: 'contact@chezmireille.com',
        commweb: 'www.chezmireille.com'
      });
      jest.spyOn(service, 'addRestaurant').mockImplementation(() => 'Restaurant ajouté avec succès');
      expect(controller.addRestaurant(restaurant)).toBe('Restaurant ajouté avec succès');
    });

    it('should delete a restaurant', () => {
      jest.spyOn(service, 'deleteRestaurant').mockImplementation(() => 'Restaurant supprimé avec succès');
      expect(controller.deleteRestaurant('Chez Mireille')).toBe('Restaurant supprimé avec succès');
    });

    // ... autres tests pour le contrôleur...
  });
});
