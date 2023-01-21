import { useEffect, useRef, useState } from 'react';
import { Alert } from '../icons';
import ActivityForm from './activityForm';
import ActivityPlaceholder from './activityPlaceholder';
import Activity from './activitySingle';

export default function ActivityFeed() {
	const [quotes, setQuotes] = useState(null);
	const [notice, setNotice] = useState(null);
	const intervalId = useRef(null);

	useEffect(() => {
		intervalId.current = setInterval(() => {
			getQuotes();
		}, 8000);

		function getQuotes() {
			fetch('/api/quotes')
				.then((data) => data.json())
				.then((data) => {
					clearInterval(intervalId.current);
					data && data.length
						? setQuotes(data.reverse())
						: setNotice('No quotes Found');
				});
		}

		getQuotes();

		return () => clearInterval(intervalId.current);
	}, []);

	if (notice) {
		return (
			<>
				<ActivityForm
					quotes={quotes}
					setQuotes={setQuotes}
					setFeedNotice={setNotice}
				/>
				<p className="flex items-center max-w-3xl mx-auto mb-8 bg-white dark:bg-slate-800 p-4 rounded-md">
					{' '}
					<Alert className="w-8 h-8 mr-4" /> {notice}
				</p>
			</>
		);
	}
	return (
		<>
			<ActivityForm
				quotes={quotes}
				setQuotes={setQuotes}
				setFeedNotice={setNotice}
			/>
			{quotes && quotes.length ? (
				quotes.map((quote) => <Activity key={quote._id} data={quote} />)
			) : (
				<>
					<ActivityPlaceholder />
					<ActivityPlaceholder />
				</>
			)}
		</>
	);
}
