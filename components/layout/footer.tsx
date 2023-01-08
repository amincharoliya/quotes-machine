import Link from 'next/link';
import Loader from './loader';

export default function Footer() {
	return (
		<footer className="bg-white dark:bg-slate-900/75 border-t-2 dark:border-slate-50/[0.06] py-4">
			<div className="text-center lg:container px-5 mx-auto">
				<Link
					href="https://www.amincharoliya.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-theme-light hover:dark:text-theme-dark text-lg duration-300"
				>
					Built by Amin Charoliya
				</Link>
			</div>
			<Loader />
		</footer>
	);
}
