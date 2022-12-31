import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<ThemeProvider attribute="class">
				{Component.auth ? (
					<Auth>
						<Component {...pageProps} />
					</Auth>
				) : (
					<Component {...pageProps} />
				)}
			</ThemeProvider>
		</SessionProvider>
	);
}

function Auth({ children }) {
	const router = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/unauthorized?message=Login Required');
		},
	});
	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	return children;
}
