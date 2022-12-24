import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { defaultMetaProps } from '../components/layout/meta';
import Layout from '../components/layout/index';
import randomProfile from '../utils/randomProfile';
import { ArrowRound } from '../components/icons';

type FormValues = {
	name: string;
	email: string;
	password: string;
	confirm_password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
	let errors: {
		name?: { type: string; message: string };
		email?: { type: string; message: string };
		password?: { type: string; message: string };
		confirm_password?: { type: string; message: string };
	} = {};
	if (!values.name) {
		errors.name = {
			type: 'required',
			message: 'Name is required.',
		};
	}
	if (values.name.length < 3) {
		errors.name = {
			type: 'required',
			message: 'Name should be 3 characters long.',
		};
	}
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
	if (values.password.length < 6) {
		errors.password = {
			type: 'required',
			message: 'Password must be minimum 6 characters long.',
		};
	}
	if (!values.confirm_password) {
		errors.confirm_password = {
			type: 'required',
			message: 'Please confirm your password.',
		};
	}
	if (values.password !== values.confirm_password) {
		errors.confirm_password = {
			type: 'required',
			message: 'Confirm password does not match.',
		};
	}
	return {
		values:
			values.name &&
			values.email &&
			values.password &&
			values.confirm_password
				? values
				: {},
		errors,
	};
};

export default function Page() {
	const props = { ...defaultMetaProps, title: 'SignUp | Quote Machine' };
	const [customError, setCustomError] = useState(null);
	const [avatar, setAvatar] = useState(() => randomProfile());
	const randomImage = () => {
		setAvatar(() => randomProfile());
	};

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

	const submitHandler = async ({
		name,
		email,
		password,
		confirm_password,
	}) => {
		if (password !== confirm_password) {
			return;
		}

		try {
			const addUSer = await fetch('/api/auth/register', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
					image: avatar,
				}),
			});

			const response = await addUSer.json();
			if (!addUSer.ok) {
				setCustomError(response.message);
			} else {
				const result = await signIn('credentials', {
					redirect: false,
					email,
					password,
					image: avatar,
				});
			}
		} catch (err) {
			setCustomError(err.message);
		}
	};

	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<h1 className="text-3xl text-center font-bold mb-8">Sign Up</h1>
				<form
					className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 mb-10 rounded-md shadow-sm"
					onSubmit={handleSubmit(submitHandler)}
				>
					<div className="relative mb-6 bg-slate-100 dark:bg-slate-900 select-none">
						<div className="h-40 w-28 mx-auto relative flex items-center">
							<Image
								src={'/images/profiles/' + avatar + '.png'}
								alt="User Image"
								height={110}
								width={110}
							/>
						</div>
						<span
							className="absolute top-4 right-4 inline-block text-center p-2 bg-theme-light text-white rounded-md cursor-pointer"
							onClick={() => randomImage()}
						>
							<ArrowRound className="h-5 w-5" />
						</span>
					</div>
					<label className="block">
						<strong className="block mb-3">Name</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="text"
							placeholder="Enter Name"
							{...register('name')}
						/>
					</label>
					{errors.name && (
						<span className="block -mt-3 mb-3 text-red-600 dark:text-red-300">
							{errors.name.message}
						</span>
					)}
					<label className="block">
						<strong className="block mb-3">Email</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="email"
							placeholder="Enter Email"
							{...register('email')}
						/>
					</label>
					{errors.email && (
						<span className="block -mt-3 mb-3 text-red-600 dark:text-red-300">
							{errors.email.message}
						</span>
					)}
					<label className="block">
						<strong className="block mb-3">Password</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="password"
							placeholder="Enter Password"
							{...register('password')}
						/>
					</label>
					{errors.password && (
						<span className="block -mt-3 mb-3 text-red-600 dark:text-red-300">
							{errors.password.message}
						</span>
					)}
					<label className="block">
						<strong className="block mb-3">Confirm Password</strong>
						<input
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md"
							type="password"
							placeholder="Confirm Password"
							{...register('confirm_password')}
						/>
					</label>
					{errors.confirm_password && (
						<span className="block -mt-3 mb-3 text-red-600 dark:text-red-300">
							{errors.confirm_password.message}
						</span>
					)}
					{`customError` ? (
						<p>
							<span className="" role="alert">
								{customError}
							</span>
						</p>
					) : null}
					<button
						className="w-full p-3 bg-theme-light text-white rounded-md"
						type="submit"
					>
						Signup
					</button>
					<p className="mt-3">
						{'Already have an account? '}
						<Link
							className="hover:text-theme-light hover:dark:text-theme-dark"
							href="/login"
						>
							Login
						</Link>
					</p>
				</form>
			</div>
		</Layout>
	);
}
