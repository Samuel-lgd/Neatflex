import Home from "./components/home";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/header/header";
import HeaderVideo from "./components/header/headerVideo";
import Footer from "./components/footer/footer";
import Genres from "./components/genres";
import PageFilm from "./components/pageFilm/pageFilm";
import PageCards from "./components/pageCards";

function App() {
  const [data, setData] = useState(null);

  //On récup le film top 1 pour la page d'acceuil
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=17117ab9c18276d48d8634390c025df4`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
      });
  }, []);

  return (
    <React.StrictMode>
      <div className="App">
        <Header />
        <div className="appContent">
          <Routes>
            <Route exact path="" element={
                <>
                  {data ? <HeaderVideo filmId={data.results[0].id} /> : null}
                  <Home />
                </>
              }
            ></Route>
            <Route path="/genres" element={<Genres />}></Route>
            <Route path="/data/:title" element={<PageCards topMargin={true} />}></Route>
          </Routes>
          <Routes>
            <Route path="/film">
              <Route path=":id" element={<PageFilm />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </React.StrictMode>
  );
}

export default App;
