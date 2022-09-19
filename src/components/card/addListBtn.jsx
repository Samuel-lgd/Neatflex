import React, { useState, useEffect } from "react";
import { useIsFilmAdded, addFilm } from "./addListScript";
import { MdAdd, MdOutlineDone } from "react-icons/md";
import styles from "./card.module.css";

function AddListBtn(props) {
  const [added, setAdded] = useState(useIsFilmAdded(props.filmId));

  return (
    <div
      className={styles.likeBtn}
      onClick={() => setAdded(addFilm(added, props.filmId))}
    >
      <span>
        {added ? (
          <MdOutlineDone size={20} color={"white"} />
        ) : (
          <MdAdd size={20} color={"white"} />
        )}
      </span>
    </div>
  );
}

export default AddListBtn;
