import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import "antd/dist/antd.css";
import "../public/css/global.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
