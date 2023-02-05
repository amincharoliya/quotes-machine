import { NextApiRequest, NextApiResponse } from 'next';
import Quote from '../../../models/Quote';
import db from '../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db.connect();
	let quotes;
	const { page = 1 } = req.query;
	const { limit = 5 } = req.query;
	const pageNumber = parseInt(page as string, 10);
	const limitNumber = parseInt(limit as string, 10);
	const offset = (pageNumber - 1) * limitNumber;
	try {
		quotes = await Quote.find()
			.populate({
				path: 'user',
				select: 'id name image',
			})
			.populate({
				path: 'likes',
				select: 'id name image',
			})
			.limit(limit)
			.skip(offset);
	} catch (err) {
		return new Error(err);
	}

	if (!quotes) {
		return res.status(500).json({ message: 'Internal server error' });
	}

	if (quotes.length === 0) {
		return res.status(404).json({ message: 'No Quotes found' });
	}

	const totalQuotes = await Quote.countDocuments();
	const totalPages = Math.ceil(totalQuotes / limit);

	await db.disconnect();
	res.send({ quotes, totalPages });
};

export default handler;
