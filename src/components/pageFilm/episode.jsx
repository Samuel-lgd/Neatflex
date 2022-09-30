import React, { useState, useEffect } from "react";
import styles from "./pageFilm.module.css";
import EpisodeCard from "./episodeCard";

function Episodes(props) {
  const [data, setData] = useState(null);
  const [hideUnreleased, setHideUnreleased] = useState(false);

  function getIsReleased(date) {
    let releaseDate = new Date(date);
    let today = Date.now();

    if (releaseDate > today) {
      return false;
    }
    return true;
  }

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

  function lastReleased(episode) {
    return (
      <EpisodeCard
        episode={episode}
        lastReleased={true}
        handleHide={() => setHideUnreleased((prev) => !prev)}
        hide={hideUnreleased}
      />
    );
  }

  function notLastReleased(episode) {
    return (
      <EpisodeCard
        episode={episode}
        lastReleased={false}
        handleHide={() => setHideUnreleased((prev) => !prev)}
        hide={hideUnreleased}
      />
    );
  }

  return (
    <>
      {data ? (
        <>
          <div className={styles.headInfos}>
            <h1>{data.name}'s episodes:</h1>
          </div>
          <div className={styles.episodes}>
            {data.episodes.map((episode, i) =>
              i < data.episodes.length - 1
                ? getIsReleased(episode.air_date) === true &&
                  getIsReleased(data.episodes[i + 1].air_date) === false
                  ? lastReleased(episode)
                  : notLastReleased(episode)
                : notLastReleased(episode)
            )}
          </div>
        </>
      ) : null}
    </>
  );
}

export default Episodes;
