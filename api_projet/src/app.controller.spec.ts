import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './Restaurant.controller';
import { RestaurantService } from './Restaurant.service';
import { Restaurant } from './Restaurant';
import { HttpModule } from '@nestjs/axios';

describe('RestaurantModule', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
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
    // ... autres tests ...

    it('should add a restaurant to favorites', () => {
      service.addRestaurant(new Restaurant({ nomoffre: 'Restaurant Favori' }));
      const addResponse = service.addFavorite('Restaurant Favori');
      expect(addResponse).toBe('Restaurant ajouté aux favoris');
      expect(service.getFavorites()).toContainEqual(expect.objectContaining({ nomoffre: 'Restaurant Favori' }));
    });

    it('should not add a non-existing restaurant to favorites', () => {
      const addResponse = service.addFavorite('Restaurant Inexistant');
      expect(addResponse).toBe('Restaurant non trouvé');
    });

    it('should remove a restaurant from favorites', () => {
      service.addRestaurant(new Restaurant({ nomoffre: 'Restaurant Favori' }));
      service.addFavorite('Restaurant Favori');
      const removeResponse = service.removeFavorite('Restaurant Favori');
      expect(removeResponse).toBe('Restaurant retiré des favoris');
      expect(service.getFavorites()).not.toContainEqual(expect.objectContaining({ nomoffre: 'Restaurant Favori' }));
    });

    it('should not remove a non-existing restaurant from favorites', () => {
      const removeResponse = service.removeFavorite('Restaurant Inexistant');
      expect(removeResponse).toBe('Restaurant non trouvé dans les favoris');
    });

    it('should retrieve all favorite restaurants', () => {
      service.addRestaurant(new Restaurant({ nomoffre: 'Restaurant 1' }));
      service.addRestaurant(new Restaurant({ nomoffre: 'Restaurant 2' }));
      service.addFavorite('Restaurant 1');
      service.addFavorite('Restaurant 2');
      const favorites = service.getFavorites();
      expect(favorites.length).toBe(2);
      expect(favorites).toEqual(expect.arrayContaining([
        expect.objectContaining({ nomoffre: 'Restaurant 1' }),
        expect.objectContaining({ nomoffre: 'Restaurant 2' })
      ]));
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
