import Document, { DocumentContext, DocumentInitialProps, Html, Main, NextScript, Head } from "next/document";


class MyDocumment extends Document{

    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
    
        return initialProps
    }

    render() {
        return(
            <Html>

                <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>

            </Html>
        )

    }
    
}

export default MyDocumment