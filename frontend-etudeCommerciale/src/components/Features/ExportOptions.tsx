import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Table, Share2, Mail } from 'lucide-react';
import { Study } from '../../types/study';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import toast from 'react-hot-toast';

interface ExportOptionsProps {
  study: Study;
  onExportPDF: () => Promise<void>;
  onExportExcel: () => Promise<void>;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  study,
  onExportPDF,
  onExportExcel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState<'pdf' | 'excel' | null>(null);

  const handleExport = async (type: 'pdf' | 'excel') => {
    setIsExporting(type);
    try {
      if (type === 'pdf') {
        await onExportPDF();
      } else {
        await onExportExcel();
      }
      toast.success(`Rapport ${type.toUpperCase()} téléchargé avec succès !`);
    } catch (error) {
      toast.error(`Erreur lors de l'export ${type.toUpperCase()}`);
    } finally {
      setIsExporting(null);
      setIsModalOpen(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Étude de marché - ${study.request.projectName}`,
        text: study.executiveSummary.substring(0, 200) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers !');
    }
  };

  const exportOptions = [
    {
      type: 'pdf' as const,
      title: 'Export PDF',
      description: 'Rapport complet au format PDF pour présentation',
      icon: <FileText className="w-6 h-6" />,
      color: 'text-error-600 bg-error-100',
    },
    {
      type: 'excel' as const,
      title: 'Export Excel',
      description: 'Données structurées pour analyse approfondie',
      icon: <Table className="w-6 h-6" />,
      color: 'text-success-600 bg-success-100',
    },
  ];

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Exporter</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleShare}
          className="flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Options d'export"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">
            Choisissez le format d'export pour votre étude de marché.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {exportOptions.map((option) => (
              <motion.button
                key={option.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExport(option.type)}
                disabled={isExporting === option.type}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left w-full"
              >
                <div className={`p-3 rounded-lg ${option.color}`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                {isExporting === option.type && (
                  <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                )}
              </motion.button>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                const subject = `Étude de marché - ${study.request.projectName}`;
                const body = `Voici le lien vers mon étude de marché :\n\n${window.location.href}`;
                window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
              }}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Mail className="w-4 h-4" />
              <span>Partager par email</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ExportOptions;