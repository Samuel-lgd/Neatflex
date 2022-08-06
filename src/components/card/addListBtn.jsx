import React, { useState, useEffect } from "react";
import { MdAdd, MdOutlineDone } from "react-icons/md";
import styles from "./card.module.css";

function AddListBtn(props) {
  const [userList, setUserList] = useState(getList);
  const [added, setAdded] = useState(isAdded);

  function getList() {
    const data = window.localStorage.getItem("USER_LIST");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  function isAdded() {
    if (userList.includes(props.filmId)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    window.localStorage.setItem("USER_LIST", JSON.stringify(userList));
  }, [userList]);

  function handleAddList() {
    setAdded((added) => !added);
    const data = window.localStorage.getItem("USER_LIST");
    const array = JSON.parse(data);
    if (added) {
      array.map((item, key) => {
        if (item === props.filmId) {
          array.splice(key, 1);
        }
      });
    } else {
      array.push(props.filmId);
    }
    setUserList(array);
  }

  return (
    <div className={styles.likeBtn} onClick={handleAddList}>
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
