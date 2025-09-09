// Utilitaires de calcul pour le Business Plan CCI
import { BusinessPlanData, CalculationResult } from '../types/BusinessPlanTypes';

export class BusinessPlanCalculations {
  
  // PAGE 4: Calcul du total des coûts pré-démarrage
  static calculateCoutsTotal(data: BusinessPlanData): CalculationResult {
    const { coutsPredemarrage } = data;
    const total = coutsPredemarrage.constitution + 
                  coutsPredemarrage.autorisationLicence + 
                  coutsPredemarrage.formation + 
                  coutsPredemarrage.informationsProjet + 
                  coutsPredemarrage.planAffaires + 
                  coutsPredemarrage.autres.reduce((sum, item) => sum + item.montant, 0);
    
    return {
      value: total,
      formula: 'Constitution + Autorisation/Licence + Formation + Informations + Plan d\'affaires + Autres',
      dependencies: ['coutsPredemarrage.constitution', 'coutsPredemarrage.autorisationLicence', 'coutsPredemarrage.formation', 'coutsPredemarrage.informationsProjet', 'coutsPredemarrage.planAffaires', 'coutsPredemarrage.autres']
    };
  }

  // PAGE 5: Calcul du total des immobilisations
  static calculateImmobilisationsTotal(data: BusinessPlanData): CalculationResult {
    const { immobilisations } = data.financementGlobal;
    const total = immobilisations.terrain + 
                  immobilisations.construction + 
                  immobilisations.materiel + 
                  immobilisations.outillage + 
                  immobilisations.vehicules;
    
    return {
      value: total,
      formula: 'Terrain + Construction + Matériel + Outillage + Véhicules',
      dependencies: ['financementGlobal.immobilisations.terrain', 'financementGlobal.immobilisations.construction', 'financementGlobal.immobilisations.materiel', 'financementGlobal.immobilisations.outillage', 'financementGlobal.immobilisations.vehicules']
    };
  }

  // PAGE 5: Calcul du total fonds de roulement 3 mois
  static calculateFondsRoulementTotal(data: BusinessPlanData): CalculationResult {
    const { fondsRoulement3Mois } = data.financementGlobal;
    const total = fondsRoulement3Mois.salaires + 
                  fondsRoulement3Mois.prelevementEntrepreneur + 
                  fondsRoulement3Mois.coutsMarketing + 
                  fondsRoulement3Mois.matieresPremières;
    
    return {
      value: total,
      formula: 'Salaires + Prélèvement entrepreneur + Coûts marketing + Matières premières',
      dependencies: ['financementGlobal.fondsRoulement3Mois.salaires', 'financementGlobal.fondsRoulement3Mois.prelevementEntrepreneur', 'financementGlobal.fondsRoulement3Mois.coutsMarketing', 'financementGlobal.fondsRoulement3Mois.matieresPremières']
    };
  }

  // PAGE 5: Calcul du coût total du projet
  static calculateCoutTotalProjet(data: BusinessPlanData): CalculationResult {
    const depenses = data.financementGlobal.depensesAvantDemarrage;
    const immobilisations = this.calculateImmobilisationsTotal(data).value;
    const fondsRoulement = this.calculateFondsRoulementTotal(data).value;
    const total = depenses + immobilisations + fondsRoulement;
    
    return {
      value: total,
      formula: 'Dépenses avant démarrage + Total immobilisations + Total fonds de roulement',
      dependencies: ['financementGlobal.depensesAvantDemarrage', 'immobilisations', 'fondsRoulement3Mois']
    };
  }

  // PAGE 5: Calcul du besoin en financement
  static calculateBesoinFinancement(data: BusinessPlanData): CalculationResult {
    const coutTotal = this.calculateCoutTotalProjet(data).value;
    const apportPersonnel = data.financementGlobal.apportPersonnel;
    const besoin = Math.max(0, coutTotal - apportPersonnel);
    
    return {
      value: besoin,
      formula: 'Coût total du projet - Apport personnel (minimum 0)',
      dependencies: ['coutTotalProjet', 'financementGlobal.apportPersonnel']
    };
  }

  // PAGE 6: Calcul du total plan de financement
  static calculatePlanFinancementTotal(data: BusinessPlanData): CalculationResult {
    const apportPersonnel = data.planFinancement.apportPersonnel;
    const sourcesExternes = data.planFinancement.sourcesExternes.reduce((sum, source) => sum + source.montant, 0);
    const total = apportPersonnel + sourcesExternes;
    
    return {
      value: total,
      formula: 'Apport personnel + Somme des sources externes',
      dependencies: ['planFinancement.apportPersonnel', 'planFinancement.sourcesExternes']
    };
  }

  // PAGE 7: Calculs du plan de remboursement (Formules A-F CCI)
  static calculatePlanRemboursement(data: BusinessPlanData) {
    const { planRemboursement } = data.remboursementCashflow;
    const A = planRemboursement.montantEmprunt;
    const B = planRemboursement.dureeMois;
    const tauxMensuel = planRemboursement.tauxMensuel / 100;
    
    // D = Remboursement mensuel (formule d'emprunt)
    const D = tauxMensuel > 0 ? (A * tauxMensuel * Math.pow(1 + tauxMensuel, B)) / (Math.pow(1 + tauxMensuel, B) - 1) : A / B;
    
    // E = Intérêt total
    const E = (D * B) - A;
    
    // F = Paiement total
    const F = A + E;
    
    return {
      remboursementMensuel: {
        value: Math.round(D),
        formula: 'Formule d\'emprunt avec taux d\'intérêt',
        dependencies: ['montantEmprunt', 'dureeMois', 'tauxMensuel']
      },
      interetTotal: {
        value: Math.round(E),
        formula: '(Remboursement mensuel * Durée) - Montant emprunté',
        dependencies: ['remboursementMensuel', 'dureeMois', 'montantEmprunt']
      },
      paiementTotal: {
        value: Math.round(F),
        formula: 'Montant emprunté + Intérêt total',
        dependencies: ['montantEmprunt', 'interetTotal']
      }
    };
  }

  // PAGE 8: Calculs du compte de résultat pour un mois
  static calculateCompteResultatMois(moisData: any) {
    // Total coût des ventes (2)
    const totalCoutVentes = moisData.coutVentes.achatMatieresPremières + 
                           moisData.coutVentes.autresCouts + 
                           moisData.coutVentes.mainOeuvre;
    
    // Résultat brut (1-2)
    const resultatBrut = moisData.totalVentes - totalCoutVentes;
    
    // Total charges fixes (3)
    const totalChargesFixes = moisData.chargesFixes.loyer + 
                             moisData.chargesFixes.electricite + 
                             moisData.chargesFixes.eau + 
                             moisData.chargesFixes.telephone + 
                             moisData.chargesFixes.transport + 
                             moisData.chargesFixes.salaires + 
                             moisData.chargesFixes.autres;
    
    // Résultat net (1-2-3)
    const resultatNet = resultatBrut - totalChargesFixes;
    
    return {
      totalCoutVentes,
      resultatBrut,
      totalChargesFixes,
      resultatNet
    };
  }

  // Validation des données
  static validatePage(pageNumber: number, data: BusinessPlanData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    switch (pageNumber) {
      case 1: // L'Idée
        if (!data.idee.description.trim()) errors.push('La description du projet est requise');
        if (!data.idee.specificite.trim()) errors.push('La spécificité de l\'idée est requise');
        if (!data.idee.proprietaires.some(p => p.nom.trim())) errors.push('Au moins un propriétaire est requis');
        break;
        
      case 2: // Le Marché
        if (!data.marche.produit.trim()) errors.push('Le produit/service est requis');
        if (!data.marche.prix.trim()) errors.push('Le prix est requis');
        if (!data.marche.place.trim()) errors.push('Le lieu d\'installation est requis');
        if (data.marche.clients <= 0) errors.push('Le nombre de clients doit être supérieur à 0');
        break;
        
      case 3: // Ressources
        if (!data.ressources.equipements.trim()) errors.push('La description des équipements est requise');
        if (!data.ressources.enregistrement.trim()) errors.push('Les procédures d\'enregistrement sont requises');
        if (data.ressources.employes.nombre < 0) errors.push('Le nombre d\'employés ne peut pas être négatif');
        break;
        
      case 4: // Coûts
        const totalCouts = this.calculateCoutsTotal(data).value;
        if (totalCouts <= 0) errors.push('Le total des coûts doit être supérieur à 0');
        break;
        
      case 5: // Financement Global
        const coutTotal = this.calculateCoutTotalProjet(data).value;
        if (coutTotal <= 0) errors.push('Le coût total du projet doit être supérieur à 0');
        if (data.financementGlobal.apportPersonnel < 0) errors.push('L\'apport personnel ne peut pas être négatif');
        break;
        
      case 6: // Plan de Financement
        const totalFinancement = this.calculatePlanFinancementTotal(data).value;
        if (totalFinancement <= 0) errors.push('Le total du financement doit être supérieur à 0');
        break;
        
      case 7: // Remboursement
        if (data.remboursementCashflow.planRemboursement.montantEmprunt < 0) {
          errors.push('Le montant emprunté ne peut pas être négatif');
        }
        if (data.remboursementCashflow.planRemboursement.dureeAnnees <= 0) {
          errors.push('La durée de remboursement doit être supérieure à 0');
        }
        break;
        
      case 8: // Compte de Résultat
        const hasValidData = data.compteResultat.mois.some(m => m.totalVentes > 0);
        if (!hasValidData) errors.push('Au moins un mois doit avoir des ventes supérieures à 0');
        break;
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Formatage des montants en FCFA
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('XOF', 'FCFA');
  }

  // Formatage des pourcentages
  static formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }
}
