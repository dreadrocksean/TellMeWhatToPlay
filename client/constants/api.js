export const fetchSongs = () => (
	// fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
	fetch('http://192.168.1.102:4000/api/songs')
		.then(res => res.json())
		.catch(err => console.error('Error getting songs:', err))
);

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