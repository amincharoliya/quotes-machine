import { server } from '../../config';
import Layout from '../../components/layout/index';
import { defaultMetaProps } from '../../components/layout/meta';
import Members from '../../components/members/members';

export default function Page({ data }) {
	const props = { ...defaultMetaProps, title: 'Members | Quote Machine' };
	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<Members data={data} />
			</div>
		</Layout>
	);
}

export async function getServerSideProps() {
	const res = await fetch(`${server}/api/members/`);
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
}
