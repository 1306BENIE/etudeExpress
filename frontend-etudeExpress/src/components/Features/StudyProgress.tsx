import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface StudyProgressProps {
  status: 'generating' | 'completed' | 'failed';
  progress?: number;
  estimatedTime?: number;
}

const StudyProgress: React.FC<StudyProgressProps> = ({
  status,
  progress = 0,
  estimatedTime,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'generating':
        return {
          icon: <Clock className="w-6 h-6" />,
          title: 'Génération en cours...',
          description: 'Notre IA analyse votre projet et génère votre étude personnalisée.',
          color: 'text-warning-600',
          bgColor: 'bg-warning-100',
        };
      case 'completed':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          title: 'Étude terminée !',
          description: 'Votre étude de marché est prête. Vous pouvez maintenant la consulter.',
          color: 'text-success-600',
          bgColor: 'bg-success-100',
        };
      case 'failed':
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          title: 'Erreur de génération',
          description: 'Une erreur s\'est produite. Veuillez réessayer ou contacter le support.',
          color: 'text-error-600',
          bgColor: 'bg-error-100',
        };
      default:
        return {
          icon: <Clock className="w-6 h-6" />,
          title: 'En attente...',
          description: 'Préparation de la génération.',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`inline-flex p-4 rounded-full ${config.bgColor} mb-4`}
      >
        <div className={config.color}>{config.icon}</div>
      </motion.div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {config.title}
      </h3>
      
      <p className="text-gray-600 mb-6">
        {config.description}
      </p>

      {status === 'generating' && (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>{progress}% terminé</span>
            {estimatedTime && (
              <span>Temps estimé: {estimatedTime}s</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyProgress;