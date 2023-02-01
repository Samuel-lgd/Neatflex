import React, { useState } from "react";
import { isDataAdded, addFilm } from "../scripts/addToLocalstorageScript";
import { MdAdd, MdOutlineDone } from "react-icons/md";
import styles from "./card.module.css";

function AddListBtn(props) {
  const [added, setAdded] = useState(isDataAdded(props.filmId, "USER_LIST"));

  return (
    <div
      className={styles.likeBtn}
      onClick={() => setAdded(addFilm(added, props.filmId, "USER_LIST"))}
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
