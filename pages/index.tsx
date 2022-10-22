import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { MenuItem } from "../interfaces/menuInterface";
import { addMenu } from "../Redux/MenuSlice";
import { withLayout } from "../layout/Layout";
import { API } from "../helpers/api";


export const skills = ['SCSS', 'TypeScript', 'Next.js', 'RTK', 'Routing', 'SSR', 'npm', 'REST API', 'Git', 'GitHub', 'Insomnia', 'Figma', 'Docker'];

function Home(props: HomeProps) {

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(addMenu(props));
	}, [dispatch, props]);

	return <div className="MAIN_PAGE">
		<h1>Всем привет!</h1>
		<p style={{marginBottom: '15px'}}>Меня зовут Дмитрий</p>
		<p className="p_medium">Более года я занимаюсь фронтенд разработкой и ниже приведены технологии, на которых написан этот проект:</p>

		<div className="MAIN_PAGE_skills">
			{skills.map((el, i) => <div key={i} className='tag_medium primary'>{el}</div>)}
		</div>

		<div className="MAIN_PAGE_CV">
			<p>Подробнее обо мне можно узнать из резюме:</p>
			<a className="btn_primary" target='_blank' rel='noreferrer' href="https://drive.google.com/file/d/1sud3v0-G_IiiqS9v0Mv40rs9J2rOoD7q/view?usp=sharing">
				Eng CV
			</a>
			<a className="btn_primary" target='_blank' rel='noreferrer' href="https://drive.google.com/file/d/1-Ki74DNTd_-I8HhUuLiwWpfg5FpZtdK_/view?usp=sharing">
				Резюме
			</a>
		</div>

		<p className='p_medium'>Чтобы начать пользоваться приложением, переходите к меню...</p>
	</div>;
}
export default withLayout(Home);

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

