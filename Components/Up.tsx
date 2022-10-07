import useScrollY from '../helpers/useScrollY';
import UpIcon from './imgs/up.svg';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function Up() {
    const controls = useAnimation();
    const y = useScrollY();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        controls.start({ opacity: y / document.body.scrollHeight });
    }, [y, controls]);

    return (
        <motion.button
            className="up"
            onClick={scrollToTop}
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <UpIcon />
        </motion.button>
    );
}