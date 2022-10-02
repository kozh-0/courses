import { FunctionComponent, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => <>
    <Header />
    <div className="main_wrapper container">
        <Sidebar />
        <main>
            {children}
        </main>
    </div>
    <Footer />
</>;


export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T) {
        return (
            <Layout>
                <Component {...props}/>
            </Layout>
        );
    };
};