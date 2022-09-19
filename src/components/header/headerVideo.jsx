import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

function HeaderVideo(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${props.filmId}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
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
        setData(actualData);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  function handleLoad() {
    setImgLoaded(true);
  }

  return (
    <>
      {data ? (
        <>
          <div className={styles.filmContent}>
            <div className={styles.bigTitle}>{data.name}</div>
            <div className={styles.filmDesc}>{data.tagline}</div>
            <div className={styles.buttons}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/film/${props.filmId}`}
              >
                <div className={styles.button}>Show more</div>
              </Link>
              <div className={styles.buttonAddList}>
                <HiPlus size={35} color="white" />
                <p> My list</p>
              </div>
            </div>
          </div>
          <img
            className={imgLoaded ? styles.imgFullscreen : styles.opacity}
            src={` https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            onLoad={handleLoad}
          ></img>
        </>
      ) : null}
      <div className={styles.bottomGradient}></div>
      <div className={styles.bottomBg}></div>
    </>
  );
}

export default HeaderVideo;