import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import AddListBtn from "./addListBtn";
import styles from "./card.module.css";
import LikeBtn from "./likeBtn";

function CardDesc(props) {
  return (
    <div
      className={
        props.isHovering || isMobile
          ? `${styles.desc} ${styles.descHover}`
          : styles.desc
      }
    >
      <Link style={{ textDecoration: "none" }} to={`/film/${props.film.id}`}>
        <h2>{props.film.name}</h2>
      </Link>
      <p className={styles.genres}>
        {props.genre.join(" • ")} | {props.film.first_air_date.slice(0, 4)}
      </p>
      <div className={styles.bottom}>
        <p className={styles.rating}>
          Score: {props.film.vote_average.toFixed(1) * 10}%
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <LikeBtn isLiked={false} /> */}
          <AddListBtn filmId={props.film.id} />
        </div>
      </div>
    </div>
  );
}

export default CardDesc;
