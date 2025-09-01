import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Download,
  Share2,
  HelpCircle,
  CheckCircle,
  Circle,
  Users,
  BarChart3,
  FileText,
  Settings,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Target,
  BookOpen,
  FileCheck,
  Presentation,
} from "lucide-react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Textarea from "../components/UI/Textarea";
import Select from "../components/UI/Select";
import Modal from "../components/UI/Modal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

// Types pour le Business Plan
interface BusinessPlanData {
  id?: string;
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
  };

  // Page 10: Indicateurs de performance
  indicateursPerformance: {
    kpis: Array<{
      nom: string;
      description: string;
      cible: number;
      unite: string;
    }>;
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
}

// Configuration des pages du formulaire
const PAGES_CONFIG = [
  {
    id: 1,
    title: "Présentation du projet",
    icon: <Presentation className="w-5 h-5" />,
    description: "Définissez votre projet et sa valeur ajoutée",
  },
  {
    id: 2,
    title: "Analyse du marché",
    icon: <BarChart3 className="w-5 h-5" />,
    description: "Étudiez votre marché cible et la concurrence",
  },
  {
    id: 3,
    title: "Stratégie marketing",
    icon: <Target className="w-5 h-5" />,
    description: "Définissez votre positionnement et mix marketing",
  },
  {
    id: 4,
    title: "Organisation et équipe",
    icon: <Users className="w-5 h-5" />,
    description: "Structurez votre équipe et organisation",
  },
  {
    id: 5,
    title: "Plan opérationnel",
    icon: <Settings className="w-5 h-5" />,
    description: "Détaillez vos processus et opérations",
  },
  {
    id: 6,
    title: "Analyse financière",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Présentez vos projections financières",
  },
  {
    id: 7,
    title: "Plan de trésorerie",
    icon: <Calendar className="w-5 h-5" />,
    description: "Planifiez vos flux de trésorerie",
  },
  {
    id: 8,
    title: "Analyse des risques",
    icon: <AlertTriangle className="w-5 h-5" />,
    description: "Identifiez et gérez les risques",
  },
  {
    id: 9,
    title: "Plan de développement",
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Définissez votre stratégie de croissance",
  },
  {
    id: 10,
    title: "Indicateurs de performance",
    icon: <Target className="w-5 h-5" />,
    description: "Établissez vos KPIs et tableaux de bord",
  },
  {
    id: 11,
    title: "Annexes",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Ajoutez vos documents supports",
  },
  {
    id: 12,
    title: "Résumé exécutif",
    icon: <FileCheck className="w-5 h-5" />,
    description: "Synthétisez votre business plan",
  },
];

const BusinessPlanPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // États locaux
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");

  // État du formulaire
  const [formData, setFormData] = useState<BusinessPlanData>({
    titre: "",
    secteur: "",
    localisation: "",
    statut: "brouillon",
    presentation: {
      nomProjet: "",
      description: "",
      problemeResolu: "",
      solutionProposee: "",
      avantagesConcurrentiels: [""],
    },
    analyseMarche: {
      marcheCible: "",
      tailleMarche: 0,
      segments: [""],
      comportementAchat: "",
    },
    strategieMarketing: {
      positionnement: "",
      mixMarketing: {
        produit: "",
        prix: "",
        place: "",
        promotion: "",
      },
      planCommunication: [""],
      canauxDistribution: [""],
    },
    organisation: {
      structure: "",
      equipe: [
        {
          nom: "",
          poste: "",
          competences: [""],
          experience: "",
        },
      ],
      besoinsRecrutement: [""],
    },
    planOperationnel: {
      processusProduction: "",
      fournisseurs: [
        {
          nom: "",
          produit: "",
          conditions: "",
        },
      ],
      equipements: [""],
      locaux: "",
      planning: "",
    },
    analyseFinanciere: {
      investissementInitial: 0,
      sourcesFinancement: [
        {
          source: "",
          montant: 0,
          conditions: "",
        },
      ],
      seuilRentabilite: 0,
      delaiRecuperation: 0,
    },
    planTresorerie: {
      fluxTresorerie: [
        {
          mois: "",
          encaissements: 0,
          decaissements: 0,
          solde: 0,
        },
      ],
      besoinsFondsRoulement: 0,
    },
    analyseRisques: {
      risquesIdentifies: [
        {
          risque: "",
          probabilite: "faible",
          impact: "faible",
          mesuresMitigation: [""],
        },
      ],
      planContingence: "",
    },
    planDeveloppement: {
      phases: [
        {
          phase: "",
          duree: "",
          objectifs: [""],
          ressources: [""],
        },
      ],
      objectifsLongTerme: [""],
    },
    indicateursPerformance: {
      kpis: [
        {
          nom: "",
          description: "",
          cible: 0,
          unite: "",
        },
      ],
      suiviPerformance: "",
    },
    annexes: {
      etudesMarche: [""],
      contrats: [""],
      devis: [""],
      autres: [""],
    },
    resumeExecutif: {
      synthese: "",
      pointsCles: [""],
      recommandations: [""],
      conclusion: "",
    },
  });

  // Calcul de la progression
  const calculateProgress = () => {
    const totalFields = 12; // 12 pages
    const completedPages = PAGES_CONFIG.filter((page) => {
      // Logique pour déterminer si une page est complétée
      return true; // Simplifié pour l'exemple
    }).length;
    return Math.round((completedPages / totalFields) * 100);
  };

  // Navigation entre les pages
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= 12) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < 12) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
  const askAssistant = async (question: string) => {
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

  // Rendu de la page actuelle
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <motion.div
            key="page-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Présentation du projet
              </h3>

              <div className="space-y-4">
                <Input
                  label="Nom du projet"
                  value={formData.presentation.nomProjet}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      presentation: {
                        ...formData.presentation,
                        nomProjet: e.target.value,
                      },
                    })
                  }
                  placeholder="Ex: Restaurant traditionnel ivoirien"
                />

                <Textarea
                  label="Description du projet"
                  value={formData.presentation.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      presentation: {
                        ...formData.presentation,
                        description: e.target.value,
                      },
                    })
                  }
                  placeholder="Décrivez votre projet en détail..."
                  rows={4}
                />

                <Textarea
                  label="Problème résolu"
                  value={formData.presentation.problemeResolu}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      presentation: {
                        ...formData.presentation,
                        problemeResolu: e.target.value,
                      },
                    })
                  }
                  placeholder="Quel problème votre projet résout-il ?"
                  rows={3}
                />

                <Textarea
                  label="Solution proposée"
                  value={formData.presentation.solutionProposee}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      presentation: {
                        ...formData.presentation,
                        solutionProposee: e.target.value,
                      },
                    })
                  }
                  placeholder="Comment votre projet résout-il ce problème ?"
                  rows={3}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Avantages concurrentiels
                  </label>
                  {formData.presentation.avantagesConcurrentiels.map(
                    (avantage, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={avantage}
                          onChange={(e) => {
                            const newAvantages = [
                              ...formData.presentation.avantagesConcurrentiels,
                            ];
                            newAvantages[index] = e.target.value;
                            setFormData({
                              ...formData,
                              presentation: {
                                ...formData.presentation,
                                avantagesConcurrentiels: newAvantages,
                              },
                            });
                          }}
                          placeholder={`Avantage ${index + 1}`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newAvantages =
                              formData.presentation.avantagesConcurrentiels.filter(
                                (_, i) => i !== index
                              );
                            setFormData({
                              ...formData,
                              presentation: {
                                ...formData.presentation,
                                avantagesConcurrentiels: newAvantages,
                              },
                            });
                          }}
                        >
                          Supprimer
                        </Button>
                      </div>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        presentation: {
                          ...formData.presentation,
                          avantagesConcurrentiels: [
                            ...formData.presentation.avantagesConcurrentiels,
                            "",
                          ],
                        },
                      });
                    }}
                  >
                    + Ajouter un avantage
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="page-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Analyse du marché
              </h3>

              <div className="space-y-4">
                <Input
                  label="Marché cible"
                  value={formData.analyseMarche.marcheCible}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      analyseMarche: {
                        ...formData.analyseMarche,
                        marcheCible: e.target.value,
                      },
                    })
                  }
                  placeholder="Ex: Jeunes professionnels 25-35 ans à Abidjan"
                />

                <Input
                  label="Taille du marché (en millions FCFA)"
                  type="number"
                  value={formData.analyseMarche.tailleMarche}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      analyseMarche: {
                        ...formData.analyseMarche,
                        tailleMarche: Number(e.target.value),
                      },
                    })
                  }
                  placeholder="Ex: 500"
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Segments de marché
                  </label>
                  {formData.analyseMarche.segments.map((segment, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={segment}
                        onChange={(e) => {
                          const newSegments = [
                            ...formData.analyseMarche.segments,
                          ];
                          newSegments[index] = e.target.value;
                          setFormData({
                            ...formData,
                            analyseMarche: {
                              ...formData.analyseMarche,
                              segments: newSegments,
                            },
                          });
                        }}
                        placeholder={`Segment ${index + 1}`}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newSegments =
                            formData.analyseMarche.segments.filter(
                              (_, i) => i !== index
                            );
                          setFormData({
                            ...formData,
                            analyseMarche: {
                              ...formData.analyseMarche,
                              segments: newSegments,
                            },
                          });
                        }}
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        analyseMarche: {
                          ...formData.analyseMarche,
                          segments: [...formData.analyseMarche.segments, ""],
                        },
                      });
                    }}
                  >
                    + Ajouter un segment
                  </Button>
                </div>

                <Textarea
                  label="Comportement d'achat"
                  value={formData.analyseMarche.comportementAchat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      analyseMarche: {
                        ...formData.analyseMarche,
                        comportementAchat: e.target.value,
                      },
                    })
                  }
                  placeholder="Décrivez le comportement d'achat de vos clients..."
                  rows={3}
                />
              </div>
            </div>
          </motion.div>
        );

      // Autres pages similaires...
      default:
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Page {currentPage} - {PAGES_CONFIG[currentPage - 1]?.title}
            </h3>
            <p className="text-gray-600">
              Contenu de la page {currentPage} en cours de développement...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec progression */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Business Plan - {formData.titre || "Nouveau projet"}
                </h1>
                <p className="text-sm text-gray-500">
                  Page {currentPage} sur 12 • {calculateProgress()}% complété
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => askAssistant("Aide pour cette page")}
                disabled={isLoading}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Assistant IA
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={saveBusinessPlan}
                disabled={isSaving}
              >
                {isSaving ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Sauvegarder
              </Button>

              <Button size="sm" onClick={exportPDF} disabled={isLoading}>
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Exporter PDF
              </Button>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progression globale</span>
              <span>{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar avec navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>

              <nav className="space-y-2">
                {PAGES_CONFIG.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => goToPage(page.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentPage === page.id
                        ? "bg-primary-50 text-primary-700 border border-primary-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {currentPage === page.id ? (
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {page.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {page.description}
                      </p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">{renderCurrentPage()}</AnimatePresence>

            {/* Navigation entre pages */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>

              <div className="text-sm text-gray-500">
                Page {currentPage} sur 12
              </div>

              <Button onClick={nextPage} disabled={currentPage === 12}>
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
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
