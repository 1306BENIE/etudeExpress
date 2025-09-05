export const APP_CONFIG = {
  name: 'EtudeExpress',
  description: 'Assistant digital intelligent pour études de marché en Afrique',
  version: '1.0.0',
  supportEmail: 'contact@etudeexpress.ci',
  supportPhone: '+225 07 XX XX XX XX',
};

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Gratuit',
    studiesLimit: 1,
    features: ['1 étude par mois', 'Assistant IA basique', 'Export PDF'],
  },
  BASIC: {
    name: 'Entrepreneur',
    studiesLimit: 5,
    price: 15000,
    features: ['5 études par mois', 'Assistant IA avancé', 'Export PDF/Excel'],
  },
  PREMIUM: {
    name: 'Entreprise',
    studiesLimit: -1, // Unlimited
    price: 45000,
    features: ['Études illimitées', 'Assistant IA expert', 'Support 24/7'],
  },
} as const;

export const SECTORS = [
  'Agriculture et Agroalimentaire',
  'Technologies et Digital',
  'Commerce et Distribution',
  'Services Financiers',
  'Santé et Bien-être',
  'Éducation et Formation',
  'Transport et Logistique',
  'Énergie et Environnement',
  'Tourisme et Hôtellerie',
  'Artisanat et Mode',
  'Autre',
] as const;

export const LOCATIONS = [
  'Abidjan',
  'Bouaké',
  'Daloa',
  'Korhogo',
  'San-Pédro',
  'Yamoussoukro',
  'Man',
  'Divo',
  'Gagnoa',
  'Autre ville de Côte d\'Ivoire',
  'Afrique de l\'Ouest',
  'Afrique',
] as const;

export const TIMELINES = [
  '3 mois',
  '6 mois',
  '1 an',
  '2 ans',
  '5 ans',
] as const;

export const USER_TYPES = [
  { value: 'entrepreneur', label: 'Entrepreneur' },
  { value: 'student', label: 'Étudiant' },
  { value: 'investor', label: 'Investisseur' },
] as const;