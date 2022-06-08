import axios from "axios";
import React, { useState } from "react";
import { ToastContent, ToastOptions } from "react-toastify";
import InputBox from "../../components/InputBox/InputBox";
import styles from "./styles.module.scss"
import {  toast } from 'react-toastify';
import { SyncOutlined } from "@ant-design/icons";
export interface SignUpDataType {
  name: string;
  email: string;
  password: string | number;
}
function SignUp() {
  const [signUpData, setSignUpData] = useState<SignUpDataType>({
    name: "Roshan Kr. Mahato",
    email: "mahato@gmail.com",
    password: "123456",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const {data} = await axios.post("/api/register",{...signUpData});
      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.response.data)
    } finally{
      setLoading(false);
    }
  };
  
  return (
    <section className={` ${styles.signup} screen-size prl-5`}>
      <h4 className={`${styles.heading} mb-4`}>Signup and start learning</h4>
      <form onSubmit={handleSignup}>
        <InputBox
          type="text"
          label="Full Name"
          name="name"
          onChange={handleInputChange}
          styleClass="mb-3"
          defaultStyling
          value={signUpData.name}
          minLength={2}
          required
        />
        <InputBox
          type="email"
          label="Email"
          name="email"
          onChange={handleInputChange}
          styleClass="mb-3"
          defaultStyling
          value={signUpData.email}
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
          value={signUpData.password}
        />
        <button type="submit" className={`${styles.signupbtn} btn btn-block btn-primary pointer`}
        disabled={!signUpData.name || !signUpData.email || !signUpData.password || loading}
        >
          {loading ? <SyncOutlined spin /> :"Sign Up"}
        </button>
      </form>
    </section>
  );
}

export default SignUp;
