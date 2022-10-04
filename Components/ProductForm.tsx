import { Rating } from "./Rating";


export default function ProductForm({ productId }: { productId: string }) {

    return (
        <div className="review_form">
            {/* <h3>{productId}</h3> */}
            <div className="review_form_top">
                <div className="review_form_top_title">
                    <input placeholder="Имя" />
                    <input placeholder="Заголовок отзыва" />
                </div>
                <div className="review_form_top_rating">
                    <p>Оценка: </p> <Rating score={0} />
                </div>
            </div>

            <textarea placeholder="Текст отзыва" />

            <div className="review_form_send">
                <button className="btn_primary">Отправить</button>
                <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
            <div className="review_form_success green">
                <div>Ваш отзыв отправлен</div>
                <div style={{fontWeight: '500', marginTop:'5px'}}>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                <span>&#10006;</span>
            </div>
        </div>
    );
}
