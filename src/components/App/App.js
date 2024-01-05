import './App.css';
import { useState, useEffect } from 'react';
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
  addLike, // new
  deleteLike, // new
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
    navigate('/signin');
  };

  // MOVIES
  // сохранение карточки и удаление из списка сохранённых на вкладке movies

  // new
  /*function handleSaveCard(card, currentUser) {
    setIsLoading(true);
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = savedCards.likes.some(id => id item => item.owner._id === card./*currentUser._id);
    debugger;
    console.log('was it liked before? ', isLiked); 

    if (!isLiked) {
      return addLike(card._id)
      .then((newCard) => { 
        setSavedCards((state) => 
        // формируем новый массив на основе имеющегося, подставляя в него новую карточку
        state.map((c) => (c._id === card._id ? newCard : c))
      );
      }).catch((error) => console.log('Ошибка при сохранении фильма', error))
    } else {
      return deleteLike(card._id)
      .then((newCard) => { 
        setSavedCards((state) => 
        state.map((c) => (c._id === card._id ? newCard : c))
      );
  
      /*const cardToDelete = savedCards.find((item) => item.nameEN === card.nameEN) //
      console.log('card to delete: ', cardToDelete);
      handleCardDelete(cardToDelete);
    } else {
      return saveCard(card, token)
      .then((newCard) => {
        setSavedCards([
          {
            country: card.country,
            director: card.director,
            duration: card.duration,
            description: card.description,
            year: card.year,
            image: `https://api.nomoreparties.co${card.image.url}`,
            trailerLink: card.trailerLink,
            thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
            nameRU: card.nameRU,
            nameEN: card.nameEN,
            _id: newCard.message,
          },
          ...savedCards]);
        console.log('[newCard, ...savedCards]: ', [newCard, ...savedCards]);
      })
      .catch((error) => console.log('Ошибка при удалении фильма', error))
      .finally(() => {
        setIsLoading(false);
      });
    }
  };*/


  function handleSaveCard(card) {
    console.log('card to handleSaveCard:', card);
    
    setIsLoading(true);
    const token = localStorage.getItem('jwt');
    const isLiked = savedCards.some(item => item.nameEN/*movieId*/ === card.nameEN/*_id*/) // card._id underfined
    // debugger;
    // правильно работает если item.nameEN === card.nameEN
    // true всегда если item.movieId === card._id
    // false всегда если не через item.nameEN === card.nameEN
    console.log('was it liked before? ', isLiked); 
    console.log('savedCards to check:', savedCards);
    
    if(isLiked) {
      // item.movieId === card.movieId удаляется последняя добавленная
      // item.movieId === card._id удаляется последняя добавленная

      const cardToDelete = savedCards.find((item) => item.movieId === card._id) // card._id underfined
      console.log('card to delete: ', cardToDelete);
      // debugger;
      handleCardDelete(cardToDelete);
    } else {
      return saveCard(card, token)
      .then((newCard) => {
        setSavedCards([
          {
            country: card.country,
            director: card.director,
            duration: card.duration,
            description: card.description,
            year: card.year,
            image: `https://api.nomoreparties.co${card.image.url}`,
            trailerLink: card.trailerLink,
            thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
            nameRU: card.nameRU,
            nameEN: card.nameEN,
            _id: newCard._id,
          },
          ...savedCards]);
        console.log('[newCard, ...savedCards]: ', [newCard, ...savedCards]);
      })
      .catch((error) => console.log('Ошибка при сохранении фильма', error))
      .finally(() => {
        setIsLoading(false);
      });
    }  
  };

  // на вкладке saved-movies
  function handleCardDelete(card) {
    setIsLoading(true);
    const token = localStorage.getItem('jwt');
    console.log('card._id to delete on /saved-movies:', card._id);
    return deleteCard(card._id, token)
    .then(() => {
      setSavedCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((error => console.log('Ошибка при удалении фильма', error)))
    .finally(() => {
      setIsLoading(false);
    });
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
            onSaveCard={handleSaveCard}
            loggedIn={loggedIn}
            setIsError={setIsError}
            savedCards={savedCards}
          />} 
        />

        <Route path='/saved-movies' element={
          <ProtectedRoute
            element={SavedMovies}
            isLoading={isLoading}
            isSending={isSending}
            setIsLoading={setIsLoading}
            setIsSending={setIsSending} 
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