import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ActivityPlaceholder from '../../components/activity/activityPlaceholder';
import Activity from '../../components/activity/activitySingle';
import Layout from '../../components/layout';
import { defaultMetaProps } from '../../components/layout/meta';
import Member from '../../components/members/member';
import MembersPlaceholder from '../../components/members/membersPlaceholder';
import { Alert } from '../../components/icons';

export default function MemberSingle() {
	const props = { ...defaultMetaProps, title: 'Members | Quote Machine' };
	const { query } = useRouter();
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`/api/members/${query.id}`)
			.then((data) => data.json())
			.then((data) => setData(data));
	}, []);

	if (!data) {
		return (
			<Layout meta={props}>
				<div className="lg:container px-5 mx-auto ">
					<div className="max-w-3xl mx-auto mb-8">
						<MembersPlaceholder />
					</div>
					<div>
						<ActivityPlaceholder />
						<ActivityPlaceholder />
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<div className="max-w-3xl mx-auto mb-8">
					<Member member={data.member} quotes={data.quotes.length} />
				</div>
				{data.quotes.reverse().map((quote) => (
					<Activity key={quote._id} data={quote} />
				))}
				{data.quotes.length === 0 ? (
					<p className="flex items-center max-w-3xl mx-auto mb-8 bg-white dark:bg-slate-800 p-4 rounded-md">
						<Alert className="w-8 h-8 mr-4" /> No quotes found
					</p>
				) : (
					''
				)}
			</div>
		</Layout>
	);
}
