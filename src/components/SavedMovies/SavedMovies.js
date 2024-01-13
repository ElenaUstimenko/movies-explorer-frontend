import './SavedMovies.css';
import '../Movies/Movies.css';
import { useState, useCallback,  useEffect } from 'react';
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { Preloader } from '../Preloader/Preloader.js';
import { useScreen } from '../../hooks/useScreen.js';
import { SHORT_MOVIE_MINUTES } from '../../utils/constants.js';

function SavedMovies(props) {

  const { 
    loggedIn,
    savedCards, 
    onDelete, 
  } = props;

  const [isLoading, setIsLoading] = useState(false); // процесс загрузки данных
  const [isError, setIsError] = useState({}); // ошибки в инпутах
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);
  const [isErrorCards, setIsErrorCards] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  // отображение определённого количества карточек
  const { isDesktop, isTablet, isSmallTablet, isMobile } = useScreen();

  //отображение карточек
  const handleShowCards = () => {
    if (isDesktop || isTablet || isSmallTablet || isMobile) {
      setVisibleCardsCount(1000);
    }
  };

  useEffect(() => {
    handleShowCards();
  }, [isDesktop, isTablet, isSmallTablet, isMobile]);

  // ввод в строку поиска
  function handleSearchChange(evt) {
    setSearchQuery(evt.target.value);
  };

  // фильтрация карточек
  const filterMovies = useCallback(() => {
    const query = searchQuery.toLowerCase();
    
    let filteredMovies = savedCards.filter((movie) => {
      const movieTitleRU = movie.nameRU.toLowerCase();
      const movieTitleEN = movie.nameEN.toLowerCase();
      return movieTitleRU.includes(query) || movieTitleEN.includes(query);
    });
    if (isShortMovie) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= SHORT_MOVIE_MINUTES);
    }
    setFilteredCards(filteredMovies);
  }, [isSubmit, isShortMovie, savedCards]);

  // поиск по фильмам
  const handleMoviesSearch = () => {
    filterMovies(filteredCards);

    if((error) => {
      setIsError(true);
      console.log(error);
    }); 
  };

  useEffect(() => {
    filterMovies();
  }, [filterMovies]);

  function handleSubmit(evt) {
    setIsLoading(true);
    evt.preventDefault();
    if (searchQuery === '') {
      setIsLoading(false);
      setIsInputError(true);
    } else {
      setIsSubmit(true);
      setIsLoading(false);
      handleMoviesSearch();
      setIsInputError(false);
    }
  };

  // переключение
  function handleShortMoviesChange() {
    setIsShortMovie(!isShortMovie);
    filterMovies(searchQuery, isShortMovie, savedCards);
  };

  return (
    <section className='saved-movies'>
      <SearchForm 
        onSubmit={handleSubmit}
        onChange={handleSearchChange}
        value={searchQuery}
        isError={isInputError}
        isSending={isSending}
        // checkbox
        checked={isShortMovie}
        onCheckboxChange={handleShortMoviesChange}
      />
      {isLoading 
        ? <Preloader />
        : isErrorCards 
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
            : <Preloader /> 
      }
    </section>
  );
};

export { SavedMovies };

//<p className='movies-error'>Ничего не найдено</p>