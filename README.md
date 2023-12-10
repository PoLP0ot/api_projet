# Projet - Gestion de Restaurants sur une application mobile


# La partie Back-end (API NestJS)
Ce projet est une application NestJS conçue pour gérer un service de restaurants. Elle offre diverses fonctionnalités telles que l'ajout, la suppression, et la récupération de restaurants, ainsi que la gestion des restaurants favoris.

## Fonctionnalités

### Gestion des Restaurants
- **Ajouter un Restaurant** : Permet d'ajouter un nouveau restaurant à la liste.
- **Supprimer un Restaurant** : Supprime un restaurant existant de la liste.
- **Récupérer des Restaurants** : Récupère la liste de tous les restaurants.
- **Recherche Avancée** : Recherche de restaurants par nom, ville, et code postal.

Actuellement, l'application est configurée pour récupérer uniquement 300 restaurants pour éviter les problèmes de performance et les crashs. Cependant, une fonctionnalité permettant de récupérer tous les restaurants de la base de données est présente, mais non utilisée dans la configuration actuelle.
### Favoris
- **Ajouter aux Favoris** : Ajoute un restaurant à la liste des favoris.
- **Supprimer des Favoris** : Supprime un restaurant de la liste des favoris.
- **Récupérer les Favoris** : Récupère la liste des restaurants favoris.

## Architecture du Projet

### Contrôleur des Restaurants (`Restaurant.controller.ts`)
Gère les requêtes HTTP pour les opérations sur les restaurants, y compris l'ajout, la suppression, et la récupération des restaurants et des favoris.

### Module Restaurant (`Restaurant.module.ts`)
Configure les dépendances nécessaires pour le contrôleur et le service des restaurants, et importe `HttpModule` pour les requêtes HTTP.

### Service Restaurant (`Restaurant.service.ts`)
Contient la logique métier pour les opérations sur les restaurants, y compris la gestion des données et des favoris.

### Classe Restaurant (`Restaurant.ts`)
Définit la structure et les propriétés d'un restaurant, avec des décorateurs pour la validation des données.

### Data Transfer Object (`RestaurantDTO.ts`)
Utilisé pour transférer des données entre différentes couches de l'application.

### Point d'Entrée (`main.ts`)
Configure et démarre le serveur NestJS, et utilise `ValidationPipe` pour la validation globale des requêtes.

### Fichier Test (`restaurant.controller.spec.ts`)
Il s'agit d'un fichier de test généré automatiquement par NestJS pour tester les fonctionnalités du contrôleur des restaurants.
Toutes les fonctionnalités ne sont pas dans le test.


# La partie Front-end (Application Android)

Ce projet est une application Android conçue pour gérer un service de restaurants. Elle offre diverses fonctionnalités telles que l'affichage, l'ajout, la suppression, et la gestion des restaurants favoris.

## Fonctionnalités

### Affichage et Gestion des Restaurants
- **Afficher la Liste des Restaurants** : Récupère et affiche la liste des restaurants via une URL.
- **Afficher les Détails des Restaurants** : Permet d'afficher les détails d'un restaurant spécifique.
- **Afficher les Restaurants sur une Carte** : Utilise Google Maps pour afficher les restaurants sur une carte.
- **Ajouter un Restaurant** : Permet d'ajouter un nouveau restaurant à la base de données.
- **Supprimer les Restaurants** : Permet de supprimer les restaurants de la base de données.
- **Gérer les Favoris** : Permet d'ajouter ou de retirer des restaurants de la liste des favoris.

## Architecture du Projet

### Code Source Java/Kotlin
- **MainActivity.kt** : Point d'entrée principal de l'application, gérant l'affichage initial et la navigation entre les fragments.
- **MapActivity.kt** : Affiche les restaurants sur une carte Google Maps.
- **InfoActivity.kt** : Affiche des informations générales sur l'application.
- **CreateRestaurantFragment.kt** : Fragment pour créer et ajouter un nouveau restaurant.
- **RestaurantDetailsFragment.kt** : Fragment pour afficher les détails d'un restaurant.
- **RestaurantListFragment.kt** : Fragment pour afficher la liste des restaurants.

### Ressources et Layouts
- **activity_main.xml** : Layout principal de l'application.
- **activity_map.xml** : Layout pour l'affichage de la carte Google Maps.
- **activity_info.xml** : Layout pour l'affichage des informations de l'application.
- **fragment_create_restaurant.xml** : Layout pour le fragment de création d'un restaurant.
- **fragment_restaurant_details.xml** : Layout pour le fragment d'affichage des détails d'un restaurant.
- **fragment_restaurant_list.xml** : Layout pour le fragment d'affichage de la liste des restaurants.
- **row_restaurant.xml** : Layout pour chaque élément de la liste des restaurants.
- **menu_main.xml** : Définit le menu de l'application.
- **Drawable et Mipmap** : Ressources graphiques comme les icônes.
- **Values** : Ressources telles que les chaînes de caractères, les couleurs, et les styles.

### Problèmes avec Google Maps
Parfois, l'application peut ne pas afficher les restaurants sur la carte Google Maps. Cela est dû à un problème avec la clé d'API Google Maps, qui peut être résolu en générant une nouvelle clé et en la remplaçant dans le fichier `android_manifest.xml`.

## Installation

Pour exécuter l'application, clonez le dépôt et ouvrez-le dans un environnement de développement Android comme Android Studio.


