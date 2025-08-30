import mongoose, { Document, Schema } from 'mongoose';

export interface IStudy extends Document {
  userId: mongoose.Types.ObjectId;
  request: {
    projectName: string;
    sector: string;
    targetMarket: string;
    location: string;
    budget: number;
    timeline: string;
    objectives: string[];
    specificQuestions?: string[];
  };
  marketData: {
    marketSize: number;
    growthRate: number;
    competitors: Array<{
      name: string;
      marketShare: number;
      strengths: string[];
      weaknesses: string[];
      pricing: string;
    }>;
    trends: string[];
    opportunities: string[];
    threats: string[];
  };
  financialProjections: Array<{
    year: number;
    revenue: number;
    costs: number;
    profit: number;
    roi: number;
  }>;
  recommendations: string[];
  riskAnalysis: string[];
  executiveSummary: string;
  status: 'generating' | 'completed' | 'failed';
  generationTime?: number; // in seconds
  createdAt: Date;
  updatedAt: Date;
}

const studySchema = new Schema<IStudy>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  request: {
    projectName: {
      type: String,
      required: [true, 'Le nom du projet est requis'],
      trim: true,
      maxlength: [100, 'Le nom du projet ne peut pas dépasser 100 caractères'],
    },
    sector: {
      type: String,
      required: [true, 'Le secteur est requis'],
      trim: true,
    },
    targetMarket: {
      type: String,
      required: [true, 'Le marché cible est requis'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'La localisation est requise'],
      trim: true,
    },
    budget: {
      type: Number,
      required: [true, 'Le budget est requis'],
      min: [0, 'Le budget doit être positif'],
    },
    timeline: {
      type: String,
      required: [true, 'La timeline est requise'],
    },
    objectives: [{
      type: String,
      required: true,
      trim: true,
    }],
    specificQuestions: [{
      type: String,
      trim: true,
    }],
  },
  marketData: {
    marketSize: {
      type: Number,
      required: true,
      min: 0,
    },
    growthRate: {
      type: Number,
      required: true,
    },
    competitors: [{
      name: { type: String, required: true },
      marketShare: { type: Number, required: true, min: 0, max: 100 },
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      pricing: { type: String, required: true },
    }],
    trends: [{ type: String }],
    opportunities: [{ type: String }],
    threats: [{ type: String }],
  },
  financialProjections: [{
    year: { type: Number, required: true },
    revenue: { type: Number, required: true, min: 0 },
    costs: { type: Number, required: true, min: 0 },
    profit: { type: Number, required: true },
    roi: { type: Number, required: true },
  }],
  recommendations: [{ type: String }],
  riskAnalysis: [{ type: String }],
  executiveSummary: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['generating', 'completed', 'failed'],
    default: 'generating',
  },
  generationTime: {
    type: Number,
    min: 0,
  },
}, {
  timestamps: true,
});

// Indexes for better performance
studySchema.index({ userId: 1, createdAt: -1 });
studySchema.index({ status: 1 });
studySchema.index({ 'request.sector': 1 });
studySchema.index({ 'request.location': 1 });

export default mongoose.model<IStudy>('Study', studySchema);