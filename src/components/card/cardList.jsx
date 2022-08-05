import React, { useState, useEffect } from "react";
import Card from "./card";
import styles from "./card.module.css";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import arrow from "./arrow.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import EmptyCard from "./emptyCard";
import { isMobile } from "react-device-detect";

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
        <h1 className="margin listHeader">{props.titre}</h1>
        <div className={isMobile ? styles.cardListMobile : styles.cardList}>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {props.data && props.genres
              ? props.data.results.map((filmData, i) => (
                  <>
                    <Card
                      film={filmData}
                      key={filmData.id}
                      itemId={filmData.id}
                      genres={props.genres}
                      id={`row${props.id}col${i}`}
                    />
                    <div className={styles.flex}>
                      <EmptyCard /> <EmptyCard /> <EmptyCard /> <EmptyCard />
                    </div>
                  </>
                ))
              : null}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}

export default CardList;
