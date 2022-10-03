import { useState, useEffect } from "react";

function useIsDataAdded(id, localStorageName) {
  const [userList, setUserList] = useState(getList);
  const [added, setAdded] = useState(isAdded);

  function getList() {
    const data = window.localStorage.getItem(localStorageName);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  useEffect(() => {
    window.localStorage.setItem(localStorageName, JSON.stringify(userList));
  }, [userList]);

  function isAdded() {
    if (userList.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
  return added;
}

function addFilm(isAdded, id, localStorageName) {
  const data = window.localStorage.getItem(localStorageName);
  const userList = JSON.parse(data);

  //suppréssion si déjà ajouté
  if (isAdded) {
    userList.map((item, key) => {
      if (item === id) {
        userList.splice(key, 1);
      }
    });
  } else {
    //ajout dans local storage si pas déja fait par un autre bouton
    if (!userList.includes(id)) {
      userList.push(id);
    }
  }
  isAdded = !isAdded;
  window.localStorage.setItem(localStorageName, JSON.stringify(userList));
  return isAdded;
}

export { useIsDataAdded, addFilm };
