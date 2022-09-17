import { RootState, useAppSelector } from "../store";


export const Sidebar = () => {

	const menu = useAppSelector((state: RootState) => state.menu.inner.list);

	console.log(menu);
	
	return (
		<section className="sidebar">
			<h1>Курсы</h1>
			<ul style={{paddingRight: '15px'}}>
				{menu && menu.map(el => <li key={el._id.secondCategory}>{el._id.secondCategory}</li>)}
			</ul>
		</section>
	);
};
