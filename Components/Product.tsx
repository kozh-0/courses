import Image from "next/image";
import Arrow from './imgs/arrow.svg';
import { declOfNum, formatRuble } from "../helpers/helpers";
import { ProductModel } from "../interfaces/productInterface";
import { Rating } from "./Rating";


export const Product = ({ product }: { product: ProductModel }) => {

    return (
        <div className="TopPageComponent_products_item">
            <div className="TopPageComponent_products_item_head">

                <div className="TopPageComponent_products_item_head_title">
                    <div style={{ height: '70px' }}>
                        <Image width='70px' height='70px' src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt="img" />
                    </div>
                    <div style={{ marginLeft: '15px' }}>
                        <h3>{product.title}</h3>
                        <div>
                            {product.categories.map(el => <div key={el} className="tag_small ghost">{el}</div>)}
                        </div>
                    </div>
                </div>

                <div className="TopPageComponent_products_item_head_prices">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3>{formatRuble(product.price)}</h3>
                            <div className="tag_small green">{formatRuble(product.price - product.oldPrice)}</div>
                        </div>
                        <p className="p_small">цена</p>
                    </div>

                    <div>
                        <h3 style={{ lineHeight: '20px' }}>{formatRuble(product.credit)}<sub>/мес</sub></h3>
                        <p className="p_small">в кредит</p>
                    </div>

                    <div>
                        <Rating score={product.initialRating} />
                        <p style={{ marginTop: '8px' }}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</p>
                    </div>

                </div>
            </div>

            <p className="p_medium">{product.description}</p>

            <div className="TopPageComponent_products_item_info">
                <div className="TopPageComponent_products_item_info_inner">
                    {product.characteristics.map(el => (
                        <div key={el.name} className="TopPageComponent_products_item_info_inner_about">
                            <p>{el.name}</p>
                            <div className="hor_splitter"/>
                            <p>{el.value}</p>
                        </div>
                    ))}
                </div>

                <div className="TopPageComponent_products_item_advantages">
                    {product.advantages && <div className="TopPageComponent_products_item_advantages_plus">
                        <p style={{ marginBottom: '5px' }}>Преимущества</p>
                        <p>{product.advantages}</p>
                    </div>}
                    {product.disAdvantages && <div className="TopPageComponent_products_item_advantages_min">
                        <p style={{ marginBottom: '5px' }}>Недостатки</p>
                        <p>{product.disAdvantages}</p>
                    </div>}
                </div>
            </div>

            <div className="TopPageComponent_products_item_btns">
                <button className="btn_primary">
                    <a href={product.link} target="_blank" rel="noreferrer">Узнать подробнее</a>
                </button>
                <button className="btn_ghost">Читать отзывы &nbsp; <Arrow /></button>
            </div>


        </div>
    );
};