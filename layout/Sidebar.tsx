import { RootState, useAppDispatch, useAppSelector } from "../store";
import { changeOpenState } from '../Redux/MenuSlice';
import Link from "next/link";
import { useRouter } from "next/router";
import { FirstLevelMenuItem, PageItem } from "../interfaces/menuInterface";
import { FirstLevelMenu } from "../helpers/helpers";
import Logo from './logo.svg';
import Search from "../Components/Search";
import { motion } from 'framer-motion';


export const Sidebar = () => {
	const menu = useAppSelector((state: RootState) => state.menu.inner.list);
	const firstCategory = useAppSelector((state: RootState) => state.menu.inner.firstCategory);
	const dispatch = useAppDispatch();
	const router = useRouter();
	// console.log(router);
	
	const variants = {
		visible: {
			transition: {
				when: 'beforeChildren',
				straggerChildren: 0.1
			},
			marginBottom: 20,
			height: 'auto'
		},
		hidden: { marginBottom: 0, height: 0 }
	};
	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto',
			marginLeft: 7,
			marginBottom: 10,
		},
		hidden: { opacity: 0, height: 0 }
	};

	// eslint-disable-next-line
	const openSecondLevelByKey = (key: any, idx: number) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			dispatch(changeOpenState(idx));
		}
	};
	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => (
		<ul className="sidebar_second">
			{menu.map((m, idx) => (
				<li 
					tabIndex={0} 
					onKeyDown={(key) => openSecondLevelByKey(key, idx)}
					key={m._id.secondCategory} 
					style={{ overflow: 'hidden' }}
				>
					<button 
						className="sidebar_second_title"
						onClick={() => dispatch(changeOpenState(idx))}
						aria-expanded={m.isOpened}
					>
						{m._id.secondCategory}
					</button>
					<motion.ul
						layout
						variants={variants}
						initial={m.isOpened ? 'visible' : 'hidden'}
						animate={m.isOpened ? 'visible' : 'hidden'}
					>
						{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
					</motion.ul>
				</li>
			))}
		</ul>
	);

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => <>
		{pages.map(p => (
			<motion.li key={p._id} variants={variantsChildren}>
				<Link href={`/${route}/${p.alias}`}>
					<a
						onKeyDown={key => {if(key.code === 'Enter') router.push(`/${route}/${p.alias}`);}}
						tabIndex={isOpened ? 0 : -1}
						className={`/${route}/${p.alias}` == router.asPath ? "sidebar_third onPath" : "sidebar_third"}
					>
						{p.category}
					</a>
				</Link>
			</motion.li>
		))}
	</>;

	const buildFirstLevel = () => <>
		{FirstLevelMenu.map(m => (
			<nav key={m.route} className="sidebar_main">
				<Link href={`/${m.route}`}>
					<div className="sidebar_main_title">
						{m.icon}
						<span>{m.name}</span>
					</div>
				</Link>

				{m.id === firstCategory && buildSecondLevel(m)}
			</nav>
		))}
	</>;

	return (
		<section className="sidebar" role='navigation'>
			<Link href="http://localhost:3000/">
				<div className="sidebar_logo">
					<Logo />
				</div>
			</Link>

			<Search />
			{buildFirstLevel()}
		</section>
	);
};
