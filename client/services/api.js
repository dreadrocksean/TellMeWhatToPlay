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

const getAPIUrl = (() => {
	const localIPs = [
		// '172.20.10.3', // (hotspot)
		// '192.168.1.238', // (Grinders)
		// '192.168.0.65', // (Grinders)
		'192.168.1.250',
		'10.128.1.56',
	];
	// return 'https://roadiethreeeightapi.azurewebsites.net';
	return `${localIPs[0]}:4000`;
})()

const handleErrors = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const fetchSongs = () => {
	console.log('fetchSongs');
	// fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
	return fetch(`http://${getAPIUrl}/api/songs`)
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const fetchArtistSongs = artistId => {
	console.log('test', artistId);
	return fetch(`http://${getAPIUrl}/api/songs/artist/${artistId}`)
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const fetchLastFMSong = (title, artist) => {
	const artistQuery = artist ? `&artist=${artist}` : '';
	return fetch(`${lastFMAPI.ENDPOINT}track.search&track=${title}${artistQuery}&api_key=${lastFMAPI.API_KEY}&format=json`)
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const fetchLyrics = (title, artist) => {
	return fetch(`${apiSeeds.ENDPOINT}/${artist}/${title}?apikey=${apiSeeds.API_KEY}`)
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const deleteSong = id => (
	fetch(`http://${getAPIUrl}/api/song/`+id, {
		method: 'DELETE',
	})
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
);

export const createSong = req => {
	console.log('createSong req', req);
	return fetch(`http://${getAPIUrl}/api/songs`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
	.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const updateSong = req => {
	const id = req._id;
	delete req._id;
	return fetch(`http://${getAPIUrl}/api/song/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const voteSong = req => {
	console.log('voteSong req', req);
	const { _id, sentiment } = req;
	delete req._id;
	console.log('body', JSON.stringify(req));
	return fetch(`http://${getAPIUrl}/api/vote/song/${_id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const createArtist = req => {
	// console.log(req);
	// return;
	return fetch(`http://${getAPIUrl}/api/artist`, {
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
		.catch(err => console.error('Network Error'))
};

export const fetchArtists = () => (
	// fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
	fetch(`http://${getAPIUrl}/api/artists/`)
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
);

export const fetchArtist = req => {
	const { artistId } = req;
	console.log('req artistId', artistId);
	return fetch(`http://${getAPIUrl}/api/artist/${artistId}`)
		.then(res => {
			// console.log('fetchArtist response', res);
			return res.json()
		})
		.catch(err => console.error('Network Error'))
};

export const fetchUserArtist = req => {
	const { userId } = req;
	console.log('req artistuserId', userId);
	return fetch(`http://${getAPIUrl}/api/artist/user/${userId}`)
		.then(res => {
			// console.log('fetchUserArtist response', res);
			return res.json()
		})
		.catch(err => console.error('Network Error'))
};

export const updateArtist = req => {
	console.log('api updateArtist', req);
	const id = req._id;
	delete req._id;
	return fetch(`http://${getAPIUrl}/api/artist/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const deleteArtist = id => (
	fetch(`http://${getAPIUrl}/api/artist/`+id, {
		method: 'DELETE',
	})
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
);

export const createUser = req => {
	return fetch(`http://${getAPIUrl}/api/users`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const fetchUsers = () => (
	fetch(`http://${getAPIUrl}/api/users`)
		.then(handleErrors)
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
);

export const fetchUser = req => {
	const { email, password } = req;
	if (!email.trim() || !password.trim()) {
		throw Error('Both fields are required');
	}
	delete req.email;
	return fetch(`http://${getAPIUrl}/api/user/${email}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(handleErrors)
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};

export const updateUser = req => {
	const id = req._id;
	delete req._id;
	return fetch(`http://${localIPs[0]}/api/user/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Network Error'))
};
