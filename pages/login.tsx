import Link from 'next/link';
import Layout from '../components/layout/index';
import { defaultMetaProps } from '../components/layout/meta';
import { signIn, useSession } from 'next-auth/react';
import { useForm, Resolver } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type FormValues = {
	email: string;
	password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
	let errors: {
		email?: { type: string; message: string };
		password?: { type: string; message: string };
	} = {};
	if (!values.email) {
		errors.email = {
			type: 'required',
			message: 'Email is required.',
		};
	}
	if (!values.password) {
		errors.password = {
			type: 'required',
			message: 'Password is required.',
		};
	}
	return {
		values: values.email ? values : {},
		errors,
	};
};

export default function Page() {
	const props = { ...defaultMetaProps, title: 'Login | Quote Machine' };
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.user) {
			router.push('/');
		}
	}, [session, router]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ resolver });

	const submitHandler = async ({ email, password }) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			if (result.error) {
				alert(result.error);
			}
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<h1 className="text-3xl text-center font-bold mb-8">Login</h1>
				<form
					className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 mb-10 rounded-md shadow-sm"
					onSubmit={handleSubmit(submitHandler)}
				>
					<label className="block">
						<strong className="block mb-3">Email</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="email"
							placeholder="Enter Email"
							{...register('email')}
						/>
						{errors.email && (
							<span className="border-2 border-red-600">
								{errors.email.message}
							</span>
						)}
					</label>
					<label className="block">
						<strong className="block mb-3">Password</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="password"
							placeholder="Enter Password"
							{...register('password')}
						/>
						{errors.password && (
							<span className="border-2 border-red-600">
								{errors.password.message}
							</span>
						)}
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
