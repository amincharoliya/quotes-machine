import { ReactNode } from 'react';
import Head from 'next/head';
import Meta, { MetaProps } from './meta';

type LayoutProps = {
	meta: MetaProps;
	children: ReactNode;
};

export default function Layout({ meta, children }: LayoutProps) {
	return (
		<>
			<Meta props={meta} />
			<main>{children}</main>
		</>
	);
}
