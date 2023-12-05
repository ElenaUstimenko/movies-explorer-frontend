import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ 
  moviesCards = [], 
  countCards, 
  usersMoviesCards, 
  onSaveMovieCard, 
  onDeleteMovieCard }) {
 
  const cardElements = moviesCards.slice(0, Math.min(moviesCards.length, countCards))
  .map((item) => (
    <ul className="movies-card-list__container" key={item.movieId}>
      <MoviesCard
        data={item}
        saved={usersMoviesCards.some(usersItem => usersItem.movieId === item.movieId)}
        usersMoviesCards={usersMoviesCards}
        onSaveMovieCard={onSaveMovieCard}
        onDeleteMovieCard={onDeleteMovieCard}
        />
    </ul>
  ));
  
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