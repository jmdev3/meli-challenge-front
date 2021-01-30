import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * El proposito de customizar `Document`
 * es para que styled component (css-in-js)
 * pueda funcionar con SSR
 * https://styled-components.com/docs/advanced#server-side-rendering
 * https://nextjs.org/docs/advanced-features/custom-document#customizing-renderpage
 */
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    const sheet = new ServerStyleSheet();

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => (props) => {
          return sheet.collectStyles(<App {...props} />);
        },
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
}

export default MyDocument;
