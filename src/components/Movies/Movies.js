import './Movies.css';
import { Header } from '../Header/Header.js';
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { Footer } from '../Footer/Footer.js';

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
    <section className="movies">
      <Header />
      <SearchForm 
        onChangeFilters={onChangeFilters}/>
      <MoviesCardList 
        moviesCards={moviesCards}
        usersMoviesCards={usersMoviesCards}
        countCards={countCards}
        onSaveMovieCard={onSaveMovieCard}
        onDeleteMovieCard={onDeleteMovieCard}/>

      {((moviesCards && moviesCards.length) || 0) > countCards &&
        <div className="movies__more">
          <button className="button movies__button" 
            onClick={onIncCountOfCards}
            >Ещё
          </button>
        </div>}

      <Footer />
    </section>
  );
}

export { Movies };