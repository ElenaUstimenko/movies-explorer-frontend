import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ 
  card, 
  onSaveCard, 
  onCardDelete, 
  savedCards,
}) {

  const { movieId } = card;
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

  // цвета кнопки лайка
  const isLiked = savedCards.some(item => item.nameEN === card.nameEN);

  const cardLikeButtonClassName = `movies-card__button ${
    isLiked ? 'movies-card__like' : 'movies-card__dislike'}`;
  
  return (
    <li className='movies-card' id={movieId}>
      <a href={card.trailerLink} 
        target='_blank'
        rel='noreferrer'>
        <img
          className='movies-card__picture'
          src={
            pathname === '/movies'
            ? `https://api.nomoreparties.co${card.image.url}`
            : card.image}
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
              className={cardLikeButtonClassName}>
            </button>
            ) 
          : (
            <button 
              onClick={handleDeleteClick}
              name='button' 
              type='submit'
              aria-label='Удалить из избранного'
              className='movies-card__button movies-card__delete'>
            </button>)
        }
      
      </div>
      <p className='movies-card__time'>{countTime(card.duration)}</p> 
    </li>
  );
};

export { MoviesCard };