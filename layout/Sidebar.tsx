import { RootState, useAppDispatch, useAppSelector } from "../store";
import { changeOpenState } from '../Redux/MenuSlice';
import Link from "next/link";
import { useRouter } from "next/router";
import { FirstLevelMenuItem, PageItem } from "../interfaces/menuInterface";
import { FirstLevelMenu } from "../helpers/helpers";
import Logo from './logo.svg';
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Search from "../Components/Search";
import { motion } from 'framer-motion';

interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const Sidebar = ({ ...props }: SidebarProps) => {
	const menu = useAppSelector((state: RootState) => state.menu.inner.list);
	const firstCategory = useAppSelector((state: RootState) => state.menu.inner.firstCategory);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const variants = {
		visible: {
			transition: {
				when: 'beforeChildren',
				straggerChildren: 1
			},
			marginBottom: 20,
		},
		hidden: { marginBottom: 0 }
	};
	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto'
			// height: 29
		},
		hidden: { opacity: 0, height: 0 }
	};

	// console.log(menu);

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => (
		<div className="sidebar_second" {...props}>
			{menu.map((m, idx) => (
				<div key={m._id.secondCategory} style={{overflow: 'hidden'}}>
					<div className="sidebar_second_title"
						onClick={() => dispatch(changeOpenState(idx))}>
						{m._id.secondCategory}
					</div>
					<motion.div
						layout
						variants={variants}
						initial={m.isOpened ? 'visible' : 'hidden'}
						animate={m.isOpened ? 'visible' : 'hidden'}
					// className={m.isOpened ? 'active' : 'disable'}
					>
						{buildThirdLevel(m.pages, menuItem.route)}
					</motion.div>
				</div>
			))}
		</div>
	);

	const buildThirdLevel = (pages: PageItem[], route: string) => <>
		{pages.map(p => (
			<motion.div key={p._id} variants={variantsChildren}>
				<Link href={`/${route}/${p.alias}`}>
					<a className={`/${route}/${p.alias}` == router.asPath ? "sidebar_third onPath" : "sidebar_third"}>
						{p.category}
					</a>
				</Link>
			</motion.div>
		))}
	</>;

	const buildFirstLevel = () => <>
		{FirstLevelMenu.map(m => (
			<div key={m.route} className="sidebar_main">
				<Link href={`/${m.route}`}>
					<div className="sidebar_main_title">
						{m.icon}
						<span>{m.name}</span>
					</div>
				</Link>

				{m.id === firstCategory && buildSecondLevel(m)}
			</div>
		))}
	</>;

	return (
		<section className="sidebar">
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
