import { Router } from 'express';
import auth from './auth';
import user from './user';
import question from './question';
const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/question', question);
export default routes;
