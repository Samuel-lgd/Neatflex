import React from "react";
import styles from "./footer.module.css";
import logo from "../../neatflex.png";

function Footer() {
  return (
    <div className={styles.footer}>
      <img className={styles.img} src={logo} style={{ height: "40px" }}></img>
      <p>© Lagarde Samuel</p>
      <p className={styles.bullet}>•</p>
      <p>july 2022</p>
      <p className={styles.bullet}>•</p>
      <a href="https://www.themoviedb.org/" target="_blank">
        API
      </a>
    </div>
  );
}

export default Footer;
