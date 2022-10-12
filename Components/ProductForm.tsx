import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { API } from "../helpers/api";
import { Rating } from "./Rating";
import { motion } from 'framer-motion';
import { useAppDispatch } from "../store";
import { addReview } from "../Redux/ProductSlice";

interface IProductForm {
    name: string;
    title: string;
    description: string;
    rating: number;
}

export default function ProductForm({ productId }: { productId: string }) {
    // console.log(productId);

    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IProductForm>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string>();
    const dispatch = useAppDispatch();

    const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 }
    };

    const onSubmit = async (formData: IProductForm) => {
        try {
            dispatch(addReview({
                productId,
                review: {
                    ...formData,
                    _id: `${new Date}`,
                    createdAt: new Date().toISOString()
                }
            }));

            const { data } = await axios.post<{ message: string }>(API.review.createDemo, { ...formData, productId });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return (
        // Функция которая вызовется после сабмита
        <form className="review_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="review_form_top">
                <div className="review_form_top_title">
                    <section className="review_form_top_title_input">
                        <input
                            {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                            placeholder="Имя"
                            style={errors.name ? { border: '1px solid #FC836D' } : {}}
                            aria-invalid={errors.name ? true : false}
                        />
                        {errors.name && <span>{errors.name.message}</span>}
                    </section>
                    <section className="review_form_top_title_input">
                        <input
                            {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                            placeholder="Заголовок отзыва"
                            style={errors.title ? { border: '1px solid #FC836D' } : {}}
                            aria-invalid={errors.title ? true : false}
                        />
                        {errors.title && <span>{errors.title.message}</span>}
                    </section>
                </div>
                <div className="review_form_top_rating">
                    <p>Оценка: </p>
                    <Controller
                        control={control}
                        name='rating'
                        rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
                        render={({ field }) => (
                            <Rating
                                isEditable={true}
                                score={field.value}
                                setScore={field.onChange}
                                error={errors.rating?.message}
                            />
                        )}
                    />
                    {errors.rating && <span>{errors.rating.message}</span>}
                </div>
            </div>

            <div className="review_form_textarea">
                <textarea
                    {...register('description', { required: { value: true, message: 'Заполните описание' } })}
                    placeholder="Текст отзыва"
                    style={errors.description ? { border: '1px solid #FC836D' } : {}}
                    aria-label="Текст отзыва"
                    aria-invalid={errors.description ? true : false}
                />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            <div className="review_form_send">
                <button 
                className="btn_primary" 
                onClick={() => {
                    clearErrors();
                    setTimeout(() => {
                        setError(undefined);
                        setIsSuccess(false);
                    }, 5000);
                }}
                >Отправить</button>
                {/* <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span> */}
            </div>

            <motion.div
                style={{ overflow: 'hidden' }}
                animate={(isSuccess || error) ? 'visible' : 'hidden'}
                variants={variants}
                initial='hidden'
            >
                {isSuccess && <div className="review_form_success green" role='alert'>
                    <div>Спасибо !</div>
                    <div style={{ fontWeight: '500', marginTop: '5px' }}>
                        Ваш отзыв отправлен
                    </div>
                    <button 
                        onClick={() => setIsSuccess(false)}
                        aria-label='Закрыть оповещение'
                    >&#10006;</button>
                </div>}
                {error && <div className="review_form_success" style={{ background: '#FDB7B7'}} role='alert'>
                    <div style={{ fontWeight: '500'}}>Что-то пошло не так...</div>
                    <div style={{ marginTop: '5px' }}>
                        Попробуйте обновить страницу
                    </div>
                    <button
                        onClick={() => setError(undefined)}
                        style={{ color: 'black' }}
                        aria-label='Закрыть оповещение'
                    >&#10006;</button>
                </div>}
            </motion.div>
        </form>
    );
}
