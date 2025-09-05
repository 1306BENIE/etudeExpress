import mongoose, { Document, Schema } from "mongoose";

// Interface pour les collaborateurs (mentor, investisseur, incubateur)
export interface ICollaborator {
  userId: mongoose.Types.ObjectId;
  role: "mentor" | "investisseur" | "incubateur" | "consultant";
  email: string;
  name: string;
  permissions: string[];
  invitedAt: Date;
  acceptedAt?: Date;
}

// Interface pour les données financières
export interface IFinancialData {
  investissementInitial: number;
  chargesFixes: number;
  chargesVariables: number;
  prixVente: number;
  quantiteVendue: number;
  projections: Array<{
    annee: number;
    chiffreAffaires: number;
    charges: number;
    benefice: number;
    rentabilite: number;
  }>;
}

// Interface pour les données de marché
export interface IMarketData {
  tailleMarche: number;
  tauxCroissance: number;
  partMarche: number;
  concurrents: Array<{
    nom: string;
    partMarche: number;
    forces: string[];
    faiblesses: string[];
    prix: string;
  }>;
  tendances: string[];
  opportunites: string[];
  menaces: string[];
}

// Interface principale du Business Plan
export interface IBusinessPlan extends Document {
  // Informations de base
  userId: mongoose.Types.ObjectId;
  titre: string;
  secteur: string;
  localisation: string;
  statut: "brouillon" | "en_cours" | "termine" | "valide";

  // Page 1: Présentation du projet
  presentation: {
    nomProjet: string;
    description: string;
    problemeResolu: string;
    solutionProposee: string;
    avantagesConcurrentiels: string[];
  };

  // Page 2: Analyse du marché
  analyseMarche: {
    marcheCible: string;
    tailleMarche: number;
    segments: string[];
    comportementAchat: string;
    donneesMarche: IMarketData;
  };

  // Page 3: Stratégie marketing
  strategieMarketing: {
    positionnement: string;
    mixMarketing: {
      produit: string;
      prix: string;
      place: string;
      promotion: string;
    };
    planCommunication: string[];
    canauxDistribution: string[];
  };

  // Page 4: Organisation et équipe
  organisation: {
    structure: string;
    equipe: Array<{
      nom: string;
      poste: string;
      competences: string[];
      experience: string;
    }>;
    besoinsRecrutement: string[];
    organigramme: string;
  };

  // Page 5: Plan opérationnel
  planOperationnel: {
    processusProduction: string;
    fournisseurs: Array<{
      nom: string;
      produit: string;
      conditions: string;
    }>;
    equipements: string[];
    locaux: string;
    planning: string;
  };

  // Page 6: Analyse financière
  analyseFinanciere: {
    investissementInitial: number;
    sourcesFinancement: Array<{
      source: string;
      montant: number;
      conditions: string;
    }>;
    donneesFinancieres: IFinancialData;
    seuilRentabilite: number;
    delaiRecuperation: number;
  };

  // Page 7: Plan de trésorerie
  planTresorerie: {
    fluxTresorerie: Array<{
      mois: string;
      encaissements: number;
      decaissements: number;
      solde: number;
    }>;
    besoinsFondsRoulement: number;
    planFinancement: string;
  };

  // Page 8: Analyse des risques
  analyseRisques: {
    risquesIdentifies: Array<{
      risque: string;
      probabilite: "faible" | "moyenne" | "elevee";
      impact: "faible" | "moyen" | "eleve";
      mesuresMitigation: string[];
    }>;
    planContingence: string;
  };

  // Page 9: Plan de développement
  planDeveloppement: {
    phases: Array<{
      phase: string;
      duree: string;
      objectifs: string[];
      ressources: string[];
    }>;
    objectifsLongTerme: string[];
    strategiesCroissance: string[];
  };

  // Page 10: Indicateurs de performance
  indicateursPerformance: {
    kpis: Array<{
      nom: string;
      description: string;
      cible: number;
      unite: string;
    }>;
    tableauxBord: string[];
    suiviPerformance: string;
  };

  // Page 11: Annexes
  annexes: {
    etudesMarche: string[];
    contrats: string[];
    devis: string[];
    autres: string[];
  };

  // Page 12: Résumé exécutif
  resumeExecutif: {
    synthese: string;
    pointsCles: string[];
    recommandations: string[];
    conclusion: string;
  };

  // Collaboration et partage
  collaborateurs: ICollaborator[];
  partagePublic: boolean;

  // Métadonnées
  version: number;
  derniereModification: Date;
  tempsRedaction: number; // en minutes
  assistantIAUtilise: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Schéma MongoDB
const businessPlanSchema = new Schema<IBusinessPlan>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'utilisateur est requis"],
      index: true,
    },
    titre: {
      type: String,
      required: [true, "Le titre du projet est requis"],
      trim: true,
      maxlength: [200, "Le titre ne peut pas dépasser 200 caractères"],
    },
    secteur: {
      type: String,
      required: [true, "Le secteur est requis"],
      trim: true,
    },
    localisation: {
      type: String,
      required: [true, "La localisation est requise"],
      trim: true,
    },
    statut: {
      type: String,
      enum: ["brouillon", "en_cours", "termine", "valide"],
      default: "brouillon",
      index: true,
    },

    // Page 1: Présentation du projet
    presentation: {
      nomProjet: { type: String, required: true, trim: true },
      description: { type: String, required: true },
      problemeResolu: { type: String, required: true },
      solutionProposee: { type: String, required: true },
      avantagesConcurrentiels: [{ type: String, trim: true }],
    },

    // Page 2: Analyse du marché
    analyseMarche: {
      marcheCible: { type: String, required: true },
      tailleMarche: { type: Number, required: true, min: 0 },
      segments: [{ type: String, trim: true }],
      comportementAchat: { type: String, required: true },
      donneesMarche: {
        tailleMarche: { type: Number, required: true },
        tauxCroissance: { type: Number, required: true },
        partMarche: { type: Number, required: true, min: 0, max: 100 },
        concurrents: [
          {
            nom: { type: String, required: true },
            partMarche: { type: Number, required: true, min: 0, max: 100 },
            forces: [{ type: String }],
            faiblesses: [{ type: String }],
            prix: { type: String, required: true },
          },
        ],
        tendances: [{ type: String }],
        opportunites: [{ type: String }],
        menaces: [{ type: String }],
      },
    },

    // Page 3: Stratégie marketing
    strategieMarketing: {
      positionnement: { type: String, required: true },
      mixMarketing: {
        produit: { type: String, required: true },
        prix: { type: String, required: true },
        place: { type: String, required: true },
        promotion: { type: String, required: true },
      },
      planCommunication: [{ type: String }],
      canauxDistribution: [{ type: String }],
    },

    // Page 4: Organisation et équipe
    organisation: {
      structure: { type: String, required: true },
      equipe: [
        {
          nom: { type: String, required: true },
          poste: { type: String, required: true },
          competences: [{ type: String }],
          experience: { type: String, required: true },
        },
      ],
      besoinsRecrutement: [{ type: String }],
      organigramme: { type: String },
    },

    // Page 5: Plan opérationnel
    planOperationnel: {
      processusProduction: { type: String, required: true },
      fournisseurs: [
        {
          nom: { type: String, required: true },
          produit: { type: String, required: true },
          conditions: { type: String, required: true },
        },
      ],
      equipements: [{ type: String }],
      locaux: { type: String, required: true },
      planning: { type: String, required: true },
    },

    // Page 6: Analyse financière
    analyseFinanciere: {
      investissementInitial: { type: Number, required: true, min: 0 },
      sourcesFinancement: [
        {
          source: { type: String, required: true },
          montant: { type: Number, required: true, min: 0 },
          conditions: { type: String, required: true },
        },
      ],
      donneesFinancieres: {
        investissementInitial: { type: Number, required: true },
        chargesFixes: { type: Number, required: true },
        chargesVariables: { type: Number, required: true },
        prixVente: { type: Number, required: true },
        quantiteVendue: { type: Number, required: true },
        projections: [
          {
            annee: { type: Number, required: true },
            chiffreAffaires: { type: Number, required: true },
            charges: { type: Number, required: true },
            benefice: { type: Number, required: true },
            rentabilite: { type: Number, required: true },
          },
        ],
      },
      seuilRentabilite: { type: Number, required: true },
      delaiRecuperation: { type: Number, required: true },
    },

    // Page 7: Plan de trésorerie
    planTresorerie: {
      fluxTresorerie: [
        {
          mois: { type: String, required: true },
          encaissements: { type: Number, required: true },
          decaissements: { type: Number, required: true },
          solde: { type: Number, required: true },
        },
      ],
      besoinsFondsRoulement: { type: Number, required: true },
      planFinancement: { type: String, required: true },
    },

    // Page 8: Analyse des risques
    analyseRisques: {
      risquesIdentifies: [
        {
          risque: { type: String, required: true },
          probabilite: {
            type: String,
            enum: ["faible", "moyenne", "elevee"],
            required: true,
          },
          impact: {
            type: String,
            enum: ["faible", "moyen", "eleve"],
            required: true,
          },
          mesuresMitigation: [{ type: String }],
        },
      ],
      planContingence: { type: String, required: true },
    },

    // Page 9: Plan de développement
    planDeveloppement: {
      phases: [
        {
          phase: { type: String, required: true },
          duree: { type: String, required: true },
          objectifs: [{ type: String }],
          ressources: [{ type: String }],
        },
      ],
      objectifsLongTerme: [{ type: String }],
      strategiesCroissance: [{ type: String }],
    },

    // Page 10: Indicateurs de performance
    indicateursPerformance: {
      kpis: [
        {
          nom: { type: String, required: true },
          description: { type: String, required: true },
          cible: { type: Number, required: true },
          unite: { type: String, required: true },
        },
      ],
      tableauxBord: [{ type: String }],
      suiviPerformance: { type: String, required: true },
    },

    // Page 11: Annexes
    annexes: {
      etudesMarche: [{ type: String }],
      contrats: [{ type: String }],
      devis: [{ type: String }],
      autres: [{ type: String }],
    },

    // Page 12: Résumé exécutif
    resumeExecutif: {
      synthese: { type: String, required: true },
      pointsCles: [{ type: String }],
      recommandations: [{ type: String }],
      conclusion: { type: String, required: true },
    },

    // Collaboration et partage
    collaborateurs: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: {
          type: String,
          enum: ["mentor", "investisseur", "incubateur", "consultant"],
          required: true,
        },
        email: { type: String, required: true },
        name: { type: String, required: true },
        permissions: [{ type: String }],
        invitedAt: { type: Date, default: Date.now },
        acceptedAt: { type: Date },
      },
    ],
    partagePublic: { type: Boolean, default: false },

    // Métadonnées
    version: { type: Number, default: 1 },
    derniereModification: { type: Date, default: Date.now },
    tempsRedaction: { type: Number, default: 0 },
    assistantIAUtilise: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Indexes pour optimiser les performances
businessPlanSchema.index({ userId: 1, createdAt: -1 });
businessPlanSchema.index({ statut: 1 });
businessPlanSchema.index({ secteur: 1 });
businessPlanSchema.index({ localisation: 1 });
businessPlanSchema.index({ "collaborateurs.userId": 1 });

// Méthodes virtuelles
businessPlanSchema.virtual("progression").get(function () {
  const pages = [
    this.presentation?.nomProjet,
    this.analyseMarche?.marcheCible,
    this.strategieMarketing?.positionnement,
    this.organisation?.structure,
    this.planOperationnel?.processusProduction,
    this.analyseFinanciere?.investissementInitial,
    this.planTresorerie?.fluxTresorerie?.length > 0,
    this.analyseRisques?.risquesIdentifies?.length > 0,
    this.planDeveloppement?.phases?.length > 0,
    this.indicateursPerformance?.kpis?.length > 0,
    this.annexes?.etudesMarche?.length > 0,
    this.resumeExecutif?.synthese,
  ];

  const pagesCompletees = pages.filter(Boolean).length;
  return Math.round((pagesCompletees / 12) * 100);
});

// Méthodes d'instance
businessPlanSchema.methods.ajouterCollaborateur = function (
  collaborateur: ICollaborator
) {
  this.collaborateurs.push(collaborateur);
  return this.save();
};

businessPlanSchema.methods.marquerCommeTermine = function () {
  this.statut = "termine";
  this.derniereModification = new Date();
  return this.save();
};

export default mongoose.model<IBusinessPlan>(
  "BusinessPlan",
  businessPlanSchema
);
