import up from './imgs/up.svg';
import close from './imgs/krest.svg';
import burger from './imgs/burger.svg';


const icons = {
    up,
    close,
    burger
};
type IconName = keyof typeof icons;

interface IButtonIcon {
    icon: IconName;
    color: 'primary' | 'white';
    onClick?: () => void;
}

export default function ButtonIcon({ icon, color }: IButtonIcon) {
    const IconComp = icons[icon];
    return (
        <button className={`icon_btn ${color}`}>
            <IconComp />
        </button>
    );
}