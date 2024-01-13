import './MoviesCardList.css';
import '../Movies/Movies.css';
import { useLocation } from 'react-router-dom';
import { MoviesCard } from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ 
  cards,
  visibleCardsCount, 
  savedCards, 
  onSaveCard, 
  onDelete,
}) {
  // console.log('cards', cards);
  const { pathname } = useLocation();


  // ОШИБКА 4
  // Если ничего не найдено, выводится надпись «Ничего не найдено».
  // Надпись "Ничего не найдено" присутствует на странице фильмов сразу же при входе, 
  // когда пользователь ещё ничего не искал, а не только когда ничего не найдено.
  // => убрала <p className='movies-error'>Ничего не найдено</p> из Movies.js, заменила на прелоадер, 
  // нужно добавить <p className='movies-error'>Ничего не найдено</p>  условием в MoviesCardList.js, 
  // чтобы или загружались карточки или была надпись? 

  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__movies">
    
      {pathname === '/movies' 
        ? (cards.slice(0, visibleCardsCount).map((card) => (
          <MoviesCard 
            key={card.id}
            card={card} 
            onSaveCard={onSaveCard} 
            savedCards={savedCards} 
          /> 
          )))
        : (savedCards.slice(0, visibleCardsCount).map((card) => (
          <MoviesCard
            key={card._id}
            card={card} 
            onCardDelete={onDelete}
            savedCards={savedCards}
          />
          )))
      }
      </ul>
    </div>
  )
};

export { MoviesCardList };


//<p className='movies-error'>Ничего не найдено</p>