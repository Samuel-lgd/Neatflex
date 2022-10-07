import React, { useEffect, useState } from "react";
import api from "../apiData.json";
import CardList from "./card/cardList";

function Home(props) {
  const [genres, setGenres] = useState(null);
  const [data, setData] = useState(null);
  const [userListData, setUserListData] = useState(null);
  const [userList, setUserList] = useState(getLocalStorage("USER_LIST"));
  const [userGenresData, setUserGenresData] = useState(null);
  const [userGenres, setUserGenres] = useState(getLocalStorage("USER_GENRES"));

  function getLocalStorage(name) {
    const data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  //get genres list
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((genres) => {
        setGenres(genres.genres);
      });
  }, []);

  function getData() {
    let allData = [];
    api.categories.map((x) =>
      fetch(x.link)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => {
          allData.push(actualData);
        })
        .finally(() =>
          allData.length === api.categories.length ? setData(allData) : null
        )
    );
  }

  //get data userList
  function getTitle(index) {
    let name = "";
    genres.map((genre) =>
      genre.id == userGenres[index] ? (name = genre.name) : null
    );
    return name;
  }

  useEffect(() => {
    if (userList) {
      let allData = [];
      userList.map((filmId) =>
        fetch(
          `https://api.themoviedb.org/3/tv/${filmId}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
          })
          .then((actualData) => {
            allData.push(actualData);
          })
          .finally(() =>
            allData.length === userList.length
              ? setUserListData({ results: allData })
              : null
          )
      );
    }
  }, []);

  //get data userGenres
  useEffect(() => {
    if (userGenres) {
      let allData = [];
      userGenres.map((genre) => {
        fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6&with_genres=${genre}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error: The status is ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            allData.push(data);
          })
          .finally(() =>
            allData.length === userGenres.length
              ? setUserGenresData(allData)
              : null
          );
      });
    }
  }, []);

  return (
    <>
      <div className="content">
        {/* Affichage userlist */}
        {userList && userListData ? (
          <>
            {/* {console.log("LIST", userListData)} */}

            <CardList titre="My list" data={userListData} genres={genres} />
          </>
        ) : null}

        {/* Affichage catégeories */}
        {data
          ? api.categories.map((x, i) => (
              <CardList titre={x.name} key={i} data={data[i]} genres={genres} />
            ))
          : getData()}

        {/* Affichage genres fav. */}
        {userGenres && userGenresData ? (
          <>
            {userGenresData.map((genre, i) => (
              <>
                <CardList
                  titre={getTitle(i)}
                  data={genre}
                  genres={genres}
                  genreId={userGenres[i]}
                />
              </>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Home;
