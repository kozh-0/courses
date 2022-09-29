import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { FirstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menuInterface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/pageInterface";
import { ProductModel } from "../../interfaces/productInterface";
import { Layout } from "../../layout/Layout";
const URL = process.env.NEXT_PUBLIC_DOMAIN;

export default function Course({ /*menu,  page, */ products }: CourseProps) {
    // console.log(menu.flatMap(el =>  el.pages.map(p => '/courses/' + p.alias)));
    
    return (
        <Layout>
            {products && products.length}
        </Layout>
    );
}




// собрали массив URL которые next пререндерит для SSR, после npm build
export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of FirstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(URL + '/api/top-page/find', {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(el => el.pages.map(p => `/${m.route}/${p.alias}`)));
    }
    // так как это на сервере обрабатывается, то будет в консоли, но не в браузере
    console.log(paths);
    
    return {
        paths,
        fallback: true
    };
};
// получили пропсы для страниц, которые обработались на сервере
export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) return { notFound: true };
    
    const firstCategoryItem = FirstLevelMenu.find(m => m.route === params.type);

    if (!firstCategoryItem) return { notFound: true };



    try {
        const { data: menu } = await axios.post<MenuItem[]>(URL + '/api/top-page/find', {
            firstCategory: firstCategoryItem.id
        });
        if (menu.length === 0) return { notFound: true };
    
        const { data: page } = await axios.get<TopPageModel>(URL + '/api/top-page/byAlias/' + params.alias);
    
        const { data: products } = await axios.post<ProductModel[]>(URL + '/api/product/find', {
            category: page.category,
            limit: 10
        });
    
        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products
            }
        };
        
    } catch (error) {
        return { notFound: true };
    }


};

interface CourseProps {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}