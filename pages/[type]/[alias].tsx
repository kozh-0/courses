import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { API } from "../../helpers/api";
import { FirstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menuInterface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/pageInterface";
import { ProductModel } from "../../interfaces/productInterface";
import { withLayout } from "../../layout/Layout";
import { TopPageComponent } from "../../page_components";
import { addMenu } from "../../Redux/MenuSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import Error404 from '../404';
import Head from "next/head";

function TopPage({ firstCategory, page, products, menu }: TopPageProps) {

    const menuRedux = useAppSelector((state: RootState) => state.menu.inner.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!menuRedux) {
            dispatch(addMenu({
                firstCategory,
                list: menu
            }));
        }
    }, [dispatch, firstCategory, menu, menuRedux]);

    if (!page || !products) {
        return <Error404 />;
    }
    // сделали проверку если нет данных, то и не будем генерить странцу
    return <>
        <Head>
            <title>{page.metaTitle}</title>
            <meta name="description" content={page.metaDescription} />
            <meta property="og:title" content={page.metaTitle} />
            <meta property="og:description" content={page.metaDescription} />
            <meta property="og:type" content="article" />
        </Head>
        <TopPageComponent
            firstCategory={firstCategory}
            page={page}
            products={products}
        />
    </>;
}
export default withLayout(TopPage);




// собрали массив URL которые next пререндерит для SSR, после npm build
export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of FirstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
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
export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) return { notFound: true };

    const firstCategoryItem = FirstLevelMenu.find(m => m.route === params.type);

    if (!firstCategoryItem) return { notFound: true };



    try {
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: firstCategoryItem.id
        });
        if (menu.length === 0) return { notFound: true };

        const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);

        const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
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

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}