import { Response, NextFunction } from 'express';
import User from '../models/User';
import Study from '../models/Study';
import { AuthRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

export const updateSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError('Utilisateur non authentifié', 401);
    }

    const { plan } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError('Utilisateur introuvable', 404);
    }

    // Update subscription
    user.subscription.plan = plan;
    
    // Set expiration date for paid plans
    if (plan !== 'free') {
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      user.subscription.expiresAt = expirationDate;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Abonnement mis à jour avec succès',
      data: {
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError('Utilisateur non authentifié', 401);
    }

    const totalStudies = await Study.countDocuments({ userId: req.user._id });
    const completedStudies = await Study.countDocuments({ 
      userId: req.user._id, 
      status: 'completed' 
    });
    const generatingStudies = await Study.countDocuments({ 
      userId: req.user._id, 
      status: 'generating' 
    });

    // Get recent activity
    const recentStudies = await Study.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('request.projectName status createdAt');

    // Calculate average generation time
    const completedStudiesWithTime = await Study.find({
      userId: req.user._id,
      status: 'completed',
      generationTime: { $exists: true },
    }).select('generationTime');

    const avgGenerationTime = completedStudiesWithTime.length > 0
      ? Math.round(
          completedStudiesWithTime.reduce((sum, study) => sum + (study.generationTime || 0), 0) /
          completedStudiesWithTime.length
        )
      : 0;

    res.json({
      success: true,
      data: {
        totalStudies,
        completedStudies,
        generatingStudies,
        recentStudies,
        avgGenerationTime,
        subscription: req.user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError('Utilisateur non authentifié', 401);
    }

    // In a real implementation, you would handle file upload here
    // For now, we'll just accept a URL
    const { avatarUrl } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    ).select('-password');

    if (!user) {
      throw createError('Utilisateur introuvable', 404);
    }

    res.json({
      success: true,
      message: 'Avatar mis à jour avec succès',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};