import { useState } from 'react';
import './FilterCheckbox.css';
import sortButtonOn from '../../images/button/checkbox_on.svg';
import sortButtonOff from '../../images/button/checkbox_off.svg';

function FilterCheckbox({ /*onChangeFilters*/checked, onChange }) {
  
  // изменение внешнего вида чекбокса
  const [isSorted, setIsSorted] = useState(false);

  const handleSortClick = () =>{
    if(!isSorted) {
      setIsSorted(true);
    } else {
      setIsSorted(false);
    }
  };
  
  // сортировка
 /* const handleChangeFilter = (evt) => {
    onChangeFilters({
      key: evt.target.name,
      value: evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value,
    });
  };*/

  return (
    <label className='filter-checkbox'>
      <input 
        name='checkbox'
        //type='checkbox'
        className='filter-checkbox__button'
        checked={checked} 
        onChange={onChange} 
        required={false}
        //onChange={handleChangeFilter}
        />
      <img  
        className='filter-checkbox__image'
        src={isSorted ? sortButtonOn : sortButtonOff} 
        alt='кнопка сортировки' 
        onClick={handleSortClick}
        //checked={checked}
        //onChange={onChange}  
      />
      <p className='filter-checkbox__type'>Короткометражки</p>
    </label>
  );
}

export { FilterCheckbox };