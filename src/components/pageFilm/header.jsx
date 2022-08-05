import React from "react";
import { ImPlay3 } from "react-icons/im";
import styles from "./filmHeader.module.css";

function Header(props) {
  function pluriel(elt) {
    if (elt > 1) {
      return "s";
    }
  }

  function showYear() {
    const firstYear = props.data.first_air_date.slice(0, 4);
    const lastYear = props.data.last_air_date
      ? props.data.last_air_date.slice(0, 4)
      : null;
    if (firstYear === lastYear || lastYear === null) {
      return <p>{firstYear}</p>;
    }
    return (
      <p>
        {firstYear} / {lastYear}
      </p>
    );
  }

  return (
    <div
      className={
        props.show ? styles.content : `${styles.content} ${styles.hide}`
      }
    >
      <div className={styles.left}>
        <div className={styles.button}>
          Watch &nbsp;&nbsp;
          <ImPlay3 />
        </div>
        <h1>{props.data.name}</h1>
        <p>•</p>
        {showYear()}
        <p>•</p>
        <p>
          {props.data.number_of_seasons} season
          {pluriel(props.data.number_of_seasons)}
        </p>
      </div>
      <select onChange={(e) => props.selectedSeason(e.target.value)}>
        {props.data.seasons.map((season) =>
          season.season_number !== 0 ? (
            <option value={season.season_number}>{season.name}</option>
          ) : null
        )}
      </select>
    </div>
  );
}

export default Header;
