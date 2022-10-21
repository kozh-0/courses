import ButtonIcon from '../Components/ButtonIcon';
import Logo from './logo.svg';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Header = () => {

	const [isOpened, setIsOpened] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsOpened(false);
	}, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: 0,
			x: '100%',
		}
	};


	return (
		<header>
			<div className='header_top'>
				<Link href='/'>
					<div style={{ cursor: 'pointer' }}>
						<Logo />
					</div>
				</Link>
				<div onClick={() => setIsOpened(true)}>
					<ButtonIcon color='white' icon='burger' />
				</div>
			</div>
			<motion.div
				className='mobileMenu'
				variants={variants}
				initial='closed'
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar />
				<div onClick={() => setIsOpened(false)}>
					<ButtonIcon color='white' icon='close' />
				</div>
			</motion.div>
		</header>
	);
};
