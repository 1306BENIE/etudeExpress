import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  TrendingUp,
  User,
  Building2,
  FileText,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/UI/Button";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        "Message envoyé avec succès ! Nous vous répondrons sous 24h."
      );
      reset();
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "info@cci.ci",
      description: "Écrivez-nous pour toute question",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      content: "+225 27 20 33 16 00",
      description: "Lun-Ven, 8h-18h (GMT)",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      content: "6 Avenue Joseph Anoma,Plateau, Abidjan",
      description: "Côte d'Ivoire",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires",
      content: "8h - 18h",
      description: "Lundi au Vendredi",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBE3DA] via-white to-[#FBE3DA] pt-10 pb-10 lg:pt-40 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 lg:max-w-3xl"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20]"></div>
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent mb-2">
                  Envoyez-nous un message
                </h2>
                <p className="text-gray-600">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 sm:space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <div className="relative group">
                      <input
                        {...register("firstName", {
                          required: "Le prénom est requis",
                        })}
                        type="text"
                        className="input-field pl-10 transition-all duration-300 group-hover:shadow-md focus:shadow-lg focus:border-gray-500 focus:ring-1 focus:ring-[#751F20]/50 focus:outline-none"
                        placeholder="Votre prénom"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-[#751F20]" />
                    </div>
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-error-500 text-sm mt-1 flex items-center"
                      >
                        <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                        {errors.firstName.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <div className="relative group">
                      <input
                        {...register("lastName", {
                          required: "Le nom est requis",
                        })}
                        type="text"
                        className="input-field pl-10 transition-all duration-300 group-hover:shadow-md focus:shadow-lg focus:border-[#751F20] focus:ring-2 focus:ring-[#751F20]/20 focus:outline-none"
                        placeholder="Votre nom"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-[#751F20]" />
                    </div>
                    {errors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-error-500 text-sm mt-1 flex items-center"
                      >
                        <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                        {errors.lastName.message}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative group">
                      <input
                        {...register("email", {
                          required: "L'email est requis",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email invalide",
                          },
                        })}
                        type="email"
                        className="input-field pl-10 transition-all duration-300 group-hover:shadow-md focus:shadow-lg focus:border-[#751F20] focus:ring-2 focus:ring-[#751F20]/20 focus:outline-none"
                        placeholder="votre@email.com"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-[#751F20]" />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-error-500 text-sm mt-1 flex items-center"
                      >
                        <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise (optionnel)
                    </label>
                    <div className="relative group">
                      <input
                        {...register("company")}
                        type="text"
                        className="input-field pl-10 transition-all duration-300 group-hover:shadow-md focus:shadow-lg focus:border-[#751F20] focus:ring-2 focus:ring-[#751F20]/20 focus:outline-none"
                        placeholder="Nom de votre entreprise"
                      />
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-[#751F20]" />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <div className="relative group">
                    <select
                      {...register("subject", {
                        required: "Le sujet est requis",
                      })}
                      className="input-field pl-10 transition-all duration-300 group-hover:shadow-md focus:shadow-lg focus:border-gray-500 focus:ring-1 focus:ring-[#751F20]/50 focus:outline-none appearance-none bg-white"
                    >
                      <option value="" className="text-gray-400">
                        Sélectionner un sujet
                      </option>
                      <option value="demo">Demande de démonstration</option>
                      <option value="pricing">Questions sur les tarifs</option>
                      <option value="technical">🔧 Support technique</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-[#751F20] pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-error-500 text-sm mt-1 flex items-center"
                    >
                      <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                      {errors.subject.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative group">
                    <textarea
                      {...register("message", {
                        required: "Le message est requis",
                      })}
                      rows={4}
                      className="input-field resize-none pl-10 pt-3 transition-all duration-300 group-hover:shadow-md focus:shadow-lg focus:border-gray-500 focus:ring-1 focus:ring-[#751F20]/50 focus:outline-none"
                      placeholder="Décrivez votre projet ou votre question en détail..."
                    />
                    <MessageCircle className="absolute left-3 top-3 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-[#751F20]" />
                  </div>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-error-500 text-sm mt-1 flex items-center"
                    >
                      <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                      {errors.message.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="pt-2 flex justify-center"
                >
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-auto px-4 sm:px-8 whitespace-nowrap !bg-gradient-to-r from-[#751F20] to-[#8B2635] hover:from-[#5a1618] hover:to-[#6b1e2a] shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                    size="lg"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Envoyer le message
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block w-full lg:w-80 lg:flex-shrink-0 space-y-3 sm:space-y-4"
          >
            {/* Contact Cards */}
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg border border-gray-200/50 hover:border-[#751F20]/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-[#751F20] to-[#8B2635] text-white rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#751F20] transition-colors duration-300">
                        {info.title}
                      </h3>
                      <p className="text-gray-900 font-medium text-xs truncate">
                        {info.content}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-[#751F20] to-[#8B2635] rounded-xl p-3 sm:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center space-x-2 mb-3">
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-sm font-semibold">Chat en direct</h3>
              </div>
              <p className="text-white/90 mb-3 text-xs">
                Besoin d'une réponse rapide ? Discutez avec notre assistant IA.
              </p>
              <Button
                variant="outline"
                className="w-full bg-white text-[#751F20] border-white hover:bg-gray-50 text-xs py-2 group-hover:scale-105 transition-transform duration-300"
              >
                Démarrer le chat
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
