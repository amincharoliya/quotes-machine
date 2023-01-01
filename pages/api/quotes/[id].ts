// /api/quotes/:id
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from '../../../utils/db';
import Quote from '../../../models/Quote';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db.connect();
	const ObjectId = mongoose.Types.ObjectId;

	let quote;
	if (req.method === 'GET') {
		try {
			quote = await Quote.findById(req.query.id)
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

		if (!quote) {
			return res.status(500).json({ message: 'Internal server error' });
		}

		if (quote.length === 0) {
			return res.status(404).json({ message: 'No User found' });
		}

		await db.disconnect();
		res.send(quote);
	} else if (req.method === 'PUT') {
		// Updating likes
		const { likes } = req.body;
		const session = await getSession({ req });
		if (!session) {
			return res.status(401).send('Signin required');
		}
		try {
			quote = await Quote.findById(req.query.id);
			if (!quote) {
				return res.status(404).json({ message: 'No Quote found' });
			}
			if (!quote.likes.includes(likes.id)) {
				quote.likes.push(likes.id);
				await quote.save();
			}
		} catch (err) {
			return new Error(err);
		}

		await db.disconnect();
		res.status(201).send(quote);
	}
};

export default handler;
