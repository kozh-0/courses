import { sortProductsByRating, sortProductsByPrice } from '../Redux/ProductSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import SortIcon from './imgs/sort_icon.svg';

export default function Sort() {

    const status = useAppSelector((state: RootState) => state.products.status);
    const dispatch = useAppDispatch();

    return (
        <div className='sort'>
            <button className='btn' onClick={() => dispatch(sortProductsByRating())}>
                {status === 'rating' ? <>
                    <SortIcon />
                    <p style={{ color: '#7351f5' }}>По рейтингу</p>
                </> : <p style={{ color: 'black' }}>По рейтингу</p>}
            </button>
            <button className='btn' onClick={() => dispatch(sortProductsByPrice())}>
                {status === 'price' ? <>
                    <SortIcon />
                    <p style={{ color: '#7351f5' }}>По цене</p>
                </> : <p style={{ color: 'black' }}>По цене</p>}
            </button>
        </div>
    );
}