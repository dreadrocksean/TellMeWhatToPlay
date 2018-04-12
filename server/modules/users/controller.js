import User from './model';

export const createUser = async (req, res) => {
	const { email, password } = req.body;
	const newUser = new User({ email, password });
	console.log('newUser Model', newUser);

	try {
		return res.status(201).json({ user: await newUser.save() });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error adding user' });
	}
};

export const fetchUsers = async (req, res) => {
	try {
		return res.status(200).json({ users: await User.find({}) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting users: ' + e.message });
	}
};

export const fetchUser = async (req, res) => {
	const { email } = req.params;
	const { password } = req.body;
	try {
		return res.status(200).json({ user: await User.findOne(
			{email, password}
		)});
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting user: ' + e.message });
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	try {
		return res.status(200).json({ users: await User.findByIdAndUpdate(id, req.body) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error updating user' });
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		return res.status(200).json({ users: await User.findByIdAndRemove(id) });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Error getting users' });
	}
};