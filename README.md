# Art & Craft - Gestion de Meubles

Application web pour un artisan designer, lui permettant de gérer ses créations, ses matériaux et fournisseurs.

## Fonctionnalités

- Authentification utilisateur avec JWT
- Gestion des meubles (créer, modifier, supprimer)
- Suivi des matériaux et fournisseurs
- Organisation par catégories
- Tableau de bord avec statistiques
- Interface responsive

## Technologies

**Frontend:** React 19, TypeScript, Vite, Chart.js
**Backend:** Node.js, Express, MongoDB, Mongoose

## Installation

1. **Backend**

   ```bash
   cd backend
   npm install
   ```

2. **Frontend**

   ```bash
   cd frontend
   npm install
   ```

3. **Configuration**

   Créer un fichier `.env` dans le dossier backend :

   ```env
   PORT=3001
   NODE_ENV=development
   ORIGIN=http://localhost:5173
   MONGO_URI=votre-mongo-uri
   JWT_SECRET=votre-cle-secrete
   ```

4. **Initialisation de la base de données**
   ```bash
   cd backend
   npm run seed
   ```

## Démarrage

1. **Backend**

   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

L'application sera disponible sur `http://localhost:5173`

## API

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/furniture/user` - Meubles de l'utilisateur
- `POST /api/furniture` - Créer un meuble
- `PUT /api/furniture/:id` - Modifier un meuble
- `DELETE /api/furniture/:id` - Supprimer un meuble

## Scripts

**Backend:**

- `npm run dev` - Serveur de développement
- `npm run build` - Build production
- `npm run seed` - Données de test

**Frontend:**

- `npm run dev` - Serveur de développement
- `npm run build` - Build production
