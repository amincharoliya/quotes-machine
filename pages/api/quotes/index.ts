import { NextApiRequest, NextApiResponse } from 'next';
import Quote from '../../../models/Quote';
import db from '../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db.connect();
	let quotes;
	try {
		quotes = await Quote.find();
	} catch (err) {
		return new Error(err);
	}

	if (!quotes) {
		return res.status(500).json({ message: 'Internal server error' });
	}

	if (quotes.length === 0) {
		return res.status(404).json({ message: 'No Quotes found' });
	}

	await db.disconnect();
	res.send(quotes);
};

export default handler;
