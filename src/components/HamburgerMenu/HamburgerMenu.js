import { useEffect } from 'react';
import { Navigation } from '../Navigation/Navigation.js';

function HamburgerMenu({
  burgerMenuActive,
  setBurgerMenuActive,
  }) {

  useEffect(() => {
    const body = document.body;

    burgerMenuActive
      ? body.classList.add('page_no-scroll')
      : body.classList.remove('page_no-scroll');
  }, [burgerMenuActive]);


  return (
      <div
        className={`hamburger-menu${
          (burgerMenuActive && ' hamburger-menu_opened') || ""}`}>

        <div className='hamburger-menu__container'>
          <Navigation active={burgerMenuActive} setActive={setBurgerMenuActive} />
        </div>

      </div>
  );
}

export { HamburgerMenu };