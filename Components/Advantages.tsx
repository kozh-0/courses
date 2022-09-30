import Check from './imgs/check.svg';


interface AdvantagesItem {
    description: string;
    title: string;
    _id: string;
}
interface AdvantagesInterface {
    advantages: AdvantagesItem[];
    tags: string[];
    seoText: string;
}

export default function Advantages({ advantages, tags, seoText }: AdvantagesInterface) {


    return (
        <div className='TopPageComponent_advantages'>
            <h2>Преимущества</h2>

            {advantages.map(el => (
                <div key={el._id} className='TopPageComponent_advantages_item'>
                    <div className='TopPageComponent_advantages_item_icons'>
                        <Check />
                        <div className='splitter' />
                    </div>
                    <div className='TopPageComponent_advantages_item_descr'>
                        <h3>{el.title}</h3>
                        <p className='p_big'>{el.description}</p>
                    </div>
                </div>
            ))}

            { seoText && <div dangerouslySetInnerHTML={{__html: seoText}} />}

            <h2>Получаемые навыки</h2>
            <div className='TopPageComponent_advantages_skills'>
                {tags.map(el => <div key={el} className='tag_small primary'>{el}</div>)}
            </div>
        </div>
    );
}