import { Router } from 'express';

import * as SongController from './controller';

const routes = new Router();

routes.post('/songs', SongController.createSong);
routes.get('/songs', SongController.fetchSongs);
routes.get('/songs/artist/:user_artist_id', SongController.fetchArtistSongs);
routes.patch('/vote/song/:_id', SongController.voteSong);
routes.put('/song/:id', SongController.updateSong);
routes.delete('/song/:id', SongController.deleteSong);
//
export default routes;