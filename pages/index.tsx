import Layout from '../components/layout/index';
import { defaultMetaProps } from '../components/layout/meta';

export default function Home() {
	return (
		<Layout meta={defaultMetaProps}>
			<h1 className="text-3xl text-center font-bold text-theme-light dark:text-theme-dark p-2">
				Quote Machine
			</h1>
		</Layout>
	);
}
