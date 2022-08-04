import React, { useState } from "react";
import { useEffect } from "react";
import CardList from "./card/cardList";
import api from "../apiData.json";

function Home(props) {
  const [genres, setGenres] = useState(null);
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
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
    );
    setData(allData);
  }

  return (
    <>
      {data ? (
        <div className="content">
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
