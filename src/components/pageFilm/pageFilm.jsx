import React, { useEffect, useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { ImPlay3 } from "react-icons/im";
import { useLocation, useParams } from "react-router-dom";
import CardList from "../card/cardList";
import Episode from "./episode";
import Header from "./header";
import styles from "./pageFilm.module.css";
import AddListBtn from "../header/addListBtn";
import useFetchData from "../scripts/fetchData";

function PageFilm() {
  const [imgLoaded, setImgLoaded] = useState();
  const [selectedSeason, setselectedSeason] = useState(1);
  const [showHeader, setShowHeader] = useState(false);
  const refHeight = useRef();
  const refContent = useRef();
  let { id } = useParams();
  const location = useLocation();

  //DATA
  const data = useFetchData("movies", id);
  const genres = useFetchData("genres").genres;
  const reco = useFetchData("recomendations", id);

  function handleSelectedSeason(e) {
    setselectedSeason(e);
  }

  //Affichage du menu du film
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
          <div className={styles.filmContent}>
            {data ? (
              <>
                <div className={styles.bigTitle}>{data.name}</div>
                <div className={styles.filmDesc}>{data.overview}</div>
              </>
            ) : null}
            <div className={styles.buttons}>
              <div className={styles.button} ref={refHeight}>
                Watch &nbsp;&nbsp;
                <ImPlay3 />
              </div>
              {AddListBtn(parseInt(id))}
            </div>
          </div>
          {data ? (
            <img
              className={imgLoaded ? styles.imgFullscreen : styles.opacity}
              src={` https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              onLoad={handleLoad}
            ></img>
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
