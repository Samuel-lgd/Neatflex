import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import styles from "./card.module.css";

function LikeBtn(isLiked) {
  const [liked, setLiked] = useState(isLiked);

  function handleLike() {
    setLiked((liked) => !liked);
  }

  return (
    <div className={styles.likeBtn} onClick={handleLike}>
      <span>
        {liked ? (
          <AiOutlineLike size={20} color={"white"} />
        ) : (
          <AiFillLike size={20} color={"white"} />
        )}
      </span>
    </div>
  );
}

export default LikeBtn;
