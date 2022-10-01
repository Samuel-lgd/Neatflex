import React, { useEffect, useState } from "react";
import api from "../apiData.json";
import CardList from "./card/cardList";

function Home(props) {
  const [genres, setGenres] = useState(null);
  const [data, setData] = useState(null);
  const [userListData, setUserListData] = useState(null);
  const [userList, setUserList] = useState(getList);

  function getList() {
    const data = window.localStorage.getItem("USER_LIST");
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

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

  return (
    <>
      {data ? (
        <div className="content">
          {userList && userListData ? (
            <CardList titre="My list" data={userListData} genres={genres} />
          ) : null}

          {api.categories.map((x, i) => (
            <CardList titre={x.name} key={i} data={data[i]} genres={genres} />
          ))}
        </div>
      ) : (
        getData()
      )}
    </>
  );
}

export default Home;
