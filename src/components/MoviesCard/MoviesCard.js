import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';
import movie from '../../images/картинка.webp';

function MoviesCard() {
  const { pathname } = useLocation();
  
  return (
    <li className="movies-card">
      <Link to='' target='_blank'>
        <img
          className="movies-card__picture"
          src={movie}
          alt={`постер фильма ${movie.title}`}
        />
      </Link>
      <div className="movies-card__name">
        <h6 className="movies-card__title">Movie`s name</h6>
        {(pathname ==='/movies') && (
          <button 
          name="button" type="submit" 
          className="movies-card__dislike movies-card__button"
          >
          </button>
        )}
        {(pathname ==='/saved-movies') && (
          <button 
          name="button" type="submit"
          className="movies-card__delete movies-card__button"
          >
          </button>
        )}
      </div>
      <p className="movies-card__time">1ч 42м</p>
     
    </li>
  );
}

export { MoviesCard };