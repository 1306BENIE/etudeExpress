import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Study, StudyRequest } from '../types/study';
import { studyService } from '../services/studyService';

interface StudyContextType {
  studies: Study[];
  currentStudy: Study | null;
  isGenerating: boolean;
  generateStudy: (request: StudyRequest) => Promise<Study>;
  getStudy: (id: string) => Promise<Study>;
  getUserStudies: () => Promise<Study[]>;
  exportStudyToPDF: (study: Study) => Promise<void>;
  exportStudyToExcel: (study: Study) => Promise<void>;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};

interface StudyProviderProps {
  children: ReactNode;
}

export const StudyProvider: React.FC<StudyProviderProps> = ({ children }) => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [currentStudy, setCurrentStudy] = useState<Study | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStudy = async (request: StudyRequest): Promise<Study> => {
    setIsGenerating(true);
    try {
      const study = await studyService.generateStudy(request);
      setStudies(prev => [study, ...prev]);
      setCurrentStudy(study);
      return study;
    } finally {
      setIsGenerating(false);
    }
  };

  const getStudy = async (id: string): Promise<Study> => {
    const study = await studyService.getStudy(id);
    setCurrentStudy(study);
    return study;
  };

  const getUserStudies = async (): Promise<Study[]> => {
    const userStudies = await studyService.getUserStudies();
    setStudies(userStudies);
    return userStudies;
  };

  const exportStudyToPDF = async (study: Study): Promise<void> => {
    await studyService.exportToPDF(study);
  };

  const exportStudyToExcel = async (study: Study): Promise<void> => {
    await studyService.exportToExcel(study);
  };

  const value = {
    studies,
    currentStudy,
    isGenerating,
    generateStudy,
    getStudy,
    getUserStudies,
    exportStudyToPDF,
    exportStudyToExcel,
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
};