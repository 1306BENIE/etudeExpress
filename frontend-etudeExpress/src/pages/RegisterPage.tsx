import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, TrendingUp, Mail, Lock, User, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'entrepreneur' | 'student' | 'investor';
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

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
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
      });
      toast.success('Compte créé avec succès !');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erreur lors de la création du compte');
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    { value: 'entrepreneur', label: 'Entrepreneur', icon: <Briefcase className="w-5 h-5" /> },
    { value: 'student', label: 'Étudiant', icon: <User className="w-5 h-5" /> },
    { value: 'investor', label: 'Investisseur', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-secondary-600/90"></div>
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop"
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
            <p className="text-xl text-primary-100">
              Accédez à des études de marché professionnelles en quelques clics
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">EtudeExpress</span>
            </Link>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Créer votre compte
            </h2>
            <p className="text-gray-600">
              Rejoignez la communauté des entrepreneurs innovants
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  {...register('firstName', { required: 'Le prénom est requis' })}
                  type="text"
                  className="input-field"
                  placeholder="Prénom"
                />
                {errors.firstName && (
                  <p className="text-error-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  {...register('lastName', { required: 'Le nom est requis' })}
                  type="text"
                  className="input-field"
                  placeholder="Nom"
                />
                {errors.lastName && (
                  <p className="text-error-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de profil
              </label>
              <div className="grid grid-cols-1 gap-2">
                {userTypes.map((type) => (
                  <label key={type.value} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                    <input
                      {...register('userType', { required: 'Veuillez sélectionner un type de profil' })}
                      type="radio"
                      value={type.value}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <div className="text-primary-600">{type.icon}</div>
                    <span className="font-medium text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
              {errors.userType && (
                <p className="text-error-500 text-sm mt-1">{errors.userType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('email', {
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalide',
                    },
                  })}
                  type="email"
                  className="input-field pl-10"
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-error-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('password', {
                    required: 'Le mot de passe est requis',
                    minLength: {
                      value: 6,
                      message: 'Le mot de passe doit contenir au moins 6 caractères',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-error-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('confirmPassword', {
                    required: 'Veuillez confirmer votre mot de passe',
                    validate: (value) =>
                      value === password || 'Les mots de passe ne correspondent pas',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-error-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
              size="lg"
            >
              Créer mon compte
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
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