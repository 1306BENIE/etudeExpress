import { Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import ChatMessage from "../models/ChatMessage";
import { AuthRequest } from "../middleware/auth";
import { createError } from "../middleware/errorHandler";
import { aiService } from "../services/aiService";

export const sendMessage = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, studyId } = req.body;
    const sessionId = (req.headers["x-session-id"] as string) || uuidv4();

    // Save user message
    const userMessage = new ChatMessage({
      userId: req.user?._id,
      sessionId,
      type: "user",
      content: message,
      studyId,
    });

    await userMessage.save();

    // Generate AI response
    const startTime = Date.now();
    const aiResponse = await aiService.generateChatResponse(message, {
      userId: req.user?._id?.toString() || undefined,
      studyId,
      sessionId,
    });
    const responseTime = Date.now() - startTime;

    // Save bot message
    const botMessage = new ChatMessage({
      userId: req.user?._id,
      sessionId,
      type: "bot",
      content: aiResponse.content,
      studyId,
      metadata: {
        intent: aiResponse.intent,
        confidence: aiResponse.confidence,
        responseTime,
      },
    });

    await botMessage.save();

    res.json({
      success: true,
      data: {
        id: botMessage._id,
        type: "bot",
        content: aiResponse.content,
        timestamp: botMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getChatHistory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sessionId = req.headers["x-session-id"] as string;
    const { studyId } = req.query;

    if (!sessionId) {
      throw createError("Session ID requis", 400);
    }

    const query: any = { sessionId };
    if (req.user) {
      query.userId = req.user._id;
    }
    if (studyId) {
      query.studyId = studyId;
    }

    const messages = await ChatMessage.find(query)
      .sort({ createdAt: 1 })
      .limit(100);

    const formattedMessages = messages.map((msg) => ({
      id: msg._id,
      type: msg.type,
      content: msg.content,
      timestamp: msg.createdAt,
      studyId: msg.studyId,
    }));

    res.json({
      success: true,
      data: formattedMessages,
    });
  } catch (error) {
    next(error);
  }
};

export const clearChatHistory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sessionId = req.headers["x-session-id"] as string;

    if (!sessionId) {
      throw createError("Session ID requis", 400);
    }

    const query: any = { sessionId };
    if (req.user) {
      query.userId = req.user._id;
    }

    await ChatMessage.deleteMany(query);

    res.json({
      success: true,
      message: "Historique supprimé avec succès",
    });
  } catch (error) {
    next(error);
  }
};
