# FluxCine

Plateforme de découverte cinéma moderne, légale et production-ready, basée sur l'API TMDB.

> **Avertissement légal** : FluxCine n'héberge aucun fichier vidéo. Les sources utilisées sont :
> - Métadonnées TMDB (titres, synopsis, affiches, notes)
> - Bandes-annonces officielles YouTube via l'API TMDB
> - Films en domaine public via Internet Archive
> - Liens deeplink vers fournisseurs légaux (Netflix, Prime Video, Disney+, etc.)

---

## Prérequis

- Node.js 18+
- npm 9+
- Clé API TMDB (gratuite)

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-user/fluxcine.git
cd fluxcine

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditez .env et renseignez votre clé TMDB
```

## Obtenir une clé TMDB

1. Créez un compte sur [themoviedb.org](https://www.themoviedb.org)
2. Allez dans **Paramètres → API**
3. Demandez une clé API (type "Developer")
4. Copiez la clé dans votre `.env` : `VITE_TMDB_API_KEY=votre_cle_ici`

## Lancement en développement

```bash
npm run dev
# → http://localhost:5173
```

## Build production

```bash
npm run build
npm run preview  # Prévisualiser le build
```

---

## Déploiement Vercel

1. Importez votre dépôt sur [vercel.com](https://vercel.com)
2. Framework détecté automatiquement : **Vite**
3. Ajoutez les variables d'environnement dans **Settings → Environment Variables** :
   - `VITE_TMDB_API_KEY` = votre clé TMDB (Production + Preview + Development)
   - `VITE_SITE_URL` = `https://votre-domaine.com`
4. Redéployez après l'ajout des variables
5. Pour un domaine custom :
   - Ajoutez votre domaine dans **Settings → Domains**
   - Configurez chez votre registrar :
     - Enregistrement A : `76.76.21.21`
     - CNAME www : `cname.vercel-dns.com`
   - SSL Let's Encrypt appliqué automatiquement

## Déploiement Netlify

1. Importez sur [app.netlify.com](https://app.netlify.com)
2. Build command : `npm run build`
3. Publish directory : `dist`
4. Variables d'environnement dans **Site settings → Environment variables** :
   - `VITE_TMDB_API_KEY` et `VITE_SITE_URL`
5. Le fichier `netlify.toml` gère les redirections SPA automatiquement

---

## Structure du projet

```
fluxcine/
├── src/
│   ├── lib/        # API TMDB, constantes, SEO
│   ├── hooks/      # useTmdb, useDebounce
│   ├── components/ # Composants réutilisables
│   └── pages/      # Pages de l'application
```

## Crédits

Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB.

[![TMDB](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg)](https://www.themoviedb.org)

## Licence

MIT — Voir [LICENSE](LICENSE)
