import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { ArrowRound } from '../icons';

export default function Loader() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const start = () => {
			console.log('start');
			setLoading(true);
		};
		const end = () => {
			console.log('finished');
			setLoading(false);
		};
		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);
		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, []);

	if (loading) {
		return (
			<div className="fixed bottom-20 right-24 flex items-center bg-white dark:bg-slate-800 p-4 rounded-md shadow-md">
				<ArrowRound className="w-5 h-5 mr-3 animate-spin" />
				<p className="text-sm">Loading</p>
			</div>
		);
	}
}
