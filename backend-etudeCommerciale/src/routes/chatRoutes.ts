import { Router } from 'express';
import { body } from 'express-validator';
import {
  sendMessage,
  getChatHistory,
  clearChatHistory,
} from '../controllers/chatController';
import { optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = Router();

// Message validation
const messageValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Le message doit contenir entre 1 et 2000 caractères'),
  body('studyId')
    .optional()
    .isMongoId()
    .withMessage('ID d\'étude invalide'),
];

// Routes
router.post('/message', optionalAuth, validate(messageValidation), sendMessage);
router.get('/history', optionalAuth, getChatHistory);
router.delete('/history', optionalAuth, clearChatHistory);

export default router;