import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Download,
  HelpCircle,
  CheckCircle,
  Users,
  BarChart3,
  FileText,
  TrendingUp,
  Calendar,
  Target,
  FileCheck,
  Presentation,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Textarea from "../components/UI/Textarea";
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

  // Page 1: L'IDÉE (selon CCI)
  idee: {
    nomProjet: string;
    description: string;
    problemeResolu: string;
    solutionProposee: string;
    proprietaires: Array<{
      nom: string;
      fonction: string;
      experience: string;
    }>;
  };

  // Page 2: LE MARCHÉ (4P Marketing CCI)
  marche: {
    produit: string; // Qu'allez-vous offrir comme produit ou service ?
    prix: string; // À combien allez-vous vendre le produit ou service ?
    fournitures: string; // Comment allez-vous vous approvisionner ?
    promotion: string; // Comment allez-vous faire votre promotion ?
    clients: number; // Combien aurez-vous de clients par mois ?
    place: string; // Où allez-vous vous installer ?
    concurrents: string; // Comment allez-vous vous comporter ?
  };

  // Page 3: RESSOURCES MATÉRIELLES ET HUMAINES (CCI)
  ressources: {
    equipements: string; // Comment allez-vous produire votre produit/service ?
    machines: Array<{
      nom: string;
      prix: number;
      description: string;
    }>; // Machines/équipements avec prix
    enregistrement: string; // Procédures administratives à satisfaire
    employes: {
      nombre: number;
      couts: number;
      details: string;
    }; // Nombre d'employés et coûts
  };

  // Page 4: COÛTS PRÉ-DÉMARRAGE (CCI)
  coutsPreDemarrage: {
    constitution: number;
    autorisationLicence: number;
    formation: number;
    informationsProjet: number;
    planAffaires: number;
    autres: Array<{
      description: string;
      montant: number;
    }>;
    total: number;
  };

  // Page 5: COÛT TOTAL ET FINANCEMENT (CCI)
  coutTotalFinancement: {
    depensesAvantDemarrage: number;
    immobilisations: {
      terrain: number;
      construction: number;
      materiel: number;
      outillage: number;
      vehicules: number;
      total: number;
    };
    fondsRoulement3Mois: {
      salaires: number;
      prelevementEntrepreneur: number;
      coutsMarketing: number;
      matieresPremières: number;
      total: number;
    };
    coutTotal: number;
    apportPersonnel: number;
    besoinFinancement: number;
  };

  // Page 6: PLAN DE FINANCEMENT (CCI)
  planFinancement: {
    apportPersonnel: number;
    sourcesExternes: Array<{
      source: string;
      montant: number;
    }>;
    total: number;
  };

  // Page 7: PLAN DE REMBOURSEMENT (CCI)
  planRemboursement: {
    argentEmprunte: number; // A
    dureeRemboursementMois: number; // B
    remboursementMensuel: number; // C = A/B
    interetMensuel: number; // D
    paiementMensuelTotal: number; // E = C+D
    montantTotalRembourser: number; // F = B*E
  };

  // Page 8: COMPTE DE RÉSULTAT PRÉVISIONNEL (CCI)
  compteResultat: {
    mois: Array<{
      mois: string;
      totalVentes: number; // (1)
      coutVentes: {
        achatMatieresPremières: number;
        autresCouts: number;
        mainOeuvre: number;
        total: number; // (2)
      };
      resultatBrut: number; // (1-2)
      chargesFixes: {
        loyer: number;
        electricite: number;
        eau: number;
        telephone: number;
        transport: number;
        salaires: number;
        autres: number;
        total: number; // (3)
      };
      resultatNet: number; // (1-2-3)
    }>;
  };

  // Pages 9-12: Sections supplémentaires (à développer selon besoins)
  sectionsSupplementaires: {
    planDeveloppement?: string;
    indicateursPerformance?: string;
    annexes?: string[];
    resumeExecutif?: string;
  };
}

// Configuration des pages du formulaire (Structure CCI)
const PAGES_CONFIG = [
  {
    id: 1,
    title: "L'Idée",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Le Marché",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Ressources Matérielles et Humaines",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Coûts Pré-Démarrage",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Coût Total et Financement",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "Plan de Financement",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: 7,
    title: "Plan de Remboursement",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 8,
    title: "Compte de Résultat Prévisionnel",
    icon: <FileCheck className="w-5 h-5" />,
  },
];

const BusinessPlanPage: React.FC = () => {
  const { } = useAuth();
  const navigate = useNavigate();
  const { } = useParams<{ id: string }>();

  // États locaux
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");

  // État du formulaire
  const [formData, setFormData] = useState<BusinessPlanData>({
    id: "",
    titre: "",
    secteur: "",
    localisation: "",
    statut: "brouillon",

    // Page 1: L'IDÉE (selon CCI)
    idee: {
      nomProjet: "",
      description: "",
      problemeResolu: "",
      solutionProposee: "",
      proprietaires: [
        {
          nom: "",
          fonction: "",
          experience: "",
        },
      ],
    },

    // Page 2: LE MARCHÉ (4P Marketing CCI)
    marche: {
      produit: "",
      prix: "",
      fournitures: "",
      promotion: "",
      clients: 0,
      place: "",
      concurrents: "",
    },

    // Page 3: RESSOURCES MATÉRIELLES ET HUMAINES (CCI)
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

    // Page 4: COÛTS PRÉ-DÉMARRAGE (CCI)
    coutsPreDemarrage: {
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

    // Page 5: COÛT TOTAL ET FINANCEMENT (CCI)
    coutTotalFinancement: {
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
      coutTotal: 0,
      apportPersonnel: 0,
      besoinFinancement: 0,
    },

    // Page 6: PLAN DE FINANCEMENT (CCI)
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

    // Page 7: PLAN DE REMBOURSEMENT (CCI)
    planRemboursement: {
      argentEmprunte: 0,
      dureeRemboursementMois: 0,
      remboursementMensuel: 0,
      interetMensuel: 0,
      paiementMensuelTotal: 0,
      montantTotalRembourser: 0,
    },

    // Page 8: COMPTE DE RÉSULTAT PRÉVISIONNEL (CCI)
    compteResultat: {
      mois: [
        {
          mois: "Janvier",
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
        },
      ],
    },

    // Pages 9-12: Sections supplémentaires (à développer selon besoins)
    sectionsSupplementaires: {
      planDeveloppement: "",
      indicateursPerformance: "",
      annexes: [""],
      resumeExecutif: "",
    },
  });

  // Validation des pages
  const isPageCompleted = (pageId: number) => {
    switch (pageId) {
      case 1: // L'Idée
        return formData.idee.nomProjet && 
               formData.idee.description && 
               formData.idee.problemeResolu && 
               formData.idee.solutionProposee &&
               formData.idee.proprietaires.some(p => p.nom);
      case 2: // Le Marché (4P)
        return formData.marche.produit && 
               formData.marche.prix && 
               formData.marche.place &&
               formData.marche.promotion &&
               formData.marche.clients > 0;
      case 3: // Ressources
        return formData.ressources.equipements &&
               formData.ressources.enregistrement &&
               formData.ressources.employes.nombre >= 0;
      case 4: // Coûts pré-démarrage
        return formData.coutsPreDemarrage.total > 0;
      case 5: // Coût total et financement
        return formData.coutTotalFinancement.coutTotal > 0;
      case 6: // Plan de financement
        return formData.planFinancement.total > 0;
      case 7: // Plan de remboursement
        return formData.planRemboursement.argentEmprunte > 0;
      case 8: // Compte de résultat
        return formData.compteResultat.mois.some(m => m.totalVentes > 0);
      default:
        return false;
    }
  };

  // Calcul de la progression
  const calculateProgress = () => {
    const completedPages = PAGES_CONFIG.filter((page) => isPageCompleted(page.id)).length;
    return Math.round((completedPages / 12) * 100);
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
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-[#751F20]/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20]"></div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-[#751F20] to-[#8B2635] rounded-xl text-white">
                  <Presentation className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
                    Présentation du projet
                  </h3>
                  <p className="text-gray-600 text-sm">Définissez les bases de votre projet entrepreneurial</p>
                </div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Input
                    label="Nom du projet"
                    value={formData.idee.nomProjet}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idee: {
                          ...formData.idee,
                          nomProjet: e.target.value,
                        },
                      })
                    }
                    placeholder="Ex: Restaurant traditionnel ivoirien"
                    className="focus:border-[#751F20] focus:ring-[#751F20]/20"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Textarea
                    label="Description du projet"
                    value={formData.idee.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idee: {
                          ...formData.idee,
                          description: e.target.value,
                        },
                      })
                    }
                    placeholder="Décrivez votre projet en détail..."
                    rows={4}
                    className="focus:border-[#751F20] focus:ring-[#751F20]/20"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Textarea
                    label="Problème résolu"
                    value={formData.idee.problemeResolu}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idee: {
                          ...formData.idee,
                          problemeResolu: e.target.value,
                        },
                      })
                    }
                    placeholder="Quel problème votre projet résout-il ?"
                    rows={3}
                    className="focus:border-[#751F20] focus:ring-[#751F20]/20"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Textarea
                    label="Solution proposée"
                    value={formData.idee.solutionProposee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idee: {
                          ...formData.idee,
                          solutionProposee: e.target.value,
                        },
                      })
                    }
                    placeholder="Comment votre projet résout-il ce problème ?"
                    rows={3}
                    className="focus:border-[#751F20] focus:ring-[#751F20]/20"
                  />
                </motion.div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Propriétaires du projet
                  </label>
                  {formData.idee.proprietaires.map(
                    (proprietaire, index) => (
                      <div key={index} className="space-y-2 p-4 border rounded-lg">
                        <Input
                          label="Nom"
                          value={proprietaire.nom}
                          onChange={(e) => {
                            const newProprietaires = [...formData.idee.proprietaires];
                            newProprietaires[index].nom = e.target.value;
                            setFormData({
                              ...formData,
                              idee: {
                                ...formData.idee,
                                proprietaires: newProprietaires,
                              },
                            });
                          }}
                          placeholder="Nom du propriétaire"
                        />
                        <Input
                          label="Fonction"
                          value={proprietaire.fonction}
                          onChange={(e) => {
                            const newProprietaires = [...formData.idee.proprietaires];
                            newProprietaires[index].fonction = e.target.value;
                            setFormData({
                              ...formData,
                              idee: {
                                ...formData.idee,
                                proprietaires: newProprietaires,
                              },
                            });
                          }}
                          placeholder="Fonction dans l'entreprise"
                        />
                        <Input
                          label="Expérience"
                          value={proprietaire.experience}
                          onChange={(e) => {
                            const newProprietaires = [...formData.idee.proprietaires];
                            newProprietaires[index].experience = e.target.value;
                            setFormData({
                              ...formData,
                              idee: {
                                ...formData.idee,
                                proprietaires: newProprietaires,
                              },
                            });
                          }}
                          placeholder="Expérience pertinente"
                        />
                        {formData.idee.proprietaires.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newProprietaires = formData.idee.proprietaires.filter(
                                (_, i) => i !== index
                              );
                              setFormData({
                                ...formData,
                                idee: {
                                  ...formData.idee,
                                  proprietaires: newProprietaires,
                                },
                              });
                            }}
                          >
                            Supprimer
                          </Button>
                        )}
                      </div>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        idee: {
                          ...formData.idee,
                          proprietaires: [
                            ...formData.idee.proprietaires,
                            { nom: "", fonction: "", experience: "" },
                          ],
                        },
                      });
                    }}
                  >
                    + Ajouter un propriétaire
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
                  label="Produit ou service"
                  value={formData.marche.produit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marche: {
                        ...formData.marche,
                        produit: e.target.value,
                      },
                    })
                  }
                  placeholder="Ex: Jeunes professionnels 25-35 ans à Abidjan"
                />

                <Input
                  label="Prix de vente"
                  value={formData.marche.prix}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marche: {
                        ...formData.marche,
                        prix: e.target.value,
                      },
                    })
                  }
                  placeholder="Ex: 500"
                />

                <Input
                  label="Lieu d'installation (Place)"
                  value={formData.marche.place}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marche: {
                        ...formData.marche,
                        place: e.target.value,
                      },
                    })
                  }
                  placeholder="Où allez-vous vous installer ?"
                />

                <Textarea
                  label="Stratégie de promotion"
                  value={formData.marche.promotion}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marche: {
                        ...formData.marche,
                        promotion: e.target.value,
                      },
                    })
                  }
                  placeholder="Comment allez-vous faire votre promotion ?"
                  rows={3}
                />

                <Input
                  label="Nombre de clients par mois (estimation)"
                  type="number"
                  value={formData.marche.clients}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marche: {
                        ...formData.marche,
                        clients: Number(e.target.value),
                      },
                    })
                  }
                  placeholder="Ex: 150"
                />

                <Textarea
                  label="Fournitures et approvisionnement"
                  value={formData.marche.fournitures}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marche: {
                        ...formData.marche,
                        fournitures: e.target.value,
                      },
                    })
                  }
                  placeholder="Comment allez-vous vous approvisionner en biens et services ?"
                  rows={3}
                />

                <Textarea
                  label="Concurrents"
                  value={formData.marche.concurrents}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marche: {
                        ...formData.marche,
                        concurrents: e.target.value,
                      },
                    })
                  }
                  placeholder="Comment allez-vous vous comporter face à la concurrence ?"
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
                        <div className={`flex-shrink-0 transition-colors ${
                          isCurrent ? 'text-[#751F20]' : isCompleted ? 'text-[#751F20]' : 'text-gray-400 group-hover:text-[#751F20]'
                        }`}>
                          {page.icon}
                        </div>
                        
                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate transition-colors ${
                            isCurrent ? 'text-[#751F20]' : 'text-gray-700 group-hover:text-[#751F20]'
                          }`}>
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
            <AnimatePresence mode="wait">{renderCurrentPage()}</AnimatePresence>

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
                          ? 'bg-[#751F20] scale-125'
                          : i + 1 < currentPage
                          ? 'bg-[#8B2635]'
                          : 'bg-gray-300'
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
                {currentPage === 12 ? 'Terminer' : 'Suivant'}
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
