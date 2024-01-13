import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import useValidation from '../../hooks/useValidation.js';

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

function App() {
  
  const [isLoading, setIsLoading] = useState(false); // процесс загрузки данных
  const [loggedIn, setLoggedIn] = useState(false); // хранение состояния авторизации
  const [isError, setIsError] = useState({}); // ошибки в инпутах
  const [isEditing, setIsEditing] = useState(false); // режим изменения для редактирования
  const [isSending, setIsSending] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ОШИБКА 1
  // После каждой выдачи попапа происходит перезагрузка приложения. Такого эффекта в SPA не должно быть.
  // => перекидывает на /, как исправить?

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
    if (token) {
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
    setIsLoading(true);
    if(loggedIn) {
      const token = localStorage.getItem('jwt');
      Promise.all([ getAllContent(token), getSavedMovies(token)])
        .then(([userInfo, savedMovies]) => {
          setCurrentUser(userInfo);
          setSavedCards(savedMovies);
        })
        .catch((error) => console.log(`Ошибка получения данных ${error}`))
        .finally(() => {
          setIsLoading(false);
        })
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
      }
    }).catch(error => {

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

  // стейт, отвечающий за данные пользователя
  const [currentUser, setCurrentUser] = useState({});

  // вызывается при монтировании
  // совершает запрос к API за пользовательскими данными
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
    localStorage.removeItem('search');
    localStorage.removeItem('isShort');
    localStorage.removeItem('movies');
    navigate('/');
  };

  // MOVIES
  // лайк карточки, её сохранение на вкладке movies
  const handleSaveCard = useCallback((card) => {
    const token = localStorage.getItem('jwt');
    return saveCard(card, token)
    .then((newCard) => {
      setSavedCards(prev => ([
        newCard,
        ...prev]));
      console.log('[newCard, ...savedCards]: ', [newCard, ...savedCards]);
    })
    .catch((error) => console.log('Ошибка при сохранении фильма', error))
  }, [savedCards]);

  // удаление карточки
  function handleCardDelete(card) {
    console.log('handleCardDelete card', card)
    const token = localStorage.getItem('jwt');
    const cardToDelete = savedCards.find(c => c.id === card.id)
    return deleteCard(cardToDelete._id, token)
    .then(() => {
      setSavedCards((state) => state.filter((c) => c.id !== card.id));
    })
    .catch((error => console.log('Ошибка при удалении фильма', error)))
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
            onLikeCard={handleSaveCard}
            onDelete={handleCardDelete}
            loggedIn={loggedIn}
            savedCards={savedCards}
          />} 
        />

        <Route path='/saved-movies' element={
          <ProtectedRoute
            element={SavedMovies}
            savedCards={savedCards}
            onDelete={handleCardDelete}
            loggedIn={loggedIn}
          />} 
        />

        <Route path='/profile' element={
          <ProtectedRoute
            element={Profile}
            loggedIn={loggedIn}
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