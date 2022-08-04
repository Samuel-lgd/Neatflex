import React, { useState, useEffect } from "react";
import styles from "./cardModal.module.css";

function Episodes(props) {
  const [data, setData] = useState(null);

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
    let newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString(undefined, options);
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

  return (
    <>
      {data ? (
        <>
          <div className={styles.headInfos}>
            <h1>{data.name}'s episodes:</h1>
          </div>
          <div className={styles.episodes}>
            {data.episodes.map((season) => (
              <>
                <hr></hr>
                <div className={styles.saisonCard}>
                  <div className={styles.left}>
                    <img
                      src={` https://image.tmdb.org/t/p/w200/${season.still_path}`}
                    />
                    <div className={styles.saisonDesc}>
                      <div className={styles.seasonTitle}>
                        <h2>
                          {season.episode_number}. {season.name}
                        </h2>
                      </div>
                      <p>{season.overview}</p>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <p>{calcRuntime(season.runtime)}</p>
                    <p>{showDate(season.air_date)}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

export default Episodes;
