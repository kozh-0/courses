import Link from "next/link";
import { useRouter } from "next/router";
import { PageItem } from "../../interfaces/menuInterface";


export const ThirdLevelMenu = ({pages, route}: {pages: PageItem[], route: string}) => {
    // console.log(pages, route);
    
	const router = useRouter();
    return (
        <>
        {pages.map(p => (
            <Link key={p._id} href={`/${route}/${p.alias}`}>
                <a className={`/${route}/${p.alias}` == router.asPath ? "sidebar_third onPath" : "sidebar_third"}>
                    {p.category}
                </a>
            </Link>
        ))}
        </>
    );
};