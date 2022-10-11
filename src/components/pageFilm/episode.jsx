import React, { useState, useEffect } from "react";
import styles from "./pageFilm.module.css";
import EpisodeCard from "./episodeCard";
import useFetchData from "../scripts/fetchData";

function Episodes(props) {
  // const [data, setData] = useState(null);
  const [hideUnreleased, setHideUnreleased] = useState(false);
  const data = useFetchData("episodes", props.filmId, props.seasonId);

  function getIsReleased(date) {
    let releaseDate = new Date(date);
    let today = Date.now();

    if (releaseDate > today) {
      return false;
    }
    return true;
  }

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
