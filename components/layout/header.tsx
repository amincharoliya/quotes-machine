import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useSession, signOut } from 'next-auth/react';
import { Close, Menu } from '../icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { DropdownMenu, MenuButton, DPMenu, DPMenuItem } from '../DropdownMenu';
import dynamic from 'next/dynamic';

const ThemeSwitch = dynamic(() => import('./themeSwithch'), {
	ssr: false,
});

export default function Header() {
	const { status, data: session } = useSession();
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
						className="flex w-full mt-auto mb-10 md:hidden"
					>
						<ul className="w-full text-left">
							{status == 'loading' ? (
								'loading...'
							) : session?.user ? (
								<>
									<li className="block mt-4 pb-4 py-2 border-b-2 dark:border-slate-50/[0.06]">
										<div className="flex items-center justify-start px-3">
											<div className="rounded-full bg-theme-dark overflow-hidden h-10 w-10 p-1 mr-3">
												<Image
													alt={session.user.name}
													src={
														'/images/profiles/' +
														session.user.image +
														'.png'
													}
													width={40}
													height={40}
												/>
											</div>
											<span aria-hidden>
												{session.user.name}
											</span>
										</div>
									</li>
									<li className="block">
										<MenuItem
											text="Profile"
											url="/profile"
											active={
												router.asPath === '/profile'
													? true
													: false
											}
										/>
									</li>
									<li className="block">
										<MenuItem
											text="Edit Profile"
											url="/edit-profile"
											active={
												router.asPath ===
												'/edit-profile'
													? true
													: false
											}
										/>
									</li>
									<li className="block">
										<button
											className="block w-full text-left px-3 py-2 border-b-2 dark:border-slate-50/[0.06]"
											onClick={() =>
												signOut({
													callbackUrl: '/',
												})
											}
										>
											Logout
										</button>
									</li>
								</>
							) : (
								<>
									<li className="block">
										<MenuItem
											text="Login"
											url="/login"
											active={
												router.asPath === '/login'
													? true
													: false
											}
										/>
									</li>
									<li className="block">
										<MenuItem
											text="Signup"
											url="/register"
											active={
												router.asPath === '/register'
													? true
													: false
											}
										/>
									</li>
								</>
							)}
						</ul>
					</nav>

					<nav
						aria-label="main menu"
						role="navigation"
						className="hidden md:flex w-full md:w-auto"
					>
						<ul className="flex flex-col items-center w-full md:flex-row md:w-auto">
							{status == 'loading' ? (
								'loading...'
							) : session?.user ? (
								<li>
									<DropdownMenu className="dropdown relative">
										<MenuButton className="flex items-center">
											<div className="rounded-full bg-theme-dark overflow-hidden h-10 w-10 p-1 mr-3">
												<Image
													alt={session.user.name}
													src={
														'/images/profiles/' +
														session.user.image +
														'.png'
													}
													width={40}
													height={40}
												/>
											</div>
											<span aria-hidden>
												{session.user.name}
											</span>
										</MenuButton>
										<DPMenu className="absolute top-full right-0 p-3 rounded-md bg-white dark:bg-slate-800 w-40 shadow-sm mt-4">
											<DPMenuItem>
												<Link
													href="/profile"
													className="block hover:bg-slate-100 dark:hover:bg-slate-900 px-3 py-2 rounded-md"
												>
													Profile
												</Link>
											</DPMenuItem>
											<DPMenuItem>
												<Link
													href="/edit-profile"
													className="block hover:bg-slate-100 dark:hover:bg-slate-900 px-3 py-2 rounded-md"
												>
													Edit Profile
												</Link>
											</DPMenuItem>
											<DPMenuItem>
												<button
													className="block w-full text-left hover:bg-slate-100 dark:hover:bg-slate-900 px-3 py-2 rounded-md"
													onClick={() =>
														signOut({
															callbackUrl: '/',
														})
													}
												>
													Logout
												</button>
											</DPMenuItem>
										</DPMenu>
									</DropdownMenu>
								</li>
							) : (
								<>
									<li className="block md:inline-block">
										<MenuItem
											text="Login"
											url="/login"
											active={
												router.asPath === '/login'
													? true
													: false
											}
										/>
									</li>
									<li className="block md:inline-block">
										<MenuItem
											text="Signup"
											url="/register"
											active={
												router.asPath === '/register'
													? true
													: false
											}
										/>
									</li>
								</>
							)}
						</ul>
					</nav>
				</div>

				<div
					className="block overlay bg-black/20 fixed inset-0 group-[.closed]:hidden md:hidden"
					onClick={() => setSidebarOpen(false)}
				></div>

				<button
					className="group-[:not(.closed)]:fixed top-4 right-5 bg-theme-light dark:bg-theme-dark text-white dark:text-slate-900 rounded-sm p-2 md:hidden"
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
			<ThemeSwitch classes="fixed right-5 bottom-20 bg-white dark:bg-slate-800 p-4 rounded-md shadow-md" />
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
				'px-3 py-2 w-full border-b-2 dark:border-slate-50/[0.06] md:w-auto md:mx-1 md:border-b-0 inline-block hover:text-theme-light hover:dark:text-theme-dark text-lg duration-300',
				active && 'font-bold'
			)}
		>
			{text}
		</Link>
	);
}
