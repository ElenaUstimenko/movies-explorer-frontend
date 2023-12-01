import React from 'react';
import './SearchForm.css';
import icon from '../../images/search_icon.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import useWindowDimensions from "../../hooks/useWindowDimensions.js";

function SearchForm() {

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
  } 

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__find">
          <label className="search-form__field">

            {renderSearchForm()}

            <input id="search-form-input" type="text" name="movie"
              className="search-form__input"
              placeholder="Фильм" minLength={2} maxLength={30} required
            />
            <span className="search-form__input-error"/>
          </label>  
          <button name="button" type="submit" 
            className="button search-form__button">Найти</button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export { SearchForm };