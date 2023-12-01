import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { MoviesApi } from "../../utils/MoviesApi.js";
import MainApi from "../../utils/MainApi.js";
import {MOVIES_API_SETTINGS } from '../../utils/constants.js';


import { Main } from '../Main/Main.js';
import { Movies } from '../Movies/Movies.js';
import { SavedMovies } from '../SavedMovies/SavedMovies.js';
import { Profile } from '../Profile/Profile.js';
import { Register } from '../Register/Register.js';
import { Login } from '../Login/Login.js';
import { NotFound } from '../NotFound/NotFound.js';
import { InfoPopup } from '../InfoPopup/InfoPopup.js';
import { Preloader } from '../Preloader/Preloader.js';
import { Navigation } from '../Navigation/Navigation.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [moviesCards, setMoviesCards] = useState([]);
  const [filters, setFilters] = useState({});
  const [countCards, setCountCards] = useState(window.screen.width > 768 ? 12 : window.screen.width > 400 ? 8 : 5);

  // получение всех фильмов
  // фильтр
  const getFilteredMovies = (movies, { text = "", short = false }) => {
    return movies.filter(item => {
      if (short && item.duration > 40) {
        return false;
      }
      for (let key in item) {
        if (item.hasOwnProperty(key) && typeof item[key] === "string" &&
          item[key].toLowerCase().includes(text.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  };

  // получение
  const getAllMovies = () => {
    setIsLoading(true);
    MoviesApi.getMovies()
      .then((data) => {
        const allMovies = data.map(({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          thumbnail,
          id,
          nameRU,
          nameEN,
        }) => ({
          country,
          director,
          duration,
          year,
          description,
          image: image ? `${MOVIES_API_SETTINGS.baseUrl}${image.url}` : "",
          trailer: trailerLink,
          thumbnail: image ? `${MOVIES_API_SETTINGS.baseUrl}${image.url}` : "#",
          movieId: id,
          nameRU,
          nameEN,
        }));   
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
        handleFilterAllMovies();
      })  
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }; 

  // фильтрация всех фильмов
  const handleFilterAllMovies = (filters) => {
    if (localStorage.getItem("allMovies")) {
      setIsLoading(true);
      const filteredMovies = getFilteredMovies(JSON.parse(localStorage.getItem("allMovies")), filters) || [];
      setMoviesCards(filteredMovies);
      setIsLoading(false);
    } else {
      getAllMovies("");
    }
  };

  // обработчик изменения фильтров
  const handleChangeFilters = ({ key, value }) => {
    setFilters(prev => {
      handleFilterAllMovies({ ...prev, [key]: value });
      return { ...prev, [key]: value };
    });
  };

  // обработчик добавления новых фильмов в список
  const handleIncCountOfCards = () => {
    setCountCards(prev => {
        return prev + (window.screen.width > 768 ? 3 : 2);
      },
    );
  };

  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
    <div className="page">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      {isLoading && <Preloader/>}
     
    </div>
    </CurrentUserContext.Provider>
  );
}

export { App };


/*<Route path='/movies' element={<Movies />
          /*<ProtectedRoute 
            element={Movies}
            /*condition={loggedIn}*/
            /*moviesCards={moviesCards}
            //usersMoviesCards={usersMoviesCards}
            /*countCards={countCards}
            //onSaveMovieCard={handleSaveMovieCard}
            //onDeleteMovieCard={handleDeleteMovieCard}
            onIncCountOfCards={handleIncCountOfCards}
            onChangeFilters={handleChangeFilters} />*/
         /*/>*/
