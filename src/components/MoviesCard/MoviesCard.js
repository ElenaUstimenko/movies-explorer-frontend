import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';

function MoviesCard({ data, saved, onSaveMovieCard, onDeleteMovieCard }) {
  const { pathname } = useLocation();
  
  const { image, trailer, nameRU, duration, movieId} = data;

  const handleClick = () => {
    if (!saved) {
      onSaveMovieCard(data);
    } else {
      onDeleteMovieCard(movieId);
    }
  };

  // корректное отображение длительности фильма
  function countTime(duration) {
    const time = duration / 60;
    const hours = Math.floor(time);
    const minutes = duration - hours * 60;

    if (hours && minutes) return `${hours}ч ${minutes}м`;
    return hours ? `${hours}ч` : `${minutes}м`;
  }

  return (
    <li className="movies-card">
      <a href={trailer} 
        target="_blank"
        rel="noreferrer">
        <img
          className="movies-card__picture"
          src={image ? image : "#"}
          alt={`постер фильма ${nameRU}`}
        />
      </a>
      <div className="movies-card__name">
        <h6 className="movies-card__title">{nameRU}</h6>
        {(pathname ==='/movies') && (
          <button 
          onClick={handleClick}
          name="button" type="submit" 
          className="movies-card__dislike movies-card__button"
          >
          </button>
        )}
        {(pathname ==='/saved-movies') && (
          <button 
          onClick={handleClick}
          name="button" type="submit"
          className="movies-card__delete movies-card__button"
          >
          </button>
        )}
      </div>
      <p className="movies-card__time">{countTime(duration)}</p> 
    </li>
  );
}

export { MoviesCard };