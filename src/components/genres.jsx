import React, { useEffect, useState } from "react";
import Card from "./card/card";
import styles from "./genres.module.css";
import GenreBtn from "./genreBtn";
import emptyCard from "./card/emptyCard";
import EmptyCard from "./card/emptyCard";

function Genres() {
  const [data, setData] = useState(null);
  const [genres, setGenres] = useState(null);
  const [genreTitle, setGenreTitle] = useState(null);
  const [actualId, setActualId] = useState(null);

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
      .then((actualData) => {
        setGenres(actualData.genres);
      });
  }, []);

  function getData(genreId) {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6&with_genres=${genreId}`
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
    setActualId(id);
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
        <h1 className={styles.genreTitle}>{genreTitle}</h1>
        <div className={styles.cardListGenres}>
          {data && genres ? (
            data.results.map((filmData, i) => (
              <Card film={filmData} genres={genres} />
            ))
          ) : actualId ? (
            <>
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Genres;
