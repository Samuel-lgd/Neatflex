import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

function SearchResults(props) {
  return (
    <>
      {props.film.name.length >= 1 && props.film.vote_average > 0 ? (
        <div className={styles.resultCard}>
          <Link
            style={{ textDecoration: "none" }}
            to={"/film/" + props.film.id}
            onClick={props.close}
          >
            <h3>{props.film.name}</h3>
            <div className={styles.spaceBetween}>
              <p>{props.film.first_air_date.slice(0, 4)}</p>
              <p className={styles.rating}>
                Score: {props.film.vote_average * 10}
              </p>
            </div>
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default SearchResults;
