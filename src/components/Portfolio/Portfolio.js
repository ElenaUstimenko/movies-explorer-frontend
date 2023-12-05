import './Portfolio.css';
import arrow from '../../images/arrow.svg'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h5 className='portfolio__title'>Портфолио</h5>
      <ul className='portfolio__links'>
        <li className='portfolio__item'>
          <a
            className='link portfolio__link'
            href='https://github.com/ElenaUstimenko/how-to-learn/'
            rel='noreferrer'
            target='_blank'
          >
            <p className='portfolio__text'>Статичный сайт</p>
            <img 
              className='portfolio__arrow'
              src={arrow}
              alt='белая стрелка, направленная в верхний правый угол'
            />
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='link portfolio__link'
            href='https://github.com/ElenaUstimenko/russian-travel/'
            rel='noreferrer'
            target='_blank'
          >
            <p className='portfolio__text'>Адаптивный сайт</p>
            <img 
              className='portfolio__arrow'
              src={arrow}
              alt='белая стрелка, направленная в верхний правый угол'
            />
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='link portfolio__link'
            href='https://github.com/ElenaUstimenko/react-express-mesto-full/'
            rel='noreferrer'
            target='_blank'
          >
            <p className='portfolio__text'>Одностраничное приложение</p>
            <img 
              className='portfolio__arrow'
              src={arrow}
              alt='белая стрелка, направленная в верхний правый угол'
            />
          </a>
        </li>
      </ul>
    </section>
  );
}

export { Portfolio };