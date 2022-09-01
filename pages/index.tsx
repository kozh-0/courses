import { useState } from "react";
// import { Index } from "../Components";
import Arrow from '../Components/imgs/arrow.svg';
import { Rating } from "../Components/Rating";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Sidebar } from "../layout/Sidebar";
// import { Layout } from "../layout/Layout";

export default function Home() {
	const [counter, setCounter] = useState(0);
	return (
		<>
			<Header />
			<Sidebar />
			<main>
				<h1>{counter}</h1>
				<button
					className="btn"
					onClick={() => setCounter(counter + 1)}
				>btn</button>
				<button className="btn_primary">btn_primary</button>
				<button className="btn_ghost">
					btn_ghost &nbsp;<Arrow />
				</button>

				<Rating />

				<p className='p_small'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.</p>

				<div className='tag_small ghost'>hh.ru</div>
				<div className='tag_medium red'>hh.ru</div>
				<div className='tag_small grey'>hh.ru</div>
				<div className='tag_medium green'>hh.ru</div>
				<div className='tag_small primary'>hh.ru</div>

			</main>
			<Footer />

		</>
	);
}
