import { ReactNode } from 'react';
import Head from 'next/head';
import Meta, { MetaProps } from './meta';
import Header from './header';
import Footer from './footer';

type LayoutProps = {
	meta: MetaProps;
	children: ReactNode;
};

export default function Layout({ meta, children }: LayoutProps) {
	return (
		<>
			<Meta props={meta} />
			<main className="font-inter font-medium text-slate-900 dark:text-white bg-white dark:bg-slate-900 min-h-screen pb-16">
				<Header />
				{children}
				<Footer />
			</main>
		</>
	);
}
