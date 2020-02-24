import { Router } from 'express';

// Controllers...
import SignUpController from './app/controllers/Auth/SignUpController';
import SignInController from './app/controllers/Auth/SignInController';
import UserController from './app/controllers/UserController';

// Middlewares...
import { auth } from './app/middlewares/auth';

const routes = new Router();

// Public routes...
routes.post('/auth/signin', SignInController.store);
routes.post('/auth/signup', SignUpController.store);

// Privated routes...
routes.use(auth());
routes.put('/users', UserController.update);

export default routes;
