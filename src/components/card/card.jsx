import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import CardDesc from "./cardDesc";

function Card(props) {
  const [isHovering, setIsHovering] = useState(false);

  function filterGenres(genreFilm, genres) {
    const listGenres = [];
    genres.forEach((listGenre) => {
      genreFilm.forEach((genre) => {
        if (listGenre.id === genre) {
          listGenres.push(listGenre.name);
        }
      });
    });
    return listGenres;
  }

  const genre = filterGenres(props.film.genre_ids, props.genres);
  return (
    <>
      <div
        className={
          isMobile
            ? `${styles.card} ${styles.cardMobile}`
            : isHovering
            ? `${styles.card} ${styles.cardHover}`
            : styles.card
        }
        onMouseOver={() => (isMobile ? null : setIsHovering(true))}
        onMouseOut={() => (isMobile ? null : setIsHovering(false))}
      >
        {props.film.poster_path ? (
          <div
            className={
              isHovering
                ? `${styles.imgContainer} ${styles.imgHoverContainer}`
                : styles.imgContainer
            }
          >
            <Link to={`/film/${props.film.id}`}>
              <img
                className={
                  isHovering ? `${styles.img} ${styles.imgHover}` : styles.img
                }
                src={`https://image.tmdb.org/t/p/w780/${props.film.poster_path}`}
              />
            </Link>
          </div>
        ) : null}

        {/* TITRE + DESCRIPTION */}
        <CardDesc isHovering={isHovering} film={props.film} genre={genre} />
      </div>
    </>
  );
}

export default Card;
