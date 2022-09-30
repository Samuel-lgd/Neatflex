import React, { useState } from "react";
import { HiPlus, HiCheck } from "react-icons/hi";
import styles from "./header.module.css";
import { useIsFilmAdded, addFilm } from "../scripts/addListScript";

function AddListBtn(filmId) {
  const [added, setAdded] = useState(useIsFilmAdded(filmId));

  return (
    <div
      className={styles.buttonAddList}
      onClick={() => setAdded(addFilm(added, filmId))}
    >
      {added ? (
        <>
          <HiCheck size={35} color="white" />
          <p>Added !</p>
        </>
      ) : (
        <>
          <HiPlus size={35} color="white" />
          <p>My list</p>
        </>
      )}
    </div>
  );
}

export default AddListBtn;
