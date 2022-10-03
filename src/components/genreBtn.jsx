import React, { useState } from "react";
import styles from "./genres.module.css";
import { useIsDataAdded, addFilm } from "./scripts/addToLocalstorageScript";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function GenreBtn(props) {
  const [added, setAdded] = useState(useIsDataAdded(props.id, "USER_GENRES"));

  return (
    <div className={styles.container}>
      <div
        onClick={() => props.click(props.id, props.name)}
        className={styles.button}
      >
        {props.name}
      </div>
      <div
        className={styles.iconBtn}
        onClick={() => setAdded(addFilm(added, props.id, "USER_GENRES"))}
      >
        <span>
          {added ? (
            <AiFillStar size={23} color={"white"} />
          ) : (
            <AiOutlineStar size={23} color={"white"} />
          )}
        </span>
      </div>
    </div>
  );
}

export default GenreBtn;
