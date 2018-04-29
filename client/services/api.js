const lastFMAPI = {
	API_KEY: 'f99a0153aeb7a033fbece27dd9650248',
	SECRET: '8ae39b51a3e5d8afce2ca363edd6acbb',
	NAME: 'dreadrocksean',
	EMAIL:'adrian@bartholomusic.com',
	ENDPOINT: 'http://ws.audioscrobbler.com/2.0/?method=',
};

const apiSeeds = {
	API_KEY: 'WMgEiPpFQsYZWtep0Lyylax0Ncc1CByguiDFCKi7otLaKo4k9RzViN8zHVGspmyj',
	ENDPOINT: 'https://orion.apiseeds.com/api/music/lyric',
};

const localIPs = [
	// '172.20.10.3', // (hotspot)
	// '192.168.1.238', // (Grinders)
	'192.168.1.250',
	'10.128.1.56',
];

export const fetchSongs = () => {
	console.log('fetchSongs');
	// fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
	return fetch(`http://${localIPs[0]}:4000/api/songs`)
		.then(res => res.json())
		.catch(err => console.error('Error getting songs:', err))
};

export const fetchArtistSongs = artistId => {
	console.log('test', artistId);
	return fetch(`http://${localIPs[0]}:4000/api/songs/artist/${artistId}`)
		.then(res => res.json())
		.catch(err => console.error('Error getting artist\'s songs:', err))
};

export const fetchLastFMSong = (title, artist) => {
	const artistQuery = artist ? `&artist=${artist}` : '';
	return fetch(`${lastFMAPI.ENDPOINT}track.search&track=${title}${artistQuery}&api_key=${lastFMAPI.API_KEY}&format=json`)
		.then(res => res.json())
		.catch(err => console.error('Error getting lastFMSong:', err))
};

export const fetchLyrics = (title, artist) => {
	return fetch(`${apiSeeds.ENDPOINT}/${artist}/${title}?apikey=${apiSeeds.API_KEY}`)
		.then(res => res.json())
		.catch(err => console.error('Error getting lyrics:', err))
};

export const deleteSong = id => (
	fetch(`http://${localIPs[0]}:4000/api/song/`+id, {
		method: 'DELETE',
	})
		.then(res => res.json())
		.catch(err => console.error('Error deleting song:', err))
);

export const createSong = req => {
	// console.log('req', req);
	return fetch(`http://${localIPs[0]}:4000/api/songs`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
	.catch(err => console.error('Error creating song:', err))
};

export const updateSong = req => {
	const id = req._id;
	delete req._id;
	return fetch(`http://${localIPs[0]}:4000/api/song/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Error updating song:', err))
};

export const voteSong = req => {
	console.log('voteSong req', req);
	const { _id, sentiment } = req;
	delete req._id;
	console.log('body', JSON.stringify(req));
	return fetch(`http://${localIPs[0]}:4000/api/vote/song/${_id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => {
			console.log('vote fetch', res);
			return res.json()
		})
		.catch(err => console.error('Error upvoting song:', err));
};

export const createArtist = req => {
	// console.log(req);
	// return;
	return fetch(`http://${localIPs[0]}:4000/api/artist`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => {
			console.log(res);
			return res.json();
		})
		.catch(err => console.error('Error creating artist:', err))
};

export const fetchArtists = () => (
	// fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
	fetch(`http://${localIPs[0]}:4000/api/artists`)
		.then(res => res.json())
		.catch(err => console.error('Error getting artists:', err))
);

export const fetchArtist = req => {
	const { artistId } = req;
	console.log('req artistId', artistId);
	return fetch(`http://${localIPs[0]}:4000/api/artist/${artistId}`)
		.then(res => {
			// console.log('fetchArtist response', res);
			return res.json()
		})
		.catch(err => console.error('Error getting artist', err))
};

export const fetchUserArtist = req => {
	const { userId } = req;
	console.log('req artistuserId', userId);
	return fetch(`http://${localIPs[0]}:4000/api/artist/user/${userId}`)
		.then(res => {
			// console.log('fetchUserArtist response', res);
			return res.json()
		})
		.catch(err => console.error('Error getting artist', err))
};

export const updateArtist = req => {
	console.log('api updateArtist', req);
	const id = req._id;
	delete req._id;
	return fetch(`http://${localIPs[0]}:4000/api/artist/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Error updating artist:', err))
};

export const deleteArtist = id => (
	fetch(`http://${localIPs[0]}:4000/api/artist/`+id, {
		method: 'DELETE',
	})
		.then(res => res.json())
		.catch(err => console.error('Error deleting artist:', err))
);

export const createUser = req => {
	return fetch(`http://${localIPs[0]}:4000/api/users`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Error creating user!:', err))
};

export const fetchUsers = () => (
	fetch(`http://${localIPs[0]}:4000/api/users`)
		.then(res => res.json())
		.catch(err => console.error('Error getting users:', err))
);

export const fetchUser = req => {
	const { email, password } = req;
	delete req.email;
	return fetch(`http://${localIPs[0]}:4000/api/user/${email}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Error getting user', err))
};

export const updateUser = req => {
	const id = req._id;
	delete req._id;
	return fetch(`http://${localIPs[0]}:4000/api/user/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Error updating user:', err))
};
