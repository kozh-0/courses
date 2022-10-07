import { useEffect, useState } from "react";


export default function useScrollY(): number {
    const isBrowser = typeof window !== 'undefined';

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = isBrowser ? window.scrollY : 0;
        setScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line
    }, []);
    return scrollY;
}
