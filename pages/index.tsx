import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Quote Machine | Built by Amin Charoliya</title>
				<meta
					name="description"
					content="Welcome to Quote Machine, Share your quotes with other users."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1 className="text-3xl text-center font-bold text-purple-900 p-2">
					Quote Machine
				</h1>
			</main>
		</>
	);
}
