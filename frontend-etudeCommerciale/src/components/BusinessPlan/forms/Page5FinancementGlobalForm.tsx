import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Building, Coins, Calculator, TrendingUp } from "lucide-react";
import Input from "../../UI/Input";
import { BusinessPlanData } from "../types/BusinessPlanTypes";

interface Page5FinancementGlobalFormProps {
  data: BusinessPlanData;
  onUpdate: (updates: Partial<BusinessPlanData>) => void;
  onValidate: (isValid: boolean) => void;
  isLoading?: boolean;
}

const Page5FinancementGlobalForm: React.FC<Page5FinancementGlobalFormProps> = ({
  data,
  onUpdate,
  onValidate,
  isLoading = false,
}) => {
  const [localData, setLocalData] = useState(data.financementGlobal);

  // Calculs automatiques selon formules CCI
  useEffect(() => {
    // Calcul du total des immobilisations
    const totalImmobilisations = 
      localData.immobilisations.terrain +
      localData.immobilisations.construction +
      localData.immobilisations.materiel +
      localData.immobilisations.outillage +
      localData.immobilisations.vehicules;

    // Calcul du total fonds de roulement 3 mois
    const totalFondsRoulement = 
      localData.fondsRoulement3Mois.salaires +
      localData.fondsRoulement3Mois.prelevementEntrepreneur +
      localData.fondsRoulement3Mois.coutsMarketing +
      localData.fondsRoulement3Mois.matieresPremières;

    // Calcul du coût total du projet (Formule CCI: A + B + C)
    const coutTotalProjet = 
      data.coutsPredemarrage.total + // A: Dépenses avant démarrage
      totalImmobilisations + // B: Immobilisations
      totalFondsRoulement; // C: Fonds de roulement 3 mois

    // Calcul du besoin de financement (Formule CCI: Coût total - Apport personnel)
    const besoinFinancement = Math.max(0, coutTotalProjet - localData.apportPersonnel);

    const updatedData = {
      ...localData,
      depensesAvantDemarrage: data.coutsPredemarrage.total,
      immobilisations: {
        ...localData.immobilisations,
        total: totalImmobilisations
      },
      fondsRoulement3Mois: {
        ...localData.fondsRoulement3Mois,
        total: totalFondsRoulement
      },
      coutTotalProjet,
      besoinFinancement
    };

    setLocalData(updatedData);
    onUpdate({ financementGlobal: updatedData });
  }, [
    data.coutsPredemarrage.total,
    localData.immobilisations.terrain,
    localData.immobilisations.construction,
    localData.immobilisations.materiel,
    localData.immobilisations.outillage,
    localData.immobilisations.vehicules,
    localData.fondsRoulement3Mois.salaires,
    localData.fondsRoulement3Mois.prelevementEntrepreneur,
    localData.fondsRoulement3Mois.coutsMarketing,
    localData.fondsRoulement3Mois.matieresPremières,
    localData.apportPersonnel,
    onUpdate
  ]);

  // Validation en temps réel
  useEffect(() => {
    const isValid = 
      localData.coutTotalProjet > 0 &&
      localData.apportPersonnel >= 0 &&
      localData.immobilisations.total >= 0 &&
      localData.fondsRoulement3Mois.total >= 0;

    onValidate(isValid);
  }, [localData, onValidate]);

  // Mise à jour des données
  const handleImmobilisationChange = (field: string, value: number) => {
    const updatedImmobilisations = { ...localData.immobilisations, [field]: value };
    const updatedData = { ...localData, immobilisations: updatedImmobilisations };
    setLocalData(updatedData);
  };

  const handleFondsRoulementChange = (field: string, value: number) => {
    const updatedFondsRoulement = { ...localData.fondsRoulement3Mois, [field]: value };
    const updatedData = { ...localData, fondsRoulement3Mois: updatedFondsRoulement };
    setLocalData(updatedData);
  };

  const handleApportChange = (value: number) => {
    const updatedData = { ...localData, apportPersonnel: value };
    setLocalData(updatedData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-[#751F20]/10 relative overflow-hidden"
    >
      {/* Barre de progression */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20]"></div>
      
      {/* En-tête */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-[#751F20] to-[#8B2635] rounded-xl text-white">
          <CreditCard className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
            Financement Global
          </h3>
          <p className="text-gray-600 text-sm">
            Synthèse des coûts et calcul du besoin de financement selon les formules CCI
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section A: Dépenses avant démarrage (automatique) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Calculator className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">A. Dépenses avant démarrage</h4>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total des coûts (Page 4) :</span>
              <span className="text-xl font-bold text-[#751F20]">
                {localData.depensesAvantDemarrage.toLocaleString()} FCFA
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Montant calculé automatiquement depuis la page "Coûts"
            </p>
          </div>
        </motion.div>

        {/* Section B: Immobilisations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Building className="w-5 h-5 text-[#8B2635]" />
            <h4 className="text-lg font-semibold text-gray-900">B. Immobilisations</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Terrain (FCFA)"
              type="number"
              value={localData.immobilisations.terrain}
              onChange={(e) => handleImmobilisationChange("terrain", Number(e.target.value))}
              placeholder="Ex: 5000000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Construction/Aménagement (FCFA)"
              type="number"
              value={localData.immobilisations.construction}
              onChange={(e) => handleImmobilisationChange("construction", Number(e.target.value))}
              placeholder="Ex: 3000000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Matériel (FCFA)"
              type="number"
              value={localData.immobilisations.materiel}
              onChange={(e) => handleImmobilisationChange("materiel", Number(e.target.value))}
              placeholder="Ex: 1500000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Outillage (FCFA)"
              type="number"
              value={localData.immobilisations.outillage}
              onChange={(e) => handleImmobilisationChange("outillage", Number(e.target.value))}
              placeholder="Ex: 500000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Véhicules (FCFA)"
              type="number"
              value={localData.immobilisations.vehicules}
              onChange={(e) => handleImmobilisationChange("vehicules", Number(e.target.value))}
              placeholder="Ex: 2000000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
          </div>

          <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total Immobilisations (B) :</span>
              <span className="text-xl font-bold text-[#8B2635]">
                {localData.immobilisations.total.toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </motion.div>

        {/* Section C: Fonds de roulement 3 mois */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Coins className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">C. Fonds de roulement (3 mois)</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Salaires (3 mois) (FCFA)"
              type="number"
              value={localData.fondsRoulement3Mois.salaires}
              onChange={(e) => handleFondsRoulementChange("salaires", Number(e.target.value))}
              placeholder="Ex: 1350000"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Prélèvement entrepreneur (3 mois) (FCFA)"
              type="number"
              value={localData.fondsRoulement3Mois.prelevementEntrepreneur}
              onChange={(e) => handleFondsRoulementChange("prelevementEntrepreneur", Number(e.target.value))}
              placeholder="Ex: 600000"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Coûts marketing (3 mois) (FCFA)"
              type="number"
              value={localData.fondsRoulement3Mois.coutsMarketing}
              onChange={(e) => handleFondsRoulementChange("coutsMarketing", Number(e.target.value))}
              placeholder="Ex: 300000"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Matières premières (3 mois) (FCFA)"
              type="number"
              value={localData.fondsRoulement3Mois.matieresPremières}
              onChange={(e) => handleFondsRoulementChange("matieresPremières", Number(e.target.value))}
              placeholder="Ex: 750000"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
          </div>

          <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total Fonds de roulement (C) :</span>
              <span className="text-xl font-bold text-[#751F20]">
                {localData.fondsRoulement3Mois.total.toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </motion.div>

        {/* Section: Apport personnel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#8B2635]" />
            <h4 className="text-lg font-semibold text-gray-900">Apport personnel</h4>
          </div>
          
          <Input
            label="Votre apport personnel (FCFA)"
            type="number"
            value={localData.apportPersonnel}
            onChange={(e) => handleApportChange(Number(e.target.value))}
            placeholder="Ex: 2000000"
            className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 Montant que vous pouvez investir personnellement dans le projet
          </p>
        </motion.div>

        {/* Synthèse finale selon formules CCI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl p-6 border border-[#751F20]/20"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Synthèse du financement (Formules CCI)</h4>
          
          <div className="space-y-4">
            {/* Calcul du coût total */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-medium text-gray-900 mb-3">Coût total du projet (A + B + C)</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>A. Dépenses avant démarrage :</span>
                  <span className="font-medium">{localData.depensesAvantDemarrage.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>B. Immobilisations :</span>
                  <span className="font-medium">{localData.immobilisations.total.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>C. Fonds de roulement :</span>
                  <span className="font-medium">{localData.fondsRoulement3Mois.total.toLocaleString()} FCFA</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">COÛT TOTAL :</span>
                  <span className="text-2xl font-bold text-[#751F20]">
                    {localData.coutTotalProjet.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>

            {/* Calcul du besoin de financement */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-medium text-gray-900 mb-3">Besoin de financement</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Coût total du projet :</span>
                  <span className="font-medium">{localData.coutTotalProjet.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>Moins : Apport personnel :</span>
                  <span className="font-medium">-{localData.apportPersonnel.toLocaleString()} FCFA</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">BESOIN DE FINANCEMENT :</span>
                  <span className={`text-2xl font-bold ${localData.besoinFinancement > 0 ? 'text-[#8B2635]' : 'text-green-600'}`}>
                    {localData.besoinFinancement.toLocaleString()} FCFA
                  </span>
                </div>
                {localData.besoinFinancement === 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    ✅ Votre apport personnel couvre entièrement le projet !
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de validation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl border border-[#751F20]/20"
      >
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            localData.coutTotalProjet > 0 && localData.apportPersonnel >= 0
              ? "bg-green-500" 
              : "bg-yellow-500"
          }`}></div>
          <p className="text-sm text-gray-700">
            {localData.coutTotalProjet > 0 && localData.apportPersonnel >= 0
              ? "✅ Financement global calculé - Vous pouvez passer à l'étape suivante"
              : "⏳ Complétez tous les champs pour valider cette étape"
            }
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page5FinancementGlobalForm;
