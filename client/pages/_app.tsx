import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import "antd/dist/antd.css";
import "../public/css/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
