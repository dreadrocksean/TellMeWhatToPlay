import Song from './model';

export const createSong = async (req, res) => {
	const { title, author, mbid, artist_id } = req.body;
	console.log('req.body', req.body);
	const newSong = new Song({ title, author, mbid, artist_id });
	console.log(newSong);

	try {
		return res.status(201).json({ song: await newSong.save() });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error adding song' });
	}
};

export const fetchSongs = async (req, res) => {
	try {
		return res.status(200).json({ songs: await Song.find({}) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting songs: ' + e.message });
	}
};

export const fetchArtistSongs = async (req, res) => {
	console.log('fetchArtistSongs', req.params);
	const { artist_id } = req.params;
	console.log('artist_id', artist_id);
	try {
		return res.status(200).json({ songs: await Song.find({artist_id}) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting artist songs: ' + e.message });
	}
};

export const deleteSong = async (req, res) => {
	const { id } = req.params;
	try {
		return res.status(200).json({ songs: await Song.findByIdAndRemove(id) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting songs' });
	}
};

export const updateSong = async (req, res) => {
	const { id } = req.params;
	try {
		return res.status(200).json({ songs: await Song.findByIdAndUpdate(id, req.body) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error updating song' });
	}
};

export const voteSong = async (req, res) => {
	const { _id } = req.params;
	const { sentiment } = req.body;
	const num = sentiment ? 1 : -1;
	try {
		return res.status(200).json({ songs: await Song.findByIdAndUpdate(_id,
			{ $inc: {votes: num > 0 ? num : 0, currVotes: num} }
	)});
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error upvoting song' });
	}
};