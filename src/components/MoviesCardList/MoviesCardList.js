import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ 
  //moviesCards = [], 
  countCards, 
  //usersMoviesCards, 
  //onSaveMovieCard, 
  //onDeleteMovieCard 
  cards, 
  visibleCardsCount, 
  savedCards, 
  onSave, 
  onDelete,
}) {
 
  const pathname = useLocation();

  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__movies">
        {pathname === '/movies' 
          ? (cards.slice(0, visibleCardsCount).map((card) => (
            <MoviesCard 
              key={card.id}
              card={card} 
              onSave={onSave} 
              savedCards={savedCards} 
            />
            ))) 
          : (savedCards.slice(0, visibleCardsCount).map((card) => (
            <MoviesCard 
              key={card._id} 
              card={card} 
              onCardDelete={onDelete}
              savedCards={savedCards}
            />
            )))
        }
      </ul>
    </div>
  )
};

  /*const cardElements = moviesCards.slice(0, Math.min(moviesCards.length, countCards))
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
      </div>*/
/*}*/

export { MoviesCardList };