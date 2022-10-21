import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { API } from "../../helpers/api";
import { FirstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menuInterface";
import { Layout } from "../../layout/Layout";
import { addMenu } from "../../Redux/MenuSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../store";


export default function Type(props: HomeProps) {

    const menuRedux = useAppSelector((state: RootState) => state.menu.inner.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!menuRedux) {
            dispatch(addMenu(props));
        }
    }, [dispatch, menuRedux, props]);

    return <Layout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '10px' }}>Тут пока ничего нет ¯\_(ツ)_/¯</h1>
            <Image
                width={280}
                height={150}
                src="/nothing.gif"
                alt="gif"
            />
            <h2 style={{ maxWidth: '500px', marginTop: '10px' }}>Но вы можете поискать курсы в соответствующей вкладке</h2>
        </div>
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

    const { data: list } = await axios.post<MenuItem[]>(API.topPage.find, {
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