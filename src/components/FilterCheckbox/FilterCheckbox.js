import React, { useState, useEffect } from 'react';
import './FilterCheckbox.css';
import sortButtonOn from '../../images/button/checkbox_on.svg';
import sortButtonOff from '../../images/button/checkbox_off.svg';

function FilterCheckbox() {

  const [isSorted, setIsSorted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // изменение внешнего вида чекбокса
  const handleSortClick = () =>{
    if(!isSorted) {
      setIsSorted(true);
    } else {
      setIsSorted(false);
    }
  };
  
  /*const handleChangeFilter = (e) => {
    onChangeFilters({
      key: e.target.name,
      value: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };*/

  return (
    <div className="filter-checkbox">
      <button name="button" type="button" 
        className="filter-checkbox__button"
        checked={isChecked} 
        onClick={() => setIsChecked(isChecked)}>
      <img  
        className="filter-checkbox__image"
        src={isSorted ? sortButtonOn : sortButtonOff} 
        alt='кнопка сортировки' 
        onClick={handleSortClick}
      />
      </button>
      <p className="filter-checkbox__type">Короткометражки</p>
    </div>
  );
}

export { FilterCheckbox };
/*<label>
          <input
            name="short"
            type="checkbox"
            className="search__filter"
            onChange={handleChangeFilter}/>
          <span className="search__visible-filter"/>
        </label>*/