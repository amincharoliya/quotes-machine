import { server } from '../../config';
import Activity from '../../components/activity/activitySingle';
import Layout from '../../components/layout';
import { defaultMetaProps } from '../../components/layout/meta';
import Member from '../../components/members/member';
import { Alert } from '../../components/icons';

export default function MemberSingle({ data }) {
	const props = {
		...defaultMetaProps,
		title: data.member.name + ' | Quote Machine',
	};

	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<div className="max-w-3xl mx-auto mb-8">
					<Member member={data.member} quotes={data.quotes.length} />
				</div>
				{data.quotes.length === 0 ? (
					<p className="flex items-center max-w-3xl mx-auto mb-8 bg-white dark:bg-slate-800 p-4 rounded-md">
						<Alert className="w-8 h-8 mr-4" /> No quotes found
					</p>
				) : (
					data.quotes
						.reverse()
						.map((quote) => (
							<Activity key={quote._id} data={quote} />
						))
				)}
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const id = context.params.id;

	const res = await fetch(`${server}/api/members/${id}`);
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
}
