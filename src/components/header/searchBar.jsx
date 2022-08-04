import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { IoIosClose } from "react-icons/io";
import styles from "./header.module.css";
import SearchResults from "./searchResults";

function SearchBar(props) {
  const [val, setVal] = useState("");
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleChange(e) {
    setVal(e.target.value);
    if (val.length > 1) {
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&query=${val}&page=1&include_adult=false`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => {
          setResults(actualData.results);
        });
      results ? setShowResults(true) : setShowResults(false);
    } else {
      setShowResults(false);
    }
  }

  function handleFocus() {
    setFocused(true);
    props.handleFocus();
  }
  function handleBlur() {
    setFocused(false);
    setVal("");
    setShowResults(false);
    props.handleBlur();
  }

  function isEmpty() {
    if (val.length === 0) {
      return true;
    } else if (results) {
      if (results.length === 0) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.icon}>
          <ImSearch size={25} />
        </div>
        <input
          type="text"
          name="searchVal"
          className={
            focused
              ? `${styles.searchInput} ${styles.searchInputFocused}`
              : styles.searchInput
          }
          onChange={handleChange}
          value={val}
          onFocus={handleFocus}
          onBlur={isEmpty() ? handleBlur : null}
        />
        <div className={focused ? styles.closeIcon : styles.closeIconHidden}>
          <IoIosClose color="white" size={30} onClick={handleBlur} />
        </div>
      </div>
      {showResults ? (
        results.length === 0 ? (
          <div className={styles.results}>
            <div className={styles.noResults}>
              <p>No matches.</p>
            </div>
          </div>
        ) : (
          <div className={styles.results}>
            {results.slice(0, 12).map((film) => (
              <SearchResults film={film} close={handleBlur} />
            ))}
          </div>
        )
      ) : (
        <div className={`${styles.results} ${styles.resultsHidden}`}></div>
      )}
    </>
  );
}

export default SearchBar;
