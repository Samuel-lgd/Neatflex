import React, { useState } from "react";
import styles from "./card.module.css";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

function LikeBtn(isLiked) {
  const [liked, setLiked] = useState(isLiked);
  console.log(isLiked);

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
