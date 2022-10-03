import React, { useState, useEffect } from "react";

//UNUSED -- DONT WORK

async function fetchData(link) {
  console.log("fetching data ...");
  const response = await fetch(link);
  const data = await response.json();
  console.log("done !");
  return data;
}

export default function useGetData(link, id, seasonId = null) {
  const [data, setData] = useState(null);
  const API_KEY = "17117ab9c18276d48d8634390c025df4";

  const links = {
    movieLink: `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`,
    episodeLink: `https://api.themoviedb.org/3/tv/${id}/season/${seasonId}?api_key=${API_KEY}&language=en-US`,
    allGenresLink: `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`,
    genreLink: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6&with_genres=${id}`,
    searchLink: `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${id}&page=1&include_adult=false`,
  };

  useEffect(() => {
    if (Object.keys(links).includes(link)) {
      fetchData(links[link]).then((data) => {
        setData(data);
      });
    } else {
      throw new Error(`Wrong link name (${link})`);
    }
  }, []);

  return data;
}
