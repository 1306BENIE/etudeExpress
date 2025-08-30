import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  BarChart3,
  Building2,
  Globe,
  Phone,
  Mail,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
  };

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Tarifs", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "Assistant IA", path: "/chatbot" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b-2 border-[#751F20]/20 shadow-lg">
      {/* Top bar - Style CCI-CI */}
      <div className="bg-[#1A473B] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+225 07 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@etudeexpress.ci</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#F27F20] font-medium">
                CONNAÎTRE ETUDEEXPRESS
              </span>
              <span className="text-[#1A8C8C] font-medium">CACI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Style institutionnel */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-3 bg-gradient-to-br from-[#751F20] to-[#1A473B] rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#751F20] leading-tight">
                  EtudeExpress
                </span>
                <span className="text-xs text-gray-600 font-medium">
                  ASSISTANT DIGITAL INTELLIGENT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Style CCI-CI */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative px-4 py-3 text-gray-700 hover:text-[#751F20] font-semibold transition-all duration-200 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#751F20] group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              ))}
            </nav>

            {/* Search bar - Style CCI-CI */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-64 px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:border-[#751F20] focus:ring-2 focus:ring-[#751F20]/20 transition-all duration-200"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 bg-[#751F20] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:border-[#751F20]/30"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#751F20] to-[#1A473B] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {user?.firstName.charAt(0)}
                        {user?.lastName.charAt(0)}
                      </span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <span className="block text-gray-900 font-semibold text-sm">
                        {user?.firstName}
                      </span>
                      <span className="block text-gray-500 text-xs">
                        Connecté
                      </span>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-50"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-[#751F20]/5 hover:text-[#751F20] transition-all duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <BarChart3 className="w-5 h-5" />
                        <span className="font-medium">Tableau de bord</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-[#751F20]/5 hover:text-[#751F20] transition-all duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Profil</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-[#751F20]/5 hover:text-[#751F20] transition-all duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Paramètres</span>
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Déconnexion</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-[#751F20] font-semibold transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#751F20] hover:bg-[#751F20]/90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Inscription
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-[#751F20]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#751F20]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav className="grid grid-cols-1 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-[#751F20] font-semibold py-3 px-4 rounded-lg hover:bg-[#751F20]/5 transition-all duration-200 border-l-4 border-transparent hover:border-[#751F20]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-2 border-gray-200" />
              <div className="pt-4">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#751F20] focus:ring-2 focus:ring-[#751F20]/20 transition-all duration-200"
                />
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
