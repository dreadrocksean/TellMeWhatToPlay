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
	}
});

export default mongoose.model('Song', SongSchema);