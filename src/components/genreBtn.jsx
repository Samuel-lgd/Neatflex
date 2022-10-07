import React, { useState } from "react";
import styles from "./genres.module.css";
import { useIsDataAdded, addFilm } from "./scripts/addToLocalstorageScript";
import FavBtn from "./favBtn";

function GenreBtn(props) {
  return (
    <div className={styles.container}>
      <div
        onClick={() => props.click(props.id, props.name)}
        className={styles.button}
      >
        {props.name}
      </div>
      <FavBtn id={props.id} bg={true} />
    </div>
  );
}

export default GenreBtn;
