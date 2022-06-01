import axios from "axios";
import React, { useState } from "react";
import InputBox from "../../components/InputBox/InputBox";
import styles from "./styles.module.scss"
export interface SignUpDataType {
  fullname: string;
  email: string;
  password: string | number;
}
function SignUp() {
  const [signUpData, setSignUpData] = useState<SignUpDataType>({
    fullname: "Roshan Kr. Mahato",
    email: "mahato@gmail.com",
    password: "123456",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {data} = await axios.post("http://localhost:8000/api/register",{...signUpData});
    console.log(data);
  };
  return (
    <section className={` ${styles.signup} screen-size prl-5`}>
      <h4 className={`${styles.heading} mb-4`}>Signup and start learning</h4>
      <form onSubmit={handleSignup}>
        <InputBox
          type="text"
          label="Full Name"
          name="fullname"
          onChange={handleInputChange}
          styleClass="mb-3"
          defaultStyling
          value={signUpData.fullname}
          minLength={2}
        />
        <InputBox
          type="email"
          label="Email"
          name="email"
          onChange={handleInputChange}
          styleClass="mb-3"
          defaultStyling
          value={signUpData.email}
        />
        <InputBox
          type="password"
          label="Password"
          name="password"
          autoComplete="password"
          onChange={handleInputChange}
          styleClass="mb-3"
          defaultStyling
          value={signUpData.password}
        />
        <button type="submit" className={`${styles.signupbtn} btn btn-block btn-primary pointer`}>
          Sign Up
        </button>
      </form>
    </section>
  );
}

export default SignUp;
