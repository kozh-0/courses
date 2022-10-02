import React, { useEffect, useState, KeyboardEvent } from 'react';
import Star from './imgs/star.svg';


export const Rating = ({score}: {score: number}) => {


	const [ratingArr, setRatingArr] = useState<JSX.Element[]>(new Array(5).fill(<></>));
	const [stars, setStars] = useState(0);

	const construncRating = (currentRating: number) => {
		const updatedArray = ratingArr.map((_, i) => 
		<span key={i} className='star_parent'>
			<Star tabIndex={1}
				onKeyDown={(e: KeyboardEvent<SVGElement>) => (e.key === 'Enter') && setStars(i + 1)}
				onMouseEnter={() => construncRating(i + 1)}
				onMouseLeave={() => construncRating(stars)}
				onClick={() => setStars(i + 1)}
				className={(i < currentRating) ? 'filled' : ''}
			/>
		</span>
		);
		setRatingArr(updatedArray);
	};

	useEffect(() => {
		construncRating(stars);
		if (stars === 0) {
			setStars(Math.round(score));
		}
		//eslint-disable-next-line
	}, [stars]);

	return (
		<section style={{ display: 'flex'}}>
			{ratingArr.map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>)}
		</section>
	);
};
