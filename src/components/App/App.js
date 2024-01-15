import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import { 
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
  const [isError, setIsError] = useState({}); // ошибки в инпутах
  const [savedCards, setSavedCards] = useState([]);
  
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // INFO POPUP
  const [infoPopup, setInfoPopup] = useState(false);
  const [infoPopupText, setInfoPopupText] = useState('');

  const closeInfoPopup = () => {
    setInfoPopup(false);
  };

  // FOR FIRST LOADING
  const initialLoggedIn = !!localStorage.getItem('jwt');
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn); // хранение состояния авторизации
  
  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('jwt');
    if(token) {
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
    // console.log('handleCardDelete card', card)
    const token = localStorage.getItem('jwt');
    const cardToDelete = savedCards.find(c => c.id === card.id)
    return deleteCard(cardToDelete._id, token)
    .then(() => {
      setSavedCards((state) => state.filter((c) => c.id !== card.id));
    })
    .catch((error => console.log('Ошибка при удалении фильма', error)))
  };

  const render = (loggedIn) => {
    if(loggedIn) {
      navigate('/');
      }
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
            setLoggedIn={setLoggedIn}
            isError={isError}
            setIsError={setIsError}
            userInformation={userInformation}
            setCurrentUser={setCurrentUser}
            setInfoPopup={setInfoPopup}
            setInfoPopupText={setInfoPopupText}
          />} />
        
        <Route path='/signup' element={loggedIn 
          ? ( <Navigate to='/' replace /> ) 
          : ( 
          <Register
            setIsError={setIsError}
            setInfoPopup={setInfoPopup}
            setInfoPopupText={setInfoPopupText}
          />)} 
        />
        
        <Route path='/signin' element={loggedIn 
          ? ( <Navigate to='/' replace /> ) 
          : ( 
          <Login 
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setCurrentUser={setCurrentUser}
            setIsError={setIsError} 
            setInfoPopup={setInfoPopup}
            setInfoPopupText={setInfoPopupText}
          />)}
        />

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