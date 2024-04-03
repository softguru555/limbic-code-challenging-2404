import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../middleware/checkJwt';

// Middleware
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
// Login route
router.post('/signup', asyncHandler(AuthController.signup));
router.post('/signin', asyncHandler(AuthController.login));


// Change my password
router.post('/change-password', [checkJwt], asyncHandler(AuthController.changePassword));

export default router;
