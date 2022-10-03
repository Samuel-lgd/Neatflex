import React, { useState } from "react";
import { HiPlus, HiCheck } from "react-icons/hi";
import styles from "./header.module.css";
import { useIsDataAdded, addFilm } from "../scripts/addToLocalstorageScript";

function AddListBtn(filmId) {
  const [added, setAdded] = useState(useIsDataAdded(filmId, "USER_LIST"));

  return (
    <div
      className={styles.buttonAddList}
      onClick={() => setAdded(addFilm(added, filmId, "USER_LIST"))}
    >
      {added ? (
        <>
          <HiCheck size={35} color="white" />
          <>Added !</>
        </>
      ) : (
        <>
          <HiPlus size={35} color="white" />
          <>My list</>
        </>
      )}
    </div>
  );
}

export default AddListBtn;
