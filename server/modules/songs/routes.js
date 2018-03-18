import { Router } from 'express';

import * as SongController from './controller';

const routes = new Router();

routes.post('/songs', SongController.createSong);
routes.get('/songs', SongController.fetchSongs);
routes.patch('/song/:id', SongController.upvoteSong);
routes.put('/song/:id', SongController.updateSong);
routes.delete('/song/:id', SongController.deleteSong);

export default routes;