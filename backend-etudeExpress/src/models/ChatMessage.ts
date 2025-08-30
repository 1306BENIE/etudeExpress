import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
  userId?: mongoose.Types.ObjectId;
  sessionId: string;
  type: 'user' | 'bot';
  content: string;
  studyId?: mongoose.Types.ObjectId;
  metadata?: {
    intent?: string;
    confidence?: number;
    responseTime?: number;
  };
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['user', 'bot'],
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Le contenu du message est requis'],
    maxlength: [2000, 'Le message ne peut pas dépasser 2000 caractères'],
  },
  studyId: {
    type: Schema.Types.ObjectId,
    ref: 'Study',
  },
  metadata: {
    intent: String,
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
    responseTime: {
      type: Number,
      min: 0,
    },
  },
}, {
  timestamps: true,
});

// Indexes
chatMessageSchema.index({ userId: 1, createdAt: -1 });
chatMessageSchema.index({ sessionId: 1, createdAt: 1 });
chatMessageSchema.index({ studyId: 1 });

export default mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);