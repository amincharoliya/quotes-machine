import Layout from '../components/layout/index';
import { defaultMetaProps } from '../components/layout/meta';
import ActivityFeed from '../components/activity/activityFeed';

export default function Home() {
	return (
		<Layout meta={defaultMetaProps}>
			<div className="lg:container px-5 mx-auto ">
				<ActivityFeed />
			</div>
		</Layout>
	);
}
