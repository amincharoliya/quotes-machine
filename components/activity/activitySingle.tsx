import Image from 'next/image';
import Link from 'next/link';
import { Quote } from '../icons';

export default function Activity() {
	return (
		<div className="bg-white dark:bg-slate-800 p-4 mb-6 rounded-md max-w-4xl mx-auto">
			<div className="flex items-center">
				<div className="h-20 w-20 flex items-center justify-center rounded-lg overflow-hidden bg-theme-dark">
					<Image
						src="/images/profiles/profile-1.png"
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
							Jessica
						</Link>{' '}
						posted a new quote
					</h2>
					<p>18 sep, 2022</p>
				</div>
			</div>
			<div>
				<blockquote className="py-6">
					<Quote className="text-slate-900 dark:text-white mb-2" />
					<p className="mb-2">
						The greatest glory in living lies not in never falling,
						but in rising every time we fall
					</p>
					<p className="text-right">- Nelson Mandela</p>
				</blockquote>
			</div>
		</div>
	);
}
