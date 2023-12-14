import './InfoPopup.css';

function InfoPopup({ title, isOpen, onSubmit }) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <div className={`info-popup ${isOpen ? 'info-popup_opened' : ''}`}>
      <form className='info-popup__container'>
        <h2 className='info-popup__title'>{title}</h2>
        <button 
          type='submit' 
          className='info-popup__button' 
          onSubmit={handleSubmit}
          >ОК
        </button>
      </form>
    </div>
  );
}

export { InfoPopup };