import mongoose, { Schema } from 'mongoose';

const SongSchema = new Schema({
	user_artist_id: {
		type: Schema.Types.ObjectId,
		ref: 'Artist',
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: false,
	},
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
	votes: {
		type: Number,
		default: 0,
		required: false,
	},
	currVotes: {
		type: Number,
		default: 0,
		required: false,
	},
	mbid: {
		type: String,
		default: '',
		required: false,
	},
	lyrics: {
		type: String,
		default: '',
		required: false,
	},
	image: {
		type: String,
		default: '',
		required: false,
	},
}, {timestamps: true});

export default mongoose.model('Song', SongSchema);