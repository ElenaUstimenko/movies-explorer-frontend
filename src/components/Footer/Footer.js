import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const { pathname } = useLocation();

  return (
    <>
      {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && (
        <footer className='footer'>
          <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>

          <div className='footer-info'>
            <p className='footer-info__date'>© 2023</p>
            <div className='footer-info__links'> 
              <a 
                className='footer-info__school link'
                href='https://practicum.yandex.ru/'
                rel='noreferrer'
                target='_blank'
              >Яндекс.Практикум</a>
              <a 
                className='footer-info__github link'
                href='https://github.com/ElenaUstimenko/'
                rel='noreferrer'
                target='_blank'
                >Github</a>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}

export { Footer };