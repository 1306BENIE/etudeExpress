import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PiggyBank, Plus, Trash2, Building2, Users, CreditCard } from "lucide-react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { BusinessPlanData } from "../types/BusinessPlanTypes";

interface Page6PlanFinancementFormProps {
  data: BusinessPlanData;
  onUpdate: (updates: Partial<BusinessPlanData>) => void;
  onValidate: (isValid: boolean) => void;
  isLoading?: boolean;
}

const Page6PlanFinancementForm: React.FC<Page6PlanFinancementFormProps> = ({
  data,
  onUpdate,
  onValidate,
  isLoading = false,
}) => {
  const [localData, setLocalData] = useState(data.planFinancement);

  // Calcul automatique du total
  useEffect(() => {
    const sourcesTotal = localData.sourcesExternes.reduce((sum, source) => sum + source.montant, 0);
    const total = localData.apportPersonnel + sourcesTotal;

    const updatedData = { ...localData, total };
    setLocalData(updatedData);
    onUpdate({ planFinancement: updatedData });
  }, [localData.apportPersonnel, localData.sourcesExternes]);

  // Validation en temps réel
  useEffect(() => {
    const isValid = 
      localData.apportPersonnel >= 0 &&
      localData.sourcesExternes.every(source => 
        source.source.trim() !== "" && source.montant >= 0
      ) &&
      localData.total > 0;

    onValidate(isValid);
  }, [localData]);

  // Mise à jour de l'apport personnel
  const handleApportChange = (value: number) => {
    const updatedData = { ...localData, apportPersonnel: value };
    setLocalData(updatedData);
  };

  // Gestion des sources externes
  const addSourceExterne = () => {
    const newSources = [...localData.sourcesExternes, { source: "", montant: 0 }];
    const updatedData = { ...localData, sourcesExternes: newSources };
    setLocalData(updatedData);
  };

  const removeSourceExterne = (index: number) => {
    const newSources = localData.sourcesExternes.filter((_, i) => i !== index);
    const updatedData = { ...localData, sourcesExternes: newSources };
    setLocalData(updatedData);
  };

  const updateSourceExterne = (index: number, field: string, value: string | number) => {
    const newSources = [...localData.sourcesExternes];
    newSources[index] = { ...newSources[index], [field]: value };
    const updatedData = { ...localData, sourcesExternes: newSources };
    setLocalData(updatedData);
  };

  // Calcul du pourcentage de couverture
  const besoinFinancement = data.financementGlobal.besoinFinancement || 0;
  const tauxCouverture = besoinFinancement > 0 ? Math.round((localData.total / besoinFinancement) * 100) : 0;

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
        <div className="p-3 bg-gradient-to-r from-[#8B2635] to-[#751F20] rounded-xl text-white">
          <PiggyBank className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
            Plan de Financement
          </h3>
          <p className="text-gray-600 text-sm">
            Identifiez toutes les sources de financement pour votre projet
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Rappel du besoin de financement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl p-6 border border-[#751F20]/20"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Rappel du besoin de financement</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-gray-600">Coût total du projet</p>
                <p className="text-xl font-bold text-[#751F20]">
                  {data.financementGlobal.coutTotalProjet.toLocaleString()} FCFA
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-gray-600">Apport personnel prévu</p>
                <p className="text-xl font-bold text-green-600">
                  {data.financementGlobal.apportPersonnel.toLocaleString()} FCFA
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-gray-600">Besoin de financement</p>
                <p className="text-xl font-bold text-[#8B2635]">
                  {besoinFinancement.toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Apport personnel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">Apport personnel</h4>
          </div>
          
          <Input
            label="Montant de votre apport personnel (FCFA)"
            type="number"
            value={localData.apportPersonnel}
            onChange={(e) => handleApportChange(Number(e.target.value))}
            placeholder="Ex: 2000000"
            className="focus:border-[#751F20] focus:ring-[#751F20]/20"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-2">
            💡 Montant que vous investissez personnellement (épargne, biens propres, etc.)
          </p>
        </motion.div>

        {/* Sources de financement externes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-[#8B2635]" />
              <h4 className="text-lg font-semibold text-gray-900">Sources de financement externes</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={addSourceExterne}
              disabled={isLoading}
              className="border-[#8B2635]/30 text-[#8B2635] hover:bg-[#8B2635]/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>

          <div className="space-y-4">
            {localData.sourcesExternes.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900">Source #{index + 1}</h5>
                  {localData.sourcesExternes.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSourceExterne(index)}
                      disabled={isLoading}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Source de financement"
                      value={source.source}
                      onChange={(e) => updateSourceExterne(index, "source", e.target.value)}
                      placeholder="Ex: Prêt bancaire, Investisseur, Subvention..."
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Input
                      label="Montant (FCFA)"
                      type="number"
                      value={source.montant}
                      onChange={(e) => updateSourceExterne(index, "montant", Number(e.target.value))}
                      placeholder="Ex: 5000000"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {localData.sourcesExternes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aucune source externe ajoutée</p>
                <p className="text-sm">Cliquez sur "Ajouter" pour inclure des sources de financement</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Suggestions de sources de financement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">💡 Sources de financement possibles en Côte d'Ivoire</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-[#751F20] mb-2">Institutions financières</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Banques commerciales (SGBCI, BICICI, etc.)</li>
                <li>• Institutions de microfinance</li>
                <li>• Coopératives d'épargne et de crédit</li>
                <li>• Fonds de garantie (FGPME)</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-[#8B2635] mb-2">Programmes d'appui</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• AGEPE (Agence d'Études et de Promotion de l'Emploi)</li>
                <li>• FIDEN (Fonds Ivoirien de Développement de l'Entreprise)</li>
                <li>• Programmes de l'Union Européenne</li>
                <li>• Investisseurs privés/Business Angels</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Synthèse du plan de financement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl p-6 border border-[#751F20]/20"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Synthèse du plan de financement</h4>
          
          <div className="space-y-4">
            {/* Détail des sources */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Apport personnel :</span>
                  <span className="font-medium text-[#751F20]">
                    {localData.apportPersonnel.toLocaleString()} FCFA
                  </span>
                </div>
                
                {localData.sourcesExternes.map((source, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{source.source || `Source #${index + 1}`} :</span>
                    <span className="font-medium text-[#8B2635]">
                      {source.montant.toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">TOTAL FINANCEMENT :</span>
                    <span className="text-2xl font-bold text-[#751F20]">
                      {localData.total.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analyse de couverture */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-medium text-gray-900 mb-3">Analyse de couverture du besoin</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Besoin de financement :</span>
                    <span className="font-medium">{besoinFinancement.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Financement mobilisé :</span>
                    <span className="font-medium">{localData.total.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Écart :</span>
                    <span className={`${localData.total >= besoinFinancement ? 'text-green-600' : 'text-red-600'}`}>
                      {(localData.total - besoinFinancement).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Taux de couverture</p>
                    <p className={`text-3xl font-bold ${tauxCouverture >= 100 ? 'text-green-600' : 'text-orange-500'}`}>
                      {tauxCouverture}%
                    </p>
                  </div>
                </div>
              </div>

              {tauxCouverture >= 100 ? (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    ✅ Excellent ! Votre plan de financement couvre entièrement le besoin.
                  </p>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-700">
                    ⚠️ Attention : Il manque {(besoinFinancement - localData.total).toLocaleString()} FCFA pour couvrir entièrement le besoin.
                  </p>
                </div>
              )}
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
            localData.total > 0 && 
            localData.sourcesExternes.every(s => s.source.trim() !== "" && s.montant >= 0)
              ? "bg-green-500" 
              : "bg-yellow-500"
          }`}></div>
          <p className="text-sm text-gray-700">
            {localData.total > 0 && 
             localData.sourcesExternes.every(s => s.source.trim() !== "" && s.montant >= 0)
              ? "✅ Plan de financement défini - Vous pouvez passer à l'étape suivante"
              : "⏳ Complétez tous les champs pour valider cette étape"
            }
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page6PlanFinancementForm;
