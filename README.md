# Berberita Shop

Landing page multilingue (arabe, français, anglais) pour les commandes de produits, construite avec Vite, React, TypeScript et Tailwind CSS.

## Installation

```bash
npm install
npm run dev
```

## Variables d'environnement

Copiez `.env.example` vers `.env.local` et renseignez :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_WEB3FORMS_ACCESS_KEY`

Le build échoue volontairement si `VITE_WEB3FORMS_ACCESS_KEY` est absent.

## Vérification

```bash
npm run typecheck
npm run lint
npm run build
```

## Déploiement

Déployez le dépôt sur Vercel et ajoutez les trois variables dans les variables d'environnement du projet. Un nouveau déploiement est nécessaire après toute modification de variable.
