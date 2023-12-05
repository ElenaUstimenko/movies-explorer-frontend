import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';

function Movies({
  onChangeFilters,
  moviesCards,
  usersMoviesCards,
  countCards,
  onIncCountOfCards,
  onSaveMovieCard,
  onDeleteMovieCard,
 }) {
  
  return (
    <section className='movies'>
      <SearchForm 
        onChangeFilters={onChangeFilters}/>
      <MoviesCardList 
        moviesCards={moviesCards}
        countCards={countCards}
        usersMoviesCards={usersMoviesCards}
        onSaveMovieCard={onSaveMovieCard}
        onDeleteMovieCard={onDeleteMovieCard}/>

      {((moviesCards && moviesCards.length) || 0) > countCards &&
        <div className='movies__more'>
          <button className='button movies__button'
            onClick={onIncCountOfCards}
            >Ещё
          </button>
        </div>}

    </section>
  );
}

export { Movies };