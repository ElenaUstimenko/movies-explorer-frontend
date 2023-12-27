import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { MoviesCard } from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ 
  cards,
  visibleCardsCount, 
  savedCards, 
  onSaveCard, 
  onDelete,
}) {
  
  const { pathname } = useLocation();

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