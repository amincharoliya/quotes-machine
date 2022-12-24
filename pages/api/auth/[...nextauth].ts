import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user?.id) token.id = user.id;
			if (user?.isAdmin) token.isAdmin = user.isAdmin;
			return token;
		},
		async session({ session, token }) {
			if (token.id) session.user.id = token.id;
			if (token.isAdmin) session.user.isAdmin = token.isAdmin;
			return session;
		},
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				await db.connect();
				const user = await User.findOne({
					email: credentials.email,
				});
				await db.disconnect();
				if (
					user &&
					bcryptjs.compareSync(credentials.password, user.password)
				) {
					return {
						id: user._id,
						name: user.name,
						email: user.email,
						image: user.image,
						isAdmin: user.isAdmin,
					};
				}
				throw new Error('Invalid credentials');
			},
			credentials: undefined,
		}),
	],
});
