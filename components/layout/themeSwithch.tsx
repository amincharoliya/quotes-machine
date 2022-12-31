import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Moon, Sun } from '../icons';

export default function ThemeSwitch({ classes }) {
	const { theme, setTheme } = useTheme();
	const [animation, setAnimation] = useState(false);
	const ToggleTheme = () => {
		if (theme == 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
		setAnimation(true);
		setTimeout(() => {
			setAnimation(false);
		}, 500);
	};

	return (
		<>
			<label
				className="sr-only"
				htmlFor="theme-switch"
				data-headlessui-state=""
			>
				Theme
			</label>
			<button
				id="theme-switch"
				className={classes}
				onClick={() => ToggleTheme()}
				aria-la
			>
				{theme == 'dark' ? (
					<Moon
						className={clsx(
							'w-5 h-5',
							animation && 'animate-wiggle'
						)}
					/>
				) : (
					<Sun
						className={clsx(
							'w-5 h-5',
							animation && 'animate-wiggle'
						)}
					/>
				)}
			</button>
		</>
	);
}
