import { Controller, useForm } from "react-hook-form";
import { Rating } from "./Rating";

interface IProductForm {
    name: string;
    title: string;
    description: string;
    rating: number;
}

export default function ProductForm({ productId }: { productId: string }) {

    const { register, control, handleSubmit } = useForm<IProductForm>();

    const onSubmit = (data: IProductForm) => {
        console.log(data);
    };

    return (
        // Функция которая вызовется после сабмита
        <form className="review_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="review_form_top">
                <div className="review_form_top_title">
                    <input {...register('name')} placeholder="Имя" />
                    <input {...register('title')} placeholder="Заголовок отзыва" />
                </div>
                <div className="review_form_top_rating">
                    <p>Оценка: </p>
                    <Controller
                        control={control}
                        name='rating'
                        render={({ field }) => (
                            <Rating isEditable={true} score={field.value} />
                        )}
                    />
                </div>
            </div>

            <textarea {...register('description')} placeholder="Текст отзыва" />

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
