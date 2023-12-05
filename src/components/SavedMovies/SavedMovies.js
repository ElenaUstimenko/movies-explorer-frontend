import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { MoviesCard } from '../MoviesCard/MoviesCard.js';


function SavedMovies() {
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}

export { SavedMovies };