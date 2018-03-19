import mongoose, { Schema } from 'mongoose';

const SongSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: false,
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
}, {timestamps: true});

export default mongoose.model('Song', SongSchema);