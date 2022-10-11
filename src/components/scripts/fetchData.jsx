import React, { useState, useEffect } from "react";

export default function useFetchData(link, id = null, seasonId = null) {
  const [data, setData] = useState(false);
  const API_KEY = "17117ab9c18276d48d8634390c025df4";

  const links = {
    movies: `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`,
    episodes: `https://api.themoviedb.org/3/tv/${id}/season/${seasonId}?api_key=${API_KEY}&language=en-US`,
    genres: `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`,
    genreSearch: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6&with_genres=${id}`,
    search: `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${id}&page=1&include_adult=false`,
    trending: `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`,
    recomendations: `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
  };

  useEffect(() => {
    if (Object.keys(links).includes(link)) {
      fetch(links[link])
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: The status is ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        });
    } else {
      throw new Error(`Wrong link name (${link})`);
    }
  }, [link, id, seasonId]);
  return data;
}
