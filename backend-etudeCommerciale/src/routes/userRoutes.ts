import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { 
  updateSubscription,
  getUserStats,
  uploadAvatar,
} from '../controllers/userController';

const router = Router();

// Subscription update validation
const subscriptionValidation = [
  body('plan')
    .isIn(['free', 'basic', 'premium'])
    .withMessage('Plan d\'abonnement invalide'),
];

// Routes
router.put('/subscription', authenticate, validate(subscriptionValidation), updateSubscription);
router.get('/stats', authenticate, getUserStats);
router.post('/avatar', authenticate, uploadAvatar);

export default router;