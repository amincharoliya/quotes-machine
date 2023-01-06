import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { ArrowRound } from '../components/icons';
import Layout from '../components/layout';
import { defaultMetaProps } from '../components/layout/meta';
import randomProfile from '../utils/randomProfile';

type FormValues = {
	name: string;
	email: string;
	password: string;
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
	return {
		values: values.name && values.email && values.password ? values : {},
		errors,
	};
};

const EditProfile = () => {
	const { status, data: session } = useSession();
	const { theme } = useTheme();
	const [sending, isSending] = useState<boolean>(false);
	const notify = (message) => toast(message);
	const [avatar, setAvatar] = useState(null);

	const props = {
		...defaultMetaProps,
		title: 'Edit Profile | Quote Machine',
	};

	useEffect(() => {
		if (session?.user) {
			setAvatar(session.user.image);
		}
	}, [session]);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({ resolver });

	useEffect(() => {
		if (session?.user) {
			setValue('name', session.user.name);
			setValue('email', session.user.email);
		}
	}, [session?.user, setValue]);

	const submitHandler = async ({ name, email, password }) => {
		isSending(true);
		try {
			const updateUser = await fetch('/api/auth/update', {
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

			const response = await updateUser.json();
			if (!updateUser.ok) {
				notify(response.message);
				isSending(false);
				return;
			} else {
				const result = await signIn('credentials', {
					redirect: false,
					email,
					password,
				});
				if (result.error) {
					notify(result.error);
					isSending(false);
				}
			}
			notify('Profile details updated');
			isSending(false);
		} catch (err) {
			alert(err.message);
		}
	};

	if (status == 'loading') {
		return 'loading...';
	}

	const randomImage = () => {
		setAvatar(() => randomProfile());
	};

	return (
		<Layout meta={props}>
			<div className="lg:container px-5 mx-auto ">
				<h1 className="text-3xl text-center font-bold mb-8">
					Edit Profile
				</h1>
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
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md text-slate-900"
							type="text"
							placeholder="Enter Email"
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
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md text-slate-900 opacity-80 cursor-not-allowed"
							type="email"
							placeholder="Enter Email"
							value={session.user.email}
							disabled
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
							className="border-2 dark:border-slate-50/[0.06] p-2 w-full mb-5 bg-white rounded-md text-slate-900"
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
					<button
						className={clsx(
							'w-full p-3 bg-theme-light text-white rounded-md flex items-center justify-center',
							sending && 'pointer-events-none opacity-80'
						)}
						type="submit"
					>
						{sending ? 'Updating' : 'Update'}
						{sending ? (
							<ArrowRound className="h-4 w-4 ml-2 animate-spin" />
						) : (
							''
						)}
					</button>
				</form>
			</div>
			<ToastContainer
				position="bottom-right"
				theme={theme == 'light' ? 'light' : 'dark'}
			/>
		</Layout>
	);
};

EditProfile.auth = true;
export default EditProfile;
