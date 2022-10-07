import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';
import { store } from '../store';
import { Provider } from 'react-redux';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';

export default function MyApp({ Component, pageProps, router }: AppProps) {

	// при каждом изменении роута, отправляем событие на яндекс метрику
	router.events.on('routeChangeComplete', (url: string) => {
		if (typeof window !== 'undefined') {
			ym('hit', url);
		}
	});

	return (
		<div>
			<Head>
				<title>App</title>
				<link rel="icon" href="/favicon.ico" />
				<meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta property='og:locale' content='ru_RU' />
				<link rel="preconnect" href="https://mc.yandex.ru" />
			</Head>
			{/* webvisor чтобы смотреть посетителей, можно отключить, меньше нагрузки */}
			{/* defer - откадываем загрузку метрики, чтоб быстрее грузить страницу */}
			<YMInitializer
				accounts={[]}
				options={{ webvisor: true, defer: true }}
				version='2'
			/>

			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</div>
	);
}
