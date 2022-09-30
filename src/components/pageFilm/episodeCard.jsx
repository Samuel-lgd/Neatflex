import React, { useState, useEffect } from "react";
import styles from "./pageFilm.module.css";

function EpisodeCard({ episode, lastReleased, hide, handleHide }) {
  const [isReleased, setIsReleased] = useState(getIsReleased(episode.air_date));

  function getIsReleased(date) {
    let releaseDate = new Date(date);
    let today = Date.now();

    if (releaseDate > today) {
      return false;
    }
    return true;
  }

  function calcRuntime(minutes) {
    const min = minutes % 60;
    const hours = Math.floor(minutes / 60);
    if (minutes === null) {
      return "";
    } else if (hours === 0) {
      return `${min}min`;
    } else if (min === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${min}min`;
  }

  function showDate(date) {
    let releaseDate = new Date(date);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return releaseDate.toLocaleDateString(undefined, options);
  }

  return (
    <>
      <div
        className={
          hide && !isReleased
            ? `${styles.saisonCardHidden} ${styles.saisonCard}`
            : styles.saisonCard
        }
      >
        {lastReleased ? (
          <div onClick={handleHide} className={styles.btnHideUnreleased}>
            {hide ? "Show unreleased episodes" : "Hide unreleased episodes"}
          </div>
        ) : null}
        {isReleased ? (
          <>
            <div className={styles.left}>
              <img
                src={` https://image.tmdb.org/t/p/w200/${episode.still_path}`}
              />
              <div className={styles.saisonDesc}>
                <div className={styles.episodeTitle}>
                  <h2>
                    {episode.episode_number}. {episode.name}
                  </h2>
                </div>
                <p>{episode.overview}</p>
              </div>
            </div>
            <div className={styles.right}>
              <p>{calcRuntime(episode.runtime)}</p>
              <p>{showDate(episode.air_date)}</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.left}>
              <div className={styles.imgPlaceholder}></div>
              <h2 className={styles.center}>
                {episode.name} will be released on {showDate(episode.air_date)}{" "}
              </h2>
            </div>
          </>
        )}
      </div>
      {!isReleased && hide ? null : <hr></hr>}
    </>
  );
}

export default EpisodeCard;
