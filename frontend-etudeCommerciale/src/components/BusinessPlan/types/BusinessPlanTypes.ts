// Types pour le Business Plan CCI - Structure officielle
export interface BusinessPlanData {
  id?: string;
  titre: string;
  secteur: string;
  localisation: string;
  statut: "brouillon" | "en_cours" | "termine" | "valide";
  createdAt?: string;
  updatedAt?: string;

  // PAGE 1: L'IDÉE (CCI)
  idee: {
    description: string; // Rédigez en quelques phrases ce que vous voulez faire
    specificite: string; // Montrez, pourquoi votre idée est spéciale
    proprietaires: Array<{
      nom: string;
      fonction?: string;
      experience?: string;
    }>; // Écrire le(s) nom(s) du (des) propriétaire(s)
  };

  // PAGE 2: LE MARCHÉ (4P Marketing CCI)
  marche: {
    produit: string; // Qu'allez-vous offrir comme produit ou service ?
    prix: string; // À combien allez-vous vendre le produit ou service ?
    fournitures: string; // Comment allez-vous vous approvisionner en biens et services ?
    promotion: string; // Comment allez-vous faire votre promotion ?
    clients: number; // Combien aurez-vous de clients par mois (estimation) ?
    place: string; // Où allez-vous vous installer ?
    concurrents: string; // Comment allez-vous vous comporter ?
  };

  // PAGE 3: RESSOURCES MATÉRIELLES ET HUMAINES (CCI)
  ressources: {
    equipements: string; // Comment allez-vous produire votre produit ou service ?
    machines: Array<{
      nom: string;
      prix: number;
      description?: string;
    }>; // Listez les machines/équipements avec leurs prix
    enregistrement: string; // Quelles sont les procédures administratives que vous devez satisfaire
    employes: {
      nombre: number;
      couts: number;
      details: string;
    }; // Combien d'employés devez-vous avoir, et quels en sont les coûts ?
  };

  // PAGE 4: LES COÛTS (avant démarrage) - CCI
  coutsPredemarrage: {
    constitution: number;
    autorisationLicence: number;
    formation: number;
    informationsProjet: number;
    planAffaires: number;
    autres: Array<{
      description: string;
      montant: number;
    }>;
    total: number; // Calculé automatiquement
  };

  // PAGE 5: FINANCEMENT GLOBAL (Pages 7+8 CCI regroupées)
  financementGlobal: {
    // Dépenses avant le démarrage
    depensesAvantDemarrage: number;
    
    // Immobilisations
    immobilisations: {
      terrain: number;
      construction: number;
      materiel: number;
      outillage: number;
      vehicules: number;
      total: number; // Calculé
    };
    
    // Fonds de Roulement pour 3 mois
    fondsRoulement3Mois: {
      salaires: number;
      prelevementEntrepreneur: number;
      coutsMarketing: number;
      matieresPremières: number;
      total: number; // Calculé
    };
    
    // Synthèse
    coutTotalProjet: number; // Calculé
    apportPersonnel: number;
    besoinFinancement: number; // Calculé
  };

  // PAGE 6: PLAN DE FINANCEMENT (CCI)
  planFinancement: {
    apportPersonnel: number;
    sourcesExternes: Array<{
      source: string;
      montant: number;
    }>; // 5 sources externes maximum
    total: number; // Calculé
  };

  // PAGE 7: REMBOURSEMENT & CASHFLOW (Pages 10+11 CCI regroupées)
  remboursementCashflow: {
    // Plan de remboursement (Formules A-F)
    planRemboursement: {
      montantEmprunt: number; // A - Montant de l'emprunt
      dureeAnnees: number; // Durée en années
      dureeMois: number; // B - Durée en mois (calculé)
      tauxInteret: number; // Taux d'intérêt annuel (%)
      tauxMensuel: number; // C - Taux mensuel (calculé)
      remboursementMensuel: number; // D - Remboursement mensuel (calculé)
      interetTotal: number; // E - Intérêt total (calculé)
      paiementTotal: number; // F - Paiement total (calculé)
    };
    
    // Analyse du cashflow mensuel
    cashflowMensuel: {
      ventesEstimees: number;
      coutVentes: number;
      chargesFixes: number;
      resultatBrut: number; // calculé
      resultatNet: number; // calculé
      cashflowNet: number; // calculé (après remboursement)
    };
  };

  // PAGE 8: COMPTE DE RÉSULTAT PRÉVISIONNEL (CCI)
  compteResultat: {
    mois: Array<{
      mois: string;
      totalVentes: number; // (1)
      coutVentes: {
        achatMatieresPremières: number;
        autresCouts: number;
        mainOeuvre: number;
        total: number; // (2) - calculé
      };
      resultatBrut: number; // (1-2) - calculé
      chargesFixes: {
        loyer: number;
        electricite: number;
        eau: number;
        telephone: number;
        transport: number;
        salaires: number;
        autres: number;
        total: number; // (3) - calculé
      };
      resultatNet: number; // (1-2-3) - calculé
    }>;
    totauxAnnuels?: {
      totalVentes: number;
      coutTotal: number;
      resultatBrut: number;
      totalCharges: number;
      resultatNet: number;
    };
  };
}

// Props interface pour les composants de formulaire
export interface BusinessPlanFormProps {
  data: BusinessPlanData;
  onUpdate: (data: Partial<BusinessPlanData>) => void;
  onValidate: (isValid: boolean) => void;
  isLoading?: boolean;
}

// Configuration des pages
export interface PageConfig {
  id: number;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<BusinessPlanFormProps>;
}

// Validation des pages
export interface PageValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Utilitaires de calcul
export interface CalculationResult {
  value: number;
  formula: string;
  dependencies: string[];
}

// Export des constantes
export const MOIS_ANNEE = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export const SECTEURS_ACTIVITE = [
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
];

export const VILLES_COTE_IVOIRE = [
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
];
