import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { FirstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menuInterface";
import { Layout } from "../../layout/Layout";


export default function Type({firstCategory}: HomeProps) {

    return <Layout>
        <h1>Type: {firstCategory}</h1>
    </Layout>;
}

// ЭТО SERVER SIDE RENDERING
// Фишка получения данных таким образом в том, что приходящий html в network не пустой <div id='root'></div>, а полноценно заполненный html, что дает робам знать что страница хорошая для SEO
// По-простому, это функция которая работает только на страницах папка pages, и возвращает в файл страницы пропсы по запросу

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: FirstLevelMenu.map(m => `/${m.route}`),
    fallback: true
});


export const getStaticProps: GetStaticProps<HomeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) return { notFound: true };
    const firstCategoryItem = FirstLevelMenu.find(m => m.route === params.type);

    if (!firstCategoryItem) return { notFound: true };

    const { data: list } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { 
        firstCategory: firstCategoryItem.id
    });

    return {
        props: {
            list,
            firstCategory: firstCategoryItem.id
        }
    };
};

export interface HomeProps {
    list: MenuItem[];
    firstCategory: number
}