import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Close, Menu } from '../icons';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	return (
		<header
			className={clsx(
				'bg-white dark:bg-slate-900/75 border-b-2 dark:border-slate-50/[0.06] py-4 mb-8 group',
				!sidebarOpen && 'closed'
			)}
		>
			<div className="lg:container px-5 mx-auto flex items-center justify-between">
				<Link href="/" className="logo relative text-white">
					<Image
						className="block dark:hidden"
						src="/logo.svg"
						alt="Logo"
						height={150}
						width={150}
						priority={true}
					/>
					<Image
						className="hidden dark:block"
						src="/logo-white.svg"
						alt="White Logo"
						height={150}
						width={150}
						priority={true}
					/>
				</Link>

				<div className="nav-wrap fixed z-20 left-0 group-[.closed]:-left-full top-0 bottom-0 flex-col flex flex-1 w-3/4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-r-2 dark:border-slate-50/[0.06] pt-5 md:border-r-0 md:bg-transparent md:backdrop-blur-none md:flex-row md:static md:pt-0  duration-300">
					<nav
						aria-label="main menu"
						role="navigation"
						className="flex w-full md:mx-auto md:w-auto"
					>
						<ul className="flex flex-col w-full md:flex-row md:w-auto">
							<li className="block md:inline-block">
								<MenuItem
									text="Home"
									url="/"
									active={
										router.asPath === '/' ? true : false
									}
								/>
							</li>
							<li className="block md:inline-block">
								<MenuItem
									text="Members"
									url="/members"
									active={
										router.asPath === '/members'
											? true
											: false
									}
								/>
							</li>
							<li className="block md:inline-block">
								<MenuItem text="About" url="/" />
							</li>
						</ul>
					</nav>

					<nav
						aria-label="main menu"
						role="navigation"
						className="flex w-full md:w-auto"
					>
						<ul className="flex flex-col w-full md:flex-row md:w-auto">
							<li className="block md:inline-block">
								<MenuItem text="Login" url="/login" />
							</li>
							<li className="block md:inline-block">
								<MenuItem text="Signup" url="/register" />
							</li>
						</ul>
					</nav>
				</div>

				<div
					className="block overlay bg-black/20 fixed inset-0 group-[.closed]:hidden md:hidden"
					onClick={() => setSidebarOpen(false)}
				></div>

				<button
					className="fixed top-4 right-5 bg-theme-light dark:bg-theme-dark text-white dark:text-slate-900 rounded-sm p-2 md:hidden"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<span className="hidden group-[.closed]:block">
						<Menu />
					</span>
					<span className="hidden group-[:not(.closed)]:block">
						<Close />
					</span>
				</button>
			</div>
		</header>
	);
}

type MenuItemProps = {
	text: string;
	url: string;
	active?: boolean;
};

function MenuItem({ text, url, active }: MenuItemProps) {
	return (
		<Link
			href={url}
			className={clsx(
				'px-3 py-2 w-full md:w-auto md:mx-1 inline-block hover:text-theme-light hover:dark:text-theme-dark text-center text-lg duration-300',
				active && 'font-bold'
			)}
		>
			{text}
		</Link>
	);
}
