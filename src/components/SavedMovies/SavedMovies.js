import './SavedMovies.css';
import '../Movies/Movies.css'
import { useState, useCallback,  useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { Preloader } from '../Preloader/Preloader.js';


function SavedMovies({ 
  savedCards, 
  onDelete, 
  isError 
  }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);

  // ввод в строку поиска
  function handleSearchChange(evt) {
    setSearchQuery(evt.target.value);
  }

  // фильтрация карточек
  const filterMovies = useCallback(() => {
    const query = searchQuery.toLowerCase();
    let filteredMovies = savedCards.filter((movie) => {
      const movieTitleRU = movie.nameRU.toLowerCase();
      const movieTitleEN = movie.nameEN.toLowerCase();
      return movieTitleRU.includes(query) || movieTitleEN.includes(query);
    });
    if (isShortMovie) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
    }
    setFilteredCards(filteredMovies);
  }, [searchQuery, savedCards, isShortMovie]);

  // поиск по фильмам
  const handleMoviesSearch = () => {
    filterMovies(filteredCards);
  };

  useEffect(() => {
    filterMovies();
  }, [filterMovies]);

  // сабмит
  function handleSubmit(evt) {
    evt.preventDefault();
    handleMoviesSearch();
  }

  //  переключение
  function handleShortMoviesChange() {
    setIsShortMovie(!isShortMovie);
    filterMovies(isShortMovie, searchQuery, savedCards);
  }


  return (
    <section className='saved-movies'>
      <SearchForm 
        onSubmit={handleSubmit}
        onChange={handleSearchChange}
        value={searchQuery}
        checked={isShortMovie}
        onCheckboxChange={handleShortMoviesChange}
      />
      {isLoading 
        ? (<Preloader />)
        : isError 
          ? (<p className='movies-error'>Во время запроса произошла ошибка. Возможно, проблема 
            с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.
            </p>) 
          : filteredCards.length > 0 
            ? (
              <>
                <MoviesCardList 
                  savedCards={filteredCards}
                  visibleCardsCount={visibleCardsCount}
                  onDelete={onDelete}
                />
              </>)
            : (<p className='movies-error'>Ничего не найдено</p>)
      }
    </section>
  );
};

export { SavedMovies };