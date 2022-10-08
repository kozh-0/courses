import useScrollY from '../helpers/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import ButtonIcon from './ButtonIcon';

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
        <motion.div
            className="up"
            onClick={scrollToTop}
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <ButtonIcon color='primary' icon='up' aria-label='Наверх' onClick={scrollToTop} />
        </motion.div>
    );
}