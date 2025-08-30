import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Calendar, MapPin, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Study } from '../../types/study';
import { formatDate, formatCurrency } from '../../utils/validation';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';

interface StudyCardProps {
  study: Study;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const StudyCard: React.FC<StudyCardProps> = ({
  study,
  onDelete,
  showActions = true,
}) => {
  const getStatusBadge = () => {
    switch (study.status) {
      case 'completed':
        return (
          <Badge variant="success" size="sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            Terminée
          </Badge>
        );
      case 'generating':
        return (
          <Badge variant="warning" size="sm">
            <TrendingUp className="w-3 h-3 mr-1" />
            En cours
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="error" size="sm">
            <AlertCircle className="w-3 h-3 mr-1" />
            Échec
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {study.request.projectName}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(study.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{study.request.location}</span>
              </div>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Secteur:</span>
              <p className="text-gray-600 truncate">{study.request.sector}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Budget:</span>
              <p className="text-gray-600">{formatCurrency(study.request.budget)}</p>
            </div>
          </div>
          
          <div>
            <span className="font-medium text-gray-700 text-sm">Marché cible:</span>
            <p className="text-gray-600 text-sm line-clamp-2">{study.request.targetMarket}</p>
          </div>

          {study.status === 'completed' && study.marketData && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium text-gray-700">Taille marché:</span>
                  <p className="text-primary-600 font-semibold">
                    {formatCurrency(study.marketData.marketSize)}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Croissance:</span>
                  <p className="text-success-600 font-semibold">
                    {study.marketData.growthRate}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {study.status === 'completed' ? (
              <Link to={`/study-results/${study.id}`} className="flex-1">
                <Button variant="primary" size="sm" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Voir l'étude
                </Button>
              </Link>
            ) : (
              <div className="flex-1">
                <Button variant="outline" size="sm" className="w-full" disabled>
                  {study.status === 'generating' ? 'Génération...' : 'Indisponible'}
                </Button>
              </div>
            )}
            
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(study.id)}
                className="ml-2 text-error-600 hover:text-error-700 hover:bg-error-50"
              >
                Supprimer
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StudyCard;