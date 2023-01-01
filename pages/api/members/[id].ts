// /api/members/:id
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db';
import Quote from '../../../models/Quote';
import User from '../../../models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db.connect();
	let member;
	let memberQuotes;

	try {
		member = await User.findById(req.query.id);
		memberQuotes = await Quote.find({ user: req.query.id })
			.populate({
				path: 'user',
				select: 'id name image',
			})
			.populate({
				path: 'likes',
				select: 'id name image',
			});
	} catch (err) {
		return new Error(err);
	}

	if (!member || !memberQuotes) {
		return res.status(500).json({ message: 'Internal server error' });
	}

	if (member.length === 0) {
		return res.status(404).json({ message: 'No User found' });
	}

	await db.disconnect();
	res.send({ member: member, quotes: memberQuotes });
};

export default handler;
