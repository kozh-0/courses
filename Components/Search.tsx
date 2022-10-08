import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchSVG from './imgs/Search.svg';

export default function Search() {

    const [search, setSearch] = useState('');
    const router = useRouter();

    // перейти на путь /search и добавить query парраметры из инпута
    const goToSearch = () => {
        if (!search) return;
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
    };

    return (
        <div className='search' role='search'>
            <input 
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter') goToSearch();}}
            />
            <button 
                className='btn_primary'
                onClick={goToSearch}
                aria-label='Искать по сайту'
            >
                <SearchSVG/>
            </button>
        </div>
    );
}