import React, { useEffect, useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { ImPlay3 } from "react-icons/im";
import { useLocation, useParams } from "react-router-dom";
import CardList from "../card/cardList";
import Episode from "./episode";
import Header from "./header";
import styles from "./pageFilm.module.css";
import AddListBtn from "../card/addListBtn";

function PageFilm() {
  const [data, setData] = useState();
  const [imgLoaded, setImgLoaded] = useState();
  const [selectedSeason, setselectedSeason] = useState(1);
  const [genres, setGenres] = useState(null);
  const [showHeader, setShowHeader] = useState(false);
  const [reco, setReco] = useState();
  const refHeight = useRef();
  const refContent = useRef();
  let { id } = useParams();
  const location = useLocation();

  function handleSelectedSeason(e) {
    setselectedSeason(e);
  }

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [location]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (
        window.scrollY >
        refHeight.current.offsetTop - refHeight.current.clientHeight - 20
      ) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&page=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setReco(data);
      });
  }, [location]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
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
        setGenres(genres.genres);
      });
  }, []);
  function handleLoad() {
    setImgLoaded(true);
  }

  function goToContent() {
    refContent.current.scrollIntoView({ behavior: "smooth" });
  }

  function showReco() {
    if (reco) {
      if (reco.total_results > 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  return (
    <>
      <div className={styles.container}>
        <>
          {data ? (
            <>
              <div className={styles.filmContent}>
                <div className={styles.bigTitle}>{data.name}</div>
                <div className={styles.filmDesc}>{data.overview}</div>
                <div className={styles.button} ref={refHeight}>
                  Watch &nbsp;&nbsp;
                  <ImPlay3 />
                </div>
              </div>
              <div className={styles.more}>
                <BsChevronDoubleDown
                  size={40}
                  color={"white"}
                  onClick={goToContent}
                />
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
        <div className={styles.scrollToMe} ref={refContent}></div>
        {data ? (
          <div className={styles.content}>
            <Header
              data={data}
              selectedSeason={handleSelectedSeason}
              show={showHeader}
            />
            <Episode filmId={data.id} seasonId={selectedSeason} />
          </div>
        ) : null}
        {showReco() ? (
          <CardList
            titre={" Recommandations"}
            key={"recos"}
            data={reco}
            genres={genres}
          />
        ) : null}
      </div>
    </>
  );
}

export default PageFilm;
