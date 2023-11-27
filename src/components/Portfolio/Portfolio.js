import './Portfolio.css';
import arrow from '../../images/arrow.svg'

function Portfolio() {
  return (
    <div className="portfolio">
      <ul className="portfolio__links">
        <h5 className="portfolio__title">Портфолио</h5>
        <li className="portfolio__link">
          <p className="portfolio__link_text">Статичный сайт</p>
          <a
            className="link"
            href="https://github.com/ElenaUstimenko/how-to-learn/"
            rel="noreferrer"
            target="_blank"
          >
            <img 
              className="portfolio__link_arrow"
              src={arrow}
              alt="белая стрелка, направленная в верхний правый угол"
            />
          </a>
        </li>
        <li className="portfolio__link">
          <p className="portfolio__link_text">Адаптивный сайт</p>
          <a
            className="link"
            href="https://github.com/ElenaUstimenko/russian-travel/"
            rel="noreferrer"
            target="_blank"
          >
            <img 
              className="portfolio__link_arrow"
              src={arrow}
              alt="белая стрелка, направленная в верхний правый угол"
            />
          </a>
        </li>
        <li className="portfolio__link">
          <p className="portfolio__link_text">Одностраничное приложение</p>
          <a
            className="link"
            href="https://github.com/ElenaUstimenko/react-express-mesto-full/"
            rel="noreferrer"
            target="_blank"
          >
            <img 
              className="portfolio__link_arrow"
              src={arrow}
              alt="белая стрелка, направленная в верхний правый угол"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}

export { Portfolio };