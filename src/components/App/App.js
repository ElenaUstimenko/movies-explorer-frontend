import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import useValidation from '../../hooks/useValidation.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import { MOVIES_API_SETTINGS } from '../../utils/constants.js';

import { 
  register, 
  login, 
  checkToken, 
  getUserIDInfo, 
  userInformation,
  getAllContent,
  getSavedMovies,
  saveCard,
  deleteCard,
} from '../../utils/MainApi.js';

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

function App() {

  const [isLoading, setIsLoading] = useState(false); // процесс загрузки данных
  const [loggedIn, setLoggedIn] = useState(false); // хранение состояния авторизации
  const [isError, setIsError] = useState({}); // ошибки в инпутах
  const [isEditing, setIsEditing] = useState(false); // режим изменения для редактирования
  const [isSending, setIsSending] = useState(false);
  
  //const [currentViewportWidth, setCurrentViewportWidth] = useState(window.screen.width); // размер экрана
  //const [countCards, setCountCards] = useState(window.screen.width > 768 ? 12 : window.screen.width > 425 ? 8 : 5);
  
  const[savedCards, setSavedCards] = useState([]);

  //const [usersMoviesCards, setUsersMoviesCards] = useState([]);
  //const [moviesCards, setMoviesCards] = useState([]);
  //const [filters, setFilters] = useState({});
  
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // INFO POPUP
  const [infoPopup, setInfoPopup] = useState(false);
  const [infoPopupText, setInfoPopupText] = useState('');

  const closeInfoPopup = () => {
    setInfoPopup(false);
  };

  // FOR FIRST LOADING
  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('jwt');
    if (token){
      return getAllContent(token)
      .then((res) => {
        setLoggedIn(true);
      })
      .catch(error => {
        console.log(error);
      })
    } 
  };

  useEffect(() => {
    if(loggedIn) {
      const token = localStorage.getItem('jwt');
      Promise.all([ getAllContent(token), getSavedMovies(token)])
        .then(([userInfo, movies]) => {
          setCurrentUser(userInfo);
          setSavedCards(movies);
        })
        .catch((error) => console.log(`Ошибка получения данных ${error}`));
      }
  }, [loggedIn]);

  // USER
  const { errors, isValid, handleChange, resetForm, formValue } = useValidation();

  // регистрация
  function handleRegister({ name, email, password }) {
    setIsLoading(true);

    return register({ name, email, password })
    .then((res) => {
      if (res) {
        console.log(res);
        setLoggedIn(true);
        setCurrentUser(res);
        handleLogin({ email, password });
        navigate('/signin');
        setInfoPopup(true);
        setInfoPopupText('Вы успешно зарегистрировались!');
      }
    }).catch(error => {
      navigate('/signup')
      
      if (error === 409) {
        setInfoPopup(true);
        setInfoPopupText('Пользователь с таким email уже существует.')   
      } else if (error === 500) {
        setInfoPopup(true);
        setInfoPopupText('На сервере произошла ошибка.');
      } else {
        setInfoPopup(true);
        setInfoPopupText('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(error)
      }
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  // авторизация
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);

    return login({ email, password })
    .then((res) => {
      console.log(res)
      
      if (res.jwt) {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.jwt)
        console.log(localStorage.getItem('jwt'))
        navigate('/movies')
        setCurrentUser(res);
        setInfoPopup(true);
        setInfoPopupText('Вы успешно вошли!');
      }
    }).catch(error => {
      navigate('/signup');
      if (error === 401) {
        setInfoPopup(true);
        setInfoPopupText('Вы ввели неправильный логин или пароль.')   
      } else if (error === 500) {
        setInfoPopup(true);
        setInfoPopupText('На сервере произошла ошибка.')   
      } else {
        setInfoPopup(true);
        setInfoPopupText('Что-то пошло не так! Попробуйте ещё раз.');  
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };

  // вызывается при монтировании и отправляет запрос checkToken если jwt есть в хранилище
  useEffect (() => {
    const token = localStorage.getItem('jwt');
      if(token) {
        checkToken(token)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            navigate('/movies');
          } else {
            navigate('/signin');
          }
        }).catch(({ status, message }) => {
          setIsError({ status, message });
          })
          }
  }, []);

  // стейт, отвечающий за данные пользователя
  const [currentUser, setCurrentUser] = useState({});

  // вызывается при монтировании компонента 
  // совершает запрос в API за пользовательскими данными
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      getUserIDInfo()
      .then((currentUser) => {
        setCurrentUser({
          name: currentUser.name,
          email: currentUser.email,
          _id: currentUser._id,
        })
      }).catch(({ status, message }) => {
        setIsError({ status, message });
      })
    }
  }, []);

  // редактирование профиля 
  const handleUpdateUser = ({ name, email }) => {
    setIsLoading(true);
    userInformation({ name, email })
    .then(({ name, email }) => {
      setCurrentUser({ ...currentUser, name, email });
      setInfoPopup(true);
      setInfoPopupText('Данные успешно отредактированы!');
    }).catch(error => {
      if (error === 409) {
        setInfoPopup(true);
        setInfoPopupText('Пользователь с таким email уже существует.')   
      } else if (error === 500) {
        setInfoPopup(true);
        setInfoPopupText('На сервере произошла ошибка.')   
      } else {
        setInfoPopup(true);
        setInfoPopupText('Что-то пошло не так! Попробуйте ещё раз.');
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };

  // режим редактирования
  const handleEditClick = () => {
    setIsEditing(true);
    setIsError(false);
  };

  // выход из профиля
  const handleSignout = (res) => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/signin');
  };
  
  // MOVIES
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);

  // рассчитывает количество колонок при изменении размеров экрана
  /*useEffect(() => {
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
  }, [currentViewportWidth]);*/

  /*const handleShowCards = () => {
    if (window.screen.width !== currentViewportWidth) {
      setCountCards(window.screen.width > 768 ? 12 : window.screen.width > 425 ? 8 : 5);
      setCurrentViewportWidth(window.screen.width);
    }
  };

  useEffect(() => {
    handleShowCards();
  }, [currentViewportWidth]);

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
  if (window.screen.width > 768) {
    setVisibleCardsCount(
      (visibleCardsCount) => visibleCardsCount + 3
    );
  }
  if (window.screen.width > 425 || window.screen.width < 425) {
    setVisibleCardsCount(
      (visibleCardsCount) => visibleCardsCount + 2
    );
  }
};
*/


  // получение всех фильмов, их поиск
 /* const getAllMovies = () => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((cards) => {
        const allMovies = cards.map(({
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

   // фильтрация всех фильмов +
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

  // получение фильмов после фильтра +
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

  // поиск фильмов по слову, их фильтр +
  const handleChangeFilters = ({ key, value }) => {
    setFilters(prev => {
      handleFilterAllMovies({ ...prev, [key]: value });
      return { ...prev, [key]: value };
    });
  };

  // добавление новых фильмов в список +
  const handleIncCountOfCards = () => {
    setCountCards(prev => {
        return prev + (window.screen.width > 768 ? 3 : 2);
      },
    );
  };*/

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
  // получение списка фильмов пользователя при авторизации
  /*useEffect(() => {
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
  }, [loggedIn]);*/
  

  // сохранение карточки и удаление из списка сохранённых
  function handleSaveCard(data) {
    const isSaved = savedCards.some(item => item.movieId === data.id)
    const token = localStorage.getItem('jwt');
    if(isSaved) {
      const cardToDelete = savedCards.find((card) => card.movieId === data.id)
      handleCardDelete(cardToDelete);
    } else {
      return saveCard(data, token)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards])
      })
      .catch((error) => console.log(error))
    }  
  };

  function handleCardDelete(card) {
    const token = localStorage.getItem('jwt');
    return deleteCard(card._id, token)
    .then(() => {
      setSavedCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((error => console.log(error)))
  };

  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
    <div className='page'>
    {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && (
      <Header loggedIn={loggedIn} /> 
    )}
      <Routes>
        <Route path='/' element={<Main />} />
  
        <Route path='/movies' element={
          <ProtectedRoute
          element={Movies}
          isLoading={isLoading}
          isSending={isSending}
          setIsLoading={setIsLoading}
          setIsSending={setIsSending}
          isError={isError}
          onSaveCard={handleSaveCard}
          loggedIn={loggedIn}
          setIsError={setIsError}
          savedCards={savedCards}
          //handleAddMore={handleAddMore}
          />}
        />
  
        <Route path='/saved-movies' element={
          <ProtectedRoute
           element={SavedMovies} 
           savedCards={savedCards}
           onDelete={handleCardDelete}
           isError={isError}
           loggedIn={loggedIn}
          />} 
        />

        <Route path='/profile' element={
          <ProtectedRoute
            element={Profile}
            isLoading={isLoading}
            setCurrentUser={setCurrentUser}
            onUpdateUser={handleUpdateUser}
            onSignOut={handleSignout}
            isError={isError}
            setIsError={setIsError}
            isEditing={isEditing}
            isSending={isSending}
            onEditClick={handleEditClick}
          />} />

        <Route path='/signup' element={
          <Register 
            onRegisterUser={handleRegister} 
            isError={isError}
            setIsError={setIsError}
          />} />

        <Route path='/signin' element={
          <Login 
            onLoginUser={handleLogin} 
            isError={isError}
            setIsError={setIsError} 
          />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      {isLoading && <Preloader/>}

      <InfoPopup 
        isOpen={infoPopup}
        title={infoPopupText} 
        onSubmit={closeInfoPopup}
      />
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export { App };