import {
  Router,
} from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import loggedInMiddleware from './app/Middleware/auth';

/* ROUTES */
const routes = new Router();

routes.post('/create/users', UserController.store);
routes.post('/create/students', loggedInMiddleware, StudentController.store);
routes.post('/update/students', StudentController.update);
routes.post('/signin', SessionController.store);

export default routes;
