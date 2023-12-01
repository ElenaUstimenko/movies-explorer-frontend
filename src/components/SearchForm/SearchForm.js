import React from 'react';
import { useState } from "react";
import './SearchForm.css';
import icon from '../../images/search_icon.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import useWindowDimensions from "../../hooks/useWindowDimensions.js";

function SearchForm({ onChangeFilters }) {

  const isMobileWidth = useWindowDimensions() <= 525;

  // лупу видно только на разрешении > 525px
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

  // валидация на submit кнопки найти
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);


  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeFilters({
      key: "text",
      value: searchText,
    });
  };

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="search-form" >
      <div className="search-form__container">
        <form className="search-form__find"
          onSubmit={handleSubmit}
          noValidate>
          <label className="search-form__field">

            {renderSearchForm()}

            <input id="search-form-input" type="text" name="movie"
              className="search-form__input"
              placeholder="Фильм" minLength={2} maxLength={30} required
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
        <FilterCheckbox />
      </div>
    </section>
  );
}

export { SearchForm };