import { Router } from 'express';
import QuestionController from '../controllers/QuestionController';

// Middleware
import { asyncHandler } from '../middleware/asyncHandler';
import { checkJwt } from '../middleware/checkJwt';
import { checkRole } from '../middleware/checkRole';

const router = Router();


router.post('/addQuestion', asyncHandler(QuestionController.addQuestion));
router.get('/getQuestions', asyncHandler(QuestionController.getQuestions));


export default router;
