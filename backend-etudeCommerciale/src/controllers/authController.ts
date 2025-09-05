import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { createError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";

const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  return jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" });
};

const sanitizeUser = (user: IUser) => {
  const { password, ...sanitizedUser } = user.toObject();
  return sanitizedUser;
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError("Un utilisateur avec cet email existe déjà", 400);
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      userType,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id?.toString() || "");

    res.status(201).json({
      success: true,
      message: "Compte créé avec succès",
      data: {
        user: sanitizeUser(user),
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.isActive) {
      throw createError("Email ou mot de passe incorrect", 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw createError("Email ou mot de passe incorrect", 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id?.toString() || "");

    res.json({
      success: true,
      message: "Connexion réussie",
      data: {
        user: sanitizeUser(user),
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError("Utilisateur non authentifié", 401);
    }

    res.json({
      success: true,
      data: sanitizeUser(req.user),
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError("Utilisateur non authentifié", 401);
    }

    const { firstName, lastName, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw createError("Utilisateur introuvable", 404);
    }

    res.json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: sanitizeUser(updatedUser),
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw createError("Utilisateur non authentifié", 401);
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      throw createError("Utilisateur introuvable", 404);
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw createError("Mot de passe actuel incorrect", 400);
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Mot de passe modifié avec succès",
    });
  } catch (error) {
    next(error);
  }
};
