import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, FileText, Plus, Trash2, DollarSign } from "lucide-react";
import Input from "../../UI/Input";
import Textarea from "../../UI/Textarea";
import Button from "../../UI/Button";
import { BusinessPlanData } from "../types/BusinessPlanTypes";

interface Page4CoutsFormProps {
  data: BusinessPlanData;
  onUpdate: (updates: Partial<BusinessPlanData>) => void;
  onValidate: (isValid: boolean) => void;
  isLoading?: boolean;
}

const Page4CoutsForm: React.FC<Page4CoutsFormProps> = ({
  data,
  onUpdate,
  onValidate,
  isLoading = false,
}) => {
  const [localData, setLocalData] = useState(data.coutsPredemarrage);

  // Calcul automatique du total
  useEffect(() => {
    const autresTotal = localData.autres.reduce((sum, item) => sum + item.montant, 0);
    const total = 
      localData.constitution +
      localData.autorisationLicence +
      localData.formation +
      localData.informationsProjet +
      localData.planAffaires +
      autresTotal;

    const updatedData = { ...localData, total };
    setLocalData(updatedData);
    onUpdate({ coutsPredemarrage: updatedData });
  }, [
    localData.constitution,
    localData.autorisationLicence,
    localData.formation,
    localData.informationsProjet,
    localData.planAffaires,
    localData.autres
  ]);

  // Validation en temps réel
  useEffect(() => {
    const isValid = 
      localData.constitution >= 0 &&
      localData.autorisationLicence >= 0 &&
      localData.formation >= 0 &&
      localData.informationsProjet >= 0 &&
      localData.planAffaires >= 0 &&
      localData.autres.every(item => item.description.trim() !== "" && item.montant >= 0) &&
      localData.total > 0;

    onValidate(isValid);
  }, [localData, onValidate]);

  // Mise à jour des données
  const handleChange = (field: keyof typeof localData, value: number) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
  };

  // Gestion des autres coûts
  const addAutreCout = () => {
    const newAutres = [...localData.autres, { description: "", montant: 0 }];
    const updatedData = { ...localData, autres: newAutres };
    setLocalData(updatedData);
  };

  const removeAutreCout = (index: number) => {
    const newAutres = localData.autres.filter((_, i) => i !== index);
    const updatedData = { ...localData, autres: newAutres };
    setLocalData(updatedData);
  };

  const updateAutreCout = (index: number, field: string, value: string | number) => {
    const newAutres = [...localData.autres];
    newAutres[index] = { ...newAutres[index], [field]: value };
    const updatedData = { ...localData, autres: newAutres };
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
        <div className="p-3 bg-gradient-to-r from-[#8B2635] to-[#751F20] rounded-xl text-white">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
            Les Coûts (avant démarrage)
          </h3>
          <p className="text-gray-600 text-sm">
            Estimez tous les coûts nécessaires avant le lancement de votre activité
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Coûts fixes CCI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Constitution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-[#751F20]" />
              <h4 className="text-lg font-semibold text-gray-900">Constitution</h4>
            </div>
            <Input
              label="Frais de constitution (FCFA)"
              type="number"
              value={localData.constitution}
              onChange={(e) => handleChange("constitution", Number(e.target.value))}
              placeholder="Ex: 50000"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Frais d'enregistrement, notaire, etc.
            </p>
          </motion.div>

          {/* Autorisation/Licence */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-[#8B2635]" />
              <h4 className="text-lg font-semibold text-gray-900">Autorisation/Licence</h4>
            </div>
            <Input
              label="Frais d'autorisation (FCFA)"
              type="number"
              value={localData.autorisationLicence}
              onChange={(e) => handleChange("autorisationLicence", Number(e.target.value))}
              placeholder="Ex: 25000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Licence commerciale, autorisation sanitaire, etc.
            </p>
          </motion.div>

          {/* Formation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-[#751F20]" />
              <h4 className="text-lg font-semibold text-gray-900">Formation</h4>
            </div>
            <Input
              label="Coût de formation (FCFA)"
              type="number"
              value={localData.formation}
              onChange={(e) => handleChange("formation", Number(e.target.value))}
              placeholder="Ex: 100000"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Formation technique, gestion, etc.
            </p>
          </motion.div>

          {/* Informations sur le projet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-[#8B2635]" />
              <h4 className="text-lg font-semibold text-gray-900">Informations projet</h4>
            </div>
            <Input
              label="Coût d'information (FCFA)"
              type="number"
              value={localData.informationsProjet}
              onChange={(e) => handleChange("informationsProjet", Number(e.target.value))}
              placeholder="Ex: 30000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Études de marché, conseils, etc.
            </p>
          </motion.div>

          {/* Plan d'affaires */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10 md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-[#751F20]" />
              <h4 className="text-lg font-semibold text-gray-900">Plan d'affaires</h4>
            </div>
            <Input
              label="Coût du plan d'affaires (FCFA)"
              type="number"
              value={localData.planAffaires}
              onChange={(e) => handleChange("planAffaires", Number(e.target.value))}
              placeholder="Ex: 75000"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Rédaction, consultation, validation du business plan
            </p>
          </motion.div>
        </div>

        {/* Autres coûts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-[#8B2635]" />
              <h4 className="text-lg font-semibold text-gray-900">Autres coûts</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={addAutreCout}
              disabled={isLoading}
              className="border-[#8B2635]/30 text-[#8B2635] hover:bg-[#8B2635]/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>

          <div className="space-y-4">
            {localData.autres.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900">Coût #{index + 1}</h5>
                  {localData.autres.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAutreCout(index)}
                      disabled={isLoading}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Textarea
                    label="Description"
                    value={item.description}
                    onChange={(e) => updateAutreCout(index, "description", e.target.value)}
                    placeholder="Ex: Assurance responsabilité civile"
                    rows={2}
                    disabled={isLoading}
                  />
                  <Input
                    label="Montant (FCFA)"
                    type="number"
                    value={item.montant}
                    onChange={(e) => updateAutreCout(index, "montant", Number(e.target.value))}
                    placeholder="Ex: 150000"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>
            ))}

            {localData.autres.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Aucun autre coût ajouté</p>
                <p className="text-sm">Cliquez sur "Ajouter" pour inclure d'autres frais</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Récapitulatif des coûts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl p-6 border border-[#751F20]/20"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif des coûts</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Constitution :</span>
                <span className="font-medium">{localData.constitution.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Autorisation/Licence :</span>
                <span className="font-medium">{localData.autorisationLicence.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Formation :</span>
                <span className="font-medium">{localData.formation.toLocaleString()} FCFA</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Informations projet :</span>
                <span className="font-medium">{localData.informationsProjet.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Plan d'affaires :</span>
                <span className="font-medium">{localData.planAffaires.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Autres coûts :</span>
                <span className="font-medium">
                  {localData.autres.reduce((sum, item) => sum + item.montant, 0).toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#751F20]/20 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">TOTAL :</span>
              <span className="text-2xl font-bold text-[#751F20]">
                {localData.total.toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de validation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl border border-[#751F20]/20"
      >
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            localData.total > 0 && 
            localData.autres.every(item => item.description.trim() !== "" && item.montant >= 0)
              ? "bg-green-500" 
              : "bg-yellow-500"
          }`}></div>
          <p className="text-sm text-gray-700">
            {localData.total > 0 && 
             localData.autres.every(item => item.description.trim() !== "" && item.montant >= 0)
              ? "✅ Coûts calculés - Vous pouvez passer à l'étape suivante"
              : "⏳ Complétez tous les champs pour valider cette étape"
            }
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page4CoutsForm;
