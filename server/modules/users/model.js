import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	fName: {
		type: String,
		required: false,
	},
	lName: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
}, {timestamps: true});

export default mongoose.model('User', UserSchema);
