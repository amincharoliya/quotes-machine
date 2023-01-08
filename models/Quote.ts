import mongoose, { Document } from 'mongoose';

interface IQuote extends Document {
	user: mongoose.Types.ObjectId;
	quote: string;
	author: string;
	likes?: Array<mongoose.Types.ObjectId>;
}

const Schema = new mongoose.Schema<IQuote>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		quote: { type: String, require: true },
		author: { type: String, require: true },
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
	}
);

const Quote =
	mongoose.models.Quote || mongoose.model<IQuote | any>('Quote', Schema);

export default Quote;
