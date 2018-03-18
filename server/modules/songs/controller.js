import Song from './model';

export const createSong = async (req, res) => {
	const { title, author, votes, currVotes } = req.body;
	const newSong = new Song({ title, author, votes, currVotes });
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

export const upvoteSong = async (req, res) => {
	const { id } = req.params;
	try {
		return res.status(200).json({ songs: await Song.findByIdAndUpdate(id,
			{ $inc: {votes: 1, currVotes: 1} }
	)});
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error upvoting song' });
	}
};