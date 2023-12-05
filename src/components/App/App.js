import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import MoviesApi from "../../utils/MoviesApi.js";
import MainApi from "../../utils/MainApi.js";
import {MOVIES_API_SETTINGS } from '../../utils/constants.js';

import { Header } from '../Header/Header.js';
import { Main } from '../Main/Main.js';
import { Footer } from '../Footer/Footer.js';
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
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [usersMoviesCards, setUsersMoviesCards] = useState([]);

  const [firstPath, setFirstPath] = useState('/');
  const [infoPopup, setInfoPopup] = useState('');
  
  const [moviesCards, setMoviesCards] = useState([]);
  const [filters, setFilters] = useState({});
  const [countCards, setCountCards] = useState(window.screen.width > 768 ? 12 : window.screen.width > 425 ? 8 : 5);
  const [currentViewportWidth, setCurrentViewportWidth] = useState(window.screen.width);
  
  const [error, setError] = useState({});
  
  const navigate = useNavigate();
  const { pathname } = useLocation();

   // фильмы //
  // проверка авторизации пользователя при монтировании, достаём из временного хранилища фильмы
  useEffect(() => {
    setFirstPath(pathname);
    setIsLoading(true);
    MainApi
      .getUserData()
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });

    if (localStorage.getItem('allMovies')) {
      setMoviesCards(JSON.parse(localStorage.getItem('allMovies')));
    }
  }, []);

  // рассчитывает количество колонок при изменении размеров экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width !== currentViewportWidth) {
        setCountCards(window.screen.width > 768 ? 12 : window.screen.width > 425 ? 8 : 5);
        setCurrentViewportWidth(window.screen.width);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentViewportWidth]);

  // получение всех фильмов
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
          image: image ? `${MOVIES_API_SETTINGS.baseUrl}${image.url}` : '',
          trailer: trailerLink,
          thumbnail: image ? `${MOVIES_API_SETTINGS.baseUrl}${image.url}` : '#',
          movieId: id,
          nameRU,
          nameEN,
        }));   
        localStorage.setItem('allMovies', JSON.stringify(allMovies));
        handleFilterAllMovies();
      })  
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }; 

   // фильтрация всех фильмов
   const handleFilterAllMovies = (filters) => {
    if (localStorage.getItem('allMovies')) {
      setIsLoading(true);
      const filteredMovies = getFilteredMovies(JSON.parse(localStorage.getItem('allMovies')), filters) || [];
      setMoviesCards(filteredMovies);
      setIsLoading(false);
    } else {
      getAllMovies('');
    }
  };

  // получение фильмов после фильтра
  const getFilteredMovies = (movies, { text = '', short = false }) => {
    return movies.filter(item => {
      if (short && item.duration > 40) {
        return false;
      }
      for (let key in item) {
        if (item.hasOwnProperty(key) && typeof item[key] === 'string' &&
          item[key].toLowerCase().includes(text.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  };

  // поиск фильмов по слову, их фильтр
  const handleChangeFilters = ({ key, value }) => {
    setFilters(prev => {
      handleFilterAllMovies({ ...prev, [key]: value });
      return { ...prev, [key]: value };
    });
  };

  // добавление новых фильмов в список
  const handleIncCountOfCards = () => {
    setCountCards(prev => {
        return prev + (window.screen.width > 768 ? 3 : 2);
      },
    );
  };

  // лайк фильма, добавление в избранное
  /*const handleSaveMovieCard = (data) => {
    setIsLoading(true);
    MainApi.addMovies(data)
      .then((res) => {
        setUsersMoviesCards(prev => ([...prev, res]));
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        navigate('*');
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };*/

  /*const handleSaveMovieCard = (data) => {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = data.likes.some(id => id === currentUser._id);
    setIsLoading(true);
    if(!isLiked) {
      MainApi.addMovies(data)
      .then((res) => {
        setUsersMoviesCards(prev => ([...prev, res]));
      })
    }
    setIsLoading(true);
    MainApi.addMovies(data)
    .then((newItem) => { 
      setCards((state) => 
      // формируем новый массив на основе имеющегося, подставляя в него новую карточку
      state.map((c) => (c._id === data._id ? newItem : c))
    )}
  
  else {
    MainApi.deleteLike(data._id)
    .then((newItem) => { 
      setCards((state) => 
      state.map((c) => (c._id === data._id ? newItem : c))
    );
    })
    .catch(console.error);
    
  
      .finally(() => {
        setIsLoading(false);
      });
  };*/

  /*const handleCardLike = (card) => {
	  //проверяем, есть ли уже лайк на этой карточке
	   const isLiked = card.likes.some(id => id === currentUser._id);
    // отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id)
      .then((newCard) => { 
        setCards((state) => 
        // формируем новый массив на основе имеющегося, подставляя в него новую карточку
        state.map((c) => (c._id === card._id ? newCard : c))
      );
      }).catch(console.error)
    } else {
      api.deleteLike(card._id)
      .then((newCard) => { 
        setCards((state) => 
        state.map((c) => (c._id === card._id ? newCard : c))
      );
      }).catch(console.error)
    }
  };*/

  // удаление фильма из избранного
  /*const handleDeleteMovieCard = (movieId) => {
    const id = usersMoviesCards.find(item => item.movieId === movieId)._id;
    setIsLoading(true);
    MainApi.deleteMovies(id)
      .then(() => {
        setUsersMoviesCards(prev => prev.filter(item => item._id !== id));
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        navigate('/saved-movies');
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };*/

 /* const handleCardDelete = (cardID) => {
    api.deleteCard(cardID)
    .then(() => {
      // используя методы массива, создаем новый массив карточек, 
      // где не будет карточки, которую мы только что удалили
      setCards((cards) => cards.filter((c) => c._id !== cardID)); 
      // setCards((cards) => cards.filter((id) => id !== cardID));
    }).catch(console.error)
  };*/

  // пользователь
  // регистрация
  const handleRegistration = (data) => {
    setIsLoading(true);
    MainApi.signUp(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        navigate('*');
      },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };
  // авторизация
  const handleAuthorization = (data) => {
    setIsLoading(true);
    MainApi.signIn(data)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        navigate('*');
      },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  // получение списка фильмов пользователя при авторизации
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      MainApi.getMoviesList()
        .then((data) => {
          setUsersMoviesCards(data);
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  // обновление данных пользователя
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    MainApi.setUserData(data)
      .then((res) => {
        setCurrentUser(res);
        setInfoPopup('Данные изменены');
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        navigate('*');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // выход
  const handleSignout = () => {
    setIsLoading(true);
    MainApi.signOut()
      .then(() => {
        setLoggedIn(false)
        localStorage.removeItem('jwt');
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        navigate('/signin');
      },
    )
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleSubmitInfoPopup = () => {
    setInfoPopup('');
  };

  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
    <div className='page'>
    {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && (
      <Header loggedIn={loggedIn}/> 
    )}
      <Routes>
        <Route path='/' element={<Main />} />
  
        <Route path='/movies' element={<Movies
          onChangeFilters={handleChangeFilters}
          moviesCards={moviesCards}
          countCards={countCards}
          onIncCountOfCards={handleIncCountOfCards}
          //onSaveMovieCard={handleSaveMovieCard}
          //onDeleteMovieCard={handleDeleteMovieCard}
          usersMoviesCards={usersMoviesCards} />} 
        />
  
        <Route path='/saved-movies' element={<SavedMovies 
          onChangeFilters={handleChangeFilters}
          moviesCards={moviesCards}
          countCards={countCards}
          onIncCountOfCards={handleIncCountOfCards}
          //onSaveMovieCard={handleSaveMovieCard}
          //onDeleteMovieCard={handleDeleteMovieCard}
          usersMoviesCards={usersMoviesCards} />} 
        />

        <Route path='/profile' element={<Profile onSignOut={handleSignout} onUpdateUser={handleUpdateUser}/>} />
        <Route path='/signup' element={<Register onRegistration={handleRegistration}/>} />
        <Route path='/signin' element={<Login onAuthorization={handleAuthorization}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      {isLoading && <Preloader/>}

      <InfoPopup message={infoPopup} onSubmit={handleSubmitInfoPopup}/>
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export { App };

/*<Route path='/movies' element={
  <ProtectedRoute
    element={Movies}
    onChangeFilters={handleChangeFilters}
    moviesCards={moviesCards}
    countCards={countCards}
    onIncCountOfCards={handleIncCountOfCards}
    onSaveMovieCard={handleSaveMovieCard}
    onDeleteMovieCard={handleDeleteMovieCard} />} 
  />*/