import { FirstLevelMenuItem } from "../interfaces/menuInterface";
import { TopLevelCategory } from "../interfaces/pageInterface";

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

export const FirstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products }
];

export function formatRuble(num: number): string {
	return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
}

export function declOfNum(num: number, titles: [string, string, string]): string {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
}