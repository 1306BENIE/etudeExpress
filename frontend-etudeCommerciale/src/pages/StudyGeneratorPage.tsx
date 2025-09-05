import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FileText, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Target,
  Plus,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useStudy } from '../contexts/StudyContext';
import { StudyRequest } from '../types/study';
import Button from '../components/UI/Button';

const StudyGeneratorPage: React.FC = () => {
  const [objectives, setObjectives] = useState<string[]>(['']);
  const [questions, setQuestions] = useState<string[]>(['']);
  const { generateStudy, isGenerating } = useStudy();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<StudyRequest, 'objectives' | 'specificQuestions'>>();

  const addObjective = () => {
    setObjectives([...objectives, '']);
  };

  const removeObjective = (index: number) => {
    if (objectives.length > 1) {
      setObjectives(objectives.filter((_, i) => i !== index));
    }
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const onSubmit = async (data: Omit<StudyRequest, 'objectives' | 'specificQuestions'>) => {
    const filteredObjectives = objectives.filter(obj => obj.trim() !== '');
    const filteredQuestions = questions.filter(q => q.trim() !== '');

    if (filteredObjectives.length === 0) {
      toast.error('Veuillez ajouter au moins un objectif');
      return;
    }

    const studyRequest: StudyRequest = {
      ...data,
      objectives: filteredObjectives,
      specificQuestions: filteredQuestions,
    };

    try {
      const study = await generateStudy(studyRequest);
      toast.success('Étude générée avec succès !');
      navigate(`/study-results/${study.id}`);
    } catch (error) {
      toast.error('Erreur lors de la génération de l\'étude');
    }
  };

  const sectors = [
    'Agriculture et Agroalimentaire',
    'Technologies et Digital',
    'Commerce et Distribution',
    'Services Financiers',
    'Santé et Bien-être',
    'Éducation et Formation',
    'Transport et Logistique',
    'Énergie et Environnement',
    'Tourisme et Hôtellerie',
    'Artisanat et Mode',
    'Autre',
  ];

  const locations = [
    'Abidjan',
    'Bouaké',
    'Daloa',
    'Korhogo',
    'San-Pédro',
    'Yamoussoukro',
    'Man',
    'Divo',
    'Gagnoa',
    'Autre ville de Côte d\'Ivoire',
    'Afrique de l\'Ouest',
    'Afrique',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Générer une nouvelle étude
          </h1>
          <p className="text-gray-600">
            Remplissez les informations ci-dessous pour générer votre étude de marché personnalisée.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Project Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                Informations du projet
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du projet *
                  </label>
                  <input
                    {...register('projectName', { required: 'Le nom du projet est requis' })}
                    type="text"
                    className="input-field"
                    placeholder="Ex: Application de livraison de repas"
                  />
                  {errors.projectName && (
                    <p className="text-error-500 text-sm mt-1">{errors.projectName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteur d'activité *
                  </label>
                  <select
                    {...register('sector', { required: 'Le secteur est requis' })}
                    className="input-field"
                  >
                    <option value="">Sélectionner un secteur</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <p className="text-error-500 text-sm mt-1">{errors.sector.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marché cible *
                  </label>
                  <input
                    {...register('targetMarket', { required: 'Le marché cible est requis' })}
                    type="text"
                    className="input-field"
                    placeholder="Ex: Jeunes urbains 18-35 ans"
                  />
                  {errors.targetMarket && (
                    <p className="text-error-500 text-sm mt-1">{errors.targetMarket.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation *
                  </label>
                  <select
                    {...register('location', { required: 'La localisation est requise' })}
                    className="input-field"
                  >
                    <option value="">Sélectionner une localisation</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <p className="text-error-500 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget estimé (FCFA) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('budget', { 
                        required: 'Le budget est requis',
                        min: { value: 0, message: 'Le budget doit être positif' }
                      })}
                      type="number"
                      className="input-field pl-10"
                      placeholder="1000000"
                    />
                  </div>
                  {errors.budget && (
                    <p className="text-error-500 text-sm mt-1">{errors.budget.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      {...register('timeline', { required: 'La timeline est requise' })}
                      className="input-field pl-10"
                    >
                      <option value="">Sélectionner une durée</option>
                      <option value="3 mois">3 mois</option>
                      <option value="6 mois">6 mois</option>
                      <option value="1 an">1 an</option>
                      <option value="2 ans">2 ans</option>
                      <option value="5 ans">5 ans</option>
                    </select>
                  </div>
                  {errors.timeline && (
                    <p className="text-error-500 text-sm mt-1">{errors.timeline.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary-600" />
                Objectifs de l'étude *
              </h2>

              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      className="input-field flex-1"
                      placeholder={`Objectif ${index + 1}`}
                    />
                    {objectives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeObjective(index)}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addObjective}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un objectif</span>
                </button>
              </div>
            </div>

            {/* Specific Questions */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Questions spécifiques (optionnel)
              </h2>

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => updateQuestion(index, e.target.value)}
                      className="input-field flex-1"
                      placeholder={`Question ${index + 1}`}
                    />
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter une question</span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                isLoading={isGenerating}
                size="lg"
              >
                {isGenerating ? 'Génération en cours...' : 'Générer l\'étude'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default StudyGeneratorPage;