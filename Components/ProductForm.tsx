import { Controller, useForm } from "react-hook-form";
import { Rating } from "./Rating";

interface IProductForm {
    name: string;
    title: string;
    description: string;
    rating: number;
}

export default function ProductForm({ productId }: { productId: string }) {

    const { register, control, handleSubmit, formState: { errors } } = useForm<IProductForm>();
    console.log(errors);

    const onSubmit = (data: IProductForm) => {
        console.log(data);
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
                        />
                        {errors.name && <span>{errors.name.message}</span>}
                    </section>
                    <section className="review_form_top_title_input">
                        <input
                            {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                            placeholder="Заголовок отзыва"
                            style={errors.title ? { border: '1px solid #FC836D' } : {}}
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
                />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            <div className="review_form_send">
                <button className="btn_primary">Отправить</button>
                <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
            <div className="review_form_success green">
                <div>Ваш отзыв отправлен</div>
                <div style={{ fontWeight: '500', marginTop: '5px' }}>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                <span>&#10006;</span>
            </div>
        </form>
    );
}
