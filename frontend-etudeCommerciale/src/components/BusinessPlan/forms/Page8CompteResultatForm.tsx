import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Calendar, Calculator } from "lucide-react";
import Input from "../../UI/Input";
import { BusinessPlanData } from "../types/BusinessPlanTypes";

interface Page8CompteResultatFormProps {
  data: BusinessPlanData;
  onUpdate: (updates: Partial<BusinessPlanData>) => void;
  onValidate: (isValid: boolean) => void;
  isLoading?: boolean;
}

const Page8CompteResultatForm: React.FC<Page8CompteResultatFormProps> = ({
  data,
  onUpdate,
  onValidate,
  isLoading = false,
}) => {
  const [localData, setLocalData] = useState(data.compteResultat);

  // Calculs automatiques pour chaque mois
  useEffect(() => {
    const updatedMois = localData.mois.map((mois: any) => {
      // Calcul du coût total des ventes
      const coutTotal = mois.coutVentes.achatMatieresPremières + 
                       mois.coutVentes.autresCouts + 
                       mois.coutVentes.mainOeuvre;

      // Calcul du résultat brut
      const resultatBrut = mois.totalVentes - coutTotal;

      // Calcul du total des charges fixes
      const totalCharges = mois.chargesFixes.loyer + 
                          mois.chargesFixes.electricite + 
                          mois.chargesFixes.eau + 
                          mois.chargesFixes.telephone + 
                          mois.chargesFixes.transport + 
                          mois.chargesFixes.salaires + 
                          mois.chargesFixes.autres;

      // Calcul du résultat net
      const resultatNet = resultatBrut - totalCharges;

      return {
        ...mois,
        coutVentes: { ...mois.coutVentes, total: coutTotal },
        resultatBrut,
        chargesFixes: { ...mois.chargesFixes, total: totalCharges },
        resultatNet
      };
    });

    // Calcul des totaux annuels
    const totauxAnnuels = {
      totalVentes: updatedMois.reduce((sum: number, mois: any) => sum + mois.totalVentes, 0),
      coutTotal: updatedMois.reduce((sum: number, mois: any) => sum + mois.coutVentes.total, 0),
      resultatBrut: updatedMois.reduce((sum: number, mois: any) => sum + mois.resultatBrut, 0),
      totalCharges: updatedMois.reduce((sum: number, mois: any) => sum + mois.chargesFixes.total, 0),
      resultatNet: updatedMois.reduce((sum: number, mois: any) => sum + mois.resultatNet, 0)
    };

    const updatedData = { 
      ...localData, 
      mois: updatedMois,
      totauxAnnuels 
    };
    
    setLocalData(updatedData);
    onUpdate({ compteResultat: updatedData });
  }, [localData.mois]);

  // Validation en temps réel
  useEffect(() => {
    const isValid = localData.mois.every((mois: any) => 
      mois.totalVentes >= 0 &&
      mois.coutVentes.achatMatieresPremières >= 0 &&
      mois.coutVentes.autresCouts >= 0 &&
      mois.coutVentes.mainOeuvre >= 0 &&
      mois.chargesFixes.loyer >= 0 &&
      mois.chargesFixes.electricite >= 0 &&
      mois.chargesFixes.eau >= 0 &&
      mois.chargesFixes.telephone >= 0 &&
      mois.chargesFixes.transport >= 0 &&
      mois.chargesFixes.salaires >= 0 &&
      mois.chargesFixes.autres >= 0
    );

    onValidate(isValid);
  }, [localData]);

  // Mise à jour d'une valeur pour un mois donné
  const updateMoisValue = (moisIndex: number, section: string, field: string, value: number) => {
    const updatedMois = [...localData.mois];
    
    if (section === "totalVentes") {
      updatedMois[moisIndex] = { ...updatedMois[moisIndex], totalVentes: value };
    } else if (section === "coutVentes") {
      updatedMois[moisIndex] = {
        ...updatedMois[moisIndex],
        coutVentes: { ...updatedMois[moisIndex].coutVentes, [field]: value }
      };
    } else if (section === "chargesFixes") {
      updatedMois[moisIndex] = {
        ...updatedMois[moisIndex],
        chargesFixes: { ...updatedMois[moisIndex].chargesFixes, [field]: value }
      };
    }

    const updatedData = { ...localData, mois: updatedMois };
    setLocalData(updatedData);
  };

  // Copier les valeurs d'un mois vers tous les autres
  const copyToAllMonths = (moisSource: number) => {
    const sourceData = localData.mois[moisSource];
    const updatedMois = localData.mois.map((_: any, index: number) => 
      index === 0 ? sourceData : { ...sourceData, mois: moisNoms[index] }
    );
    
    const updatedData = { ...localData, mois: updatedMois };
    setLocalData(updatedData);
  };

  const moisNoms = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

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
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
            Compte de Résultat Prévisionnel
          </h3>
          <p className="text-gray-600 text-sm">
            Prévisions mensuelles de ventes, coûts et résultats sur 12 mois
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Synthèse annuelle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-xl p-6 border border-[#751F20]/20"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Calculator className="w-5 h-5 text-[#751F20]" />
            <h4 className="text-lg font-semibold text-gray-900">Synthèse Annuelle</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <p className="text-sm text-gray-600">Total Ventes</p>
              <p className="text-xl font-bold text-green-600">
                {(localData as any).totauxAnnuels?.totalVentes?.toLocaleString() || '0'} FCFA
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <p className="text-sm text-gray-600">Coût Total</p>
              <p className="text-xl font-bold text-red-600">
                {(localData as any).totauxAnnuels?.coutTotal?.toLocaleString() || '0'} FCFA
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <p className="text-sm text-gray-600">Résultat Brut</p>
              <p className={`text-xl font-bold ${((localData as any).totauxAnnuels?.resultatBrut || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(localData as any).totauxAnnuels?.resultatBrut?.toLocaleString() || '0'} FCFA
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <p className="text-sm text-gray-600">Charges Fixes</p>
              <p className="text-xl font-bold text-orange-600">
                {(localData as any).totauxAnnuels?.totalCharges?.toLocaleString() || '0'} FCFA
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <p className="text-sm text-gray-600">Résultat Net</p>
              <p className={`text-2xl font-bold ${((localData as any).totauxAnnuels?.resultatNet || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(localData as any).totauxAnnuels?.resultatNet?.toLocaleString() || '0'} FCFA
              </p>
            </div>
          </div>

          {/* Indicateurs de performance */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Marge Brute</p>
              <p className="text-lg font-bold text-blue-600">
                {((localData as any).totauxAnnuels?.totalVentes || 0) > 0 
                  ? (((localData as any).totauxAnnuels?.resultatBrut || 0) / ((localData as any).totauxAnnuels?.totalVentes || 1) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Marge Nette</p>
              <p className="text-lg font-bold text-purple-600">
                {((localData as any).totauxAnnuels?.totalVentes || 0) > 0 
                  ? (((localData as any).totauxAnnuels?.resultatNet || 0) / ((localData as any).totauxAnnuels?.totalVentes || 1) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Seuil de Rentabilité</p>
              <p className="text-lg font-bold text-indigo-600">
                {((localData as any).totauxAnnuels?.resultatNet || 0) >= 0 ? "Atteint" : "Non atteint"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tableau détaillé mensuel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#8B2635]/5 to-[#751F20]/5 rounded-xl p-6 border border-[#8B2635]/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#8B2635]" />
              <h4 className="text-lg font-semibold text-gray-900">Prévisions Mensuelles Détaillées</h4>
            </div>
            <button
              onClick={() => copyToAllMonths(0)}
              className="text-sm bg-[#751F20] text-white px-4 py-2 rounded-lg hover:bg-[#8B2635] transition-colors"
              disabled={isLoading}
            >
              Copier Janvier vers tous
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="space-y-6">
              {localData.mois.map((mois: any, moisIndex: number) => (
                <div key={moisIndex} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <span className="w-8 h-8 bg-gradient-to-r from-[#751F20] to-[#8B2635] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {moisIndex + 1}
                    </span>
                    <span>{moisNoms[moisIndex]}</span>
                  </h5>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Ventes */}
                    <div className="space-y-4">
                      <h6 className="font-medium text-green-700 border-b border-green-200 pb-2">VENTES</h6>
                      <Input
                        label="Total Ventes (FCFA)"
                        type="number"
                        value={mois.totalVentes}
                        onChange={(e) => updateMoisValue(moisIndex, "totalVentes", "", Number(e.target.value))}
                        placeholder="Ex: 2500000"
                        className="focus:border-green-500 focus:ring-green-500/20"
                        disabled={isLoading}
                      />
                    </div>

                    {/* Coûts des ventes */}
                    <div className="space-y-4">
                      <h6 className="font-medium text-red-700 border-b border-red-200 pb-2">COÛT DES VENTES</h6>
                      <Input
                        label="Achat matières premières"
                        type="number"
                        value={mois.coutVentes.achatMatieresPremières}
                        onChange={(e) => updateMoisValue(moisIndex, "coutVentes", "achatMatieresPremières", Number(e.target.value))}
                        placeholder="Ex: 800000"
                        className="focus:border-red-500 focus:ring-red-500/20"
                        disabled={isLoading}
                      />
                      <Input
                        label="Autres coûts"
                        type="number"
                        value={mois.coutVentes.autresCouts}
                        onChange={(e) => updateMoisValue(moisIndex, "coutVentes", "autresCouts", Number(e.target.value))}
                        placeholder="Ex: 200000"
                        className="focus:border-red-500 focus:ring-red-500/20"
                        disabled={isLoading}
                      />
                      <Input
                        label="Main d'œuvre"
                        type="number"
                        value={mois.coutVentes.mainOeuvre}
                        onChange={(e) => updateMoisValue(moisIndex, "coutVentes", "mainOeuvre", Number(e.target.value))}
                        placeholder="Ex: 300000"
                        className="focus:border-red-500 focus:ring-red-500/20"
                        disabled={isLoading}
                      />
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <p className="text-sm text-red-700">
                          <strong>Total Coût:</strong> {mois.coutVentes.total.toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>

                    {/* Charges fixes */}
                    <div className="space-y-4">
                      <h6 className="font-medium text-orange-700 border-b border-orange-200 pb-2">CHARGES FIXES</h6>
                      <Input
                        label="Loyer"
                        type="number"
                        value={mois.chargesFixes.loyer}
                        onChange={(e) => updateMoisValue(moisIndex, "chargesFixes", "loyer", Number(e.target.value))}
                        placeholder="Ex: 150000"
                        className="focus:border-orange-500 focus:ring-orange-500/20"
                        disabled={isLoading}
                      />
                      <Input
                        label="Électricité"
                        type="number"
                        value={mois.chargesFixes.electricite}
                        onChange={(e) => updateMoisValue(moisIndex, "chargesFixes", "electricite", Number(e.target.value))}
                        placeholder="Ex: 80000"
                        className="focus:border-orange-500 focus:ring-orange-500/20"
                        disabled={isLoading}
                      />
                      <Input
                        label="Eau"
                        type="number"
                        value={mois.chargesFixes.eau}
                        onChange={(e) => updateMoisValue(moisIndex, "chargesFixes", "eau", Number(e.target.value))}
                        placeholder="Ex: 25000"
                        className="focus:border-orange-500 focus:ring-orange-500/20"
                        disabled={isLoading}
                      />
                      <Input
                        label="Téléphone"
                        type="number"
                        value={mois.chargesFixes.telephone}
                        onChange={(e) => updateMoisValue(moisIndex, "chargesFixes", "telephone", Number(e.target.value))}
                        placeholder="Ex: 30000"
                        className="focus:border-orange-500 focus:ring-orange-500/20"
                        disabled={isLoading}
                      />
                      <Input
                        label="Transport"
                        type="number"
                        value={mois.chargesFixes.transport}
                        onChange={(e) => updateMoisValue(moisIndex, "chargesFixes", "transport", Number(e.target.value))}
                        placeholder="Ex: 100000"
                        className="focus:border-orange-500 focus:ring-orange-500/20"
                        disabled={isLoading}
                      />
                      <Input
                        label="Salaires"
                        type="number"
                        value={mois.chargesFixes.salaires}
                        onChange={(e) => updateMoisValue(moisIndex, "chargesFixes", "salaires", Number(e.target.value))}
                        placeholder="Ex: 400000"
                        className="focus:border-orange-500 focus:ring-orange-500/20"
                        disabled={isLoading}
                      />
                      <Input
                        label="Autres charges"
                        type="number"
                        value={mois.chargesFixes.autres}
                        onChange={(e) => updateMoisValue(moisIndex, "chargesFixes", "autres", Number(e.target.value))}
                        placeholder="Ex: 50000"
                        className="focus:border-orange-500 focus:ring-orange-500/20"
                        disabled={isLoading}
                      />
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-700">
                          <strong>Total Charges:</strong> {mois.chargesFixes.total.toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Résultats du mois */}
                  <div className="mt-6 bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 rounded-lg p-4 border border-[#751F20]/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Résultat Brut</p>
                        <p className={`text-lg font-bold ${mois.resultatBrut >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {mois.resultatBrut.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Marge Brute</p>
                        <p className="text-lg font-bold text-blue-600">
                          {mois.totalVentes > 0 ? ((mois.resultatBrut / mois.totalVentes) * 100).toFixed(1) : 0}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Résultat Net</p>
                        <p className={`text-xl font-bold ${mois.resultatNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {mois.resultatNet.toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Conseils et recommandations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#751F20]/5 to-[#8B2635]/5 rounded-xl p-6 border border-[#751F20]/10"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">💡 Conseils pour optimiser votre compte de résultat</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-[#751F20] mb-2">Améliorer la rentabilité</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Négocier de meilleurs prix avec les fournisseurs</li>
                <li>• Optimiser les processus de production</li>
                <li>• Diversifier l'offre de produits/services</li>
                <li>• Améliorer la stratégie de prix</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-[#8B2635] mb-2">Contrôler les coûts</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Surveiller régulièrement les charges fixes</li>
                <li>• Automatiser certaines tâches</li>
                <li>• Négocier les contrats (loyer, électricité, etc.)</li>
                <li>• Optimiser la gestion des stocks</li>
              </ul>
            </div>
          </div>
        </motion.div>
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
            localData.mois.every((mois: any) => mois.totalVentes > 0)
              ? "bg-green-500" 
              : "bg-yellow-500"
          }`}></div>
          <p className="text-sm text-gray-700">
            {localData.mois.every((mois: any) => mois.totalVentes > 0)
              ? "✅ Compte de résultat prévisionnel complété - Votre étude commerciale est terminée !"
              : "⏳ Complétez les prévisions mensuelles pour finaliser votre étude"
            }
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page8CompteResultatForm;
