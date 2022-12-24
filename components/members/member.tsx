import Image from 'next/image';
import Link from 'next/link';

export default function Member({ member }) {
	const date = new Date(member.createdAt).toDateString();
	return (
		<div className="bg-white dark:bg-slate-800 p-4">
			<div className="flex items-center mb-4">
				<div className="h-20 w-20 flex items-center justify-center rounded-lg overflow-hidden bg-theme-dark">
					<Image
						src={'/images/profiles/' + member.image + '.png'}
						width={64}
						height={64}
						alt={member.name}
					/>
				</div>
				<div className="flex-1 ml-4">
					<h2>
						<Link
							href={'/' + member._id}
							className=" font-bold hover:text-theme-light hover:dark:text-theme-dark duration-300"
						>
							{member.name}
						</Link>
					</h2>
					<p>Joined {date}</p>
				</div>
			</div>
		</div>
	);
}
