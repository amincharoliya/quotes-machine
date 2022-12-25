import { NextApiRequest, NextApiResponse } from 'next';
import Quote from '../../../models/Quote';
import db from '../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db.connect();
	const orders = await Quote.find();
	await db.disconnect();
	res.send(orders);
};

export default handler;
