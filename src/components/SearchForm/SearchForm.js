import './SearchForm.css';
import icon from '../../images/search_icon.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import useWindowDimensions from '../../hooks/useWindowDimensions.js';

function SearchForm(props) {

  const { 
    onSubmit, 
    onChange, 
    value, 
    checked,
    onCheckboxChange, 
    isError, 
    isSending,
  } = props;

  // лупу видно только на разрешении > 525px
  const isMobileWidth = useWindowDimensions() <= 525;

  function renderSearchForm() {
    if (!isMobileWidth) {
      return (
        <img
          className="search-form__icon"
          src={icon}
          alt="маленькая серая лупа"
        />
      );
    }
  };

  return (
    <section className='search-form' >
      <div className='search-form__container'>
        <form className='search-form__find'
          disabled={isSending}
          onSubmit={onSubmit}
          noValidate>
          <label className='search-form__field'>

            {renderSearchForm()}

            <input 
              id='search-form-input' 
              type='text'
              name='search'
              className='search-form__input'
              placeholder='Фильм'
              minLength={2} 
              maxLength={30} 
              value={value}
              onChange={onChange}
            />
            <span className='search-form__input-error'/>
          </label>  

          <button 
            name='button' 
            type='submit'
            className='button search-form__button'
            disabled={isSending}
          >Найти
          </button>
            
            {isError && <span className='search-form__error'>
              Нужно ввести ключевое слово
            </span>}
 
        </form>
        <FilterCheckbox 
          checked={checked} 
          onChange={onCheckboxChange}
        />
      </div>
    </section>
  );
};

export { SearchForm };