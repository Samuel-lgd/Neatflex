import Home from "./components/home";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/header/header";
import HeaderVideo from "./components/header/headerVideo";
import Footer from "./components/footer/footer";
import Genres from "./components/genres";
import PageFilm from "./components/pageFilm/pageFilm";
import useGetData from "./components/scripts/fetchData";

function App() {
  const [data, setData] = useState(null);
  // const [testData, setTestData] = useState(useGetData("movieLink", 66732));

  // useEffect(() => {
  //   console.log(testData);
  // }, [testData]);

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
            <Route
              exact
              path="/Neatflex"
              element={
                <>
                  {data ? <HeaderVideo filmId={data.results[0].id} /> : null}
                  <Home />
                </>
              }
            ></Route>
            <Route path="/genres" element={<Genres />}></Route>
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
