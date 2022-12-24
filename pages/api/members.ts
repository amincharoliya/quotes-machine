import User from '../../models/User';
import db from '../../utils/db';

const handler = async (req, res) => {
	await db.connect();
	let users;

	try {
		users = await User.find().lean();
	} catch (err) {
		return new Error(err);
	}

	if (!users) {
		return res.status(500).json({ message: 'Internal server error' });
	}

	if (users.length === 0) {
		return res.status(404).json({ message: 'No Users found' });
	}

	return res.status(200).json({ users });
};

export default handler;
