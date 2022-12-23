import Link from 'next/link';
import Layout from '../components/layout/index';
import { defaultMetaProps } from '../components/layout/meta';
import Members from '../components/members/members';

export default function Page() {
	const props = { ...defaultMetaProps, title: 'SignUp | Quote Machine' };
	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<h1 className="text-3xl text-center font-bold mb-8">Sign Up</h1>
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
					<label className="block">
						<strong className="block mb-3">Confirm Password</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="password"
							placeholder="Confirm Password"
							name="repeat_password"
						/>
					</label>
					<button
						className="w-full p-3 bg-theme-light text-white rounded-md"
						type="submit"
					>
						Signup
					</button>
				</form>
			</div>
		</Layout>
	);
}
