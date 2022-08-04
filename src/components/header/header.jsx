import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import logo from "../../neatflex.png";

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
          <Link style={{ textDecoration: "none" }} to="/">
            <img className={styles.img} src={logo}></img>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/">
            <p className={styles.link}>Home</p>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/genres">
            <p className={styles.link}>Genres</p>
          </Link>
        </div>
        <div className={styles.row}>
          <SearchBar handleFocus={onFocus} handleBlur={onBlur} />
          <p>Connexion</p>
        </div>
      </div>
    </>
  );
}

export default Header;
