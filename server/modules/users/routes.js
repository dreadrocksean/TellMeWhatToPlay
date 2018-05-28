import { Router } from 'express';

import * as UserController from './controller';

const routes = new Router();

routes.post('/whatplay/users', UserController.createUser);
routes.get('/whatplay/users', UserController.fetchUsers);
routes.post('/whatplay/user/:email', UserController.fetchUser);
routes.put('/whatplay/user/:id', UserController.updateUser);
routes.delete('/whatplay/user/:id', UserController.deleteUser);

export default routes;