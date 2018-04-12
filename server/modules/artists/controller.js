import Artist from './model';

export const createArtist = async (req, res) => {
	const { userId, artistName, genre } = req.body;
	console.log('req', req.body);
	const newArtist = new Artist({ userId, name: artistName, genre });
	console.log('newArtist', newArtist);

	try {
		return res.status(201).json({ artist: await newArtist.save() });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error adding artist' });
	}
};

export const fetchArtists = async (req, res) => {
	try {
		return res.status(200).json({ artists: await Artist.find({}) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting artists: ' + e.message });
	}
};

export const fetchSongs = async (req, res) => {
	const { artist_id } = req.params;
	try {
		return res.status(200).json({ artists: await Artist
			.findOne({_id: artist_id})
			// .populate('songs', r=>console.log('populate', r))
		});
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting artist\'s songs: ' + e.message });
	}
};

export const fetchArtist = async (req, res) => {
	const { _id } = req.params;
	console.log('fetchArtist Controller', _id);
	try {
		return res.status(200).json({ artist: await Artist.findOne({_id}) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting artist: ' + e.message });
	}
};

export const fetchUserArtist = async (req, res) => {
	const { user_id } = req.params;
	console.log('fetchArtist Controller', user_id);
	try {
		return res.status(200).json({ artist: await Artist.findOne({userId: user_id}) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting user artist: ' + e.message });
	}
};

export const updateArtist = async (req, res) => {
	const { id } = req.params;
	console.log('req body', req.body);
	try {
		return res.status(200).json({ artist: await Artist.findByIdAndUpdate(id, req.body, {new: true}) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error updating artist' });
	}
};

export const deleteArtist = async (req, res) => {
	const { id } = req.params;
	try {
		return res.status(200).json({ artists: await Artist.findByIdAndRemove(id) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting artists' });
	}
};
