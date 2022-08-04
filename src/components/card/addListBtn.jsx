import React, { useState } from "react";
import styles from "./card.module.css";
import { MdAdd, MdOutlineDone } from "react-icons/md";

function AddListBtn(isAdded) {
  const [added, setAdded] = useState(isAdded);
  console.log(isAdded);

  function handleLike() {
    setAdded((added) => !added);
  }

  return (
    <div className={styles.likeBtn} onClick={handleLike}>
      <span>
        {added ? (
          <MdAdd size={20} color={"white"} />
        ) : (
          <MdOutlineDone size={20} color={"white"} />
        )}
      </span>
    </div>
  );
}

export default AddListBtn;
