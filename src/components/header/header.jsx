import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../neatflex.png";
import styles from "./header.module.css";
import SearchBar from "./searchBar";

function Header() {
  const [pageY, setPageY] = useState(0);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      setPageY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function onFocus() {
    setSearchFocus(true);
  }

  function onBlur() {
    setSearchFocus(false);
  }
  return (
    <>
      <div
        className={
          pageY > 1 || searchFocus === true
            ? styles.bgGradient
            : `${styles.bgGradient} ${styles.bgGradientHidden}`
        }
      ></div>
      <div className={styles.content}>
        <div className={styles.row}>
          <Link style={{ textDecoration: "none" }} to="/Neatflex">
            <img className={styles.img} src={logo}></img>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/Neatflex">
            <p className={styles.link}>Home</p>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/genres">
            <p className={styles.link}>Genres</p>
          </Link>
        </div>
        <div className={styles.row}>
          <SearchBar handleFocus={onFocus} handleBlur={onBlur} />
          <p className={styles.loginBtn}>Connexion</p>
        </div>
      </div>
    </>
  );
}

export default Header;
