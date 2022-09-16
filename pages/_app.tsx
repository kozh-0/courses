import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';
import { store } from '../store';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div>
			<Head>
				<title>App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</div>
	);
}
