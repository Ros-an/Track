import React from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import { useCustomGlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Avatar, Menu } from "antd";
import { firstLetterOfString, splitStr } from "../../utils/global";
import { SettingOutlined, AppstoreOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";

function Navbar() {
  const { state, dispatch } = useCustomGlobalContext();
  const { user } = state;
  const router = useRouter();
  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast.success(data.message);
    router.push("/join/login");
  };
  return (
    <nav className={`${styles.navbar} justalign-bw`}>
      <section className={`${styles.navbar__left} justalign-center`}>
        <Link href="/">
          <h3 className="pointer">Track</h3>
        </Link>
      </section>
      <section className={`${styles.navbar__right}`}>
        <ul className="justalign-bw">
          {user === null && (
            <>
              <Link href="/join/login">
                <li className={`${styles.login} pointer`}>Login</li>
              </Link>
              <Link href="/join/signup">
                <li className={`${styles.signup} pointer`}>Sign up</li>
              </Link>
            </>
          )}
          {user && (
            <Dropdown
              avatar={
                <Avatar size={40} style={{ background: "#1c1d1f" }}>
                  {`${firstLetterOfString(
                    splitStr(user.name, " ")[0]
                  )}${firstLetterOfString(splitStr(user.name, " ")[1])}`}
                </Avatar>
              }
            >
              <li className="pointer" onClick={handleLogout}>
                Logout
              </li>
            </Dropdown>
          )}
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;
