// svg ипортится так с помощю @svgr/webpack
import Arrow from './imgs/arrow.svg';

export const Index = () => {
    return <>
        <button className="btn">btn</button>
        <button className="btn_primary">btn_primary</button>
        <button className="btn_ghost">
            btn_ghost &nbsp;<Arrow />
        </button>
        <p className='p_small'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

        <div className='tag_small ghost'>hh.ru</div>
        <div className='tag_medium red'>hh.ru</div>
        <div className='tag_small grey'>hh.ru</div>
        <div className='tag_medium green'>hh.ru</div>
        <div className='tag_small primary'>hh.ru</div>
    </>;
};
