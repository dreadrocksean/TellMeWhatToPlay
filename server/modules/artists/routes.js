import { Router } from 'express';

import * as ArtistController from './controller';

const routes = new Router();

routes.post('/artist', ArtistController.createArtist);
routes.get('/artists', ArtistController.fetchArtists);
routes.get('/artist/:artist_id/songs', ArtistController.fetchSongs);
routes.get('/artist/:artist_id', ArtistController.fetchArtist);
routes.get('/artist/user/:user_id', ArtistController.fetchUserArtist);
routes.put('/artist/:artist_id', ArtistController.updateArtist);
routes.delete('/artist/:artist_id', ArtistController.deleteArtist);

export default routes;