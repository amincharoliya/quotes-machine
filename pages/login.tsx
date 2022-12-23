import Link from 'next/link';
import Layout from '../components/layout/index';
import { defaultMetaProps } from '../components/layout/meta';
import Members from '../components/members/members';

export default function Page() {
	const props = { ...defaultMetaProps, title: 'Login | Quote Machine' };
	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<h1 className="text-3xl text-center font-bold mb-8">Login</h1>
				<form className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 mb-10 rounded-md shadow-sm">
					<label className="block">
						<strong className="block mb-3">Email</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="email"
							placeholder="Enter Email"
							name="email"
						/>
					</label>
					<label className="block">
						<strong className="block mb-3">Password</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="password"
							placeholder="Enter Password"
							name="password"
						/>
					</label>
					<button
						className="w-full p-3 bg-theme-light text-white rounded-md"
						type="submit"
					>
						Login
					</button>
					<p className="mt-3">
						{"Don't have an account? "}
						<Link
							className="hover:text-theme-light hover:dark:text-theme-dark"
							href="/register"
						>
							Register
						</Link>
					</p>
				</form>
			</div>
		</Layout>
	);
}
