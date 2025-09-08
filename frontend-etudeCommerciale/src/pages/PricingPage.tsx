import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, X } from 'lucide-react';
import Button from '../components/UI/Button';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Gratuit',
      price: '0',
      period: 'Toujours gratuit',
      description: 'Parfait pour découvrir EtudeExpress',
      icon: <Star className="w-6 h-6" />,
      features: [
        '1 étude de marché par mois',
        'Assistant IA basique',
        'Export PDF',
        'Support communautaire',
        'Analyses sectorielles limitées',
      ],
      limitations: [
        'Pas d\'export Excel',
        'Pas de support prioritaire',
        'Analyses limitées',
      ],
      cta: 'Commencer gratuitement',
      popular: false,
    },
    {
      name: 'Entrepreneur',
      price: '15,000',
      period: 'par mois',
      description: 'Idéal pour les entrepreneurs actifs',
      icon: <Zap className="w-6 h-6" />,
      features: [
        '5 études de marché par mois',
        'Assistant IA avancé',
        'Export PDF et Excel',
        'Support prioritaire',
        'Analyses sectorielles complètes',
        'Projections financières détaillées',
        'Accès aux tendances du marché',
      ],
      cta: 'Choisir ce plan',
      popular: true,
    },
    {
      name: 'Entreprise',
      price: '45,000',
      period: 'par mois',
      description: 'Pour les équipes et grandes entreprises',
      icon: <Crown className="w-6 h-6" />,
      features: [
        'Études illimitées',
        'Assistant IA expert',
        'Tous les formats d\'export',
        'Support dédié 24/7',
        'Analyses personnalisées',
        'API access',
        'Rapports sur mesure',
        'Formation équipe',
        'Intégration CRM',
      ],
      cta: 'Nous contacter',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tarifs transparents pour tous
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Tous nos plans incluent 
            l'accès à notre IA et des études de qualité professionnelle.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary-500 scale-105' 
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-full mb-4 ${
                    plan.popular ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== '0' && <span className="text-gray-600 ml-1">FCFA</span>}
                  </div>
                  <p className="text-gray-600">{plan.period}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                      <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to={plan.name === 'Gratuit' ? '/register' : '/contact'}>
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Questions fréquentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Puis-je changer de plan à tout moment ?
                </h3>
                <p className="text-gray-600">
                  Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. 
                  Les changements prennent effet immédiatement.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Les données sont-elles sécurisées ?
                </h3>
                <p className="text-gray-600">
                  Absolument. Nous utilisons un chiffrement de niveau bancaire et 
                  respectons les normes de protection des données.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Y a-t-il une période d'essai ?
                </h3>
                <p className="text-gray-600">
                  Le plan gratuit vous permet de tester notre service. 
                  Aucune carte de crédit requise pour commencer.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Support technique disponible ?
                </h3>
                <p className="text-gray-600">
                  Oui, nous offrons un support par email pour tous les plans, 
                  et un support prioritaire pour les plans payants.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;