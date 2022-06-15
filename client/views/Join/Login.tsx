import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContent, ToastOptions } from "react-toastify";
import InputBox from "../../components/InputBox/InputBox";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useCustomGlobalContext } from "../../context/GlobalContext";
import { useRouter } from "next/router";
import { url } from "inspector";
import { isAuthorised } from "../../utils/global";
import usePrivateRoute from "../../hooks/usePrivateRoute";
export interface loginDataType {
  email: string;
  password: string | number;
}
function Login() {
  usePrivateRoute();
  const { dispatch } = useCustomGlobalContext();
  const [loginData, setLoginData] = useState<loginDataType>({
    email: "mahato@gmail.com",
    password: "123456",
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.count("login");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/login", { ...loginData });
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save user info in localstorage
      localStorage.setItem("user", JSON.stringify(data));

      // redirect
      const redirect = router.query?.next ? String(router.query.next) : "/";
      router.push(redirect);

      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${styles.login} screen-size prl-5`}>
      <h4 className={`${styles.heading} mb-4`}>Log In to Your Account!</h4>
      <form onSubmit={handleLogin}>
        <InputBox
          type="email"
          label="Email"
          name="email"
          onChange={handleInputChange}
          styleClass="mb-3"
          defaultStyling
          value={loginData.email}
          required
        />
        <InputBox
          type="password"
          label="Password"
          name="password"
          autoComplete="password"
          onChange={handleInputChange}
          styleClass="mb-3"
          required
          defaultStyling
          value={loginData.password}
        />
        <button
          type="submit"
          className={`${styles.loginbtn} btn btn-block btn-primary pointer`}
          disabled={!loginData.email || !loginData.password || loading}
        >
          {loading ? <SyncOutlined spin /> : "Login"}
        </button>
      </form>
      <p className="text-center m4">
        Don't have an account?{" "}
        <Link href="/join/signup">
          <a className={styles.login__signup}>Sign up</a>
        </Link>
      </p>
    </section>
  );
}

export default Login;
