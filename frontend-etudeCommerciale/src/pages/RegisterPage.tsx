import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  Building2,
  GraduationCap,
  DollarSign,
  Users,
  Landmark,
  UserCheck,
  ChevronDown,
  Briefcase,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/UI/Button";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType:
    | "entrepreneur"
    | "student"
    | "investor"
    | "incubator"
    | "institution"
    | "mentor";
  sector?: string;
  location?: string;
  experience?: "beginner" | "intermediate" | "advanced";
}

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        userType: data.userType,
        sector: data.sector,
        location: data.location,
        experience: data.experience,
      });
      toast.success("Compte créé avec succès !");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erreur lors de la création du compte");
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    {
      value: "entrepreneur",
      label: "Entrepreneur",
      icon: <Briefcase className="w-5 h-5" />,
    },
    { value: "student", label: "Étudiant", icon: <User className="w-5 h-5" /> },
    {
      value: "investor",
      label: "Investisseur",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: "incubator",
      label: "Incubateur",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      value: "institution",
      label: "Institution (CCI/ONG)",
      icon: <User className="w-5 h-5" />,
    },
    {
      value: "mentor",
      label: "Mentor/Conseiller",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const sectors = [
    "Agriculture et Agroalimentaire",
    "Artisanat et Métiers d'Art",
    "Commerce et Distribution",
    "Construction et BTP",
    "Éducation et Formation",
    "Énergie et Environnement",
    "Finance et Assurance",
    "Industrie et Manufacturing",
    "Numérique et Technologies",
    "Santé et Bien-être",
    "Services aux Entreprises",
    "Tourisme et Hôtellerie",
    "Transport et Logistique",
    "Autre",
  ];

  const locations = [
    "Abidjan",
    "Bouaké",
    "Bondoukou",
    "Daloa",
    "Korhogo",
    "San-Pédro",
    "Yamoussoukro",
    "Man",
    "Divo",
    "Gagnoa",
    "Abengourou",
    "Grand-Bassam",
    "Sassandra",
    "Autre",
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#FBE3DA] via-white to-[#FBE3DA]">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#751F20]/90 to-[#8B2635]/90"></div>
        <img
          src="../images/auth/register.jpeg"
          alt="Entrepreneurs africains en réunion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center text-white space-y-6"
          >
            <h3 className="text-3xl font-bold">
              Commencez votre parcours entrepreneurial
            </h3>
            <p className="text-xl text-white/90">
              Accédez à des études de marché professionnelles en quelques clics
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 lg:w-3/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full space-y-4 sm:space-y-6"
        >
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4 sm:mb-6 lg:mb-8">
              <div className="p-2 bg-gradient-to-br from-[#751F20] to-[#8B2635] rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent whitespace-nowrap">
                Entrepreneur Assistant CI
              </span>
            </Link>

            <div className="relative inline-block mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent mb-2 leading-tight">
                Créer votre compte
              </h2>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#751F20] to-[#8B2635] rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20]"></div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom(s)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("firstName", {
                        required: "Le prénom est requis",
                      })}
                      type="text"
                      className="input-field pl-10 focus:outline-none focus:border-gray-400 focus:ring-0"
                      placeholder="Votre prénom"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-error-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("lastName", {
                        required: "Le nom est requis",
                      })}
                      type="text"
                      className="input-field pl-10 focus:outline-none focus:border-gray-400 focus:ring-0"
                      placeholder="Votre nom"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-error-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("email", {
                        required: "L'email est requis",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email invalide",
                        },
                      })}
                      type="email"
                      className="input-field pl-10 focus:outline-none focus:border-gray-400 focus:ring-0"
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-error-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de profil
                  </label>
                  <div className="relative">
                    <select
                      {...register("userType", {
                        required: "Veuillez sélectionner un type de profil",
                      })}
                      className="input-field appearance-none focus:outline-none focus:border-gray-400 focus:ring-0"
                    >
                      <option value="">Sélectionnez votre profil</option>
                      {userTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                  {errors.userType && (
                    <p className="text-error-500 text-sm mt-1">
                      {errors.userType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("password", {
                        required: "Le mot de passe est requis",
                        minLength: {
                          value: 6,
                          message:
                            "Le mot de passe doit contenir au moins 6 caractères",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      className="input-field pl-10 pr-10 focus:outline-none focus:border-gray-400 focus:ring-0"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-error-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("confirmPassword", {
                        required: "Veuillez confirmer votre mot de passe",
                        validate: (value) =>
                          value === password ||
                          "Les mots de passe ne correspondent pas",
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      className="input-field pl-10 pr-10 focus:outline-none focus:border-gray-400 focus:ring-0"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-error-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full !bg-gradient-to-r from-[#751F20] to-[#8B2635] hover:from-[#5a1618] hover:to-[#6b1e2a] shadow-lg"
                size="lg"
              >
                Créer mon compte
              </Button>
            </form>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-[#751F20] hover:text-[#8B2635] font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
