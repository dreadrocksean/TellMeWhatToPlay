import { Router } from 'express';

import * as UserController from './controller';

const routes = new Router();

routes.post('/users', UserController.createUser);
routes.get('/users', UserController.fetchUsers);
routes.post('/user/:email', UserController.fetchUser);
routes.put('/user/:id', UserController.updateUser);
routes.delete('/user/:id', UserController.deleteUser);

export default routes;