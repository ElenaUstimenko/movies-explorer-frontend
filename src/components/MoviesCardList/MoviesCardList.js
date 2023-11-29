import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard.js';
import useWindowDimensions from "../../hooks/useWindowDimensions.js";

function MoviesCardList() {
  const { pathname } = useLocation();
 
  // высчитываем количество карточек при изменении размеров экрана
  /*const isTabletWidth = useWindowDimensions() <= 768;
  const isMobileWidth = useWindowDimensions() <= 425;
  const [currentViewportWidth, setCurrentViewportWidth] = useState(window.screen.width);
  const [countCards, setCountCards] = useState(window.screen.width > 768 ? 8 : window.screen.width > 425 ? 5 : 5);
   
  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width !== currentViewportWidth) {
        setCountCards(window.screen.width > 768 ? 8 : window.screen.width > 425 ? 5 : 5);
        setCurrentViewportWidth(window.screen.width);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentViewportWidth]);*/
  
  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__movies">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>

      {(pathname === '/movies' ) && (
        <div className="movies-card-list__more">
          <button className="button movies-card-list__button">Ещё</button>
        </div>)}

    </div>
  );
}

export { MoviesCardList };
