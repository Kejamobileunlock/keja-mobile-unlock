# KEJA MOBILE UNLOCK - Instructions de Déploiement

## Déploiement sur Vercel

### Configuration requise:

1. **Variables d'environnement** (à ajouter dans Vercel):
   - `NOWPAYMENTSEAPI_KEY=Z5W3B51-Q6EMKP8-P1FREDH-7TJMXZD`
   - `NOWPAYMENTS�PUBLICC_KEY=318e4713-4014-4346-afcb-4d4a450fd87c`

2. **Build Settings**:
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`
   - Node.js Version: 20.x

### Structure du projet:
```
/
├── client/           # Frontend React/Vite
├── shared/          # Types partagés
├── server/          # Backend Express (pas utilisé sur Vercel)
└── vercel.json      # Configuration Vercel
```

### URL de démonstration:
https://keja-mobile-unlock.vercel.app

Le site est optimisé pour mobile avec:
- 10 outils de déblocage
- Paiement crypto via NowPayments
- Support WhatsApp intégré
- Interface en français