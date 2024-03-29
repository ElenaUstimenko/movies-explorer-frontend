import './Movies.css';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { moviesApi } from "../../utils/MoviesApi.js";
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { Preloader } from '../Preloader/Preloader.js';
import { useScreen } from '../../hooks/useScreen.js';

import { 
  SHORT_MOVIE_MINUTES, 
  DESKTOP,
  TABLET,
  SMALLTABLET,
  MOBILE,
  DESKTOP_ADD, 
  TABLET_ADD, 
  MOBILE_ADD 
} from '../../utils/constants.js';

function Movies(props) {

  const { 
    loggedIn,
    onLikeCard, 
    onDelete,
    savedCards, 
  } = props;

  const [isLoading, setIsLoading] = useState(false); // процесс загрузки данных
  const [isError, setIsError] = useState({}); // ошибки в инпутах
  const [isSending, setIsSending] = useState(false); // для блокировки формы во время отправки запроса
  const [isErrorCards, setIsErrorCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // строка поиска
  const [filteredCards, setFilteredCards] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const { pathname } = useLocation();

  // отображение определённого количества карточек
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);
  const { isDesktop, isTablet, isSmallTablet, isMobile } = useScreen();

  const handleShowCards = () => {
    if (isDesktop) {
      setVisibleCardsCount(DESKTOP);
    } else if (isTablet) {
      setVisibleCardsCount(TABLET);
    } else if (isSmallTablet) {
      setVisibleCardsCount(SMALLTABLET);
    } else if (isMobile) {
      setVisibleCardsCount(MOBILE);
    }
  };

  useEffect(() => {
    handleShowCards();
  }, [isDesktop, isTablet, isSmallTablet, isMobile]);

  const handleResize = () => {
    handleShowCards();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // добавление карточек по кнопке ещё
  function handleAddMore() {
    if (isDesktop) { 
      setVisibleCardsCount((visibleCardsCount) => visibleCardsCount + DESKTOP_ADD);
    };
    if (isTablet) { 
      setVisibleCardsCount((visibleCardsCount) => visibleCardsCount + TABLET_ADD);
    };
    if (isSmallTablet || isMobile) {
      setVisibleCardsCount((visibleCardsCount) => visibleCardsCount + MOBILE_ADD);
    };
  };   

  // строка поиска
  function handleSearchChange(evt) {
    setSearchQuery(evt.target.value);
  };

  // фильтрация карточек на стороне клиента
  const filterMovies = useCallback(() => {
    const query = searchQuery.toLowerCase();
    
    let filteredMovies = cards.filter((movie) => {
      const movieTitleRU = movie.nameRU.toLowerCase();
      const movieTitleEN = movie.nameEN.toLowerCase();
      return movieTitleRU.includes(query) || movieTitleEN.includes(query);
    });

    if (isShortMovie) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= SHORT_MOVIE_MINUTES);
    }
    setFilteredCards(filteredMovies);
    setIsSubmit(false);
  }, [isSubmit, isShortMovie, cards]);

  // поиск фильмов первый раз с сервера, затем из local storage
  const handleSearchMovies = () => {
    
    if (cards.length !== 0 ) {
      setIsLoading(true);
      setIsSending(true);
    
      filterMovies(searchQuery, isShortMovie, cards);
      localStorage.setItem('search', JSON.stringify(searchQuery));
      localStorage.setItem('isShort', JSON.stringify(isShortMovie));
      localStorage.setItem('movies', JSON.stringify(cards));
       
      setIsLoading(false);
      setIsSending(false);

    } else {
      setIsLoading(true);
      setIsSending(true);
      moviesApi
      .getMovies()
      .then((cards) => {
        setCards(cards);

        filterMovies(searchQuery, isShortMovie, cards);
        localStorage.setItem('search', JSON.stringify(searchQuery));
        localStorage.setItem('isShort', JSON.stringify(isShortMovie));
        localStorage.setItem('movies', JSON.stringify(cards));
      })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
          setIsSending(false);
        });
      }
    };

  useEffect(() => {
    filterMovies();
  }, [filterMovies]);

  useEffect(() => {
    if (localStorage.search && localStorage.isShort && localStorage.movies) {
      const search = JSON.parse(localStorage.search);
      setSearchQuery(search);
      const isShort = JSON.parse(localStorage.isShort);
      setIsShortMovie(isShort);
      const movies = JSON.parse(localStorage.movies);
      setCards(movies);
    } 
  }, []);
   
  // checkbox
  function handleShortMoviesChange() {
    setIsShortMovie(!isShortMovie);
    localStorage.setItem('isShort', JSON.stringify(!isShortMovie));
    filterMovies();
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    if (searchQuery === '') {
      setIsInputError(true);
    } else {
      handleShowCards();
      handleSearchMovies(filteredCards);
      setIsSubmit(true);
      setIsInputError(false);
    }
  };

return (
    <section className='movies'>
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
          ? <p className='movies-error'>Во время запроса произошла ошибка. Возможно, проблема 
            с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.
            </p> 
          : filteredCards.length > 0 
            ? (
              <>
                <MoviesCardList 
                  cards={filteredCards}
                  visibleCardsCount={visibleCardsCount}
                  savedCards={savedCards}
                  onLikeCard={onLikeCard}
                  onDelete={onDelete}
                />
                {visibleCardsCount < filteredCards.length && (
                  <button 
                    className="button movies__button" 
                    onClick={handleAddMore}
                  >
                    Ещё
                  </button>
                )}
              </>
              ) 
            : cards.length !== 0 && pathname === '/movies'
              ? <p className='movies-error'>Ничего не найдено</p>
              : ''
      }
    </section>
  );
};

export { Movies };