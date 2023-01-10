import Layout from '../../components/layout/index';
import { defaultMetaProps } from '../../components/layout/meta';
import Members from '../../components/members/members';

export default function Page() {
	const props = { ...defaultMetaProps, title: 'Members | Quote Machine' };
	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<Members />
			</div>
		</Layout>
	);
}
