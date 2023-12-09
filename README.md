# API Projet - Gestion de Restaurants

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


## Installation

Pour installer les dépendances, exécutez :

```bash
$ npm install
