import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Download,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Presentation,
} from "lucide-react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Textarea from "../components/UI/Textarea";
import Modal from "../components/UI/Modal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

// Architecture modulaire - Composants Business Plan
import {
  BusinessPlanData,
  MOIS_ANNEE,
  SECTEURS_ACTIVITE,
  VILLES_COTE_IVOIRE,
} from "../components/BusinessPlan/types/BusinessPlanTypes";
import BusinessPlanNavigation from "../components/BusinessPlan/shared/BusinessPlanNavigation";
import { BusinessPlanCalculations } from "../components/BusinessPlan/shared/CalculationUtils";
import Page1IdeeForm from "../components/BusinessPlan/forms/Page1IdeeForm";
import Page2MarcheForm from "../components/BusinessPlan/forms/Page2MarcheForm";
import Page3RessourcesForm from "../components/BusinessPlan/forms/Page3RessourcesForm";
import Page4CoutsForm from "../components/BusinessPlan/forms/Page4CoutsForm";
import Page5FinancementGlobalForm from "../components/BusinessPlan/forms/Page5FinancementGlobalForm";
import Page6PlanFinancementForm from "../components/BusinessPlan/forms/Page6PlanFinancementForm";
import Page7RemboursementCashflowForm from "../components/BusinessPlan/forms/Page7RemboursementCashflowForm";
import Page8CompteResultatForm from "../components/BusinessPlan/forms/Page8CompteResultatForm";

// Configuration des pages - Architecture modulaire
import { PAGES_CONFIG, TOTAL_PAGES } from "../components/BusinessPlan/config/PagesConfig";

const BusinessPlanPage: React.FC = () => {
  const {} = useAuth();
  const navigate = useNavigate();
  const {} = useParams<{ id: string }>();

  // États locaux
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");
  const [completedPages, setCompletedPages] = useState<number[]>([]);
  const [pageValidations, setPageValidations] = useState<
    Record<number, boolean>
  >({});

  // État du formulaire - Structure CCI optimisée
  const [formData, setFormData] = useState<BusinessPlanData>({
    id: "",
    titre: "",
    secteur: "",
    localisation: "",
    statut: "brouillon",

    // PAGE 1: L'IDÉE (CCI)
    idee: {
      description: "",
      specificite: "",
      proprietaires: [
        {
          nom: "",
          fonction: "",
          experience: "",
        },
      ],
    },

    // PAGE 2: LE MARCHÉ (4P Marketing CCI)
    marche: {
      produit: "",
      prix: "",
      fournitures: "",
      promotion: "",
      clients: 0,
      place: "",
      concurrents: "",
    },

    // PAGE 3: RESSOURCES MATÉRIELLES ET HUMAINES (CCI)
    ressources: {
      equipements: "",
      machines: [
        {
          nom: "",
          prix: 0,
          description: "",
        },
      ],
      enregistrement: "",
      employes: {
        nombre: 0,
        couts: 0,
        details: "",
      },
    },

    // PAGE 4: LES COÛTS (avant démarrage) - CCI
    coutsPredemarrage: {
      constitution: 0,
      autorisationLicence: 0,
      formation: 0,
      informationsProjet: 0,
      planAffaires: 0,
      autres: [
        {
          description: "",
          montant: 0,
        },
      ],
      total: 0,
    },

    // PAGE 5: FINANCEMENT GLOBAL (Pages 7+8 CCI regroupées)
    financementGlobal: {
      depensesAvantDemarrage: 0,
      immobilisations: {
        terrain: 0,
        construction: 0,
        materiel: 0,
        outillage: 0,
        vehicules: 0,
        total: 0,
      },
      fondsRoulement3Mois: {
        salaires: 0,
        prelevementEntrepreneur: 0,
        coutsMarketing: 0,
        matieresPremières: 0,
        total: 0,
      },
      coutTotalProjet: 0,
      apportPersonnel: 0,
      besoinFinancement: 0,
    },

    // PAGE 6: PLAN DE FINANCEMENT (CCI)
    planFinancement: {
      apportPersonnel: 0,
      sourcesExternes: [
        {
          source: "",
          montant: 0,
        },
      ],
      total: 0,
    },

    // PAGE 7: REMBOURSEMENT & CASHFLOW (Pages 10+11 CCI regroupées)
    remboursementCashflow: {
      planRemboursement: {
        montantEmprunt: 0,
        dureeAnnees: 0,
        dureeMois: 0,
        tauxInteret: 0,
        tauxMensuel: 0,
        remboursementMensuel: 0,
        interetTotal: 0,
        paiementTotal: 0,
      },
      cashflowMensuel: {
        ventesEstimees: 0,
        coutVentes: 0,
        chargesFixes: 0,
        resultatBrut: 0,
        resultatNet: 0,
        cashflowNet: 0,
      },
    },

    // PAGE 8: COMPTE DE RÉSULTAT PRÉVISIONNEL (CCI)
    compteResultat: {
      mois: MOIS_ANNEE.map((mois) => ({
        mois,
        totalVentes: 0,
        coutVentes: {
          achatMatieresPremières: 0,
          autresCouts: 0,
          mainOeuvre: 0,
          total: 0,
        },
        resultatBrut: 0,
        chargesFixes: {
          loyer: 0,
          electricite: 0,
          eau: 0,
          telephone: 0,
          transport: 0,
          salaires: 0,
          autres: 0,
          total: 0,
        },
        resultatNet: 0,
      })),
    },
  });

  // Validation des pages selon nouvelle structure CCI
  const isPageCompleted = (pageId: number) => {
    const validation = BusinessPlanCalculations.validatePage(pageId, formData);
    return validation.isValid;
  };

  // Mise à jour des pages complétées
  React.useEffect(() => {
    const completed = [];
    for (let i = 1; i <= TOTAL_PAGES; i++) {
      if (isPageCompleted(i)) {
        completed.push(i);
      }
    }
    setCompletedPages(completed);
  }, [formData]);

  // Gestionnaire de mise à jour des données
  const handleDataUpdate = useCallback((updates: Partial<BusinessPlanData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  // Gestionnaire de validation des pages
  const handlePageValidation = useCallback((pageNumber: number, isValid: boolean) => {
    setPageValidations(prev => ({ ...prev, [pageNumber]: isValid }));
  }, []);

  // Navigation entre pages
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= TOTAL_PAGES) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  // Calcul de la progression
  const calculateProgress = () => {
    return Math.round((completedPages.length / TOTAL_PAGES) * 100);
  };


  // Sauvegarde automatique
  const saveBusinessPlan = async () => {
    setIsSaving(true);
    try {
      // TODO: Implémenter la sauvegarde via API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Business plan sauvegardé avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  // Assistant IA
  const askAssistant = async () => {
    setShowAssistant(true);
    setAssistantMessage("L'assistant IA analyse votre question...");

    try {
      // TODO: Implémenter l'appel à l'API IA
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAssistantMessage(
        "Voici une suggestion basée sur votre contexte : [Réponse IA]"
      );
    } catch (error) {
      setAssistantMessage(
        "Désolé, l'assistant n'est pas disponible pour le moment."
      );
    }
  };

  // Export PDF
  const exportPDF = async () => {
    setIsLoading(true);
    try {
      // TODO: Implémenter l'export PDF
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("PDF généré avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la génération du PDF");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBE3DA] via-white to-[#FBE3DA]">
      {/* Header avec progression */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg border-b border-[#751F20]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg text-[#751F20] hover:bg-[#751F20]/10 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
                  Business Plan - {formData.titre || "Nouveau projet"}
                </h1>
                <p className="text-sm text-gray-600">
                  Étape {currentPage} sur 12 • {calculateProgress()}% complété
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => askAssistant()}
                disabled={isLoading}
                className="border-[#751F20]/30 text-[#751F20] hover:bg-[#751F20]/10"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Assistant IA
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={saveBusinessPlan}
                disabled={isSaving}
                className="border-[#751F20]/30 text-[#751F20] hover:bg-[#751F20]/10"
              >
                {isSaving ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Sauvegarder
              </Button>

              <Button
                size="sm"
                onClick={exportPDF}
                disabled={isLoading}
                className="!bg-gradient-to-r from-[#751F20] to-[#8B2635] hover:from-[#5a1618] hover:to-[#6b1e2a] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Exporter PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#751F20]/10 p-6 sticky top-4">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-[#751F20] to-[#8B2635] rounded-full"></div>
                <h3 className="font-bold text-gray-900">Navigation</h3>
              </div>

              <nav className="space-y-3">
                {PAGES_CONFIG.map((page) => {
                  const isCompleted = isPageCompleted(page.id);
                  const isCurrent = currentPage === page.id;

                  return (
                    <motion.button
                      key={page.id}
                      onClick={() => goToPage(page.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                        isCurrent
                          ? "bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 text-[#751F20] border-2 border-[#751F20]/20 shadow-md"
                          : "text-gray-600 hover:bg-gray-50 border-2 border-transparent hover:border-[#751F20]/10"
                      }`}
                    >
                      {/* Contenu principal */}
                      <div className="flex items-center space-x-3">
                        {/* Icône à gauche */}
                        <div
                          className={`flex-shrink-0 transition-colors ${
                            isCurrent
                              ? "text-[#751F20]"
                              : isCompleted
                              ? "text-[#751F20]"
                              : "text-gray-400 group-hover:text-[#751F20]"
                          }`}
                        >
                          <div className="w-5 h-5 bg-current rounded"></div>
                        </div>

                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-semibold truncate transition-colors ${
                              isCurrent
                                ? "text-[#751F20]"
                                : "text-gray-700 group-hover:text-[#751F20]"
                            }`}
                          >
                            {page.title}
                          </p>
                        </div>
                      </div>

                      {/* Validation à droite */}
                      <div className="flex-shrink-0">
                        {isCompleted && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#751F20] to-[#8B2635] flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {currentPage === 1 ? (
                <Page1IdeeForm
                  data={formData}
                  onUpdate={handleDataUpdate}
                  onValidate={(isValid) => handlePageValidation(1, isValid)}
                  isLoading={isLoading}
                />
              ) : currentPage === 2 ? (
                <Page2MarcheForm
                  data={formData}
                  onUpdate={handleDataUpdate}
                  onValidate={(isValid) => handlePageValidation(2, isValid)}
                  isLoading={isLoading}
                />
              ) : currentPage === 3 ? (
                <Page3RessourcesForm
                  data={formData}
                  onUpdate={handleDataUpdate}
                  onValidate={(isValid) => handlePageValidation(3, isValid)}
                  isLoading={isLoading}
                />
              ) : currentPage === 4 ? (
                <Page4CoutsForm
                  data={formData}
                  onUpdate={handleDataUpdate}
                  onValidate={(isValid) => handlePageValidation(4, isValid)}
                  isLoading={isLoading}
                />
              ) : currentPage === 5 ? (
                <Page5FinancementGlobalForm
                  data={formData}
                  onUpdate={handleDataUpdate}
                  onValidate={(isValid) => handlePageValidation(5, isValid)}
                  isLoading={isLoading}
                />
              ) : currentPage === 6 ? (
                <Page6PlanFinancementForm
                  data={formData}
                  onUpdate={handleDataUpdate}
                  onValidate={(isValid) => handlePageValidation(6, isValid)}
                  isLoading={isLoading}
                />
              ) : currentPage === 7 ? (
                <Page7RemboursementCashflowForm
                  data={formData}
                  onUpdate={handleDataUpdate}
                  onValidate={(isValid) => handlePageValidation(7, isValid)}
                  isLoading={isLoading}
                />
              ) : currentPage === 8 ? (
                <Page8CompteResultatForm
                  data={formData}
                  onUpdate={handleDataUpdate}
                  onValidate={(isValid) => handlePageValidation(8, isValid)}
                  isLoading={isLoading}
                />
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#751F20]/10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Page {currentPage} - En développement
                  </h3>
                  <p className="text-gray-600">
                    Cette page sera implémentée prochainement selon la structure CCI officielle.
                  </p>
                </div>
              )}
            </AnimatePresence>

            {/* Navigation entre pages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#751F20]/10"
            >
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="!border-[#751F20]/30 !text-[#751F20] hover:!bg-[#751F20]/10 hover:!border-[#751F20]/50 disabled:opacity-50 disabled:cursor-not-allowed !focus:ring-[#751F20]/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 font-medium">
                  Étape {currentPage} sur 12
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i + 1}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i + 1 === currentPage
                          ? "bg-[#751F20] scale-125"
                          : i + 1 < currentPage
                          ? "bg-[#8B2635]"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={nextPage}
                disabled={currentPage === 12}
                className="!bg-gradient-to-r from-[#751F20] to-[#8B2635] hover:from-[#5a1618] hover:to-[#6b1e2a] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {currentPage === 12 ? "Terminer" : "Suivant"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal Assistant IA */}
      <Modal
        isOpen={showAssistant}
        onClose={() => setShowAssistant(false)}
        title="Assistant IA"
      >
        <div className="space-y-4">
          <p className="text-gray-600">{assistantMessage}</p>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAssistant(false)}>
              Fermer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BusinessPlanPage;
