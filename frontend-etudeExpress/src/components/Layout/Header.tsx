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
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
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
    { name: "Tarifs", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "Intelligence Marché", path: "/chatbot" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b-2 border-[#751F20]/20 shadow-lg">
      {/* Top bar - Style CCI-CI - Tablet & Desktop */}
      <div className="hidden sm:block bg-[#418674] text-white py-3 md:py-4 lg:py-5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-center">
            {/* Contact Info - Tablet & Desktop */}
            <div className="flex flex-row items-center space-x-3 md:space-x-6 lg:space-x-8 text-xs md:text-sm">
              <div className="flex items-center space-x-2 md:space-x-3">
                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                <span className="font-bold">+225 27 20 33 16 00 </span>
                <span className="font-bold ml-2">|</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <Mail className="w-3 h-3 md:w-4 md:h-4" />
                <span className="font-bold">info@cci.ci </span>
                <span className="font-bold ml-4">|</span>
              </div>

              {/* Social Media Icons - Desktop only */}
              <div className="hidden lg:flex items-center space-x-4">
                <a
                  href="#"
                  className="text-white hover:text-[#F27F20] transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/10"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#F27F20] transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/10"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#F27F20] transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/10"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#F27F20] transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/10"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/2250152343111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#25D366] transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/10"
                  title="Contactez-nous sur WhatsApp"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </a>
              </div>
            </div>

            {/* About Link - Tablet & Desktop */}
            <div className="flex items-center">
              <Link
                to="/about"
                className="text-[#F27F20] hover:text-white font-bold transition-colors duration-200 text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded-lg hover:bg-[#F27F20]/10"
              >
                CONNAÎTRE ETUDEEXPRESS
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo - Style institutionnel - Responsive */}
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 group"
            >
              <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-[#751F20] to-[#1A473B] rounded-lg lg:rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#751F20] leading-tight">
                  EtudeExpress
                </span>
                <span className="text-xs text-gray-600 font-medium hidden sm:block">
                  ASSISTANT DIGITAL INTELLIGENT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Style CCI-CI */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                  style={{ zIndex: 1000 - index }}
                >
                  <Link
                    to={item.path}
                    className="relative px-6 py-3 text-gray-700 hover:text-[#751F20] font-semibold transition-all duration-300 group overflow-hidden rounded-lg"
                    style={{
                      isolation: "isolate",
                      contain: "layout style paint",
                      pointerEvents: "auto",
                    }}
                  >
                    <span className="relative z-10">{item.name}</span>

                    {/* Background hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#751F20]/5 to-[#1A473B]/5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-lg" />

                    {/* Bottom indicator */}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-[#751F20] to-[#1A473B] group-hover:w-full transition-all duration-500 ease-out rounded-full shadow-lg" />

                    {/* Top accent line */}
                    <span className="absolute -top-1 left-0 w-0 h-0.5 bg-[#F27F20] group-hover:w-full transition-all duration-700 ease-out rounded-full delay-100" />

                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#751F20]/20 to-[#1A473B]/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl scale-150" />

                    {/* Effet de brillance général */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

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
                <div className="hidden lg:flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-[#751F20] font-semibold transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-50 text-base"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#751F20] hover:bg-[#751F20]/90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
                  >
                    Inscription
                  </Link>
                </div>
              )}

              {/* Mobile menu button - Responsive */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#751F20]" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#751F20]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Responsive */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -20 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
            <nav className="grid grid-cols-1 gap-0.5 sm:gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="group flex items-center justify-between text-gray-700 hover:text-[#751F20] font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:bg-gradient-to-r hover:from-[#751F20]/5 hover:to-[#1A473B]/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#751F20] hover:shadow-sm hover:scale-[1.005] text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-[#751F20] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100" />
                      <span>{item.name}</span>
                    </span>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-[#751F20]/20 to-[#1A473B]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-2 sm:pt-3 border-t border-gray-200/50 mt-2 sm:mt-3"
              >
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <Link
                    to="/login"
                    className="flex items-center justify-center text-gray-700 hover:text-[#751F20] font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:bg-gradient-to-r hover:from-[#751F20]/5 hover:to-[#1A473B]/5 transition-all duration-300 border-l-4 border-transparent hover:border-[#751F20] hover:shadow-sm hover:scale-[1.005] text-sm w-32"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-[#751F20] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100" />
                      <span>Connexion</span>
                    </span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center bg-[#751F20] hover:bg-[#751F20]/90 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.005] text-sm w-32"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Inscription</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
