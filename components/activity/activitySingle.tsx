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
			const found = likes.some((el) => el.id === session.user.id);
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
		const found = likes.some((el) => el.id === session.user.id);
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
						name: session.user.name,
						image: session.user.image,
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
						id: session.user.id,
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
					<Link href={'/members/' + data.user}>
						<Image
							src={'/images/profiles/' + data.userImage + '.png'}
							width={64}
							height={64}
							alt="Avatar"
						/>
					</Link>
				</div>
				<div className="flex-1 ml-4">
					<h2>
						<Link
							href={'/members/' + data.user}
							className=" font-bold hover:text-theme-light hover:dark:text-theme-dark duration-300"
						>
							{data.userName}
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
					className="mr-2"
					title="like"
					onClick={() => handleLike(data._id)}
				>
					<ThumbUp className="h-5 w-5" />
				</button>
				<span className="text-sm">{getLikeString()}</span>
			</div>
		</div>
	);
}
