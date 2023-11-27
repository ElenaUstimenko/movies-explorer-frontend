import './Movies.css';
import { Header } from '../Header/Header.js';
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { Footer } from '../Footer/Footer.js';

function Movies() {
  return (
    <div className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export { Movies };
