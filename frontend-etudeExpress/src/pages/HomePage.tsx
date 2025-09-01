import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Award,
  Globe,
  Target,
} from "lucide-react";
import Button from "../components/UI/Button";
import { IMAGES } from "../config/images";

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Business Plan Structuré",
      description:
        "Créez votre business plan professionnel en suivant les 12 étapes du support officiel de la CCI.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Accompagnement Expert",
      description:
        "Bénéficiez de conseils d'experts et d'un accompagnement personnalisé pour votre projet.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analyses Financières",
      description:
        "Générez des projections financières précises et des tableaux de bord professionnels.",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Conforme CCI",
      description:
        "Respectez les standards et exigences de la Chambre de Commerce de Côte d'Ivoire.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurisé & Fiable",
      description:
        "Vos données sont protégées et vos projets sauvegardés en toute sécurité.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Adapté au Contexte Ivoirien",
      description:
        "Spécialement conçu pour l'écosystème entrepreneurial ivoirien.",
    },
  ];

  const testimonials = [
    {
      name: "Aminata Koné",
      role: "Entrepreneure - Restaurant Traditionnel",
      content:
        "Entrepreneur Assistant CI m'a permis de structurer mon business plan en une semaine. L'accompagnement est exceptionnel !",
      avatar: IMAGES.testimonials.avatar1,
      rating: 5,
    },
    {
      name: "Jean-Baptiste Ouattara",
      role: "Étudiant - Projet Tech",
      content:
        "Un outil indispensable pour mes projets d'entrepreneuriat. Interface claire et résultats professionnels.",
      avatar: IMAGES.testimonials.avatar2,
      rating: 5,
    },
    {
      name: "Marie Diabaté",
      role: "Consultante - Cabinet d'Accompagnement",
      content:
        "Je recommande cet outil à tous mes clients. Il respecte parfaitement les standards de la CCI.",
      avatar: IMAGES.testimonials.avatar3,
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Business Plans créés" },
    { number: "98%", label: "Taux de satisfaction" },
    { number: "50+", label: "Experts partenaires" },
    { number: "24h", label: "Support disponible" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FBE3DA]">
        {/* Pattern de fond subtil */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f97316%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Titre principal centré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Créez votre{" "}
              <span className="text-primary-600">Business Plan</span>{" "}
              professionnel
            </h1>
          </motion.div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 leading-relaxed"
                >
                  Entrepreneur Assistant CI vous accompagne dans la création de
                  votre business plan selon les standards de la Chambre de
                  Commerce de Côte d'Ivoire. Un outil simple, professionnel et
                  adapté au contexte ivoirien.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center lg:justify-start"
              >
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-[#751F20]">
                    Commencer mon business plan
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>

              {/* Statistiques */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-2 relative"
            >
              <img
                src={IMAGES.hero}
                alt="Entrepreneur Assistant CI - Business Plan"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour réussir
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un outil complet qui vous guide étape par étape dans la création
              de votre business plan professionnel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-primary-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ils ont réussi avec Entrepreneur Assistant CI
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos utilisateurs satisfaits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Prêt à créer votre business plan ?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Rejoignez des centaines d'entrepreneurs qui ont déjà réussi avec
              Entrepreneur Assistant CI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
