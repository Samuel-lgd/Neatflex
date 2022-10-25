import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import arrow from "./arrow.module.css";
import Card from "./card";
import styles from "./card.module.css";
import EmptyCard from "./emptyCard";
import FavBtn from "../favBtn";

function CardList(props) {
  function RightArrow() {
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return isMobile ? null : (
      <div className={arrow.bg} onClick={() => scrollNext()}>
        <div
          className={
            isLastItemVisible ? `${arrow.arrow} ${arrow.hidden}` : arrow.arrow
          }
        >
          <MdChevronRight size={50} color={"white"} />
        </div>
      </div>
    );
  }

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return isMobile ? null : (
      <div className={arrow.bg} onClick={() => scrollPrev()}>
        <div
          className={
            isFirstItemVisible
              ? ` ${arrow.arrowLeft} ${arrow.hiddenLeft}`
              : arrow.arrowLeft
          }
        >
          <MdChevronLeft size={50} color={"white"} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="cardListContainer">
        <Link
          style={{ textDecoration: "none" }}
          to="/data"
          state={{
            title: props.titre,
            data: props.data,
            genres: props.genres,
            genreId: props.genreId,
          }}
        >
          <h1 className="margin listHeader">
            {props.titre}
            <p>Show more</p>
            {/* <p>&nbsp;</p>
            {props.genreId ? <FavBtn id={props.genreId} bg={null} /> : null} */}
          </h1>
        </Link>
        <div className={isMobile ? styles.cardListMobile : styles.cardList}>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {/* {console.log(props.data)} */}
            {props.data && props.genres ? (
              props.data.results.map((filmData, i) => (
                <>
                  <Card film={filmData} genres={props.genres} />
                  <div className={styles.flex}></div>
                </>
              ))
            ) : (
              <>
                <EmptyCard />
                <EmptyCard />
                <EmptyCard />
                <EmptyCard />
                <EmptyCard />
              </>
            )}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}

export default CardList;
