export function Menu({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			height="30"
			width="30"
			className={className}
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 9h16.5m-16.5 6.75h16.5"
			></path>
		</svg>
	);
}

export function Close({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			height="30"
			width="30"
			className={className}
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6 18L18 6M6 6l12 12"
			></path>
		</svg>
	);
}
