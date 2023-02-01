import React, { useEffect, useState } from "react";
import Card from "./card/card";
import styles from "./genres.module.css";
import GenreBtn from "./genreBtn";
import useFetchData from "./scripts/fetchData";
import PageCards from "./pageCards";

function Genres() {
  const [data, setData] = useState(null);
  const [genreTitle, setGenreTitle] = useState(null);

  const genres = useFetchData("genres").genres;

  function getData(favGenre) {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6&with_genres=${favGenre}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((actualData) => {
        // data ? setData([...data, actualData]) : setData(actualData);
        setData(actualData);
      });
  }

  function genreClick(id, name) {
    setData(null);
    getData(id);
    setGenreTitle(name);
  }

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.genreList}>
          {genres
            ? genres.map((genre) => (
                <GenreBtn id={genre.id} name={genre.name} click={genreClick} />
              ))
            : null}
        </div>
        {data && genres ? (
          <PageCards data={data} genres={genres} title={genreTitle} />
        ) : null}
      </div>
    </div>
  );
}

export default Genres;
