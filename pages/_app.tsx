import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import "../styles/globals.scss";
import { store } from "../store";
import { Provider } from "react-redux";
import ym from "react-yandex-metrika";
import { YMInitializer } from "react-yandex-metrika";
import { useEffect } from "react";

// при каждом изменении роута, отправляем событие на яндекс метрику

export default function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    console.log(Router);
    Router.events.on("routeChangeComplete", (url: string) => {
      if (typeof window !== "undefined") {
        console.log(222222222222222);
        ym("hit", url);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
        <meta property="og:locale" content="ru_RU" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
      </Head>
      {/* webvisor чтобы смотреть посетителей, можно отключить, меньше нагрузки */}
      {/* defer - откадываем загрузку метрики, чтоб быстрее грузить страницу */}
      <YMInitializer accounts={[96538644]} options={{ webvisor: true, defer: true }} version="2" />

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
