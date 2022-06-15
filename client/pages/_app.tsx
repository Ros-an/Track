import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import "antd/dist/antd.css";
import "../public/css/global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalContextProvider from "../context/GlobalContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log("myapp", router);
  // useEffect(() => {
  //   if (router.pathname === "/join/signup" && !localStorage.getItem("user")) {
  //     router.replace(`/join/login?next=${router.pathname}`);
  //   }
  // }, [router.pathname]);

  return (
    <GlobalContextProvider>
      <ToastContainer position="top-center" autoClose={1500} />
      <Navbar />
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
