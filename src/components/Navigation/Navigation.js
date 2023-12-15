import './Navigation.css';
import { NavLink, Link } from 'react-router-dom';
import profileIcon from '../../images/button/profile_icon.svg';
import useWindowDimensions from '../../hooks/useWindowDimensions.js';

function Navigation({ active, setActive, burgerMenuActive, setBurgerMenuActive }) {

  const isMobileWidth = useWindowDimensions() <= 768;

  const links = [
    {
      path: '/movies',
      label: 'Фильмы',
    },
    {
      path: '/saved-movies',
      label: 'Сохранённые фильмы',
    },
  ];

  function createNavigationLink(path, label) {
    return (
      <li key={label}>
        <NavLink
          className={({ isActive }) =>
            `link navigation__link${(isActive && ' navigation__link_active') || ''}`
          }
          to={path}>
          {label}
        </NavLink>
      </li>
    );
  }

  return (
    <div className={active 
      ? 'navigation active' 
      : 'navigation'} 
      onClick={() => setActive(false)}>
      <nav className='navigation__container' onClick={e => e.stopPropagation()}>
        <ul className='navigation__list'>
          {isMobileWidth && createNavigationLink('/', 'Главная')}
          {links.map(({ path, label }) => createNavigationLink(path, label))}
        </ul>
        
          <Link className='navigation__link navigation__link_type_profile' 
          to={'/profile'}
          >
            Аккаунт
            <img src={profileIcon} alt='белый кружочек'/>
          </Link>
          
      </nav> 
    </div>
  );
};       

export { Navigation };