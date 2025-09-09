import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Plus, X } from 'lucide-react';
import { BusinessPlanFormProps } from '../types/BusinessPlanTypes';
import Input from '../../UI/Input';
import Textarea from '../../UI/Textarea';
import Button from '../../UI/Button';

const Page1IdeeForm: React.FC<BusinessPlanFormProps> = ({
  data,
  onUpdate,
  onValidate,
  isLoading = false
}) => {
  
  // Validation en temps réel
  React.useEffect(() => {
    const isValid = data.idee.description.trim() !== '' && 
                   data.idee.specificite.trim() !== '' && 
                   data.idee.proprietaires.some(p => p.nom.trim() !== '');
    onValidate(isValid);
  }, [data.idee]);

  const updateIdee = (field: string, value: any) => {
    onUpdate({
      idee: {
        ...data.idee,
        [field]: value
      }
    });
  };

  const addProprietaire = () => {
    const newProprietaires = [
      ...data.idee.proprietaires,
      { nom: '', fonction: '', experience: '' }
    ];
    updateIdee('proprietaires', newProprietaires);
  };

  const removeProprietaire = (index: number) => {
    if (data.idee.proprietaires.length > 1) {
      const newProprietaires = data.idee.proprietaires.filter((_, i) => i !== index);
      updateIdee('proprietaires', newProprietaires);
    }
  };

  const updateProprietaire = (index: number, field: string, value: string) => {
    const newProprietaires = [...data.idee.proprietaires];
    newProprietaires[index] = {
      ...newProprietaires[index],
      [field]: value
    };
    updateIdee('proprietaires', newProprietaires);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-[#751F20]/10 relative overflow-hidden">
        {/* Barre de progression en haut */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20]"></div>
        
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-[#751F20] to-[#8B2635] rounded-xl text-white">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#751F20] via-[#8B2635] to-[#751F20] bg-clip-text text-transparent">
              1. L'Idée
            </h3>
            <p className="text-gray-600 text-sm">Définissez les bases de votre projet entrepreneurial</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Description du projet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Textarea
              label="Rédigez en quelques phrases ce que vous voulez faire"
              value={data.idee.description}
              onChange={(e) => updateIdee('description', e.target.value)}
              placeholder="Décrivez votre projet en détail : quel produit ou service allez-vous offrir ? À qui s'adresse-t-il ? Comment fonctionne votre concept ?"
              rows={4}
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
              required
            />
          </motion.div>

          {/* Spécificité de l'idée */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Textarea
              label="Montrez, pourquoi votre idée est spéciale"
              value={data.idee.specificite}
              onChange={(e) => updateIdee('specificite', e.target.value)}
              placeholder="Qu'est-ce qui rend votre projet unique ? Quelle est votre valeur ajoutée par rapport à la concurrence ? Pourquoi les clients vous choisiront-ils ?"
              rows={4}
              className="focus:border-[#751F20] focus:ring-[#751F20]/20"
              disabled={isLoading}
              required
            />
          </motion.div>

          {/* Propriétaires du projet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Écrire le(s) nom(s) du (des) propriétaire(s) *
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addProprietaire}
                disabled={isLoading}
                className="!border-[#751F20]/30 !text-[#751F20] hover:!bg-[#751F20]/10"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-4">
              {data.idee.proprietaires.map((proprietaire, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      Propriétaire {index + 1}
                    </h4>
                    {data.idee.proprietaires.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProprietaire(index)}
                        disabled={isLoading}
                        className="!text-red-600 hover:!bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="Nom complet"
                      value={proprietaire.nom}
                      onChange={(e) => updateProprietaire(index, 'nom', e.target.value)}
                      placeholder="Nom et prénom"
                      className="focus:border-[#751F20] focus:ring-[#751F20]/20"
                      disabled={isLoading}
                      required
                    />
                    <Input
                      label="Fonction"
                      value={proprietaire.fonction || ''}
                      onChange={(e) => updateProprietaire(index, 'fonction', e.target.value)}
                      placeholder="Ex: Directeur Général"
                      className="focus:border-[#751F20] focus:ring-[#751F20]/20"
                      disabled={isLoading}
                    />
                    <Input
                      label="Expérience"
                      value={proprietaire.experience || ''}
                      onChange={(e) => updateProprietaire(index, 'experience', e.target.value)}
                      placeholder="Ex: 5 ans en commerce"
                      className="focus:border-[#751F20] focus:ring-[#751F20]/20"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Conseils */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <div className="flex items-start space-x-2">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Conseils pour cette étape</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Soyez précis et concret dans la description de votre projet</li>
                <li>• Mettez en avant ce qui vous différencie de la concurrence</li>
                <li>• Mentionnez l'expérience pertinente de chaque propriétaire</li>
                <li>• Pensez aux bénéfices clients plutôt qu'aux caractéristiques techniques</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Page1IdeeForm;
