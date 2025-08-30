import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Study, StudyRequest } from '../types/study';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const studyService = {
  async generateStudy(request: StudyRequest): Promise<Study> {
    const response = await api.post('/studies/generate', request);
    return response.data;
  },

  async getStudy(id: string): Promise<Study> {
    const response = await api.get(`/studies/${id}`);
    return response.data;
  },

  async getUserStudies(): Promise<Study[]> {
    const response = await api.get('/studies');
    return response.data;
  },

  async deleteStudy(id: string): Promise<void> {
    await api.delete(`/studies/${id}`);
  },

  async exportToPDF(study: Study): Promise<void> {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Étude de Marché - ' + study.request.projectName, 20, 30);
    
    // Executive Summary
    doc.setFontSize(16);
    doc.text('Résumé Exécutif', 20, 50);
    doc.setFontSize(12);
    const summaryLines = doc.splitTextToSize(study.executiveSummary, 170);
    doc.text(summaryLines, 20, 60);
    
    // Market Data
    let yPosition = 60 + (summaryLines.length * 5) + 20;
    doc.setFontSize(16);
    doc.text('Données du Marché', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Taille du marché: ${study.marketData.marketSize.toLocaleString()} FCFA`, 20, yPosition);
    yPosition += 10;
    doc.text(`Taux de croissance: ${study.marketData.growthRate}%`, 20, yPosition);
    
    doc.save(`etude-${study.request.projectName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  },

  async exportToExcel(study: Study): Promise<void> {
    const workbook = XLSX.utils.book_new();
    
    // Summary sheet
    const summaryData = [
      ['Projet', study.request.projectName],
      ['Secteur', study.request.sector],
      ['Marché cible', study.request.targetMarket],
      ['Localisation', study.request.location],
      ['Budget', study.request.budget],
      ['', ''],
      ['Taille du marché', study.marketData.marketSize],
      ['Taux de croissance', study.marketData.growthRate + '%'],
    ];
    
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Résumé');
    
    // Financial projections sheet
    const financialData = [
      ['Année', 'Revenus', 'Coûts', 'Profit', 'ROI'],
      ...study.financialProjections.map(proj => [
        proj.year,
        proj.revenue,
        proj.costs,
        proj.profit,
        proj.roi + '%'
      ])
    ];
    
    const financialSheet = XLSX.utils.aoa_to_sheet(financialData);
    XLSX.utils.book_append_sheet(workbook, financialSheet, 'Projections');
    
    XLSX.writeFile(workbook, `etude-${study.request.projectName.toLowerCase().replace(/\s+/g, '-')}.xlsx`);
  },
};