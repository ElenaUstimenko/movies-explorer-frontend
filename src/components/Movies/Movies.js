import './Movies.css';
import { useState, useEffect, useCallback } from 'react';
import { moviesApi } from "../../utils/MoviesApi.js";
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { Preloader } from '../Preloader/Preloader.js';
import { useScreen } from '../../hooks/useScreen.js';

function Movies({
  isLoading,
  isSending,
  setIsLoading,
  setIsSending,
  onSaveCard, 
  setIsError, 
  savedCards,
  isLiked,
  setIsLiked,
 }) {

  const [isErrorCards, setIsErrorCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // строка поиска
  const [filteredCards, setFilteredCards] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isInputError, setIsInputError] = useState(false);

  // отображение определённого количества карточек
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);
  const { isDesktop, isTablet, isSmallTablet, isMobile } = useScreen();

  const handleShowCards = () => {
    if (isDesktop) {
      setVisibleCardsCount(12);
    } else if (isTablet) {
      setVisibleCardsCount(9);
    } else if (isSmallTablet) {
      setVisibleCardsCount(8);
    } else if (isMobile) {
      setVisibleCardsCount(5);
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
      setVisibleCardsCount((visibleCardsCount) => visibleCardsCount + 4);
    };
    if (isTablet) { 
      setVisibleCardsCount((visibleCardsCount) => visibleCardsCount + 3);
    };
    if (isSmallTablet || isMobile) {
      setVisibleCardsCount((visibleCardsCount) => visibleCardsCount + 2);
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
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
    }
    setFilteredCards(filteredMovies);
  }, [isShortMovie, cards]);

  // поиск фильмов
  const handleSearchMovies = () => {
    setIsLoading(true);
    setIsSending(true);
    moviesApi
      .getMovies()
      .then((cards) => {
        setCards(cards);
        // при получении фильмов добавить для каждого id
      cards.forEach.

        filterMovies(searchQuery, isShortMovie, cards);
        localStorage.setItem('search', JSON.stringify(searchQuery));
        localStorage.setItem('isShort', JSON.stringify(isShortMovie));
        localStorage.setItem('movies', JSON.stringify(cards));
        setIsSending(false);
      })
        .catch((error) => {
          setIsError(true);
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
      handleSearchMovies(filteredCards);
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
                  onSaveCard={onSaveCard}
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
            : (
              <p className='movies-error'>Ничего не найдено</p>
            )
      }
    </section>
  );
};

export { Movies };