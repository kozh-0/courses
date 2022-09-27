import axios from "axios";
import { GetStaticProps } from "next";

import { MenuItem } from "../interfaces/menuInterface";
import { Sidebar } from "../layout/Menu/Sidebar";



export default function Search() {




	return <div className="main_wrapper">
        <Sidebar/>
        <h1>Seach</h1>
	</div>;
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