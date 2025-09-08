import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  FileText, 
  Clock, 
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStudy } from '../contexts/StudyContext';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import StatsCard from '../components/Features/StatsCard';
import StudyCard from '../components/Features/StudyCard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { studies, getUserStudies } = useStudy();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudies = async () => {
      try {
        await getUserStudies();
      } catch (error) {
        console.error('Error loading studies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudies();
  }, [getUserStudies]);

  const stats = [
    {
      title: 'Études créées',
      value: studies.length,
      icon: <FileText className="w-6 h-6" />,
      color: 'primary' as const,
    },
    {
      title: 'En cours',
      value: studies.filter(s => s.status === 'generating').length,
      icon: <Clock className="w-6 h-6" />,
      color: 'warning' as const,
    },
    {
      title: 'Terminées',
      value: studies.filter(s => s.status === 'completed').length,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'success' as const,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour, {user?.firstName} ! 👋
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de vos études de marché et analyses.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/generate-study">
              <Button className="w-full justify-start" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Nouvelle étude
              </Button>
            </Link>
            <Link to="/chatbot">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Assistant IA
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <BarChart3 className="w-5 h-5 mr-2" />
              Analyses sectorielles
            </Button>
          </div>
        </motion.div>

        {/* Recent Studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Études récentes</h2>
            <Link to="/studies">
              <Button variant="ghost" size="sm">
                Voir tout
              </Button>
            </Link>
          </div>

          {studies.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune étude pour le moment
              </h3>
              <p className="text-gray-600 mb-6">
                Commencez par créer votre première étude de marché
              </p>
              <Link to="/generate-study">
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  Créer une étude
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {studies.slice(0, 5).map((study) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;