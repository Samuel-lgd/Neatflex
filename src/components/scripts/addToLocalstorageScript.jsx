function isDataAdded(id, localStorageKey) {
  const data = window.localStorage.getItem(localStorageKey);
  const userList = JSON.parse(data) || [];
  return userList.includes(id);
}

function addFilm(id, localStorageKey) {
  const data = window.localStorage.getItem(localStorageKey);
  const userList = JSON.parse(data);
  const isAdded = isDataAdded(id, localStorageKey);

  // Si le film est déjà dans la liste, on le retire. Sinon on l'ajoute
  if (isAdded) {
    userList.map((item, index) => {
      if (item === id) {
        userList.splice(index, 1);
      }
    });
  } else {
    userList.push(id);
  }

  window.localStorage.setItem(localStorageKey, JSON.stringify(userList));
  return !isAdded;
}

export { isDataAdded, addFilm };
