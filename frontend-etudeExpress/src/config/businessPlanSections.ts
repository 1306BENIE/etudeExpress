// Configuration des 12 sections du Business Plan
// Basée sur le support officiel d'étude commerciale

export interface FormSection {
  id: string;
  title: string;
  description: string;
  fields: Array<{
    id: string;
    label: string;
    type: "text" | "number" | "textarea" | "select";
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
  }>;
}

export const BUSINESS_PLAN_SECTIONS: FormSection[] = [
  {
    id: "1",
    title: "Présentation du projet",
    description: "Définissez votre projet et sa valeur ajoutée",
    fields: [
      {
        id: "nomProjet",
        label: "Nom du projet",
        type: "text",
        placeholder: "Ex: Restaurant traditionnel ivoirien",
        required: true,
      },
      {
        id: "description",
        label: "Description du projet",
        type: "textarea",
        placeholder: "Décrivez votre projet en détail...",
        required: true,
      },
      {
        id: "problemeResolu",
        label: "Problème résolu",
        type: "textarea",
        placeholder: "Quel problème votre projet résout-il ?",
        required: true,
      },
      {
        id: "solutionProposee",
        label: "Solution proposée",
        type: "textarea",
        placeholder: "Comment votre projet résout-il ce problème ?",
        required: true,
      },
      {
        id: "avantagesConcurrentiels[]",
        label: "Avantages concurrentiels",
        type: "text",
        placeholder: "Ajoutez vos avantages concurrentiels",
      },
    ],
  },
  {
    id: "2",
    title: "Analyse du marché",
    description: "Étudiez votre marché cible et la concurrence",
    fields: [
      {
        id: "marcheCible",
        label: "Marché cible",
        type: "text",
        placeholder: "Ex: Jeunes professionnels 25-35 ans à Abidjan",
        required: true,
      },
      {
        id: "tailleMarche",
        label: "Taille du marché (en millions FCFA)",
        type: "number",
        placeholder: "Ex: 500",
        required: true,
      },
      {
        id: "segments[]",
        label: "Segments de marché",
        type: "text",
        placeholder: "Ajoutez vos segments de marché",
      },
      {
        id: "comportementAchat",
        label: "Comportement d'achat",
        type: "textarea",
        placeholder: "Décrivez le comportement d'achat de vos clients...",
        required: true,
      },
    ],
  },
  {
    id: "3",
    title: "Stratégie marketing",
    description: "Définissez votre positionnement et mix marketing",
    fields: [
      {
        id: "positionnement",
        label: "Positionnement",
        type: "textarea",
        placeholder: "Comment vous positionnez-vous sur le marché ?",
        required: true,
      },
      {
        id: "produit",
        label: "Produit/Service",
        type: "textarea",
        placeholder: "Décrivez votre produit ou service",
        required: true,
      },
      {
        id: "prix",
        label: "Stratégie de prix",
        type: "textarea",
        placeholder: "Expliquez votre stratégie de prix",
        required: true,
      },
      {
        id: "place",
        label: "Distribution",
        type: "textarea",
        placeholder: "Comment distribuez-vous votre produit ?",
        required: true,
      },
      {
        id: "promotion",
        label: "Communication",
        type: "textarea",
        placeholder: "Comment communiquez-vous avec vos clients ?",
        required: true,
      },
      {
        id: "planCommunication[]",
        label: "Plan de communication",
        type: "text",
        placeholder: "Ajoutez vos actions de communication",
      },
      {
        id: "canauxDistribution[]",
        label: "Canaux de distribution",
        type: "text",
        placeholder: "Ajoutez vos canaux de distribution",
      },
    ],
  },
  {
    id: "4",
    title: "Organisation et équipe",
    description: "Structurez votre équipe et organisation",
    fields: [
      {
        id: "structure",
        label: "Structure organisationnelle",
        type: "textarea",
        placeholder: "Décrivez votre structure organisationnelle",
        required: true,
      },
      {
        id: "equipe[]",
        label: "Membres de l'équipe",
        type: "text",
        placeholder: "Ajoutez les membres de votre équipe",
      },
      {
        id: "besoinsRecrutement[]",
        label: "Besoins en recrutement",
        type: "text",
        placeholder: "Ajoutez vos besoins en recrutement",
      },
    ],
  },
  {
    id: "5",
    title: "Plan opérationnel",
    description: "Détaillez vos processus et opérations",
    fields: [
      {
        id: "processusProduction",
        label: "Processus de production",
        type: "textarea",
        placeholder: "Décrivez votre processus de production",
        required: true,
      },
      {
        id: "fournisseurs[]",
        label: "Fournisseurs",
        type: "text",
        placeholder: "Ajoutez vos fournisseurs",
      },
      {
        id: "equipements[]",
        label: "Équipements nécessaires",
        type: "text",
        placeholder: "Ajoutez vos équipements",
      },
      {
        id: "locaux",
        label: "Locaux",
        type: "textarea",
        placeholder: "Décrivez vos besoins en locaux",
        required: true,
      },
      {
        id: "planning",
        label: "Planning de mise en œuvre",
        type: "textarea",
        placeholder: "Décrivez votre planning de mise en œuvre",
        required: true,
      },
    ],
  },
  {
    id: "6",
    title: "Analyse financière",
    description: "Présentez vos projections financières",
    fields: [
      {
        id: "investissementInitial",
        label: "Investissement initial (FCFA)",
        type: "number",
        placeholder: "Ex: 5000000",
        required: true,
      },
      {
        id: "sourcesFinancement[]",
        label: "Sources de financement",
        type: "text",
        placeholder: "Ajoutez vos sources de financement",
      },
      {
        id: "seuilRentabilite",
        label: "Seuil de rentabilité (FCFA)",
        type: "number",
        placeholder: "Ex: 1000000",
        required: true,
      },
      {
        id: "delaiRecuperation",
        label: "Délai de récupération (mois)",
        type: "number",
        placeholder: "Ex: 24",
        required: true,
      },
    ],
  },
  {
    id: "7",
    title: "Plan de trésorerie",
    description: "Planifiez vos flux de trésorerie",
    fields: [
      {
        id: "fluxTresorerie[]",
        label: "Flux de trésorerie",
        type: "text",
        placeholder: "Ajoutez vos flux de trésorerie",
      },
      {
        id: "besoinsFondsRoulement",
        label: "Besoins en fonds de roulement (FCFA)",
        type: "number",
        placeholder: "Ex: 2000000",
        required: true,
      },
    ],
  },
  {
    id: "8",
    title: "Analyse des risques",
    description: "Identifiez et gérez les risques",
    fields: [
      {
        id: "risquesIdentifies[]",
        label: "Risques identifiés",
        type: "text",
        placeholder: "Ajoutez les risques identifiés",
      },
      {
        id: "planContingence",
        label: "Plan de contingence",
        type: "textarea",
        placeholder: "Décrivez votre plan de contingence",
        required: true,
      },
    ],
  },
  {
    id: "9",
    title: "Plan de développement",
    description: "Définissez votre stratégie de croissance",
    fields: [
      {
        id: "phases[]",
        label: "Phases de développement",
        type: "text",
        placeholder: "Ajoutez vos phases de développement",
      },
      {
        id: "objectifsLongTerme[]",
        label: "Objectifs à long terme",
        type: "text",
        placeholder: "Ajoutez vos objectifs à long terme",
      },
    ],
  },
  {
    id: "10",
    title: "Indicateurs de performance",
    description: "Établissez vos KPIs et tableaux de bord",
    fields: [
      {
        id: "kpis[]",
        label: "Indicateurs de performance (KPIs)",
        type: "text",
        placeholder: "Ajoutez vos KPIs",
      },
      {
        id: "suiviPerformance",
        label: "Suivi de performance",
        type: "textarea",
        placeholder: "Décrivez votre système de suivi de performance",
        required: true,
      },
    ],
  },
  {
    id: "11",
    title: "Annexes",
    description: "Ajoutez vos documents supports",
    fields: [
      {
        id: "etudesMarche[]",
        label: "Études de marché",
        type: "text",
        placeholder: "Ajoutez vos études de marché",
      },
      {
        id: "contrats[]",
        label: "Contrats",
        type: "text",
        placeholder: "Ajoutez vos contrats",
      },
      {
        id: "devis[]",
        label: "Devis",
        type: "text",
        placeholder: "Ajoutez vos devis",
      },
      {
        id: "autres[]",
        label: "Autres documents",
        type: "text",
        placeholder: "Ajoutez d'autres documents",
      },
    ],
  },
  {
    id: "12",
    title: "Résumé exécutif",
    description: "Synthétisez votre business plan",
    fields: [
      {
        id: "synthese",
        label: "Synthèse",
        type: "textarea",
        placeholder: "Faites une synthèse de votre business plan",
        required: true,
      },
      {
        id: "pointsCles[]",
        label: "Points clés",
        type: "text",
        placeholder: "Ajoutez vos points clés",
      },
      {
        id: "recommandations[]",
        label: "Recommandations",
        type: "text",
        placeholder: "Ajoutez vos recommandations",
      },
      {
        id: "conclusion",
        label: "Conclusion",
        type: "textarea",
        placeholder: "Concluez votre business plan",
        required: true,
      },
    ],
  },
];

// Fonction utilitaire pour obtenir une section par ID
export const getSectionById = (id: string): FormSection | undefined => {
  return BUSINESS_PLAN_SECTIONS.find((section) => section.id === id);
};

// Fonction utilitaire pour obtenir toutes les sections
export const getAllSections = (): FormSection[] => {
  return BUSINESS_PLAN_SECTIONS;
};
