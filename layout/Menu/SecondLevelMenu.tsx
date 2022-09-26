import { useRouter } from "next/router";
import { useState } from "react";
import { FirstLevelMenuItem } from "../../interfaces/menuInterface";
import { RootState, useAppSelector } from "../../store";
import { ThirdLevelMenu } from "./ThirdLevelMenu";


export const SecondLevelMenu = ({ menuItem }: { menuItem: FirstLevelMenuItem }) => {

	const menu = useAppSelector((state: RootState) => state.menu.inner.list);
	const router = useRouter();
	const [isActive, setIsActive] = useState(false);

	// function levelToggler() {}

	return (
		<div className="sidebar_second">
			{menu && menu.map(m => (
				<div key={m._id.secondCategory}>
					<div
						className="sidebar_second_title"
						onClick={() => setIsActive(!isActive)}
					>{m._id.secondCategory}</div>

					<div className={isActive ? "active" : "disable"}>
						<ThirdLevelMenu pages={m.pages} route={menuItem.route} />
					</div>
					{/* <div className={isActive ? 'active' : 'disable'}>
							{buildThirdLevel(m.pages, menuItem.route)}
						</div> */}
				</div>
			))}
		</div>
	);
};


// if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
// 	m.isOpened = true;
// }