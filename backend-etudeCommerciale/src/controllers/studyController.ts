import { Response, NextFunction } from "express";
import Study, { IStudy } from "../models/Study";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";
import { createError } from "../middleware/errorHandler";
import { aiService } from "../services/aiService";

export const generateStudy = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError("Utilisateur non authentifié", 401);
    }

    // Check subscription limits
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError("Utilisateur introuvable", 404);
    }

    if (
      user.subscription.studiesLimit !== -1 &&
      user.subscription.studiesUsed >= user.subscription.studiesLimit
    ) {
      throw createError("Limite d'études atteinte pour votre plan", 403);
    }

    const studyRequest = req.body;

    // Create study with generating status
    const study = new Study({
      userId: req.user._id,
      request: studyRequest,
      status: "generating",
      marketData: {
        marketSize: 0,
        growthRate: 0,
        competitors: [],
        trends: [],
        opportunities: [],
        threats: [],
      },
      financialProjections: [],
      recommendations: [],
      riskAnalysis: [],
      executiveSummary: "",
    });

    await study.save();

    // Generate study data asynchronously
    generateStudyData(study._id?.toString() || "", studyRequest);

    // Update user's studies count
    user.subscription.studiesUsed += 1;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Génération de l'étude en cours",
      data: study,
    });
  } catch (error) {
    next(error);
  }
};

const generateStudyData = async (studyId: string, request: any) => {
  try {
    const startTime = Date.now();

    // Generate study data using AI service
    const studyData = await aiService.generateMarketStudy(request);

    const generationTime = Math.round((Date.now() - startTime) / 1000);

    // Update study with generated data
    await Study.findByIdAndUpdate(studyId, {
      ...studyData,
      status: "completed",
      generationTime,
    });
  } catch (error) {
    console.error("Error generating study:", error);
    await Study.findByIdAndUpdate(studyId, {
      status: "failed",
    });
  }
};

export const getUserStudies = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError("Utilisateur non authentifié", 401);
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const studies = await Study.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Study.countDocuments({ userId: req.user._id });

    res.json({
      success: true,
      data: {
        studies,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudy = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError("Utilisateur non authentifié", 401);
    }

    const study = await Study.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!study) {
      throw createError("Étude introuvable", 404);
    }

    res.json({
      success: true,
      data: study,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudy = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError("Utilisateur non authentifié", 401);
    }

    const study = await Study.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!study) {
      throw createError("Étude introuvable", 404);
    }

    // Decrease user's studies count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "subscription.studiesUsed": -1 },
    });

    res.json({
      success: true,
      message: "Étude supprimée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

export const getStudyStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError("Utilisateur non authentifié", 401);
    }

    const totalStudies = await Study.countDocuments({ userId: req.user._id });
    const completedStudies = await Study.countDocuments({
      userId: req.user._id,
      status: "completed",
    });
    const generatingStudies = await Study.countDocuments({
      userId: req.user._id,
      status: "generating",
    });

    // Get sector distribution
    const sectorStats = await Study.aggregate([
      { $match: { userId: req.user._id, status: "completed" } },
      { $group: { _id: "$request.sector", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      data: {
        totalStudies,
        completedStudies,
        generatingStudies,
        sectorStats,
      },
    });
  } catch (error) {
    next(error);
  }
};
