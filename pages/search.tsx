import axios from "axios";
import { GetStaticProps } from "next";
import { MenuItem } from "../interfaces/menuInterface";
import { withLayout } from "../layout/Layout";


function Search() {

	return <>
        <h1>Search</h1>
	</>;
}
export default withLayout(Search);

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

export interface HomeProps extends Record<string, unknown> {
	list: MenuItem[];
	firstCategory: number
}