import './Header.css';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../images/logo/logo-smile.svg';
import { Navigation } from '../Navigation/Navigation.js';
import useWindowDimensions from '../../hooks/useWindowDimensions.js';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu.js';

function Header({ loggedIn, onSignOut }) {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('/signin')
  };
  
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const isMobileWidth = useWindowDimensions() <= 768;

  function renderHeaderMenu() {
    if (isMobileWidth && loggedIn) {
      return (
        <button
          className={`button header__hamburger-button${
            (burgerMenuActive && ' header__hamburger-button_clicked'  && ' header__hamburger-button_opened') || ''
          }`}
          type='button'
          aria-label='меню с навигацией по приложению'
          onClick={() => setBurgerMenuActive(!burgerMenuActive)}
        >
        </button>
      );
    }

    if (!loggedIn) {
      return (
        <div className='header__layout'>		
          <Link className='header__registration link' to={'/signup'}>Регистрация</Link>		
          <button 		
            name='button' type='submit' 		
            className='header__button button'	
            onClick={handleClick}>Войти		
          </button>		 
        </div>		
      );
    }
    return <Navigation />;
  }

  return (
    <>
      <header className={pathname === '/' ? 'header' : 'header-login'}>
      {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && (
        <Link to={'/'}>
          <img
            className='header-logo'
            src={logo}
            alt='белый улыбающийся смайлик на зелёном фоне'
          />
        </Link>
      )}
        {renderHeaderMenu()}
      </header>
     
      {isMobileWidth && (
        <HamburgerMenu
          burgerMenuActive={burgerMenuActive}
          setBurgerMenuActive={setBurgerMenuActive}
        />
      )
      }
    </>
  );
}
 
export { Header };