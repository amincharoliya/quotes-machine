// /api/members/:id
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db';
import Quote from '../../../models/Quote';
import User from '../../../models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db.connect();
	const member = await User.findById(req.query.id);
	const memberQuotes = await Quote.find({ user: req.query.id });
	await db.disconnect();
	res.send({ member: member, quotes: memberQuotes });
};

export default handler;
