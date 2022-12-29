import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Check, Close } from '../icons';

export default function ActivityForm({ quotes, setQuotes }) {
	const { data: session } = useSession();
	const [notice, setNotice] = useState(null);
	const quoteRef = useRef(null);
	const quoteAuthorRef = useRef(null);

	if (!session?.user) {
		return;
	}

	const handleSubmit = async () => {
		event.preventDefault();
		if (
			!quoteRef.current.value.trim() ||
			!quoteAuthorRef.current.value.trim()
		) {
			alert('Please make sure to fill all fields');
			return;
		}
		const newQuote = {
			quote: quoteRef.current.value,
			author: quoteAuthorRef.current.value,
		};
		try {
			const addQuote = await fetch('/api/quotes/save', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newQuote),
			});
		} catch (err) {
			alert(err.message);
		} finally {
			setNotice('Quote posted successfully.');
			const newQuote = {
				quote: quoteRef.current.value,
				author: quoteAuthorRef.current.value,
				userName: session.user.name,
				userImage: session.user.image,
				createdAt: new Date().toDateString(),
			};
			setQuotes([newQuote, ...quotes]);
			quoteAuthorRef.current.value = '';
			quoteRef.current.value = '';
		}
	};

	return (
		<div className="max-w-3xl mx-auto">
			<div className="bg-white dark:bg-slate-800 p-4 mb-6 rounded-md">
				<form onSubmit={() => handleSubmit()}>
					<div className="flex items-center mb-6">
						<div className="rounded-full bg-theme-dark overflow-hidden h-10 w-10 p-1 mr-5">
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
						<span aria-hidden>{session.user.name}</span>
					</div>
					<div className="flex-1">
						<textarea
							className="w-full resize-none border-2 rounded-md h-20 p-3 dark:bg-slate-900 dark:border-0"
							placeholder="Share a new quote"
							ref={quoteRef}
						></textarea>
						<input
							type="text"
							className="w-full resize-none border-2 rounded-md p-3 dark:bg-slate-900 dark:border-0"
							placeholder="Author name"
							ref={quoteAuthorRef}
						/>
						<div className="text-right mt-4">
							<button
								type="submit"
								className="px-4 py-2 bg-theme-light text-white rounded-md"
							>
								Post
							</button>
						</div>
					</div>
				</form>
			</div>
			{notice && (
				<div className="flex items-center bg-white dark:bg-slate-800 p-4 mb-6 rounded-md">
					<Check className="h-6 w-6 mr-3" />
					{notice}
					<button
						className="cursor-pointer ml-auto"
						aria-label="Clear notice"
						onClick={() => setNotice(null)}
					>
						<Close className="h-6 w-6" />
					</button>
				</div>
			)}
		</div>
	);
}
