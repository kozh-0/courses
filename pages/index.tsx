import axios from "axios";
import { GetStaticProps } from "next";
import { useState } from "react";
import Arrow from '../Components/imgs/arrow.svg';
import { Rating } from "../Components/Rating";
import { MenuItem } from "../interfaces/menuInterface";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Sidebar } from "../layout/Sidebar";

export default function Home({menu}: HomeProps) {
	const [counter, setCounter] = useState(0);
		console.log(menu);
	
	return (
		<>
			<Header />

			<div style={{display: 'flex'}}>
				<Sidebar />
				<main>
					<h1>{counter}</h1>
					<button
						className="btn"
						onClick={() => setCounter(counter + 1)}
					>btn</button>
					<button className="btn_primary">btn_primary</button>
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

					<ul>
						{menu.map(el => <li key={el._id.secondCategory}>{el._id.secondCategory}</li>)}
					</ul>

				</main>

			</div>
			<Footer />

		</>
	);
}

// ЭТО SERVER SIDE RENDERING
// Фишка получения данных таким образом в том, что приходящий html в network не пустой <div id='root'></div>, а полноценно заполненный html, что дает робам знать что страница хорошая для SEO
// По-простому, это функция которая работает только на страницах папка pages, и возвращает в файл страницы пропсы по запросу
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {firstCategory});

	return {
		props: { menu }
	};
};

interface HomeProps {
	menu: MenuItem[];
	// firstCategory: number
}