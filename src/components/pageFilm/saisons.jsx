import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Episodes from "./episode";

function Saisons(props) {
  const [selectedSeason, setselectedSeason] = useState(1);
  const location = useLocation();

  function handleChange(e) {
    selectedSeason(e.target.value);
  }

  return (
    <>
      <select onChange={(e) => handleChange(e)}>
        {props.seasons.map((season) =>
          season.season_number != 0 ? (
            <option value={season.season_number}>{season.name}</option>
          ) : null
        )}
      </select>
      <Episodes filmId={props.filmId} seasonId={selectedSeason} />
    </>
  );
}

export default Saisons;
