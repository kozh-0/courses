import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { changeOpenState } from '../../Redux/MenuSlice';

import Link from "next/link";
import { useRouter } from "next/router";

import { FirstLevelMenuItem, PageItem } from "../../interfaces/menuInterface";
import { FirstLevelMenu } from "../../helpers/helpers";

import Logo from '../logo.svg';


export const Sidebar = () => {
	const menu = useAppSelector((state: RootState) => state.menu.inner.list);
	const firstCategory = useAppSelector((state: RootState) => state.menu.inner.firstCategory);
	const dispatch = useAppDispatch();
	const router = useRouter();

	// console.log(menu);

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => (
		<div className="sidebar_second">
			{menu.map((m, idx) => (
				<div key={m._id.secondCategory}>
					<div className="sidebar_second_title"
						onClick={() => dispatch(changeOpenState(idx))}>
						{m._id.secondCategory}
					</div>
					<div className={m.isOpened ? 'active' : 'disable'}>
						{buildThirdLevel(m.pages, menuItem.route)}
					</div>
				</div>
			))}
		</div>
	);

	const buildThirdLevel = (pages: PageItem[], route: string) => <>
		{pages.map(p => (
			<Link key={p._id} href={`/${route}/${p.alias}`}>
				<a className={`/${route}/${p.alias}` == router.asPath ? "sidebar_third onPath" : "sidebar_third"}>
					{p.category}
				</a>
			</Link>
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
			<Logo/>
			<h1>
				<Link href="http://localhost:3000/">Sidebar</Link>
			</h1>
			{buildFirstLevel()}
		</section>
	);
};
