import axios from "axios";
import { GetStaticProps } from "next";
import { API } from "../helpers/api";
import { MenuItem } from "../interfaces/menuInterface";
import { withLayout } from "../layout/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { addMenu } from "../Redux/MenuSlice";

function Search(props: HomeProps) {
	const router = useRouter();
	// if (typeof window !== 'undefined') {
	// 	console.log(props);
	// }

	const menuRedux = useAppSelector((state: RootState) => state.menu.inner.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!menuRedux) {
            dispatch(addMenu(props));
        }
    }, [dispatch, menuRedux, props]);

	return <div style={{textAlign: 'center'}}>
		<h1>Вы не нашли <span style={{color:"#7351f5", fontWeight: '700', marginBottom: '100px'}}>{router.query.q}</span></h1>
		<Image width={290} height={200} src="/trollface.jpg" alt="troll" />
	</div>;
}
export default withLayout(Search);

// ЭТО SERVER SIDE RENDERING
// Фишка получения данных таким образом в том, что приходящий html в network не пустой <div id='root'></div>, а полноценно заполненный html, что дает робам знать что страница хорошая для SEO
// По-простому, это функция которая работает только на страницах папка pages, и возвращает в файл страницы пропсы по запросу
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: list } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });

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