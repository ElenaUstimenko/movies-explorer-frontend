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
  moviesCards,
  usersMoviesCards,
  countCards,
  onIncCountOfCards,

  //handleAddMore,
  isError, 
  onSaveCard, 
  loggedIn, 
  setIsError, 
  savedCards,
 }) {

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);

  const { isDesktop, isTablet, isMobile } = useScreen();

  // отображение определённого количества карточек
  const handleShowCards = () => {
    if (isDesktop) {
      setVisibleCardsCount(12);
    } else if (isTablet) {
      setVisibleCardsCount(8);
    } else if (isMobile) {
      setVisibleCardsCount(5);
    }
  };

  useEffect(() => {
    handleShowCards();
  }, [isDesktop, isTablet, isMobile]);

  let timer = setTimeout(handleShowCards, 30000);

  const handleResize = () => {
    clearTimeout(timer);
    timer = setTimeout(handleShowCards, 30000);
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
      setVisibleCardsCount(
        (visibleCardsCount) => visibleCardsCount + 3
      );
    }
    if (isTablet || isMobile) {
      setVisibleCardsCount(
        (visibleCardsCount) => visibleCardsCount + 2
      );
    }
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
    console.log('filteredMovies', filteredMovies)
    console.log('filteredCards', filteredCards)
  }, [searchQuery, isShortMovie, cards]);

  // получение всех фильмов
  const handleSearchMovies = () => {
    setIsSending(true);
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((cards) => {
        setCards(cards);
        filterMovies(searchQuery, isShortMovie, cards);
        localStorage.setItem('search', JSON.stringify(searchQuery));
        localStorage.setItem('isShort', JSON.stringify(isShortMovie));
        localStorage.setItem('movies', JSON.stringify(cards));
        setIsSending(false);
      })
        .catch((error) => {
          setIsError(true);
          console.log(error);
          setIsSending(false);
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

  // сабмит
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
        checked={isShortMovie}
        onCheckboxChange={handleShortMoviesChange}
        isError={isInputError}
        isSending={isSending}
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
                  moviesCards={moviesCards}
                  countCards={countCards}
                  usersMoviesCards={usersMoviesCards}
                  cards={filteredCards}
                  visibleCardsCount={visibleCardsCount}
                  savedCards={savedCards}
                  onSaveCard={onSaveCard}
                />
        
                {visibleCardsCount < filteredCards.length && (
                  <div className='movies__more'>
                    <button className='button movies__button'
                      onClick={handleAddMore}
                    >Ещё
                    </button>
                  </div>
                )}
              </>) 
            : (<p className='movies-error'>Ничего не найдено</p>)
      }
    </section>
  );
};

export { Movies };

/*{((moviesCards && moviesCards.length) || 0) > countCards &&
  <div className='movies__more'>
    <button className='button movies__button'
      onClick={onIncCountOfCards}
      >Ещё
    </button>
  </div>}*/
