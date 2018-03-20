const lastFMAPI = {
	API_KEY: 'f99a0153aeb7a033fbece27dd9650248',
	SECRET: '8ae39b51a3e5d8afce2ca363edd6acbb',
	NAME: 'dreadrocksean',
	EMAIL:'adrian@bartholomusic.com',
	ENDPOINT: 'http://ws.audioscrobbler.com/2.0/?method=',
}

const apiSeeds = {
	API_KEY: 'WMgEiPpFQsYZWtep0Lyylax0Ncc1CByguiDFCKi7otLaKo4k9RzViN8zHVGspmyj',
	ENDPOINT: 'https://orion.apiseeds.com/api/music/lyric',
}

const localIPs = [
	'192.168.1.102',
	'10.128.1.56',
]

export const fetchSongs = () => (
	// fetch('http://bookaroadieapi.azurewebsites.net/api/Jobs')
	fetch(`http://${localIPs[0]}:4000/api/songs`)
		.then(res => res.json())
		.catch(err => console.error('Error getting songs:', err))
);

export const fetchLastFMSong = (title, artist) => {
	const artistQuery = artist ? `&artist=${artist}` : '';
	return fetch(`${lastFMAPI.ENDPOINT}track.search&track=${title}${artistQuery}&api_key=${lastFMAPI.API_KEY}&format=json`)
		.then(res => res.json())
		.catch(err => console.error('Error getting lastFMSong:', err))
};

export const fetchLyrics = (title, artist) => {
	return fetch(`${apiSeeds.ENDPOINT}/${artist}/${title}?api_key=${apiSeeds.API_KEY}`)
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

export const createSong = req => (
	fetch(`http://${localIPs[0]}:4000/api/songs`, {
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

export const upvoteSong = req => {
	const id = req._id;
	delete req._id;
	return fetch(`http://${localIPs[0]}:4000/api/song/${id}`, {
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