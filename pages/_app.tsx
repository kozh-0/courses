import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<div>
			<Head>
				<title>App</title>
				<link rel="icon" href="/favicon.ico" />
				
			</Head>
			<Component {...pageProps} />

		</div>
	);
}
