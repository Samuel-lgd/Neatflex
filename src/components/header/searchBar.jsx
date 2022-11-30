import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { IoIosClose } from "react-icons/io";
import styles from "./header.module.css";

function SearchBar(props) {
  const [val, setVal] = useState("");
  // const [props.focused, props.handleFocused] = useState(false);

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
          props.handleRes(actualData.results);
        });
      props.results
        ? props.HandleSetShowRes(true)
        : props.HandleSetShowRes(false);
    } else {
      props.HandleSetShowRes(false);
    }
  }

  function handleFocus() {
    props.handleFocused(true);
    props.handleFocus();
  }
  function handleBlur() {
    props.handleFocused(false);
    setVal("");
    props.HandleSetShowRes(false);
    props.handleBlur();
  }

  function isEmpty() {
    if (val.length === 0) {
      return true;
    } else if (props.results) {
      if (props.results.length === 0) {
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
            props.focused
              ? `${styles.searchInput} ${styles.searchInputFocused}`
              : styles.searchInput
          }
          onChange={handleChange}
          value={val}
          onFocus={handleFocus}
          onBlur={isEmpty() ? handleBlur : null}
        />
        <div
          className={props.focused ? styles.closeIcon : styles.closeIconHidden}
        >
          <IoIosClose color="white" size={30} onClick={handleBlur} />
        </div>
      </div>
    </>
  );
}

export default SearchBar;
