import React, { useState } from "react";
import styles from "./genres.module.css";
import { useIsDataAdded, addFilm } from "./scripts/addToLocalstorageScript";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function FavBtn({ id, bg }) {
  const [added, setAdded] = useState(useIsDataAdded(id, "USER_GENRES"));
  return (
    <div
      style={bg ? { backgroundColor: "#0000005f" } : { borderRadius: "5px" }}
      className={styles.iconBtn}
      onClick={() => setAdded(addFilm(added, id, "USER_GENRES"))}
    >
      <span>
        {added ? (
          <AiFillStar size={23} color={"white"} />
        ) : (
          <AiOutlineStar size={23} color={"white"} />
        )}
      </span>
    </div>
  );
}

export default FavBtn;
