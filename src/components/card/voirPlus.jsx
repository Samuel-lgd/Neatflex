import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

export default function VoirPlus(props) {
  return (
    <div className={styles.plus}>
      <i className={styles.fleche}></i>
      <i id={styles.id2} className={styles.fleche}></i>
      {/* <h4 onMouseDown={props.handleClick}>Show more</h4> */}
      <Link to={`/film/${props.id}`}>
        <h4>Show more</h4>
      </Link>
    </div>
  );
}
