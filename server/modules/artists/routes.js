import { Router } from 'express';

import * as ArtistController from './controller';

const routes = new Router();

routes.post('/artist', ArtistController.createArtist);
routes.get('/artists', ArtistController.fetchArtists);
routes.get('/artist/:artist_id/songs', ArtistController.fetchSongs);
routes.get('/artist/:_id', ArtistController.fetchArtist);
routes.get('/artist/user/:user_id', ArtistController.fetchUserArtist);
routes.put('/artist/:id', ArtistController.updateArtist);
routes.delete('/artist/:id', ArtistController.deleteArtist);

export default routes;