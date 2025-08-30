import { Router } from 'express';
import { body } from 'express-validator';
import {
  generateStudy,
  getUserStudies,
  getStudy,
  deleteStudy,
  getStudyStats,
} from '../controllers/studyController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = Router();

// Study generation validation
const studyValidation = [
  body('projectName')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Le nom du projet doit contenir entre 3 et 100 caractères'),
  body('sector')
    .trim()
    .notEmpty()
    .withMessage('Le secteur est requis'),
  body('targetMarket')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Le marché cible doit être décrit (5-200 caractères)'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('La localisation est requise'),
  body('budget')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Le budget doit être un nombre positif'),
  body('timeline')
    .trim()
    .notEmpty()
    .withMessage('La timeline est requise'),
  body('objectives')
    .isArray({ min: 1 })
    .withMessage('Au moins un objectif est requis'),
  body('objectives.*')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Chaque objectif doit contenir au moins 5 caractères'),
  body('specificQuestions')
    .optional()
    .isArray()
    .withMessage('Les questions spécifiques doivent être un tableau'),
];

// Routes
router.post('/generate', authenticate, validate(studyValidation), generateStudy);
router.get('/', authenticate, getUserStudies);
router.get('/stats', authenticate, getStudyStats);
router.get('/:id', authenticate, getStudy);
router.delete('/:id', authenticate, deleteStudy);

export default router;