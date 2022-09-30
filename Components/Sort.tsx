import { sortProductsByRating, sortProductsByPrice } from '../Redux/ProductSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import SortIcon from './imgs/sort_icon.svg';

export default function Sort() {

    const status = useAppSelector((state: RootState) => state.products.status);
    const dispatch = useAppDispatch();

    return (
        <div className='sort'>
            <div onClick={() => dispatch(sortProductsByRating())}>
                {status === 'rating' ? <>
                    <SortIcon />
                    <p style={{ color: '#7653FC' }}>По рейтингу</p>
                </> : <p style={{ color: 'black' }}>По рейтингу</p>}
            </div>
            <div onClick={() => dispatch(sortProductsByPrice())}>
                {status === 'price' ? <>
                    <SortIcon />
                    <p style={{ color: '#7653FC' }}>По цене</p>
                </> : <p style={{ color: 'black' }}>По цене</p>}
            </div>
        </div>
    );
}