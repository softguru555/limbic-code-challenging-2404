import { Router } from 'express';
import QuestionController from '../controllers/QuestionController';
import { asyncHandler } from '../middleware/asyncHandler';
import { checkJwt } from '../middleware/checkJwt';
import { checkRole } from '../middleware/checkRole';

const router = Router();
router.post('/addQuestion', asyncHandler(QuestionController.addQuestion));
router.get('/getQuestions', asyncHandler(QuestionController.getQuestions));
router.post('/addAnswers', asyncHandler(QuestionController.addAnswers))
router.delete('/delQuestion/:id', [checkJwt, checkRole(['ADMIN'])], asyncHandler(QuestionController.delQuestion));
router.post('/delAnswer', asyncHandler(QuestionController.delAnswer));
export default router;
