import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
	id?: string;
	name: string;
	email: string;
	password: string;
	image: string;
	isAdmin: boolean;
}

const Schema = new mongoose.Schema<IUser>(
	{
		name: { type: String, require: true },
		email: { type: String, require: true, unique: true },
		password: { type: String, require: true },
		image: { type: String, require: true },
		isAdmin: { type: Boolean, require: true, default: false },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model<IUser>('User', Schema);

export default User;
