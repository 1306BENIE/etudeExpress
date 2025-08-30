# 🚀 EtudeExpress - Plateforme d'Études de Marché IA

Une plateforme intelligente pour générer des études de marché adaptées au contexte africain, alimentée par l'IA.

## ✨ Fonctionnalités

- 🤖 **Génération d'études de marché par IA** - Obtenez des analyses complètes en quelques minutes
- 💬 **Assistant IA intelligent** - Chatbot spécialisé dans les études de marché
- 📊 **Analyses détaillées** - Données fiables et projections financières
- 🌍 **Adapté à l'Afrique** - Conçu pour le contexte économique africain
- 📱 **Interface moderne** - Design responsive et intuitif
- 🔒 **Sécurisé** - Authentification JWT et protection des données

## 🛠️ Technologies

### Backend

- **Node.js** + **Express.js** - API REST
- **TypeScript** - Typage statique
- **MongoDB** + **Mongoose** - Base de données
- **OpenAI API** - Intelligence artificielle
- **JWT** - Authentification
- **Tailwind CSS** - Styling

### Frontend

- **React 18** + **TypeScript** - Interface utilisateur
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animations
- **React Hook Form** - Gestion des formulaires
- **React Router** - Navigation

## 🚀 Installation

### Prérequis

- Node.js 18+
- MongoDB
- Clé API OpenAI

### 1. Cloner le projet

```bash
git clone <repository-url>
cd project-bolt-sb1-y4grvz5e/project
```

### 2. Configuration Backend

```bash
cd backend-etudeExpress

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Configurer les variables d'environnement dans .env
OPENAI_API_KEY=votre_clé_api_openai
JWT_SECRET=votre_secret_jwt
MONGODB_URI=mongodb://localhost:27017/etudeexpress
```

### 3. Configuration Frontend

```bash
cd ../frontend-etudeExpress

# Installer les dépendances
npm install

# Créer le fichier .env (optionnel)
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Démarrage

### Option 1: Script automatique

```bash
# Depuis la racine du projet
powershell -ExecutionPolicy Bypass -File start-dev.ps1
```

### Option 2: Démarrage manuel

#### Backend

```bash
cd backend-etudeExpress
npm run dev
```

#### Frontend (nouveau terminal)

```bash
cd frontend-etudeExpress
npm run dev
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 📚 API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Études

- `POST /api/studies` - Créer une étude
- `GET /api/studies` - Lister les études
- `GET /api/studies/:id` - Détails d'une étude
- `DELETE /api/studies/:id` - Supprimer une étude

### Chat

- `POST /api/chat` - Envoyer un message
- `GET /api/chat` - Historique des conversations

## 🔧 Scripts NPM

### Backend

```bash
npm run dev      # Démarrage en mode développement
npm run build    # Compilation TypeScript
npm run start    # Démarrage en production
npm run lint     # Vérification du code
```

### Frontend

```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
npm run lint     # Vérification du code
```

## 🎯 Structure du Projet

```
project/
├── backend-etudeExpress/     # API Backend
│   ├── src/
│   │   ├── controllers/      # Contrôleurs API
│   │   ├── models/          # Modèles MongoDB
│   │   ├── routes/          # Routes API
│   │   ├── services/        # Services métier
│   │   └── middleware/      # Middleware Express
│   └── package.json
├── frontend-etudeExpress/    # Interface React
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── pages/           # Pages de l'application
│   │   ├── contexts/        # Contextes React
│   │   ├── services/        # Services API
│   │   └── types/           # Types TypeScript
│   └── package.json
└── README.md
```

## 🚨 Dépannage

### Erreur "Cannot find module 'uuid'"

```bash
cd backend-etudeExpress
npm install uuid @types/uuid
```

### Erreur de connexion MongoDB

- Vérifiez que MongoDB est démarré
- Vérifiez l'URI dans le fichier .env

### Erreur OpenAI API

- Vérifiez votre clé API dans le fichier .env
- Vérifiez les quotas de votre compte OpenAI

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :

- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

---

**Développé avec ❤️ pour l'écosystème entrepreneurial africain**



