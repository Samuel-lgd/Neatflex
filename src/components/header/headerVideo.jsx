import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import AddListBtn from "../header/addListBtn";
import useFetchData from "../scripts/fetchData";

function HeaderVideo(props) {
  // const [data, setData] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const data = useFetchData("movies", props.filmId);

  function handleLoad() {
    setImgLoaded(true);
  }

  return (
    <>
      <>
        <div className={styles.filmContent}>
          {data ? (
            <>
              <div className={styles.bigTitle}>{data.name}</div>
              <div className={styles.filmDesc}>{data.tagline}</div>
            </>
          ) : null}

          <div className={styles.buttons}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/film/${props.filmId}`}
            >
              <div className={styles.button}>Show more</div>
            </Link>
            {AddListBtn(props.filmId)}
          </div>
        </div>
        {data ? (
          <img
            className={imgLoaded ? styles.imgFullscreen : styles.opacity}
            src={` https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            onLoad={handleLoad}
          ></img>
        ) : null}
      </>
      <div className={styles.bottomGradient}></div>
      <div className={styles.bottomBg}></div>
    </>
  );
}

export default HeaderVideo;
