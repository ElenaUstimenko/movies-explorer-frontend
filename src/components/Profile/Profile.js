import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import './Profile.css';
import { Link } from 'react-router-dom';

function Profile({ onUpdateUser, onSignOut }) {
  const { name, email } = useContext(CurrentUserContext);

  return (
    <section className='profile'>
      <div className='profile__container'>
        <h3 className='profile__title'>Привет, Кто-то!</h3>
        <label className='profile__field'>
          <input id='profile-input-name' type='text' name='name'
          className='profile__input_type_name profile__input'
          placeholder='Имя' minLength={2} maxLength={30} required
          // value={name} 
          // onChange={({target: {value}}) => setName(value)}
          />
          <input id='profile-input-email' type='email' name='email'
          className='profile__input_type_email profile__input'
            placeholder='E-mail' minLength={2} maxLength={30} required
          // value={email} 
          // onChange={({target: {value}}) => setEmail(value)}
          />
        </label>
        <p className='button profile__registration'>Редактировать</p>
        <Link className='profile__logout link' to={'/signin'} onClick={onSignOut}>Выйти из аккаунта</Link>
      </div>
    </section>
  );
}

export { Profile };