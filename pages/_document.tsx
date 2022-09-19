import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

// Это стандартное применени документа из документации NEXT, но ахуеть можно
export default class MyDocument extends Document {
// получает пропсы из оснвного документа и возвращает в этот
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render(): JSX.Element {
        return (
            <Html lang='ru'>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <Main />
                    
                    <NextScript />
                </body>
            </Html>
        );
    }
}