export interface StudyRequest {
  projectName: string;
  sector: string;
  targetMarket: string;
  location: string;
  budget: number;
  timeline: string;
  objectives: string[];
  specificQuestions?: string[];
}

export interface MarketData {
  marketSize: number;
  growthRate: number;
  competitors: Competitor[];
  trends: string[];
  opportunities: string[];
  threats: string[];
}

export interface Competitor {
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
}

export interface FinancialProjection {
  year: number;
  revenue: number;
  costs: number;
  profit: number;
  roi: number;
}

export interface StudyData {
  marketData: MarketData;
  financialProjections: FinancialProjection[];
  recommendations: string[];
  riskAnalysis: string[];
  executiveSummary: string;
}