import { useEffect, useRef, useState } from 'react';
import Member from './member';
import MembersPlaceholder from './membersPlaceholder';

export default function Members() {
	const [members, setMembers] = useState(null);
	const intervalId = useRef(null);

	useEffect(() => {
		intervalId.current = setInterval(() => {
			getMembers();
		}, 8000);

		function getMembers() {
			fetch('/api/members')
				.then((data) => data.json())
				.then((data) => {
					clearInterval(intervalId.current);
					setMembers(data);
				});
		}

		getMembers();

		return () => clearInterval(intervalId.current);
	}, []);

	return (
		<div>
			<h1 className="text-3xl text-center font-bold mb-8">Members</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
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
