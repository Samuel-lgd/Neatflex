import React, { useRef, useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import styles from "./cardModal.module.css";
import useWindowDimensions from "../../windowsSize";
import Saisons from "./saisons";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Modal = ({ showModal, filmId, pos, genre }) => {
  useEffect(() => {}, [pos]);
  const [modal, setModal] = useState(showModal);
  let { id } = useParams();

  useEffect(() => {
    setModal(showModal);
  }, [showModal]);

  const { height, width } = useWindowDimensions();
  const x = `${(pos.x * 100) / width + 7}%`;
  const y = `${(pos.y * 100) / height - 12}%`;

  // x: pos.x, y: pos.y,
  const animation = useTransition(modal, {
    config: { duration: 300 },
    from: {
      left: x,
      top: y,
      height: "50%",
      transform: "translate(-50%,-50% )",
      scale: 0.5,
      opacity: 1,
    },
    enter: {
      left: "50%",
      top: "50%",
      height: "90%",
      transform: "translate(-50%, -50%)",
      scale: 1,
      opacity: 1,
    },
    leave: {
      left: x,
      top: y,
      height: "50%",
      transform: "translate(-50%,-50% )",
      scale: 0.5,
      opacity: 1,
    },
  });

  const animationBg = useTransition(modal, {
    from: { opacity: 0.3 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const bgRef = useRef();

  const closeModal = (e) => {
    if (bgRef.current === e.target) {
      setModal(false);
    }

    if (e.target.id === "close") {
      setModal(false);
    }
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    if (filmId === null) {
      filmId = id;
    }
    fetch(
      `https://api.themoviedb.org/3/tv/${filmId}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
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
      });
  }, []);

  return (
    <>
      {animationBg((style, item) =>
        item ? (
          <animated.div
            style={style}
            className={styles.background}
            ref={bgRef}
            onClick={closeModal}
          >
            {/* CONTENT */}
            {animation((style, item) =>
              item ? (
                <animated.div
                  style={style}
                  className={`${styles.card}`}
                  onClick={() => setModal(true)}
                >
                  {data ? (
                    <div className={styles.content}>
                      <img
                        src={` https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                        className={styles.img}
                      ></img>
                      <div className={styles.desc}>
                        <div className={styles.row1}>
                          <h2>{data.name}</h2>
                          <p className={styles.genres}>
                            {/* {genre.join(" • ")} |{" "} */}
                            {data.genres.map(
                              (genre) => genre.name + "  "
                            )}| {data.first_air_date.slice(0, 4)}
                          </p>
                          <p className={styles.resume}>{data.overview}</p>
                        </div>
                        <div className={styles.row2}>
                          <p>
                            <span className={styles.light}>Réalisateur: </span>
                            {data.created_by.map((e) => e.name + " ")}
                          </p>
                        </div>
                      </div>
                      <Saisons filmId={data.id} seasons={data.seasons} />
                    </div>
                  ) : null}
                </animated.div>
              ) : null
            )}
          </animated.div>
        ) : null
      )}
    </>
  );
};

export default Modal;
