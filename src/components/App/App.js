import './App.css';
import { Route, Routes } from 'react-router-dom';// импортируем Routes
import { useState } from 'react';
/*import { ProtectedRouteElement } from './ProtectedRoute.js'; // импортируем HOC*/
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

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
