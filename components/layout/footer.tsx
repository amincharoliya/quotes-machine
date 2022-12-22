import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-white dark:bg-slate-900/75 border-t-2 dark:border-slate-50/[0.06] py-4 fixed bottom-0 left-0 right-0">
			<div className="text-center lg:container px-5 mx-auto">
				<Link
					href="https://github.com/amincharoliya/quotes-machine"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-theme-light hover:dark:text-theme-dark text-lg duration-300"
				>
					Built by Amin Charoliya
				</Link>
			</div>
		</footer>
	);
}
