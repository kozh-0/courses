import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAppSelector } from '../store';
import SearchSVG from './imgs/Search.svg';

export default function Search() {
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');
    const router = useRouter();
    const autocomplete = useAppSelector(state => state.menu.autocomplete);

    // перейти на путь /search и добавить query парраметры из инпута
    const goToSearch = () => {
        if (!search) return;

        const userQuery = autocomplete.find(el => el.category.toLowerCase().trim() == search.toLowerCase().trim());

        if (userQuery) {
            router.push({ pathname: `/courses/${userQuery.alias}` });
        } else {
            router.push({
                pathname: '/search',
                query: {
                    q: search
                }
            });
        }
    };

    return <div className='search' role='search' onMouseEnter={() => setIsFocused(true)} onMouseLeave={() => setIsFocused(false)}>
        <div className='search_input' >
            <input
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') goToSearch(); }}
            />
            <span 
                onClick={() => setSearch('')} 
                tabIndex={0}
                onKeyDown={(e) => {if (e.key === 'Enter') setSearch('');}}
            >&#10006;</span>
            <button
                className='btn_primary'
                onClick={goToSearch}
                aria-label='Искать по сайту'
            >
                <SearchSVG />
            </button>
        </div>

        {search && isFocused && <ul className='search_autocomplete'>
            {autocomplete.map(el => {
                if (el.category.toLowerCase().includes(search.toLowerCase())) {
                    return (
                        <li
                            key={el._id}
                            className='search_autocomplete_item'
                            onClick={() => setSearch(el.category)}
                        >
                            <Link href={`/courses/${el.alias}`} tabIndex={0}>
                                {el.category}
                            </Link>
                        </li>
                    );
                }
            })}
        </ul>}

    </div>;
}