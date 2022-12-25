import mongoose, { Document } from 'mongoose';

interface IQuote extends Document {
	user: mongoose.Types.ObjectId;
	userImage: string;
	userName: string;
	quote: string;
	author: string;
	likes?: mongoose.Types.ObjectId;
}

const Schema = new mongoose.Schema<IQuote>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, require: true },
		userImage: { type: String, require: true },
		userName: { type: String, require: true },
		quote: { type: String, require: true },
		author: { type: String, require: true },
		likes: { type: mongoose.Schema.Types.ObjectId },
	},
	{
		timestamps: true,
	}
);

const Quote = mongoose.models.Quote || mongoose.model<IQuote>('Quote', Schema);

export default Quote;
