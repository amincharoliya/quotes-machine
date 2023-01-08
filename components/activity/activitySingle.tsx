import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Close, Quote, ThumbUp } from '../icons';
import { useRouter } from 'next/router';

export default function Activity({ data }) {
	const { data: session } = useSession();
	const router = useRouter();
	const [likes, setLikes] = useState(() => data.likes);
	const [likesVisibility, setLikesVisibility] = useState(false);

	const getLikeString = () => {
		let firstLike = likes.length ? likes[likes.length - 1].name : '';
		if (session && session.user) {
			const found = likes.some((el) => el._id === session.user.id);
			if (found) {
				firstLike = 'You';
			}
		}
		if (likes.length == 1) {
			return firstLike + ' liked this';
		} else if (likes.length > 1) {
			return (
				firstLike + ' and ' + (likes.length - 1) + ' other liked this'
			);
		}
		return '';
	};

	const handleLike = async (id) => {
		if (!session?.user) {
			router.push('/login');
			return;
		}
		const found = likes.some((el) => el._id === session.user.id);
		if (!found) {
			const updateQuote = await fetch(`/api/quotes/${id}`, {
				method: 'PUT',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					likes: {
						id: session.user.id,
					},
				}),
			});
			const response = await updateQuote.json();
			if (!updateQuote.ok) {
				alert(response.message);
			} else {
				setLikes([
					...likes,
					{
						_id: session.user.id,
						name: session.user.name,
						image: session.user.image,
					},
				]);
			}
		}
	};
	return (
		<div className="bg-white dark:bg-slate-800 p-4 mb-6 rounded-md max-w-3xl mx-auto">
			<div className="flex items-center mb-4">
				<div className="h-20 w-20 flex items-center justify-center rounded-lg overflow-hidden bg-theme-dark">
					<Link href={'/members/' + data.user._id}>
						<Image
							src={'/images/profiles/' + data.user.image + '.png'}
							width={64}
							height={64}
							alt="Avatar"
						/>
					</Link>
				</div>
				<div className="flex-1 ml-4">
					<h2>
						<Link
							href={'/members/' + data.user._id}
							className=" font-bold hover:text-theme-light hover:dark:text-theme-dark duration-300"
						>
							{data.user.name}
						</Link>{' '}
						posted a new quote
					</h2>
					<p>{new Date(data.createdAt).toDateString()}</p>
				</div>
			</div>
			<div className="mb-6">
				<blockquote className="bg-slate-100 dark:bg-slate-900 rounded-md p-4 text-center">
					<Quote className="fill-slate-900 dark:fill-white mb-4 h-5 w-5 mx-auto" />
					<p className="mb-2 text-lg font-notoSans">{data.quote}</p>
					<p className="text-lg font-notoSans">- {data.author}</p>
				</blockquote>
			</div>
			<div className="flex items-center mb-2">
				<button
					className="mr-2 hover:text-theme-light hover:dark:text-theme-dark duration-300"
					title="like"
					onClick={() => handleLike(data._id)}
				>
					<ThumbUp className="h-5 w-5" />
				</button>
				<div className={clsx('group', likesVisibility && 'open')}>
					<button
						className="text-sm hover:text-theme-light hover:dark:text-theme-dark duration-300"
						onClick={() => setLikesVisibility(!likesVisibility)}
					>
						{getLikeString()}
					</button>
					<div
						className="hidden group-[.open]:block fixed z-10 left-2/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 bg-white dark:bg-slate-800 rounded-md py-2 shadow-md duration-300"
						role="dialog"
						aria-live="assertive"
						aria-labelledby={'modal-title-' + data._id}
					>
						<button
							className="hidden group-[.open]:block absolute right-0 top-0 bg-white dark:bg-slate-800 rounded-md p-1"
							aria-label="Close"
							onClick={() => setLikesVisibility(!likesVisibility)}
						>
							<Close className="h-6  w-6" />
						</button>
						<h3
							className="px-3 mb-2 text-sm"
							id={'modal-title-' + data._id}
						>
							Liked by
						</h3>
						<ul className="max-h-60 overflow-auto">
							{likes.map((like) => (
								<li key={like._id}>
									<Link
										href={'/members/' + like._id}
										className="group/link flex items-center hover:bg-slate-100 dark:hover:bg-slate-900 px-3 py-2"
									>
										<div className="h-10 w-10 flex items-center justify-center rounded-full overflow-hidden bg-theme-dark mr-3">
											<Link href={'/members/' + like._id}>
												<Image
													src={
														'/images/profiles/' +
														like.image +
														'.png'
													}
													width={32}
													height={32}
													alt="Avatar"
												/>
											</Link>
										</div>
										<span className="group-hover/link:text-theme-light dark:group-hover/link:text-theme-dark duration-300 text-sm leading-none">
											{like.name}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div
						className="hidden group-[.open]:block fixed inset-0 bg-black/40"
						onClick={() => setLikesVisibility(!likesVisibility)}
					></div>
				</div>
			</div>
		</div>
	);
}
