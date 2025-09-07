import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, TrendingUp, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/UI/Button";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Connexion réussie !");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Email ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#FBE3DA] via-white to-[#FBE3DA]">
      {/* Left Side - Form */}
      <div className="flex-1 lg:w-3/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full space-y-4 sm:space-y-6"
        >
          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center space-x-2 mb-8 w-full">
              <div className="p-2 bg-gradient-to-br from-[#751F20] to-[#8B2635] rounded-lg flex-shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent text-center leading-tight">
                Entrepreneur Assistant CI
              </span>
            </Link>

            <div className="relative inline-block mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent mb-2 leading-tight">
                Bon retour !
              </h2>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#751F20] to-[#8B2635] rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20]"></div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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

            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#751F20] focus:ring-[#751F20] flex-shrink-0"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Se souvenir de moi
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#751F20] hover:text-[#8B2635] text-left sm:text-right"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full !bg-gradient-to-r from-[#751F20] to-[#8B2635] hover:from-[#5a1618] hover:to-[#6b1e2a] shadow-lg"
              size="lg"
            >
              Se connecter
            </Button>
          </form>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-[#751F20] hover:text-[#8B2635] font-medium"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-2/5 relative overflow-hidden lg:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-[#751F20]/90 to-[#8B2635]/90"></div>
        <img
          src="../images/auth/login.jpeg"
          alt="Équipe d'entrepreneurs africains"
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
              Rejoignez la révolution des études de marché en Afrique
            </h3>
            <p className="text-xl text-white/90">
              Des milliers d'entrepreneurs nous font confiance pour leurs
              analyses commerciales
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
