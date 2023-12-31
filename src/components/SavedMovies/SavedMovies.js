import './SavedMovies.css';
import { Header } from '../Header/Header.js';
import { SearchForm } from '../SearchForm/SearchForm.js';
import { Footer } from '../Footer/Footer.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { MoviesCard } from '../MoviesCard/MoviesCard.js';


function SavedMovies() {
  return (
    <section className="saved-movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  );
}

export { SavedMovies };