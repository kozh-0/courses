import { useState } from "react";
import { DateToString, shorten } from "../helpers/helpers";
import { ReviewModel } from "../interfaces/productInterface";
import UserIcon from './imgs/userIcon.svg';
import { Rating } from "./Rating";

export default function ProductReview({ review }: { review: ReviewModel }) {
    const [isOpened, setIsOpened] = useState(false);
    const DATE = DateToString(new Date(review.createdAt));
    return (
        <div className="review">
            <div className="review_item">
                <div className="review_item_top">
                    <div className="review_item_top_title">
                        <UserIcon />
                        <p className="review_item_top_title_name">{review.name}:</p>
                        <p className="p_small" style={{ lineHeight: 'unset' }}>{review.title}</p>
                    </div>
                    <div>
                        <div className="review_item_top_time">
                            <p>{DATE.date}</p>
                            <p>{DATE.time}</p>
                        </div>
                        <Rating score={review.rating} />
                    </div>

                </div>
                <div>
                    {review.description.length < 300 ? (
                        <p>{review.description}</p>
                    ) : ( !isOpened ? <>
                        <p>{shorten(review.description)}
                            <span
                                style={{ fontWeight: '700', cursor: 'pointer' }}
                                onClick={() => setIsOpened(!isOpened)}
                            >Развернуть</span>
                        </p>
                    </> : <>
                        <p>{review.description}</p>
                        <div
                            style={{ fontWeight: '700', cursor: 'pointer' }}
                            onClick={() => setIsOpened(!isOpened)}
                        >Свернуть</div>
                    </>)}
                </div>

            </div>
        </div>
    );
}
