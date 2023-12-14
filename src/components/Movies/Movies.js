import { useState, useEffect, useCallback } from 'react';
import { moviesApi } from "../../utils/MoviesApi.js";
import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm.js';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList.js';
import { Preloader } from '../Preloader/Preloader.js';

function Movies({
  //onChangeFilters,
  //moviesCards,
  //usersMoviesCards,
  countCards,
  onIncCountOfCards,
  //onSaveMovieCard,
  //onDeleteMovieCard,
  isError, 
  onSave, 
  loggedIn, 
  setIsError, 
  savedCards
 }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);
  const [isSending, setIsSending] = useState(false);

  // фильтрация карточек
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
  }, [searchQuery, cards, isShortMovie]);

  // строка поиска
  function handleSearchChange(evt) {
    setSearchQuery(evt.target.value);
  };

  // получение фильмов, их поиск
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
        //onChangeFilters={onChangeFilters}
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
          ? (<p className='movies-error'>Во время запроса произошла ошибка. 
              Возможно, проблема с соединением или сервер недоступен. 
              Подождите немного и попробуйте ещё раз.
            </p>) 
          : filteredCards.length > 0 
            ? (
              <>
                <MoviesCardList 
                  //moviesCards={moviesCards}
                  countCards={countCards}
                  //usersMoviesCards={usersMoviesCards}
                  //onSaveMovieCard={onSaveMovieCard}
                  //onDeleteMovieCard={onDeleteMovieCard}
                  cards={filteredCards}
                  visibleCardsCount={visibleCardsCount}
                  savedCards={savedCards}
                  onSave={onSave}
                />
        
                {visibleCardsCount < filteredCards.length && (
                  <div className='movies__more'>
                    <button className='button movies__button'
                      onClick={onIncCountOfCards}
                      //onClick={handleRowAdd}
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
