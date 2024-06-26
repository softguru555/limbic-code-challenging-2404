import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../middleware/checkJwt';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
router.post('/signup', asyncHandler(AuthController.signup));
router.post('/signin', asyncHandler(AuthController.login));
// Change my password
router.post('/change-password', [checkJwt], asyncHandler(AuthController.changePassword));
export default router;
