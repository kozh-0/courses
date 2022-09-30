import Advantages from "../Components/Advantages";
import Card from "../Components/Card";
import { TopLevelCategory, TopPageModel } from "../interfaces/pageInterface";
import { ProductModel } from "../interfaces/productInterface";


interface TopPageComponentProps {
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
    console.log(page);

    return (
        <div className="TopPageComponent">
            <div className="TopPageComponent_title">
                <div>
                    <h1>{page.title}</h1>
                    <div className="tag_medium grey">{products.length}</div>
                </div>
                <span>Сортировка</span>
            </div>
            <div>
                {products && products.map(el => (
                    <div key={el._id}>{el.title}</div>
                ))}
            </div>

            {firstCategory == TopLevelCategory.Courses && <Card page={page} />}
            <Advantages advantages={page.advantages} tags={page.tags} seoText={page.seoText} />
        </div>
    );
};