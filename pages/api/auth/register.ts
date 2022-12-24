import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return;
	}

	const { name, email, password, image } = req.body;

	if (!name || !email || !image || !password || password.trim().length < 6) {
		res.status(422).json({ message: 'Validation error' });
		return;
	}

	await db.connect();

	const existingUser = await User.findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ message: 'User already exists!' });
		await db.disconnect();
		return;
	}

	const newUser = new User({
		name,
		email,
		password: bcryptjs.hashSync(password),
		image,
		isAdmin: false,
	});

	const user = await newUser.save();
	await db.disconnect();
	res.status(201).send({
		message: 'User created!',
		id: user._id,
		name: user.name,
		email: user.email,
		image: user.image,
		isAdmin: user.isAdmin,
	});
}

export default handler;
