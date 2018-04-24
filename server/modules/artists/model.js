import mongoose, { Schema } from 'mongoose';
import Song from '../songs/model';

const ObjectId = Schema.Types.ObjectId;

const ArtistSchema = new Schema({
	userId: {
		type: ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: false,
	},
	roles: [{type: String}],
	songs: [{ type: ObjectId, ref: 'Song' }],
	live: {
		type: Boolean,
		required: false,
		default: false,
	},
	imageUrl: {
		type: String,
	},
	geoPosition: {
		type: String,
		default: '',
	}
}, {timestamps: true});

export default mongoose.model('Artist', ArtistSchema);