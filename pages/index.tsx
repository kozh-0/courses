import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store";
import { decrement, increment } from "../Redux/CounterSlice";
// дает правильную типизацию и подсказки на основе созданного стора
import type { RootState } from "../store";

import Arrow from '../Components/imgs/arrow.svg';
import { Rating } from "../Components/Rating";
import { Menu, MenuItem } from "../interfaces/menuInterface";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Sidebar } from "../layout/Menu/Sidebar";
import Todos from "../layout/Todos";
import { addMenu } from "../Redux/MenuSlice";


export default function Home(props: Menu/* { menu }: HomeProps */) {
	const counter = useAppSelector((state: RootState) => state.counter.value);
	const dispatch = useAppDispatch();

	// console.log(props);
	useEffect(() => {
		dispatch(addMenu(props));
	}, [dispatch, props]);


	return <>
		<Header />

		<div className="main_wrapper">
			<Sidebar/>
			<main>
				<h1>{counter}</h1>
				<button
					className="btn_primary"
					onClick={() => dispatch(increment())}
				>increment</button>
				<button
					className="btn"
					onClick={() => dispatch(decrement())}
				>decrement</button>
				<button className="btn_ghost">
					btn_ghost &nbsp;<Arrow />
				</button>

				<Rating />

				<p className='p_small'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.</p>

				<div className='tag_small ghost'>hh.ru</div>
				<div className='tag_medium red'>hh.ru</div>
				<div className='tag_small grey'>hh.ru</div>
				<div className='tag_medium green'>hh.ru</div>
				<div className='tag_small primary'>hh.ru</div>

				
				<Todos />
			</main>

		</div>
		<Footer />

	</>;
}

// ЭТО SERVER SIDE RENDERING
// Фишка получения данных таким образом в том, что приходящий html в network не пустой <div id='root'></div>, а полноценно заполненный html, что дает робам знать что страница хорошая для SEO
// По-простому, это функция которая работает только на страницах папка pages, и возвращает в файл страницы пропсы по запросу
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: list } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });

	return {
		props: { 
			list,
			firstCategory
		}
	};
};

export interface HomeProps {
	list: MenuItem[];
	firstCategory: number
}