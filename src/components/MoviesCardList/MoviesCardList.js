import React, { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard.js';
import useWindowDimensions from "../../hooks/useWindowDimensions.js";

function MoviesCardList({ 
  moviesCards = [], 
  countCards, 
  usersMoviesCards, 
  onSaveMovieCard, 
  onDeleteMovieCard }) {

  //const { pathname } = useLocation();
 
  const cardElements = moviesCards.slice(0, Math.min(moviesCards.length, countCards))
  .map((item) => (
    <ul className="movies-card-list__container" key={item.movieId}>
      <MoviesCard
        data={item}
        /*saved={usersMoviesCards.some(usersItem => usersItem.movieId === item.movieId)}*/
        /*onSaveMovieCard={onSaveMovieCard}*/
        /*onDeleteMovieCard={onDeleteMovieCard}*/
        />
    </ul>
  ));

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
  
  return ((moviesCards && moviesCards.length) || 0) > 0
    ? <div className="movies-card-list">
        <ul className="movies-card-list__movies">{cardElements}</ul>
      </div>
    : <div className="movies-card-list">
        <p className="movies-card-list__not-found">
          Ничего не найдено</p>
      </div>
}

export { MoviesCardList };