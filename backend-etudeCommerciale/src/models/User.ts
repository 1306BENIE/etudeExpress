import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'entrepreneur' | 'student' | 'investor';
  avatar?: string;
  subscription: {
    plan: 'free' | 'basic' | 'premium';
    expiresAt?: Date;
    studiesUsed: number;
    studiesLimit: number;
  };
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true,
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères'],
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide'],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
  },
  userType: {
    type: String,
    enum: ['entrepreneur', 'student', 'investor'],
    required: [true, 'Le type d\'utilisateur est requis'],
  },
  avatar: {
    type: String,
    default: '',
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free',
    },
    expiresAt: {
      type: Date,
    },
    studiesUsed: {
      type: Number,
      default: 0,
    },
    studiesLimit: {
      type: Number,
      default: 1, // Free plan limit
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update subscription limits based on plan
userSchema.pre('save', function(next) {
  if (this.isModified('subscription.plan')) {
    switch (this.subscription.plan) {
      case 'free':
        this.subscription.studiesLimit = 1;
        break;
      case 'basic':
        this.subscription.studiesLimit = 5;
        break;
      case 'premium':
        this.subscription.studiesLimit = -1; // Unlimited
        break;
    }
  }
  next();
});

export default mongoose.model<IUser>('User', userSchema);