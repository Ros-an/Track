import React from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
function Navbar() {
  return (
    <nav className={`${styles.navbar} justalign-bw`}>
      <section className={styles.navbar__left}>
        <Link href="/">
          <h3 className="pointer">Track</h3>
        </Link>
      </section>
      <section className={`${styles.navbar__right}`}>
        <ul className="justalign-bw">
          <Link href="/join/login">
            <li className="pointer">Login</li>
          </Link>
          <Link href="/join/signup">
            <li className="pointer">Sign up</li>
          </Link>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;
