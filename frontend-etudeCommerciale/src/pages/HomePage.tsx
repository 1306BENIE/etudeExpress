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
      {/* HeroSection  */}
      <section className="relative overflow-visible bg-[#FBE3DA]">
        {/* Pattern de fond subtil */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f97316%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 lg:pt-32">
          {/* Titre principal centré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Créez votre <span className="text-[#751F20]">Business Plan</span>{" "}
              professionnel
            </h1>
          </motion.div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
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
                  className="text-xl text-gray-600 leading-relaxed text-justify"
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
                className="flex justify-center lg:justify-start px-4 sm:px-0"
              >
                <Link to="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto !bg-[#751F20] hover:!bg-[#5a1618] text-xs xs:text-sm sm:text-base px-3 xs:px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap"
                  >
                    <span className="hidden xs:inline">
                      Commencer mon business plan
                    </span>
                    <span className="xs:hidden">
                      Commencer mon business plan
                    </span>
                    <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 ml-1 xs:ml-2" />
                  </Button>
                </Link>
              </motion.div>

              {/* Statistiques */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-[#751F20]">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#751F20]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#751F20]/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Titre et description avec style particulier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent mb-6 leading-tight">
                Tout ce dont vous avez besoin
                <br />
                <span className="text-3xl lg:text-4xl">pour réussir</span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#751F20] to-[#8B2635] rounded-full"></div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed font-medium"
            >
              Un outil complet qui vous guide étape par étape dans la création
              de votre business plan professionnel.
            </motion.p>
          </motion.div>

          {/* Carte principale */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-gray-100 relative overflow-hidden mx-2 sm:mx-0"
          >
            {/* Gradient overlay */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20]"></div>

            {/* 3 cartes de fonctionnalités */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#751F20]/20 transition-all duration-300 hover:shadow-lg h-full">
                    {/* Icône */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#751F20] to-[#8B2635] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                      <div className="text-white text-sm sm:text-base">{feature.icon}</div>
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#751F20] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 bg-gradient-to-br from-[#FBE3DA] via-white to-[#FBE3DA] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#751F20]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#8B2635]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#751F20]/3 to-[#8B2635]/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Titre avec style particulier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent mb-6 leading-tight">
                Ce que disent nos
                <br />
                <span className="text-3xl lg:text-4xl">entrepreneurs</span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#751F20] to-[#8B2635] rounded-full"></div>
            </div>
          </motion.div>

          {/* Conteneur principal des témoignages */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Carte de témoignage */}
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                    {/* Gradient top border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20]"></div>

                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-[#751F20]/10 to-[#8B2635]/10 rounded-full flex items-center justify-center">
                      <div className="text-2xl text-[#751F20] font-serif">
                        "
                      </div>
                    </div>

                    {/* Étoiles */}
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-[#751F20] fill-current mr-1"
                        />
                      ))}
                    </div>

                    {/* Contenu du témoignage */}
                    <blockquote className="text-gray-700 mb-8 text-lg leading-relaxed font-medium italic flex-grow">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Profil de l'utilisateur */}
                    <div className="flex items-center mt-auto">
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-bold text-gray-900 text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-[#751F20] font-medium text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>

                    {/* Effet de brillance au survol */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full pointer-events-none"></div>
                  </div>

                  {/* Ombre décorative */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#751F20]/5 to-[#8B2635]/5 transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-20 bg-gradient-to-br from-[#751F20] via-[#8B2635] to-[#751F20] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Titre principal */}
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Prêt à <span className="text-[#FBE3DA]">transformer</span>
                <br />
                votre idée en réalité ?
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#FBE3DA] to-white rounded-full"></div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Rejoignez des centaines d'entrepreneurs qui ont déjà réussi avec
              Entrepreneur Assistant CI
            </motion.p>

            {/* Conteneur principal des boutons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div>
                <div className="flex flex-col lg:flex-row gap-6 justify-center items-center px-4 sm:px-0">
                  <Link to="/register" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto !bg-white !text-[#751F20] hover:!bg-[#FBE3DA] hover:!text-[#751F20] font-bold text-xs xs:text-sm sm:text-lg px-3 xs:px-4 sm:px-8 py-3 sm:py-4 shadow-xl whitespace-nowrap"
                    >
                      <span className="hidden xs:inline">
                        Commencer gratuitement
                      </span>
                      <span className="xs:hidden">
                        Commencer gratuitement
                      </span>
                      <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 ml-1 xs:ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
