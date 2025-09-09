import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Wrench, Users, FileCheck, Plus, Trash2 } from "lucide-react";
import Input from "../../UI/Input";
import Textarea from "../../UI/Textarea";
import Button from "../../UI/Button";
import { BusinessPlanData } from "../types/BusinessPlanTypes";

interface Page3RessourcesFormProps {
  data: BusinessPlanData;
  onUpdate: (updates: Partial<BusinessPlanData>) => void;
  onValidate: (isValid: boolean) => void;
  isLoading?: boolean;
}

const Page3RessourcesForm: React.FC<Page3RessourcesFormProps> = ({
  data,
  onUpdate,
  onValidate,
  isLoading = false,
}) => {
  const [localData, setLocalData] = useState(data.ressources);

  // Validation en temps réel
  useEffect(() => {
    const isValid = 
      localData.equipements.trim() !== "" &&
      localData.enregistrement.trim() !== "" &&
      localData.employes.nombre >= 0 &&
      localData.machines.length > 0 &&
      localData.machines.every(m => m.nom.trim() !== "" && m.prix >= 0);

    onValidate(isValid);
  }, [localData]);

  // Mise à jour des données
  const handleChange = (field: keyof typeof localData, value: any) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdate({ ressources: updatedData });
  };

  // Gestion des machines
  const addMachine = () => {
    const newMachines = [...localData.machines, { nom: "", prix: 0, description: "" }];
    handleChange("machines", newMachines);
  };

  const removeMachine = (index: number) => {
    const newMachines = localData.machines.filter((_, i) => i !== index);
    handleChange("machines", newMachines);
  };

  const updateMachine = (index: number, field: string, value: string | number) => {
    const newMachines = [...localData.machines];
    newMachines[index] = { ...newMachines[index], [field]: value };
    handleChange("machines", newMachines);
  };

  // Calcul du coût total des machines
  const totalMachines = localData.machines.reduce((sum, machine) => sum + machine.prix, 0);

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
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
            Ressources Matérielles et Humaines
          </h3>
          <p className="text-gray-600 text-sm">
            Définissez les équipements, machines et ressources humaines nécessaires
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Équipements généraux */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Wrench className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">Équipements nécessaires</h4>
          </div>
          <Textarea
            label="Décrivez les équipements dont vous avez besoin"
            value={localData.equipements}
            onChange={(e) => handleChange("equipements", e.target.value)}
            placeholder="Ex: Tables, chaises, réfrigérateur, cuisinière, ustensiles de cuisine, caisse enregistreuse, mobilier de salle..."
            rows={4}
            className="focus:border-[#751F20] focus:ring-[#751F20]/20"
            disabled={isLoading}
          />
        </motion.div>

        {/* Section 2: Machines et matériel spécialisé */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-[#8B2635]" />
              <h4 className="text-lg font-semibold text-gray-900">Machines et matériel spécialisé</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={addMachine}
              disabled={isLoading}
              className="border-[#8B2635]/30 text-[#8B2635] hover:bg-[#8B2635]/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>

          <div className="space-y-4">
            {localData.machines.map((machine, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900">Machine #{index + 1}</h5>
                  {localData.machines.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMachine(index)}
                      disabled={isLoading}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nom de la machine/équipement"
                    value={machine.nom}
                    onChange={(e) => updateMachine(index, "nom", e.target.value)}
                    placeholder="Ex: Four professionnel"
                    disabled={isLoading}
                  />
                  <Input
                    label="Prix (FCFA)"
                    type="number"
                    value={machine.prix}
                    onChange={(e) => updateMachine(index, "prix", Number(e.target.value))}
                    placeholder="Ex: 500000"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mt-4">
                  <Textarea
                    label="Description et spécifications"
                    value={machine.description}
                    onChange={(e) => updateMachine(index, "description", e.target.value)}
                    placeholder="Ex: Four à gaz 6 feux avec plaque de cuisson, capacité 50L..."
                    rows={2}
                    disabled={isLoading}
                  />
                </div>
              </motion.div>
            ))}

            {/* Coût total des machines */}
            <div className="bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-lg p-4 border border-[#751F20]/20">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Coût total des machines :</span>
                <span className="text-xl font-bold text-[#751F20]">
                  {totalMachines.toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Enregistrement et formalités */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <FileCheck className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">Enregistrement et formalités</h4>
          </div>
          <Textarea
            label="Quelles sont les formalités d'enregistrement nécessaires ?"
            value={localData.enregistrement}
            onChange={(e) => handleChange("enregistrement", e.target.value)}
            placeholder="Ex: Registre du commerce, licence restaurant, autorisation sanitaire, déclaration fiscale, assurance responsabilité civile..."
            rows={4}
            className="focus:border-[#751F20] focus:ring-[#751F20]/20"
            disabled={isLoading}
          />
        </motion.div>

        {/* Section 4: Ressources humaines */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-[#8B2635]" />
            <h4 className="text-lg font-semibold text-gray-900">Ressources humaines</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Nombre d'employés prévus"
                type="number"
                value={localData.employes.nombre}
                onChange={(e) => handleChange("employes", { 
                  ...localData.employes, 
                  nombre: Number(e.target.value) 
                })}
                placeholder="Ex: 3"
                className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Input
                label="Coût salarial mensuel total (FCFA)"
                type="number"
                value={localData.employes.couts}
                onChange={(e) => handleChange("employes", { 
                  ...localData.employes, 
                  couts: Number(e.target.value) 
                })}
                placeholder="Ex: 450000"
                className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mt-4">
            <Textarea
              label="Détails des postes et compétences requises"
              value={localData.employes.details}
              onChange={(e) => handleChange("employes", { 
                ...localData.employes, 
                details: e.target.value 
              })}
              placeholder="Ex: 1 cuisinier expérimenté (200k), 1 serveur/caissier (150k), 1 aide-cuisine (100k)..."
              rows={3}
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
          </div>
        </motion.div>
      </div>

      {/* Indicateur de validation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl border border-[#751F20]/20"
      >
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            localData.equipements && localData.enregistrement && 
            localData.employes.nombre >= 0 && localData.machines.length > 0 &&
            localData.machines.every(m => m.nom && m.prix >= 0)
              ? "bg-green-500" 
              : "bg-yellow-500"
          }`}></div>
          <p className="text-sm text-gray-700">
            {localData.equipements && localData.enregistrement && 
             localData.employes.nombre >= 0 && localData.machines.length > 0 &&
             localData.machines.every(m => m.nom && m.prix >= 0)
              ? "✅ Ressources définies - Vous pouvez passer à l'étape suivante"
              : "⏳ Complétez tous les champs pour valider cette étape"
            }
          </p>
        </div>
        
        {/* Résumé des coûts */}
        <div className="mt-3 pt-3 border-t border-[#751F20]/20">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Coût machines :</span>
              <span className="font-semibold text-[#751F20] ml-2">
                {totalMachines.toLocaleString()} FCFA
              </span>
            </div>
            <div>
              <span className="text-gray-600">Salaires mensuels :</span>
              <span className="font-semibold text-[#8B2635] ml-2">
                {localData.employes.couts.toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page3RessourcesForm;
