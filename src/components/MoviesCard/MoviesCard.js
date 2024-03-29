import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions.js';

function MoviesCard(props) {

  const { 
    card, 
    onLikeCard, 
    onDeleteLikeCard, 
    savedCards,
  } = props;

  const isMobileWidth = useWindowDimensions() <= 768;

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

  const isLiked = savedCards.some(item => item.id === card.id)
  
  // постановка или снятие лайка
  const handleLikeCard = () => {
    if(isLiked) {  
      onDeleteLikeCard(card);
    } else {
      onLikeCard(card);
    }
  };

  // цвета кнопки лайка
  const cardLikeButtonClassName = `movies-card__button ${
    isLiked ? 'movies-card__like' : 'movies-card__dislike'}`;

  // кнопка удаления
  const cardDeleteButtonClassName = 
  `${isMobileWidth 
    ? 'movies-card__button movies-card__delete' 
    : 'movies-card__button movies-card__visible'}`;
  
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
              onClick={handleLikeCard}
              name='button' 
              type='submit'
              aria-label='Сохранить в избранное или удалить'
              className={cardLikeButtonClassName}>
            </button>
            ) 
          : (
            <button 
              onClick={handleLikeCard}
              name='button' 
              type='submit'
              aria-label='Удалить из избранного'
              className={cardDeleteButtonClassName}>
            </button>)
        }
      
      </div>
      <p className='movies-card__time'>{countTime(card.duration)}</p> 
    </li>
  );
};

export { MoviesCard };