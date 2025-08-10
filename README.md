# KEJA MOBILE UNLOCK - License Activation System

Un système professionnel d'activation de licences pour logiciels de déblocage mobile avec paiement crypto.

## 🚀 Fonctionnalités

- ✅ Interface mobile-first avec design moderne et sombre
- ✅ 10 outils de déblocage différents avec tarification flexible
- ✅ Paiement sécurisé par crypto-monnaie via NowPayments API
- ✅ Support WhatsApp intégré
- ✅ Animations fluides avec Framer Motion
- ✅ Interface multi-devises crypto (Bitcoin, USDT, Ethereum, etc.)

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** + **Shadcn/ui** pour le design
- **Framer Motion** pour les animations
- **TanStack Query** pour la gestion des données
- **Wouter** pour le routage

### Backend  
- **Node.js** + **Express.js**
- **NowPayments API** pour les paiements crypto
- **Stockage en mémoire** (extensible vers base de données)

## 🏗️ Architecture

```
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Composants UI réutilisables
│   │   ├── pages/        # Pages de l'application
│   │   └── lib/          # Utilitaires et configuration
├── server/               # Backend Express
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Gestion des données
│   └── index.ts          # Point d'entrée
└── shared/               # Types partagés
    └── schema.ts         # Schémas de données
```

## 💰 Outils Disponibles

| Outil | Durées | Prix USD |
|-------|--------|----------|
| UNLOCK TOOL | 3/6/12 mois | $23/$33/$53 |
| Arab FRP Tool | 3/6/12/24 mois | $16/$21/$31/$40 |
| DFT Pro Tool | 12 mois | $88 |
| MDM FIX TOOL | 3/12 mois | $52/$110 |
| TSM TOOL | 6/12/24 mois | $14/$24/$34 |
| TFM TOOL | 3/12/24 mois | $20/$31/$48 |
| Pandora Tool | 12 mois | $80 |
| AMT | 3/6/12 mois | $14/$23/$34 |
| KGFIX TOOL | 12 mois | $39 |
| HW Pro Tool (Huawei) | 12 mois | $50 |

## 🔧 Installation et Déploiement

### Variables d'environnement requises

```env
NOWPAYMENTS_API_KEY=votre_cle_api_nowpayments
NOWPAYMENTS_PUBLIC_KEY=votre_cle_publique_nowpayments
```

### Développement local

```bash
npm install
npm run dev
```

### Déploiement

Le projet est optimisé pour le déploiement sur :
- **Vercel** (recommandé)
- **Netlify** 
- **Railway**
- **Heroku**

## 📱 Support Client

Support intégré via WhatsApp : **+229 46 44 73 19**

## 🔐 Sécurité

- Paiements sécurisés via NowPayments
- Validation des données avec Zod
- HTTPS obligatoire en production
- Gestion sécurisée des clés API

## 📄 Licence

Projet développé pour KEJA MOBILE UNLOCK - Tous droits réservés.