import { useRouter } from 'next/router';
import { Alert } from '../components/icons';
import Layout from '../components/layout';
import { defaultMetaProps } from '../components/layout/meta';

export default function Unauthorized() {
	const router = useRouter();
	const { message } = router.query;

	const props = {
		...defaultMetaProps,
		title: 'Access Denied | Quote Machine',
	};

	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<h1 className="text-3xl text-center font-bold mb-8">
					Access Denied
				</h1>
				<div className="text-center">
					{message && (
						<p className="p-4 bg-white dark:bg-slate-800 flex items-center max-w-lg mx-auto rounded-md">
							<Alert className="w-8 h-8 mr-6" />
							{message}
						</p>
					)}
				</div>
			</div>
		</Layout>
	);
}
