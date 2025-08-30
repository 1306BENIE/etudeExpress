import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { useStudy } from '../contexts/StudyContext';
import { Study } from '../types/study';
import { formatCurrency, formatDate } from '../utils/validation';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import ExportOptions from '../components/Features/ExportOptions';

const StudyResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [study, setStudy] = useState<Study | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getStudy, exportStudyToPDF, exportStudyToExcel } = useStudy();

  useEffect(() => {
    const loadStudy = async () => {
      if (!id) return;
      
      try {
        const studyData = await getStudy(id);
        setStudy(studyData);
      } catch (error) {
        toast.error('Erreur lors du chargement de l\'étude');
      } finally {
        setIsLoading(false);
      }
    };

    loadStudy();
  }, [id, getStudy]);

  const handleExportPDF = async () => {
    if (!study) return;
    try {
      await exportStudyToPDF(study);
      toast.success('Rapport PDF téléchargé !');
    } catch (error) {
      toast.error('Erreur lors de l\'export PDF');
    }
  };

  const handleExportExcel = async () => {
    if (!study) return;
    try {
      await exportStudyToExcel(study);
      toast.success('Rapport Excel téléchargé !');
    } catch (error) {
      toast.error('Erreur lors de l\'export Excel');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Étude introuvable</h2>
          <p className="text-gray-600 mb-6">L'étude demandée n'existe pas ou a été supprimée.</p>
          <Link to="/dashboard">
            <Button>Retour au tableau de bord</Button>
          </Link>
        </div>
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
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {study.request.projectName}
              </h1>
              <p className="text-gray-600">
                Étude générée le {new Date(study.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>

          <ExportOptions
            study={study}
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Executive Summary */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Résumé exécutif
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {study.executiveSummary}
              </p>
            </Card>

            {/* Market Data */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
                Données du marché
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-medium text-primary-900 mb-2">Taille du marché</h3>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatCurrency(study.marketData.marketSize)}
                  </p>
                </div>
                <div className="bg-success-50 p-4 rounded-lg">
                  <h3 className="font-medium text-success-900 mb-2">Taux de croissance</h3>
                  <p className="text-2xl font-bold text-success-600">
                    {study.marketData.growthRate}%
                  </p>
                </div>
              </div>

              {/* Competitors */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Principaux concurrents</h3>
                <div className="space-y-3">
                  {study.marketData.competitors.slice(0, 3).map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{competitor.name}</h4>
                        <p className="text-sm text-gray-600">Part de marché: {competitor.marketShare}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{competitor.pricing}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trends */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Tendances du marché</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-success-700 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Opportunités
                    </h4>
                    <ul className="space-y-1">
                      {study.marketData.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-error-700 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Menaces
                    </h4>
                    <ul className="space-y-1">
                      {study.marketData.threats.map((threat, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-error-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Financial Projections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                Projections financières
              </h2>

              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={study.financialProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString()} FCFA`,
                        name === 'revenue' ? 'Revenus' : name === 'costs' ? 'Coûts' : 'Profit'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#0ea5e9" 
                      strokeWidth={3}
                      dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="costs" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {study.financialProjections.slice(0, 3).map((projection, index) => (
                  <div key={projection.year} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Année {projection.year}</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        Revenus: <span className="font-medium text-primary-600">
                          {projection.revenue.toLocaleString()} FCFA
                        </span>
                      </p>
                      <p className="text-gray-600">
                        ROI: <span className="font-medium text-success-600">
                          {projection.roi}%
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-warning-600" />
                Recommandations
              </h3>
              <ul className="space-y-3">
                {study.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Risk Analysis */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-error-600" />
                Analyse des risques
              </h3>
              <ul className="space-y-3">
                {study.riskAnalysis.map((risk, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-error-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">{risk}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations du projet
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Secteur:</span>
                  <span className="text-gray-600 ml-2">{study.request.sector}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Marché cible:</span>
                  <span className="text-gray-600 ml-2">{study.request.targetMarket}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Localisation:</span>
                  <span className="text-gray-600 ml-2">{study.request.location}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Budget:</span>
                  <span className="text-gray-600 ml-2">
                    {study.request.budget.toLocaleString()} FCFA
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Timeline:</span>
                  <span className="text-gray-600 ml-2">{study.request.timeline}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyResultsPage;