export default function randomProfile(): string {
	const randomNumber: number = Math.round(Math.random() * 12) + 1;
	return 'profile-' + randomNumber;
}
