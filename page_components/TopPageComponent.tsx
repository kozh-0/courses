import { useEffect } from "react";
import Advantages from "../Components/Advantages";
import Card from "../Components/Card";
import Sort from "../Components/Sort";
import { TopLevelCategory, TopPageModel } from "../interfaces/pageInterface";
import { ProductModel } from "../interfaces/productInterface";
import { addProducts } from "../Redux/ProductSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store";


interface TopPageComponentProps {
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {

    const prod = useAppSelector((state: RootState) => state.products.list);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(addProducts(products));
    }, [dispatch, products]);
    
    console.log(prod);

    return (
        <div className="TopPageComponent">
            <div className="TopPageComponent_title">
                <div>
                    <h1>{page.title}</h1>
                    <div className="tag_medium grey">{products.length}</div>
                </div>
                <Sort />
            </div>
            <div>
                {prod && prod.map(el => (
                    <div key={el._id}>{el.title}; {el.price} руб | {el.initialRating}</div>
                ))}
            </div>

            <div style={{marginTop: '20px'}}>
                <input style={{marginBottom: '20px'}} type="text" placeholder="Text"/><br/>
                <textarea placeholder="Text area"></textarea>
            </div>

            {firstCategory == TopLevelCategory.Courses && <Card page={page} />}
            {<Advantages advantages={page.advantages} tags={page.tags} seoText={page.seoText} />}
        </div>
    );
};