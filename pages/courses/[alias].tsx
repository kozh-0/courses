import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { MenuItem } from "../../interfaces/menuInterface";
import { TopPageModel } from "../../interfaces/pageInterface";
import { ProductModel } from "../../interfaces/productInterface";
const URL = process.env.NEXT_PUBLIC_DOMAIN;
const firstCategory = 0;

export default function Course(/* props: any */{ menu, page, products }: CourseProps) {
    // console.log(props);
    console.log(menu.flatMap(el =>  el.pages.map(p => '/courses/' + p.alias)));
    
    return (
        <>
            {products && products.length}
        </>
    );
}




// собрали массив URL которые next пререндерит для SSR, после npm build
export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<MenuItem[]>(URL + '/api/top-page/find', {
        firstCategory
    });
    return {
        paths: menu.flatMap(el => el.pages.map(p => '/courses/' + p.alias)),
        fallback: true
    };
};
// получили пропсы для страниц, которые обработались на сервере
export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return { notFound: true };
    }
    
    console.log(params);

    const { data: menu } = await axios.post<MenuItem[]>(URL + '/api/top-page/find', {
        firstCategory
    });

    const { data: page } = await axios.get<TopPageModel>(URL + '/api/top-page/byAlias/' + params.alias);

    const { data: products } = await axios.post<ProductModel[]>(URL + '/api/product/find', {
        category: page.category,
        limit: 10
    });

    return {
        props: {
            menu,
            firstCategory,
            page,
            products
        }
    };
};

interface CourseProps {
    menu: MenuItem[];
    firstCategory: number;
    page: TopPageModel;
    products: ProductModel[];
}