import React, { createContext, useContext, useMemo, useState } from 'react';

interface ContextState {
	on: boolean | null;
	setOn: React.Dispatch<React.SetStateAction<boolean>>;
}
const DropdownContext = createContext<ContextState | null>(null);

function useDropdownContext() {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error(
			"DropdownMenu compound components can't be used outside the DropDownMenu Component"
		);
	}
	return context;
}

export function DropdownMenu(props) {
	const [on, setOn] = useState(false);
	const value = useMemo(() => ({ on, setOn }), [on]);

	return (
		<DropdownContext.Provider value={value}>
			<div {...props}>{props.children}</div>
		</DropdownContext.Provider>
	);
}

export function MenuButton({ children, className }) {
	const { on, setOn } = useDropdownContext();
	return (
		<button
			className={className}
			onClick={() => setOn(!on)}
			aria-haspopup="true"
			aria-expanded={on}
			tabIndex={0}
		>
			{children}
		</button>
	);
}

export function DPMenu({ children, className }) {
	const { on, setOn } = useDropdownContext();
	return on ? (
		<ul className={className} onClick={() => setOn(false)}>
			{children}
		</ul>
	) : null;
}

export function DPMenuItem({ children, ...props }) {
	const { on } = useDropdownContext();
	return on ? (
		<li className={props.className} {...props}>
			{children}
		</li>
	) : null;
}
