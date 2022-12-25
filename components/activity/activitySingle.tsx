import Image from 'next/image';
import Link from 'next/link';
import { Quote } from '../icons';

export default function Activity({ data }) {
	return (
		<div className="bg-white dark:bg-slate-800 p-4 mb-6 rounded-md max-w-3xl mx-auto">
			<div className="flex items-center mb-4">
				<div className="h-20 w-20 flex items-center justify-center rounded-lg overflow-hidden bg-theme-dark">
					<Image
						src={'/images/profiles/' + data.userImage + '.png'}
						width={64}
						height={64}
						alt="Avatar"
					/>
				</div>
				<div className="flex-1 ml-4">
					<h2>
						<Link
							href="/"
							className=" font-bold hover:text-theme-light hover:dark:text-theme-dark duration-300"
						>
							{data.userName}
						</Link>{' '}
						posted a new quote
					</h2>
					<p>{new Date(data.createdAt).toDateString()}</p>
				</div>
			</div>
			<div>
				<blockquote className="bg-slate-100 dark:bg-slate-900 rounded-md p-4 text-center">
					<Quote className="text-slate-900 dark:text-white mb-4 h-5 w-5 mx-auto" />
					<p className="mb-2 text-lg font-notoSans">{data.quote}</p>
					<p className="text-lg font-notoSans">- {data.author}</p>
				</blockquote>
			</div>
		</div>
	);
}
