import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../neatflex.png";
import styles from "./header.module.css";
import SearchBar from "./searchBar";
import BurgerBtn from "./burgerBtn";
import SearchResults from "./searchResults";

function Header() {
  const [pageY, setPageY] = useState(0);

  //RESULTS
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [focused, setFocused] = useState(false);

  const [searchFocus, setSearchFocus] = useState(false);
  const [open, setOpen] = useState(true);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 600px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 600px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  //Permet de fermer le menu quand >600px et que le menu est ouvert
  useEffect(() => {
    if (matches) {
      setOpen(true);
    }
  }, [matches]);

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
    setOpen(true);
  }

  function onBlur() {
    setSearchFocus(false);
  }

  function handleOpen(bool) {
    setOpen(bool);
  }

  function onClick(open) {
    if (open === true) {
      setOpen(false);
    }
    if (open === false) {
      setOpen(true);
    }
  }

  function handleFocused(bool) {
    setFocused(bool);
  }

  function HandleSetShowRes(bool) {
    setShowResults(bool);
  }

  function handleRes(results) {
    setResults(results);
  }

  function handleBlur() {
    setSearchFocus(false);
    setShowResults(false);
    setFocused(false);
  }

  console.log(searchFocus);

  return (
    <>
      <div
        className={
          !open ? `${styles.content} ${styles.contentOpen}` : styles.content
        }
      >
        <div className={styles.row}>
          <Link
            style={{ textDecoration: "none" }}
            to="/Neatflex"
            onClick={() => setOpen(true)}
          >
            <img
              className={
                !matches && searchFocus ? styles.imgHidden : styles.img
              }
              src={logo}
            ></img>
          </Link>

          <Link
            style={{ textDecoration: "none" }}
            to="/Neatflex"
            onClick={() => setOpen(true)}
          >
            <p className={styles.link}>Home</p>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to="/genres"
            onClick={() => setOpen(true)}
          >
            <p className={styles.link}>Genres</p>
          </Link>
        </div>
        <div className={styles.row}>
          {matches ? (
            <SearchBar
              handleFocus={onFocus}
              handleBlur={onBlur}
              results={results}
              handleRes={handleRes}
              HandleSetShowRes={HandleSetShowRes}
              handleFocused={handleFocused}
              focused={focused}
            />
          ) : null}

          <p className={styles.loginBtn}>Connexion</p>
        </div>
        <div className={styles.burgerBtn}>
          <BurgerBtn
            visible={matches ? false : true}
            onClick={onClick}
            open={open}
            handleOpen={handleOpen}
          />
        </div>
        {!matches ? (
          <div className={styles.searchRight}>
            <SearchBar
              handleFocus={onFocus}
              handleBlur={onBlur}
              results={results}
              handleRes={handleRes}
              HandleSetShowRes={HandleSetShowRes}
              handleFocused={handleFocused}
              focused={focused}
            />
          </div>
        ) : null}
        <div
          className={
            pageY > 1 || searchFocus === true
              ? open
                ? styles.bgGradient
                : styles.bgGradientOpen
              : `${styles.bgGradient} ${styles.bgGradientHidden}`
          }
        ></div>
      </div>
      {results ? (
        results.length === 0 ? (
          <div className={showResults ? styles.results : styles.resultsHidden}>
            <div className={styles.noResults}>
              <p>No matches.</p>
            </div>
          </div>
        ) : (
          <div className={showResults ? styles.results : styles.resultsHidden}>
            {results.slice(0, 12).map((film) => (
              <SearchResults film={film} close={handleBlur} />
            ))}
          </div>
        )
      ) : null}
    </>
  );
}

export default Header;
