import { useEffect } from "react";
import Advantages from "../Components/Advantages";
import Card from "../Components/Card";
import { Product } from "../Components/Product";
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

    const productsRTK = useAppSelector((state: RootState) => state.products.list);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(addProducts(products));
    }, [dispatch, products]);
    
    // console.log(productsRTK);

    return (
        <div className="TopPageComponent">
            <div className="TopPageComponent_title">
                <div className="TopPageComponent_title_top">
                    <h1>{page.title}</h1>
                    <div className="tag_medium grey">{products.length}</div>
                </div>
                {products.length > 1 && <Sort />}
            </div>
            <div className="TopPageComponent_products">
                {productsRTK && productsRTK.map(el => <Product layout key={el._id} product={el} />)}     
            </div>

            {firstCategory == TopLevelCategory.Courses && <Card page={page} />}
            {<Advantages advantages={page.advantages} tags={page.tags} seoText={page.seoText} />}
        </div>
    );
};