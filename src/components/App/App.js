import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRouteElement } from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import MoviesApi from "../../utils/MoviesApi.js";
import {MOVIES_API_SETTINGS } from '../../utils/constants.js';
//import MainApi from "../../utils/MainApi.js";
import { 
  register, 
  login, 
  checkToken, 
  getUserIDInfo, 
  userInformation 
} from '../../utils/MainApi.js';

//import setUserInfo from '../../utils/MainApi.js'

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

import {
  VALIDATION_MESSAGES,
  showDefaultError,
} from '../../utils/validation.js';


function App() {

  const [isLoading, setIsLoading] = useState(false); // процесс загрузки данных
  const [loggedIn, setLoggedIn] = useState(false); // хранение состояния авторизации
  const [usersMoviesCards, setUsersMoviesCards] = useState([]);
  //const [firstPath, setFirstPath] = useState('/');
  const [infoPopup, setInfoPopup] = useState('');
  const [successMessages, setSuccessMessages] = useState('');
  const [error, setError] = useState({});
  const [errorMessages, setErrorMessages] = useState({
    registrationResponse: '',
    authorizationResponse: '',
    updatingUserInfoResponse: '',
    moviesResponse: '',
  });
  
  const [isButtonSaveVisible, setIsButtonSaveVisible] = useState(false); // появление кнопки Сохранить

  const [moviesCards, setMoviesCards] = useState([]);
  const [filters, setFilters] = useState({});
  const [countCards, setCountCards] = useState(window.screen.width > 768 ? 12 : window.screen.width > 425 ? 8 : 5);
  const [currentViewportWidth, setCurrentViewportWidth] = useState(window.screen.width);
  
  
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /*useEffect (() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.getAppInfo()
      .then(([cards, currentUser]) => {
          setCards(cards);
          setCurrentUser({
            name: currentUser.name,
            about: currentUser.about,
            avatar: currentUser.avatar,
            _id: currentUser._id,
            email: currentUser.email,
          })
      }).catch(console.error)
    }
  }, [loggedIn]);*/

  // ПОЛЬЗОВАТЕЛЬ
  // регистрация
  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    console.log(password);
    console.log(email);
    console.log(name);
    return register({ name, email, password })
    .then((res) => { 

      if (res) {
        console.log(res);
        setLoggedIn(true);
        setCurrentUser(res);
        navigate('/signin')
      }
    }).catch(({ status, message }) => {
      setError({ status, message });
      navigate('/signup')
    }).finally(() => {
      // setInfoPopup({ message });
      setIsLoading(false);
    })
  };

  // авторизация
  const handleLogin = ({ email, password }) => {
    console.log(password);
    console.log(email);
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
      }
    }).catch(({ status, message }) => {
      setError({ status, message });
      navigate('/signup');
    }).finally(() => {
      setIsLoading(false);
      //setInfoPopup({ message });
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
            // console.log(res)
          } else {
            navigate('/signin');
          }
        }).catch(({ status, message }) => {
            setError({ status, message });
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
      //console.log(currentUser);
      // user information - обновление стейт переменной из получ.значения
        setCurrentUser({
          name: currentUser.name,
          email: currentUser.email,
          //_id: currentUser._id,
      })
    }).catch(({ status, message }) => {
      setError({ status, message });
    })
    }
  }, []);

  // после завершения запроса обновляем стейт currentUser из полученных данных 
  const handleUpdateUser = ({ name, email }) => {
  setIsLoading(true);
  userInformation({ name, email })
  .then((newProfile) => {
    setCurrentUser(newProfile)
    }).catch(({ status, message }) => {
      setError({ status, message });
    }).finally(() => {
      setIsLoading(false);
      //setInfoPopup({ message });
    });
  };

  const handleSignout = (res) => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/signin');
  };
  

   // фильмы //
  // проверка авторизации пользователя при монтировании, достаём из временного хранилища фильмы
  /*useEffect(() => {
    setFirstPath(pathname);
    setIsLoading(true);
    MainApi
      .getUserInfo()
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
  }, []);*/

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

  // обновление данных пользователя
  /*const handleUpdateUser = (data) => {
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
  };*/

  /*async function updateUserInfo({ email, name }) {
    if (email === currentUser.email && name === currentUser.name) {
      return;
    } else {
      setIsLoading(true);

      try {
        const res = await setUserInfo(email, name);
        if (res.ok) {
          setErrorMessages({ updatingUserInfoResponse: '' });
          setIsButtonSaveVisible(false);
          setSuccessMessages({
            updatingUserInfoResponse: 'Данные профиля успешно обновлены',
          });

          const data = await res.json();
          setCurrentUser(data);
        } else {
          setErrorMessages({
            updatingUserInfoResponse:
              res.status === 500
                ? VALIDATION_MESSAGES.backend[500]
                : res.status === 409
                ? VALIDATION_MESSAGES.backend[409]
                : showDefaultError('обновлении профиля'),
          });
        }
      } catch (err) {
        console.error(
          `Ошибка в процессе редактирования данных пользователя: ${err}`
        );
      } finally {
        setIsLoading(false);
      }
    }
  };*/

  // выход
  /*const handleSignout = () => {
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
  };*/

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

        <Route path='/profile' element={
        <Profile 
          loggedIn={loggedIn}
          setCurrentUser={setCurrentUser}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onSignOut={handleSignout}

          //onUpdate={updateUserInfo}
          isButtonSaveVisible={isButtonSaveVisible}
          setIsButtonSaveVisible={setIsButtonSaveVisible}
          //onLoad={isLoading}
          onSuccessMessages={successMessages}
          setSuccessMessages={setSuccessMessages}
          error={errorMessages}
          setErrorMessages={setErrorMessages}
        />} />

        <Route path='/signup' element={<Register onRegister={handleRegister}/>} />
        <Route path='/signin' element={<Login onLogin={handleLogin}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      {isLoading && <Preloader/>}

      <InfoPopup message={infoPopup} /*onSubmit={}*//>
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export { App };

/*
  <ProtectedRoute
    path='/movies'
    component={Movies}
    onChangeFilters={handleChangeFilters}
    moviesCards={moviesCards}
    countCards={countCards}
    onIncCountOfCards={handleIncCountOfCards}
    onSaveMovieCard={handleSaveMovieCard}
    onDeleteMovieCard={handleDeleteMovieCard} />} 
 */