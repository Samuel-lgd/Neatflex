import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { MdAdd, MdOutlineDone } from "react-icons/md";
import AddListBtn from "./addListBtn";
import { BiRightArrowAlt } from "react-icons/bi";
import { isDataAdded, addFilm } from "../scripts/addToLocalstorageScript";

function SearchResults(props) {
  const [added, setAdded] = useState(isDataAdded(props.film.id, "USER_LIST"));

  return (
    <>
      {props.film.name.length >= 1 && props.film.vote_average > 0 ? (
        <div className={styles.resultCard}>
          <img
            className={styles.searchImg}
            height={125}
            src={`https://image.tmdb.org/t/p/w200/${props.film.poster_path}`}
          ></img>
          <div className={styles.searchInfos}>
            <h3>{props.film.name}</h3>
            <div className={styles.spaceBetween}>
              {props.film.first_air_date ? (
                <p>{props.film.first_air_date.slice(0, 4)}</p>
              ) : null}

              <p className={styles.rating}>
                Score: {props.film.vote_average * 10}
              </p>
            </div>
            <div className={styles.spaceBetween}>
              <div
                className={styles.searchButton}
                onClick={() =>
                  setAdded(addFilm(added, props.film.id, "USER_LIST"))
                }
              >
                {added ? (
                  <MdOutlineDone className={styles.searchIcon} />
                ) : (
                  <MdAdd className={styles.searchIcon} />
                )}
                <span>My list</span>
              </div>
              <Link
                className={styles.searchButton}
                style={{ textDecoration: "none" }}
                onClick={props.close}
                to={"/film/" + props.film.id}
              >
                <span>More</span>
                <BiRightArrowAlt className={styles.searchIcon} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SearchResults;
