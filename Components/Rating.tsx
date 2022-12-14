import React, { useEffect, useState, KeyboardEvent } from 'react';
import Star from './imgs/star.svg';

interface IRating {
	score: number;
	isEditable?: boolean;
	setScore?: (score: number) => void;
	error?: string;
}

export const Rating = ({ score = 0, isEditable = false, setScore, error }: IRating) => {


	const [ratingArr, setRatingArr] = useState<JSX.Element[]>(new Array(5).fill(<></>));
	const [stars, setStars] = useState(0);

	const construncRating = (currentRating: number) => {
		const updatedArray = ratingArr.map((_, i) =>
			<span key={i} className='star_parent' style={isEditable ? {} : {cursor: 'auto'}}>
				<Star tabIndex={0}
					onKeyDown={(e: KeyboardEvent<SVGElement>) => (e.key === 'Enter' && isEditable) && setStars(i + 1)}
					onMouseEnter={() => isEditable && construncRating(i + 1)}
					onMouseLeave={() => isEditable && construncRating(stars)}
					onClick={() => clickHandler(i) }
					className={(i < currentRating) ? 'filled' : ''}
					role={isEditable ? 'slider' : ''}
					aria-invalid={error ? true : false}
					aria-label={isEditable ? 'Укажите рейтинг' : ('Текущий рейтинг' + stars)}
					aria-valuenow={stars}
					aria-valuemax={5}
					aria-valuemin={0}
				/>
			</span>
		);
		setRatingArr(updatedArray);
	};

	function clickHandler(i: number) {
		isEditable && setStars(i + 1);
		if (!setScore) return;
		setScore(i + 1);
	}

	useEffect(() => {
		construncRating(stars);
		if (stars === 0) setStars(Math.round(score));

		return () => {
			if (stars && score && setScore) setStars(0);
		};
		//eslint-disable-next-line
	}, [stars, score]);

	return (
		<section style={ !error ? { display: 'flex' } : {display: 'flex', stroke: '#FC836D'}}>
			{ratingArr.map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>)}
		</section>
	);
};
