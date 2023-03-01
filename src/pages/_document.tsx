import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <body style={{ background: "#f5f8fa" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
