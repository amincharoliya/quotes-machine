import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Quote from '../../../models/Quote';
import db from '../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).send('Signin required');
	}

	const { user } = session;
	await db.connect();
	const newQuote = new Quote({
		...req.body,
		user: user.id,
	});

	const quote = await newQuote.save();
	res.status(201).send(quote);
};
export default handler;
