import Member from './member';

export default function Members({ data }) {
	return (
		<div>
			<h1 className="text-3xl text-center font-bold mb-8">Members</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
				{data.users.length &&
					data.users?.map((member) => (
						<Member key={member._id} member={member} />
					))}
			</div>
		</div>
	);
}
