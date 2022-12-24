import { useEffect, useState } from 'react';
import Member from './member';
import MembersPlaceholder from './membersPlaceholder';

export default function Members() {
	const [members, setMembers] = useState(null);
	useEffect(() => {
		fetch('/api/members')
			.then((data) => data.json())
			.then((data) => setMembers(data));
	}, []);

	return (
		<div>
			<h1 className="text-3xl text-center font-bold mb-8">Members</h1>
			<div className="grid grid-cols-3 gap-3">
				{!members ? (
					<>
						<MembersPlaceholder />
						<MembersPlaceholder />
						<MembersPlaceholder />
					</>
				) : (
					members.users?.map((member) => (
						<Member key={member._id} member={member} />
					))
				)}
			</div>
		</div>
	);
}
