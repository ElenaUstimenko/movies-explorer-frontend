import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import icon from '../../images/search_icon.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import useWindowDimensions from "../../hooks/useWindowDimensions.js";

function SearchForm({ onChangeFilters, handleChangeFilter }) {

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
   const [searchText, setSearchText] = useState('');

   const handleChangeSearchText = (evt) => {
     setSearchText(evt.target.value);
     setIsSearchFormValid(true);
   };

  // submit + валидация
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onChangeFilters({
      key: "text",
      value: searchText,
    });
    if(!evt.target.value) {
      setIsSearchFormValid(false);
    } else {
      setIsSearchFormValid(true);
    }
  };

  return (
    <section className="search-form" >
      <div className="search-form__container">
        <form className="search-form__find"
          onSubmit={handleSubmit}
          noValidate>
          <label className="search-form__field">

            {renderSearchForm()}

            <input id="search-form-input" 
              type="text" 
              name="search"
              className="search-form__input"
              placeholder="Фильм" 
              minLength={2} maxLength={30} 
              required
              value={searchText}
              onChange={handleChangeSearchText} 
            />
            <span className="search-form__input-error"/>
          </label>  
          <button name="button" type="submit" 
            className="button search-form__button">Найти</button>
            
            <span
              className={`error${(!isSearchFormValid && " error_visible") || ""}`}
            >Нужно ввести ключевое слово
            </span>
            
        </form>
        <FilterCheckbox onChange={handleChangeFilter} />
      </div>
    </section>
  );
}

export { SearchForm };