const lastFMAPI = {
	API_KEY: 'f99a0153aeb7a033fbece27dd9650248',
	SECRET: '8ae39b51a3e5d8afce2ca363edd6acbb',
	NAME: 'dreadrocksean',
	EMAIL:'adrian@bartholomusic.com',
}

export const fetchSongs = () => (
	// fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
	fetch('http://192.168.1.102:4000/api/songs')
		.then(res => res.json())
		.catch(err => console.error('Error getting songs:', err))
);

export const fetchLastFMSong = (songName, artist) => {
	const artistQuery = artist ? `&artist=${artist}` : '';
	return fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${songName}${artistQuery}&api_key=${lastFMAPI.API_KEY}&format=json`)
		.then(res => res.json())
		.catch(err => console.error('Error getting lastFMSong:', err))
};

export const deleteSong = id => (
	fetch('http://192.168.1.102:4000/api/song/'+id, {
		method: 'DELETE',
	})
		.then(res => res.json())
		.catch(err => console.error('Error deleting song:', err))
);

export const createSong = req => (
	fetch('http://192.168.1.102:4000/api/songs', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Error creating song:', err))
);

export const updateSong = req => {
	const id = req._id;
	delete req._id;
	return fetch(`http://192.168.1.102:4000/api/song/${id}`, {
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

export const upvoteSong = req => {
	const id = req._id;
	delete req._id;
	return fetch(`http://192.168.1.102:4000/api/song/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
		body: JSON.stringify(req),
	})
		.then(res => res.json())
		.catch(err => console.error('Error upvoting song:', err));
};