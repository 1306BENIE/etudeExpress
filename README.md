# 🚀 Entrepreneur Assistant CI - Plateforme de Business Plan IA

Une plateforme web intelligente et évolutive qui modernise le processus d'étude commerciale en Côte d'Ivoire. Elle offre aux entrepreneurs un outil interactif permettant de créer, structurer et exporter leur business plan de manière professionnelle.

## ✨ Fonctionnalités

- 📋 **Formulaires dynamiques** - 12 pages basées sur le support officiel
- 🤖 **Assistant IA contextualisé** - Guide intelligent pour chaque étape
- 📊 **Tableaux financiers interactifs** - Visualisations et projections
- 📄 **Export PDF professionnel** - Business plan structuré et présentable
- 👥 **Mode collaboratif** - Inviter mentor, investisseur, incubateur
- 🏢 **Module Admin avancé** - Supervision et gestion des utilisateurs
- 📱 **Interface responsive** - Mobile, tablette, ordinateur
- 🔒 **Sécurisé** - Authentification JWT et gestion des rôles

## 🛠️ Technologies

### Backend

- **Node.js** + **Express.js** - API REST sécurisée
- **TypeScript** - Typage statique
- **MongoDB** + **Mongoose** - Base de données flexible
- **OpenAI API** - Intelligence artificielle
- **JWT** - Authentification et RBAC
- **PDF-lib** - Génération de documents

### Frontend

- **React 18** + **TypeScript** - Interface moderne
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS responsive
- **Framer Motion** - Animations fluides
- **React Hook Form** - Gestion des formulaires
- **Chart.js/Recharts** - Visualisations

## 🎯 Public Cible

- **Entrepreneurs** débutants et confirmés
- **Étudiants** en entrepreneuriat
- **Incubateurs** et investisseurs
- **Institutions** d'accompagnement (CCI, ONG, Ministères)

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
npm install
cp .env.example .env
# Configurer les variables d'environnement
```

### 3. Configuration Frontend

```bash
cd ../frontend-etudeExpress
npm install
```

## 🏃‍♂️ Démarrage

```bash
# Script automatique
powershell -ExecutionPolicy Bypass -File start-dev.ps1

# Ou manuellement
cd backend-etudeExpress && npm run dev
cd frontend-etudeExpress && npm run dev
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Admin**: http://localhost:3000/admin

## 📚 API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Business Plan

- `POST /api/business-plans` - Créer un business plan
- `GET /api/business-plans` - Lister les projets
- `GET /api/business-plans/:id` - Détails d'un projet
- `PUT /api/business-plans/:id` - Modifier un projet
- `DELETE /api/business-plans/:id` - Supprimer un projet

### Export

- `POST /api/export/pdf/:id` - Générer PDF
- `POST /api/export/word/:id` - Générer Word

### Administration

- `GET /api/admin/users` - Gestion utilisateurs
- `GET /api/admin/statistics` - Statistiques
- `GET /api/admin/projects` - Supervision projets

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

## 📄 Licence

Ce projet est sous licence MIT.

---

**Développé avec ❤️ pour l'écosystème entrepreneurial ivoirien**
