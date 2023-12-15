import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ 
  card, 
  onSaveCard, 
  onCardDelete, 
  savedCards 
}) {

  const { pathname } = useLocation();

  // корректное отображение длительности фильма
  function countTime(duration) {
    const time = duration / 60;
    const hours = Math.floor(time);
    const minutes = duration - hours * 60;

    if (hours && minutes) return `${hours}ч ${minutes}м`;
    return hours ? `${hours}ч` : `${minutes}м`;
  }

  // сохранение фильма
  const handleSaveClick = () => {
    onSaveCard(card);
  };

  // удаление фильма
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isSaved = savedCards.some((item) => item.movieId === card.id);

  const cardLikeButton = `movies-card__button movies-card__dislike ${
    isSaved && 'movies-card__like'
  }`;

  return (
    <li className='movies-card'>
      <a href={card.trailer} 
        target='_blank'
        rel='noreferrer'>
        <img
          className='movies-card__picture'
          src={card.image ? card.image : "#"}
          alt={`постер фильма ${card.nameRU}`}
        />
      </a>
      <div className='movies-card__name'>
        <h6 className='movies-card__title'>{card.nameRU}</h6>
        
        {pathname === '/movies' 
          ? (
            <button 
              onClick={handleSaveClick}
              name='button' 
              type='submit'
              aria-label='Сохранить в избранное'
              className={cardLikeButton}>
            </button>
            ) 
          : (
            <button 
              onClick={handleDeleteClick}
              name='button' 
              type='submit'
              aria-label='Удалить'
              className='movies-card__button movies-card__delete'>
            </button>)
        }
        
      </div>
      <p className='movies-card__time'>{countTime(card.duration)}</p> 
    </li>
  );
};

export { MoviesCard };