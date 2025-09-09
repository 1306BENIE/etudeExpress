import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Users, MapPin, Megaphone, DollarSign, Package, Building } from "lucide-react";
import Input from "../../UI/Input";
import Textarea from "../../UI/Textarea";
import { BusinessPlanData } from "../types/BusinessPlanTypes";

interface Page2MarcheFormProps {
  data: BusinessPlanData;
  onUpdate: (updates: Partial<BusinessPlanData>) => void;
  onValidate: (isValid: boolean) => void;
  isLoading?: boolean;
}

const Page2MarcheForm: React.FC<Page2MarcheFormProps> = ({
  data,
  onUpdate,
  onValidate,
  isLoading = false,
}) => {
  const [localData, setLocalData] = useState(data.marche);

  // Validation en temps réel
  useEffect(() => {
    const isValid = 
      localData.produit.trim() !== "" &&
      localData.prix.trim() !== "" &&
      localData.place.trim() !== "" &&
      localData.promotion.trim() !== "" &&
      localData.clients > 0 &&
      localData.fournitures.trim() !== "" &&
      localData.concurrents.trim() !== "";

    onValidate(isValid);
  }, [localData]);

  // Mise à jour des données
  const handleChange = (field: keyof typeof localData, value: string | number) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdate({ marche: updatedData });
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
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
            Le Marché - 4P Marketing
          </h3>
          <p className="text-gray-600 text-sm">
            Analysez votre marché selon la méthode des 4P (Produit, Prix, Place, Promotion)
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Produit */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Package className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">1. Produit</h4>
          </div>
          <Textarea
            label="Décrivez votre produit ou service"
            value={localData.produit}
            onChange={(e) => handleChange("produit", e.target.value)}
            placeholder="Ex: Restaurant proposant des plats traditionnels ivoiriens authentiques avec des ingrédients locaux de qualité..."
            rows={4}
            className="focus:border-[#751F20] focus:ring-[#751F20]/20"
            disabled={isLoading}
          />
        </motion.div>

        {/* Section 2: Prix */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-5 h-5 text-[#8B2635]" />
            <h4 className="text-lg font-semibold text-gray-900">2. Prix</h4>
          </div>
          <Input
            label="Stratégie de prix"
            value={localData.prix}
            onChange={(e) => handleChange("prix", e.target.value)}
            placeholder="Ex: Menu complet à 2500 FCFA, plat unique à 1500 FCFA"
            className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
            disabled={isLoading}
          />
        </motion.div>

        {/* Section 3: Place */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">3. Place (Lieu d'installation)</h4>
          </div>
          <Textarea
            label="Où allez-vous vous installer et pourquoi ?"
            value={localData.place}
            onChange={(e) => handleChange("place", e.target.value)}
            placeholder="Ex: Zone commerciale de Cocody, proche des bureaux et universités, forte affluence à midi..."
            rows={3}
            className="focus:border-[#751F20] focus:ring-[#751F20]/20"
            disabled={isLoading}
          />
        </motion.div>

        {/* Section 4: Promotion */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Megaphone className="w-5 h-5 text-[#8B2635]" />
            <h4 className="text-lg font-semibold text-gray-900">4. Promotion</h4>
          </div>
          <Textarea
            label="Comment allez-vous faire votre promotion ?"
            value={localData.promotion}
            onChange={(e) => handleChange("promotion", e.target.value)}
            placeholder="Ex: Réseaux sociaux, bouche-à-oreille, partenariats avec entreprises locales, offres de lancement..."
            rows={4}
            className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
            disabled={isLoading}
          />
        </motion.div>

        {/* Section 5: Clientèle cible */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">Clientèle cible</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre de clients estimé par mois"
              type="number"
              value={localData.clients}
              onChange={(e) => handleChange("clients", Number(e.target.value))}
              placeholder="Ex: 450"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mt-2">
                💡 <strong>Conseil CCI :</strong> Basez-vous sur l'analyse de votre zone de chalandise et la fréquentation observée.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 6: Fournitures */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Package className="w-5 h-5 text-[#8B2635]" />
            <h4 className="text-lg font-semibold text-gray-900">Fournitures et approvisionnement</h4>
          </div>
          <Textarea
            label="Comment allez-vous vous approvisionner en biens et services ?"
            value={localData.fournitures}
            onChange={(e) => handleChange("fournitures", e.target.value)}
            placeholder="Ex: Marché de gros d'Adjamé pour les légumes, fournisseurs locaux de viande, partenariat avec producteurs locaux..."
            rows={4}
            className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
            disabled={isLoading}
          />
        </motion.div>

        {/* Section 7: Concurrence */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Building className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">Analyse de la concurrence</h4>
          </div>
          <Textarea
            label="Comment allez-vous vous positionner face à la concurrence ?"
            value={localData.concurrents}
            onChange={(e) => handleChange("concurrents", e.target.value)}
            placeholder="Ex: Différenciation par l'authenticité des recettes, service plus rapide, prix compétitifs, ambiance conviviale..."
            rows={4}
            className="focus:border-[#751F20] focus:ring-[#751F20]/20"
            disabled={isLoading}
          />
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
            localData.produit && localData.prix && localData.place && 
            localData.promotion && localData.clients > 0 && 
            localData.fournitures && localData.concurrents
              ? "bg-green-500" 
              : "bg-yellow-500"
          }`}></div>
          <p className="text-sm text-gray-700">
            {localData.produit && localData.prix && localData.place && 
             localData.promotion && localData.clients > 0 && 
             localData.fournitures && localData.concurrents
              ? "✅ Analyse de marché complète - Vous pouvez passer à l'étape suivante"
              : "⏳ Complétez tous les champs pour valider cette étape"
            }
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page2MarcheForm;
