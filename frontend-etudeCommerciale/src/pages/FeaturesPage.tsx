import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  Download,
  BarChart3,
  Users,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Formulaire Guidé Intelligent",
      description: "12 sections structurées selon les standards CCI-CI pour créer votre business plan étape par étape.",
      benefits: ["Interface intuitive", "Validation en temps réel", "Sauvegarde automatique"],
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Assistant IA Contextualisé",
      description: "Intelligence artificielle spécialisée dans l'écosystème entrepreneurial ivoirien.",
      benefits: ["Conseils personnalisés", "Analyse de marché local", "Recommandations sectorielles"],
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Professionnel",
      description: "Générez vos documents aux formats PDF et Word avec mise en page professionnelle.",
      benefits: ["Templates CCI-CI", "Personnalisation avancée", "Qualité impression"],
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Tableaux Financiers Automatisés",
      description: "Calculs automatiques des projections financières et indicateurs clés.",
      benefits: ["Formules pré-configurées", "Graphiques dynamiques", "Analyse de rentabilité"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration d'Équipe",
      description: "Travaillez en équipe sur votre business plan avec gestion des droits d'accès.",
      benefits: ["Partage sécurisé", "Commentaires en temps réel", "Historique des versions"],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité & Confidentialité",
      description: "Vos données sont protégées avec un chiffrement de niveau bancaire.",
      benefits: ["Chiffrement SSL", "Sauvegarde cloud", "Conformité RGPD"],
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Inscription Rapide",
      description: "Créez votre compte en moins de 2 minutes",
    },
    {
      step: "02",
      title: "Remplissage Guidé",
      description: "Suivez notre formulaire intelligent section par section",
    },
    {
      step: "03",
      title: "Assistance IA",
      description: "Bénéficiez des conseils personnalisés de notre assistant",
    },
    {
      step: "04",
      title: "Export Professionnel",
      description: "Téléchargez votre business plan finalisé",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FBE3DA] via-white to-[#FBE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent mb-6">
              Fonctionnalités Avancées
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez tous les outils professionnels qui vous accompagnent dans la création 
              de votre business plan selon les standards de la CCI-CI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#751F20] to-[#8B2635] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{feature.icon}</div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et guidé pour créer votre business plan professionnel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#751F20] to-[#8B2635] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-xl font-bold">{step.step}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 text-[#751F20]">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#751F20] via-[#8B2635] to-[#751F20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à créer votre business plan ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez les entrepreneurs qui font confiance à notre plateforme
            </p>
            
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-[#751F20] hover:bg-gray-100 font-bold text-lg px-8 py-4 shadow-xl"
              >
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
