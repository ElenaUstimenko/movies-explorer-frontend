import React, { useState } from "react";
import './SearchForm.css';
import icon from '../../images/search_icon.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import useWindowDimensions from '../../hooks/useWindowDimensions.js';

function SearchForm({ 
  onSubmit, 
  onChange, 
  value, 
  checked,
  onCheckboxChange, 
  isError, 
  isSending,
  /*onChangeFilters, 
  handleChangeFilter*/ }) {

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

  // ввод текста в search-form
  /*const [searchText, setSearchText] = useState('');

  const handleChangeSearchText = (evt) => {
    setSearchText(evt.target.value);
    console.log('handleChangeSearchText', evt.target.value)
    //setIsSearchFormValid(true);
  };*/

  // submit + валидация
  /*const [isSearchFormValid, setIsSearchFormValid] = useState(true);

  const handleSubmitValidation = (evt) => {
    if(!evt.target.value) {
      setIsSearchFormValid(false);
      console.log('false', evt.target.value)
      console.log('false', evt.target)
    } else {
      setIsSearchFormValid(true);
      console.log('true', evt.target.value)
    }
  };*/

  /*const handleSubmit = (evt) => {
    evt.preventDefault();
    onChangeFilters({
      key: 'text',
      value: searchText,
    });
    handleSubmitValidation(evt);
  };*/

  return (
    <section className='search-form' >
      <div className='search-form__container'>
        <form className='search-form__find'
          //onSubmit={handleSubmit}
          onSubmit={onSubmit} 
          disabled={isSending}
          noValidate>
          <label className='search-form__field'>

            {renderSearchForm()}

            <input id='search-form-input' 
              type='text'
              name='search'
              className='search-form__input'
              placeholder='Фильм'
              minLength={2} 
              maxLength={30} 
              required
              //value={searchText}
              //onChange={handleChangeSearchText} 
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
          //handleChangeFilter={handleChangeFilter} 
        />
      </div>
    </section>
  );
};

export { SearchForm };

//<span
             // className={`error${(!isSearchFormValid && ' error_visible') || ''}`}
            //>Нужно ввести ключевое слово
           // </span>