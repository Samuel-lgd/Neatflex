import React, { useState, useEffect } from "react";
import styles from "./pageFilm.module.css";
import EpisodeCard from "./episodeCard";

function Episodes(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${props.filmId}/season/${props.seasonId}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
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
        setData(genres);
      });
  }, [props.seasonId, props.filmId]);

  return (
    <>
      {data ? (
        <>
          <div className={styles.headInfos}>
            <h1>{data.name}'s episodes:</h1>
          </div>
          <div className={styles.episodes}>
            {data.episodes.map((episode) => (
              <EpisodeCard episode={episode} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

export default Episodes;
