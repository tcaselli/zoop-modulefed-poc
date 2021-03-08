import Document, { Html, Head, Main, NextScript } from "next/document";
const sharePatch = require("@module-federation/nextjs-mf/patchSharing");

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <script crossorigin src='http://localhost:1901/remoteEntry.js' />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
