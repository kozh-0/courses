import { FirstLevelMenuItem } from "../../interfaces/menuInterface";
import { TopLevelCategory } from "../../interfaces/pageInterface";

import { RootState, useAppSelector } from "../../store";
// import { addMenu } from '../../Redux/MenuSlice';

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import Link from "next/link";
import { SecondLevelMenu } from "./SecondLevelMenu";


const FirstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products }
];

export const Sidebar = () => {
	// const firstCategory = useAppSelector((state: RootState) => state.menu.inner.firstCategory);
	const menu = useAppSelector((state: RootState) => state.menu.inner.list);
	
	console.log(menu);
	
	// const openSecondLevel = (secondCategory: string) => {
	// 	const kek = menu.map(m => {
	// 		if (m._id.secondCategory === secondCategory) m.isOpened = !m.isOpened;
	// 		return m;
	// 	});
	// 	dispatch(addMenu({ firstCategory: 0, list: kek }));
	// };



	return (
		<section className="sidebar">
			<h1>
				<Link href="http://localhost:3000/">Sidebar</Link>
			</h1>

			{FirstLevelMenu.map(m => (
				<div key={m.route} className="sidebar_main">
					<Link href={`/${m.route}`}>
						<div className="sidebar_main_title">
							{m.icon}
							<span>{m.name}</span>
						</div>
					</Link>
					<SecondLevelMenu menuItem={m}/>
					{/* {m.id === firstCategory && } */}
				</div>
			))}
		</section>
	);
};
