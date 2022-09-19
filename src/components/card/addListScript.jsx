import { useState, useEffect } from "react";

function useIsFilmAdded(filmId) {
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

  useEffect(() => {
    window.localStorage.setItem("USER_LIST", JSON.stringify(userList));
  }, [userList]);

  function isAdded() {
    if (userList.includes(filmId)) {
      return true;
    } else {
      return false;
    }
  }
  return added;
}

function addFilm(isAdded, filmId) {
  const data = window.localStorage.getItem("USER_LIST");
  const userList = JSON.parse(data);
  if (isAdded) {
    userList.map((item, key) => {
      if (item === filmId) {
        userList.splice(key, 1);
      }
    });
  } else {
    userList.push(filmId);
  }
  isAdded = !isAdded;
  window.localStorage.setItem("USER_LIST", JSON.stringify(userList));
  return isAdded;
}

export { useIsFilmAdded, addFilm };
