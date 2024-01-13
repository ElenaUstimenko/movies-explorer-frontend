import './InfoPopup.css';

function InfoPopup({ title, isOpen, onSubmit }) {

  const handleSubmit = (evt) => {
    // evt.preventDefault();
    onSubmit();
  };

  return (
    <div className={`info-popup ${isOpen ? 'info-popup_opened' : ''}`}>
      <form 
        className='info-popup__container'
        onSubmit={(evt) => handleSubmit(evt)}>
        <h2 className='info-popup__title'>{title}</h2>
        <button 
          type='submit' 
          className='info-popup__button' 
          // onClick={(evt) => onSubmit(evt)}
          // onSubmit={handleSubmit}
          >ОК
        </button>
      </form>
    </div>
  );
}

export { InfoPopup };