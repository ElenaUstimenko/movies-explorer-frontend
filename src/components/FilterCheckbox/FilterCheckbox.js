import './FilterCheckbox.css';

function FilterCheckbox({ checked, onChange }) {
  
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__switch'> 
      <input 
        name='checkbox'
        type='checkbox'
        className='filter-checkbox__button'
        checked={checked} 
        onChange={onChange} 
        required={false}
        />
      <span className='filter-checkbox__slider'></span>
      <p className='filter-checkbox__type'>Короткометражки</p>
     </label>
    </div>
  );
};

export { FilterCheckbox };