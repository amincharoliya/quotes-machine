import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, ThumbUp } from '../icons';

export default function Activity({ data }) {
	const { data: session } = useSession();
	const [likes, setLikes] = useState(() => data.likes);

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
			<div className="flex items-center mb-2 relative">
				<button
					className="mr-2"
					title="like"
					onClick={() => handleLike(data._id)}
				>
					<ThumbUp className="h-5 w-5" />
				</button>
				<div className="group">
					<span className="text-sm">{getLikeString()}</span>
					<ul className="hidden group-hover:block absolute bottom-6 left-5 w-36 bg-white dark:bg-slate-800 rounded-md py-2 shadow-md max-h-40 overflow-auto">
						{data.likes.map((like) => (
							<li key={like._id}>
								<Link
									href={'/members/' + like._id}
									className="flex items-center hover:bg-slate-100 dark:hover:bg-slate-900 p-2"
								>
									<div className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden bg-theme-dark mr-3">
										<Link href={'/members/' + like._id}>
											<Image
												src={
													'/images/profiles/' +
													like.image +
													'.png'
												}
												width={34}
												height={34}
												alt="Avatar"
											/>
										</Link>
									</div>
									<span className="hover:text-theme-light hover:dark:text-theme-dark duration-300 text-sm leading-none">
										{like.name}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
