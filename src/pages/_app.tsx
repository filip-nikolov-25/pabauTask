import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Head>
    <script
      src="https://kit.fontawesome.com/603ccb1d0d.js"
      async
      crossOrigin="anonymous"
    ></script>
  </Head>
  <Component {...pageProps} />
</>

}
