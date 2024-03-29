import Image from "next/image";
import Arrow from './imgs/arrow.svg';
import { declOfNum, formatRuble, /* shorten */ } from "../helpers/helpers";
import { ProductModel } from "../interfaces/productInterface";
import { Rating } from "./Rating";
import ProductReview from "./ProductReview";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import ProductForm from "./ProductForm";
import { motion } from 'framer-motion';

// eslint-disable-next-line react/display-name
export const Product = motion(forwardRef(({ product }: { product: ProductModel }, ref: ForwardedRef<HTMLDivElement>) => {

    const [isOpened, setIsOpened] = useState(false);
    const reviewRef = useRef<HTMLSpanElement>(null);

    const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 }
    };

    const scrollToReview = () => {
        if (!product.reviews.length) return;
        setIsOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className="TopPageComponent_products_item" ref={ref} role='listitem'>
            <div className="TopPageComponent_products_item_head">

                <div className="TopPageComponent_products_item_head_title">
                    <div className="TopPageComponent_products_item_head_title_img">
                        <Image width={70} height={70}
                            src={product.image.startsWith('http') ? product.image : process.env.NEXT_PUBLIC_DOMAIN + product.image}
                            alt="img" layout="intrinsic" />
                    </div >
                    <div className="TopPageComponent_products_item_head_title_text">
                        {/* <h3>{shorten(product.title)}</h3> */}
                        <h3>{product.title}</h3>
                        <div>
                            {product.categories.map(el => <div key={el} className="tag_small ghost">{el}</div>)}
                        </div>
                    </div>
                </div>

                <div className="TopPageComponent_products_item_head_prices">
                    <div className="price_228">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3>{formatRuble(product.price)}</h3>
                            <div className="tag_small green">{formatRuble(product.price - product.oldPrice)}</div>
                        </div>
                        <p className="p_small">цена</p>
                    </div>

                    {!!product.credit && <div className="price_228">
                        <h3 style={{ lineHeight: '20px' }}>{formatRuble(product.credit)}<sub>/мес</sub></h3>
                        <p className="p_small">в кредит</p>
                    </div>}

                    <div className="price_228">
                        <Rating score={product.initialRating} />
                        <p style={{ marginTop: '8px' }}>
                            <a href="#ref" onClick={scrollToReview}>
                                {product.reviewCount}&nbsp;
                                {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])} |&nbsp;
                                {product.initialRating}
                            </a>
                        </p>
                    </div>

                </div>
            </div>

            <p className="p_medium">{product.description}</p>

            <div className="TopPageComponent_products_item_info">
                <div className="TopPageComponent_products_item_info_inner">
                    {product.characteristics.map(el => (
                        <div key={el.name} className="TopPageComponent_products_item_info_inner_about">
                            <p>{el.name}</p>
                            <div className="hor_splitter" />
                            <p>{el.value}</p>
                        </div>
                    ))}
                </div>

                <div className="TopPageComponent_products_item_advantages">
                    {product.advantages && <div className="TopPageComponent_products_item_advantages_plus">
                        <p>Преимущества</p>
                        <p>{product.advantages}</p>
                    </div>}
                    {product.disAdvantages && <div className="TopPageComponent_products_item_advantages_min">
                        <p>Недостатки</p>
                        <p>{product.disAdvantages}</p>
                    </div>}
                </div>
            </div>

            <div className="TopPageComponent_products_item_btns">
                <button className="btn_primary">
                    <a href={product.link} target="_blank" rel="noreferrer">Узнать подробнее</a>
                </button>
                {/* Если отзывов нет то не рисовать кнопку */}
                <button
                    className="btn_ghost"
                    onClick={() => setIsOpened(!isOpened)}
                    aria-expanded={isOpened}
                >{product.reviews.length ? 'Читать отзывы' : 'Оставить комментарий'} &nbsp; <Arrow /></button>
            </div>

            {!!product.reviews.length && <span ref={reviewRef}></span>}
            <motion.div
                style={{ overflow: 'hidden' }}
                animate={isOpened ? 'visible' : 'hidden'}
                variants={variants}
                initial='hidden'
            >
                {product.reviews.map(el => <ProductReview key={el._id} review={el} />)}
                <ProductForm productId={product._id} />
            </motion.div>
        </div>
    );
}));