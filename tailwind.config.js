/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				theme: {
					light: '#581c87',
					dark: '#38bdf8',
				},
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
	darkMode: 'class',
};
