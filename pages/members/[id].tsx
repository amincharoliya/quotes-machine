import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ActivityPlaceholder from '../../components/activity/activityPlaceholder';
import Activity from '../../components/activity/activitySingle';
import Layout from '../../components/layout';
import { defaultMetaProps } from '../../components/layout/meta';
import Member from '../../components/members/member';
import MembersPlaceholder from '../../components/members/membersPlaceholder';

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
			</div>
		</Layout>
	);
}
