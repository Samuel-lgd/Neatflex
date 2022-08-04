import React, { useState } from "react";
import styles from "./card.module.css";
import VoirPlus from "./voirPlus";
import { Link } from "react-router-dom";
import LikeBtn from "./likeBtn";
import AddListBtn from "./addListBtn";

function CardDesc(props) {
  return (
    <div
      className={
        props.isHovering ? `${styles.desc} ${styles.descHover}` : styles.desc
      }
    >
      <Link style={{ textDecoration: "none" }} to={`/film/${props.film.id}`}>
        <h2>{props.film.name}</h2>
      </Link>
      <p className={styles.genres}>
        {props.genre.join(" • ")} | {props.film.first_air_date.slice(0, 4)}
      </p>
      {/* <VoirPlus handleClick={props.openModal} id={props.film.id} />
       */}
      <div className={styles.bottom}>
        <p className={styles.rating}>
          Score: {props.film.vote_average.toFixed(1) * 10}%
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <LikeBtn isLiked={false} />
          <AddListBtn isLiked={false} />
        </div>
      </div>
    </div>
  );
}

export default CardDesc;
