import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Alert, ArrowRound } from '../icons';
import ActivityForm from './activityForm';
import ActivityPlaceholder from './activityPlaceholder';
import Activity from './activitySingle';

export default function ActivityFeed() {
	const [quotes, setQuotes] = useState(null);
	const [notice, setNotice] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [loadingMore, setLoadingMore] = useState(false);
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
					data && data.quotes.length
						? setQuotes(data.quotes.reverse())
						: setNotice('No quotes Found');
					data && data.totalPages > 1
						? setPages(data.totalPages)
						: setPages(1);
				});
		}

		getQuotes();

		return () => clearInterval(intervalId.current);
	}, []);

	const loadMoreQuotes = () => {
		setLoadingMore(true);
		fetch(`/api/quotes?page=${currentPage + 1}`)
			.then((data) => data.json())
			.then((data) => {
				const updatedQuotes = [...quotes, ...data.quotes.reverse()];
				setQuotes(updatedQuotes);
				setCurrentPage(currentPage + 1);
				setLoadingMore(false);
			});
	};

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

			{pages > 1 && currentPage < pages ? (
				<button
					className={clsx(
						'px-4 py-2 bg-theme-light text-white rounded-md flex items-center mx-auto my-5',
						loadingMore && 'pointer-events-none opacity-80'
					)}
					onClick={() => loadMoreQuotes()}
				>
					{loadingMore ? 'Loading More' : 'Load More'}
					{loadingMore ? (
						<ArrowRound className="h-4 w-4 ml-2 animate-spin" />
					) : (
						''
					)}
				</button>
			) : (
				''
			)}
		</>
	);
}
