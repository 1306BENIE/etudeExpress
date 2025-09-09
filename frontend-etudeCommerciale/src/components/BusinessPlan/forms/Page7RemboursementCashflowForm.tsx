import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Calendar, DollarSign, AlertCircle } from "lucide-react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { BusinessPlanData } from "../types/BusinessPlanTypes";

interface Page7RemboursementCashflowFormProps {
  data: BusinessPlanData;
  onUpdate: (updates: Partial<BusinessPlanData>) => void;
  onValidate: (isValid: boolean) => void;
  isLoading?: boolean;
}

const Page7RemboursementCashflowForm: React.FC<Page7RemboursementCashflowFormProps> = ({
  data,
  onUpdate,
  onValidate,
  isLoading = false,
}) => {
  const [localData, setLocalData] = useState(data.remboursementCashflow);

  // Calculs automatiques selon les formules CCI
  useEffect(() => {
    const { montantEmprunt, dureeAnnees, tauxInteret } = localData.planRemboursement;
    
    if (montantEmprunt > 0 && dureeAnnees > 0 && tauxInteret > 0) {
      // Formule A: Montant de l'emprunt (déjà saisi)
      const A = montantEmprunt;
      
      // Formule B: Durée en mois
      const B = dureeAnnees * 12;
      
      // Formule C: Taux mensuel
      const C = tauxInteret / 100 / 12;
      
      // Formule D: Remboursement mensuel
      const D = C > 0 ? (A * C * Math.pow(1 + C, B)) / (Math.pow(1 + C, B) - 1) : A / B;
      
      // Formule E: Intérêt total
      const E = (D * B) - A;
      
      // Formule F: Paiement total
      const F = A + E;

      const updatedPlan = {
        ...localData.planRemboursement,
        dureeMois: B,
        tauxMensuel: C * 100,
        remboursementMensuel: Math.round(D),
        interetTotal: Math.round(E),
        paiementTotal: Math.round(F)
      };

      const updatedData = { ...localData, planRemboursement: updatedPlan };
      setLocalData(updatedData);
      onUpdate({ remboursementCashflow: updatedData });
    }
  }, [localData.planRemboursement.montantEmprunt, localData.planRemboursement.dureeAnnees, localData.planRemboursement.tauxInteret, onUpdate]);

  // Calcul du cashflow mensuel
  useEffect(() => {
    const { ventesEstimees, coutVentes, chargesFixes } = localData.cashflowMensuel;
    
    const resultatBrut = ventesEstimees - coutVentes;
    const resultatNet = resultatBrut - chargesFixes;
    const cashflowNet = resultatNet - localData.planRemboursement.remboursementMensuel;

    const updatedCashflow = {
      ...localData.cashflowMensuel,
      resultatBrut,
      resultatNet,
      cashflowNet
    };

    const updatedData = { ...localData, cashflowMensuel: updatedCashflow };
    setLocalData(updatedData);
    onUpdate({ remboursementCashflow: updatedData });
  }, [
    localData.cashflowMensuel.ventesEstimees,
    localData.cashflowMensuel.coutVentes,
    localData.cashflowMensuel.chargesFixes,
    localData.planRemboursement.remboursementMensuel,
    onUpdate
  ]);

  // Validation en temps réel
  useEffect(() => {
    const isValid = 
      localData.planRemboursement.montantEmprunt > 0 &&
      localData.planRemboursement.dureeAnnees > 0 &&
      localData.planRemboursement.tauxInteret > 0 &&
      localData.cashflowMensuel.ventesEstimees > 0 &&
      localData.cashflowMensuel.coutVentes >= 0 &&
      localData.cashflowMensuel.chargesFixes >= 0;

    onValidate(isValid);
  }, [localData, onValidate]);

  // Mise à jour des données du plan de remboursement
  const updatePlanRemboursement = (field: string, value: number) => {
    const updatedPlan = { ...localData.planRemboursement, [field]: value };
    const updatedData = { ...localData, planRemboursement: updatedPlan };
    setLocalData(updatedData);
  };

  // Mise à jour des données du cashflow
  const updateCashflow = (field: string, value: number) => {
    const updatedCashflow = { ...localData.cashflowMensuel, [field]: value };
    const updatedData = { ...localData, cashflowMensuel: updatedCashflow };
    setLocalData(updatedData);
  };

  // Génération du tableau de remboursement sur 12 mois
  const generateTableauRemboursement = () => {
    const tableau = [];
    let capitalRestant = localData.planRemboursement.montantEmprunt;
    const remboursementMensuel = localData.planRemboursement.remboursementMensuel;
    const tauxMensuel = localData.planRemboursement.tauxMensuel / 100;

    for (let mois = 1; mois <= 12; mois++) {
      const interetMois = capitalRestant * tauxMensuel;
      const capitalMois = remboursementMensuel - interetMois;
      capitalRestant = Math.max(0, capitalRestant - capitalMois);

      tableau.push({
        mois,
        capitalRestant: Math.round(capitalRestant),
        interetMois: Math.round(interetMois),
        capitalMois: Math.round(capitalMois),
        remboursementMensuel: Math.round(remboursementMensuel)
      });
    }
    return tableau;
  };

  const tableauRemboursement = generateTableauRemboursement();

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
            Plan de Remboursement & Cashflow
          </h3>
          <p className="text-gray-600 text-sm">
            Calculez votre capacité de remboursement et analysez votre cashflow mensuel
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section Plan de Remboursement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl p-6 border border-[#751F20]/20"
        >
          <div className="flex items-center space-x-2 mb-6">
            <DollarSign className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">Plan de Remboursement d'Emprunt</h4>
          </div>

          {/* Paramètres de l'emprunt */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Input
              label="Montant de l'emprunt (FCFA)"
              type="number"
              value={localData.planRemboursement.montantEmprunt}
              onChange={(e) => updatePlanRemboursement("montantEmprunt", Number(e.target.value))}
              placeholder="Ex: 10000000"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Durée (années)"
              type="number"
              value={localData.planRemboursement.dureeAnnees}
              onChange={(e) => updatePlanRemboursement("dureeAnnees", Number(e.target.value))}
              placeholder="Ex: 5"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Taux d'intérêt annuel (%)"
              type="number"
              step="0.1"
              value={localData.planRemboursement.tauxInteret}
              onChange={(e) => updatePlanRemboursement("tauxInteret", Number(e.target.value))}
              placeholder="Ex: 12.5"
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
            />
          </div>

          {/* Résultats des calculs */}
          {localData.planRemboursement.montantEmprunt > 0 && (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h5 className="font-medium text-gray-900 mb-4">Résultats des calculs (Formules CCI A-F)</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="bg-[#751F20]/5 rounded-lg p-4">
                  <p className="text-gray-600">A - Montant emprunt</p>
                  <p className="text-lg font-bold text-[#751F20]">
                    {localData.planRemboursement.montantEmprunt.toLocaleString()} FCFA
                  </p>
                </div>
                
                <div className="bg-[#8B2635]/5 rounded-lg p-4">
                  <p className="text-gray-600">B - Durée (mois)</p>
                  <p className="text-lg font-bold text-[#8B2635]">
                    {localData.planRemboursement.dureeMois} mois
                  </p>
                </div>
                
                <div className="bg-[#751F20]/5 rounded-lg p-4">
                  <p className="text-gray-600">C - Taux mensuel</p>
                  <p className="text-lg font-bold text-[#751F20]">
                    {localData.planRemboursement.tauxMensuel.toFixed(3)}%
                  </p>
                </div>
                
                <div className="bg-[#8B2635]/5 rounded-lg p-4">
                  <p className="text-gray-600">D - Remboursement mensuel</p>
                  <p className="text-lg font-bold text-[#8B2635]">
                    {localData.planRemboursement.remboursementMensuel.toLocaleString()} FCFA
                  </p>
                </div>
                
                <div className="bg-[#751F20]/5 rounded-lg p-4">
                  <p className="text-gray-600">E - Intérêt total</p>
                  <p className="text-lg font-bold text-[#751F20]">
                    {localData.planRemboursement.interetTotal.toLocaleString()} FCFA
                  </p>
                </div>
                
                <div className="bg-[#8B2635]/5 rounded-lg p-4">
                  <p className="text-gray-600">F - Paiement total</p>
                  <p className="text-lg font-bold text-[#8B2635]">
                    {localData.planRemboursement.paiementTotal.toLocaleString()} FCFA
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Section Cashflow Mensuel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#8B2635]/10 to-[#751F20]/10 rounded-xl p-6 border border-[#8B2635]/20"
        >
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#8B2635]" />
            <h4 className="text-lg font-semibold text-gray-900">Analyse du Cashflow Mensuel</h4>
          </div>

          {/* Données d'entrée */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Input
              label="Ventes estimées mensuelles (FCFA)"
              type="number"
              value={localData.cashflowMensuel.ventesEstimees}
              onChange={(e) => updateCashflow("ventesEstimees", Number(e.target.value))}
              placeholder="Ex: 3000000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Coût des ventes (FCFA)"
              type="number"
              value={localData.cashflowMensuel.coutVentes}
              onChange={(e) => updateCashflow("coutVentes", Number(e.target.value))}
              placeholder="Ex: 1500000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
            
            <Input
              label="Charges fixes mensuelles (FCFA)"
              type="number"
              value={localData.cashflowMensuel.chargesFixes}
              onChange={(e) => updateCashflow("chargesFixes", Number(e.target.value))}
              placeholder="Ex: 800000"
              className="focus:border-[#8B2635] focus:ring-[#8B2635]/20"
              disabled={isLoading}
            />
          </div>

          {/* Résultats du cashflow */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h5 className="font-medium text-gray-900 mb-4">Analyse mensuelle du cashflow</h5>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Ventes estimées :</span>
                <span className="font-medium text-green-600">
                  +{localData.cashflowMensuel.ventesEstimees.toLocaleString()} FCFA
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Coût des ventes :</span>
                <span className="font-medium text-red-600">
                  -{localData.cashflowMensuel.coutVentes.toLocaleString()} FCFA
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200 bg-gray-50 px-4 rounded">
                <span className="font-medium text-gray-900">Résultat brut :</span>
                <span className={`font-bold ${localData.cashflowMensuel.resultatBrut >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {localData.cashflowMensuel.resultatBrut.toLocaleString()} FCFA
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Charges fixes :</span>
                <span className="font-medium text-red-600">
                  -{localData.cashflowMensuel.chargesFixes.toLocaleString()} FCFA
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200 bg-gray-50 px-4 rounded">
                <span className="font-medium text-gray-900">Résultat net :</span>
                <span className={`font-bold ${localData.cashflowMensuel.resultatNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {localData.cashflowMensuel.resultatNet.toLocaleString()} FCFA
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Remboursement emprunt :</span>
                <span className="font-medium text-red-600">
                  -{localData.planRemboursement.remboursementMensuel.toLocaleString()} FCFA
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-2 border-[#751F20] bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 px-4 rounded-lg">
                <span className="text-lg font-bold text-gray-900">CASHFLOW NET :</span>
                <span className={`text-2xl font-bold ${localData.cashflowMensuel.cashflowNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {localData.cashflowMensuel.cashflowNet.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* Alerte si cashflow négatif */}
            {localData.cashflowMensuel.cashflowNet < 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700 font-medium">
                    Attention : Cashflow négatif !
                  </p>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  Votre entreprise ne génère pas assez de liquidités pour couvrir le remboursement. 
                  Considérez augmenter les ventes, réduire les coûts ou renégocier les conditions d'emprunt.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tableau de remboursement sur 12 mois */}
        {localData.planRemboursement.montantEmprunt > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-5 h-5 text-[#751F20]" />
              <h4 className="text-lg font-semibold text-gray-900">Tableau de Remboursement (12 premiers mois)</h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#751F20] to-[#8B2635] text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Mois</th>
                    <th className="px-4 py-3 text-right">Capital Restant</th>
                    <th className="px-4 py-3 text-right">Intérêt</th>
                    <th className="px-4 py-3 text-right">Capital</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Remboursement</th>
                  </tr>
                </thead>
                <tbody>
                  {tableauRemboursement.map((ligne, index) => (
                    <tr key={ligne.mois} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}>
                      <td className="px-4 py-3 font-medium">Mois {ligne.mois}</td>
                      <td className="px-4 py-3 text-right">{ligne.capitalRestant.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-red-600">{ligne.interetMois.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-blue-600">{ligne.capitalMois.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-medium">{ligne.remboursementMensuel.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Indicateur de validation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-4 bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl border border-[#751F20]/20"
      >
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            localData.planRemboursement.montantEmprunt > 0 &&
            localData.planRemboursement.dureeAnnees > 0 &&
            localData.planRemboursement.tauxInteret > 0 &&
            localData.cashflowMensuel.ventesEstimees > 0
              ? "bg-green-500" 
              : "bg-yellow-500"
          }`}></div>
          <p className="text-sm text-gray-700">
            {localData.planRemboursement.montantEmprunt > 0 &&
             localData.planRemboursement.dureeAnnees > 0 &&
             localData.planRemboursement.tauxInteret > 0 &&
             localData.cashflowMensuel.ventesEstimees > 0
              ? "✅ Plan de remboursement et cashflow calculés - Vous pouvez passer à l'étape suivante"
              : "⏳ Complétez tous les paramètres pour valider cette étape"
            }
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page7RemboursementCashflowForm;
