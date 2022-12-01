import React from "react";
import styles from "./footer.module.css";
import logo from "../../neatflex.png";

function Footer() {
  return (
    <div className={styles.footer}>
      <img className={styles.img} src={logo} style={{ height: "40px" }}></img>
      <p>© Lagarde Samuel</p>
      <p className={styles.bullet}>•</p>
      <p>December 2022</p>
      <p className={styles.bullet}>•</p>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        style={{ color: "#fff" }}
      >
        <p>API</p>
      </a>
      <p className={styles.bullet}>•</p>
      <a href="mailto:lagarde.samuel@gmail.com" style={{ color: "#fff" }}>
        <p>Contact</p>
      </a>
    </div>
  );
}

export default Footer;
