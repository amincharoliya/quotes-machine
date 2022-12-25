import { useEffect, useState } from 'react';
import ActivityForm from './activityForm';
import ActivityPlaceholder from './activityPlaceholder';
import Activity from './activitySingle';

export default function ActivityFeed() {
	const [quotes, setQuotes] = useState(null);
	useEffect(() => {
		fetch('/api/quotes')
			.then((data) => data.json())
			.then((data) => setQuotes(data.reverse()));
	}, []);
	return (
		<>
			<ActivityForm quotes={quotes} setQuotes={setQuotes} />
			{quotes ? (
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
