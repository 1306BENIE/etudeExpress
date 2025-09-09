import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, BarChart3, Users, FileText, TrendingUp, Target, Calendar, FileCheck } from 'lucide-react';

interface NavigationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  completedPages: number[];
  totalPages: number;
}

const PAGES_CONFIG = [
  {
    id: 1,
    title: "L'Idée",
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Description du projet"
  },
  {
    id: 2,
    title: "Le Marché",
    icon: <BarChart3 className="w-5 h-5" />,
    description: "4P Marketing"
  },
  {
    id: 3,
    title: "Ressources",
    icon: <Users className="w-5 h-5" />,
    description: "Matérielles et Humaines"
  },
  {
    id: 4,
    title: "Coûts",
    icon: <FileText className="w-5 h-5" />,
    description: "Pré-démarrage"
  },
  {
    id: 5,
    title: "Financement Global",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Coût total & synthèse"
  },
  {
    id: 6,
    title: "Plan de Financement",
    icon: <Target className="w-5 h-5" />,
    description: "Sources externes"
  },
  {
    id: 7,
    title: "Remboursement",
    icon: <Calendar className="w-5 h-5" />,
    description: "& Cashflow"
  },
  {
    id: 8,
    title: "Compte de Résultat",
    icon: <FileCheck className="w-5 h-5" />,
    description: "Prévisionnel"
  },
];

const BusinessPlanNavigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  completedPages,
  totalPages
}) => {
  const calculateProgress = () => {
    return Math.round((completedPages.length / totalPages) * 100);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#751F20]/10 p-6 sticky top-4">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-[#751F20] to-[#8B2635] rounded-full"></div>
        <div>
          <h3 className="font-bold text-gray-900">Navigation</h3>
          <p className="text-xs text-gray-600">{calculateProgress()}% complété</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-[#751F20] to-[#8B2635] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2">
        {PAGES_CONFIG.map((page) => {
          const isCompleted = completedPages.includes(page.id);
          const isCurrent = currentPage === page.id;
          
          return (
            <motion.button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                isCurrent
                  ? "bg-gradient-to-r from-[#751F20]/10 to-[#8B2635]/10 text-[#751F20] border-2 border-[#751F20]/20 shadow-md"
                  : "text-gray-600 hover:bg-gray-50 border-2 border-transparent hover:border-[#751F20]/10"
              }`}
            >
              {/* Contenu principal */}
              <div className="flex items-center space-x-3">
                {/* Numéro de page */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isCurrent 
                    ? 'bg-gradient-to-r from-[#751F20] to-[#8B2635] text-white' 
                    : isCompleted 
                    ? 'bg-[#751F20]/10 text-[#751F20]' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-[#751F20]/10 group-hover:text-[#751F20]'
                }`}>
                  {isCompleted && !isCurrent ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    page.id
                  )}
                </div>
                
                {/* Icône et contenu */}
                <div className="flex items-center space-x-2">
                  <div className={`flex-shrink-0 transition-colors ${
                    isCurrent ? 'text-[#751F20]' : isCompleted ? 'text-[#751F20]' : 'text-gray-400 group-hover:text-[#751F20]'
                  }`}>
                    {page.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate transition-colors ${
                      isCurrent ? 'text-[#751F20]' : 'text-gray-700 group-hover:text-[#751F20]'
                    }`}>
                      {page.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {page.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Indicateur de validation */}
              {isCompleted && (
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#751F20] to-[#8B2635] flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer avec statistiques */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{completedPages.length}/{totalPages} pages</span>
          <span className="font-medium text-[#751F20]">{calculateProgress()}%</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanNavigation;
