import React from "react";
import Card from "./card/card";
import { useLocation } from "react-router-dom";
import FavBtn from "./favBtn";

function PageCards({ data, genres, title, topMargin, genreId }) {
  const location = useLocation();

  //On teste si de la data a été passée dans location
  if (data == undefined && genres == undefined && title == undefined) {
    if (location.state) {
      data = location.state.data;
      genres = location.state.genres;
      title = location.state.title;
      genreId = location.state.genreId;
    } else {
      //Gérer le cas où il n'y a pas de data (quand on passe par l'url)
    }
  }

  return (
    <div className={topMargin ? "topMargin" : null}>
      <h1 className="sMargin listHeader">
        {title} <p>&nbsp;</p>
        {genreId ? <FavBtn id={genreId} bg={null} /> : null}
      </h1>
      <div className="allCards">
        {data && genres
          ? data.results.map((filmData, i) => (
              <Card film={filmData} genres={genres} />
            ))
          : null}
      </div>
    </div>
  );
}

export default PageCards;
