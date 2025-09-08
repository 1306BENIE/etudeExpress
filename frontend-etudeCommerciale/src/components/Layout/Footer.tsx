import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#004437] text-white">
      {/* Barre orange décorative en haut */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* À propos de nous */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-3">
              À propos de nous
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Interface entre les pouvoirs publics et le secteur privé, la
              Chambre de Commerce et d'Industrie de Côte d'Ivoire est une
              institution d'appui aux entreprises.
            </p>
          </div>

          {/* Liens */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Liens</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Nos services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Actualités
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Agendas
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Nos Formations */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Nos Formations</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  EFCPC
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Centre de Formation Consulaire
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Centre d'études des Langues
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Pôle Bouaké
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Suivez-nous</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-white/90">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div>+225 27 20 33 16 00</div>
                  <div>info@cci.ci</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-white/90">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div>6 Avenue Joseph Anoma</div>
                  <div>Abidjan</div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <Youtube className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/80 text-sm">
            © 2025 CCI CI | Tous droits réservés - Designed by Bénié
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
