import mongoose, { Document } from 'mongoose';

type Like = {
	id: string;
	name: string;
	image: string;
};

interface IQuote extends Document {
	user: mongoose.Types.ObjectId;
	userImage: string;
	userName: string;
	quote: string;
	author: string;
	likes?: Array<Like>;
}

const Schema = new mongoose.Schema<IQuote>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, require: true },
		userImage: { type: String, require: true },
		userName: { type: String, require: true },
		quote: { type: String, require: true },
		author: { type: String, require: true },
		likes: [
			{
				id: { type: String },
				name: { type: String },
				image: { type: String },
			},
		],
	},
	{
		timestamps: true,
	}
);

const Quote = mongoose.models.Quote || mongoose.model<IQuote>('Quote', Schema);

export default Quote;
