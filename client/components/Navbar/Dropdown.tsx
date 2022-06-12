import React, { ReactNode } from "react";
import styles from "./navbar.module.scss";

function Dropdown({
  children,
  avatar,
}: {
  avatar: JSX.Element;
  children: JSX.Element;
}) {
  return (
    <div className={styles.dropdown}>
      <button className={`${styles.dropbtn} pointer`}>{avatar}</button>
      <div className={styles.dropdown__content_wrapper}>
        <div className={styles.dropdown__content}>
          {/* <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a> */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
