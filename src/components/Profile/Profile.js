import './Profile.css';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header.js';

function Profile() {

  return (
    <div className="profile">
      <Header />
      <div className="profile__container">
        <h3 className="profile__title">Привет, Кто-то!</h3>
        <label className="profile__field">
          <input id="profile-input-name" type="text" name="name"
          className="profile__input_type_name profile__input"
          placeholder="Имя" minLength={2} maxLength={30} required
          // value={name} 
          // onChange={({target: {value}}) => setName(value)}
          />
          <input id="profile_-input-email" type="email" name="email"
          className="profile__input_type_email profile__input"
            placeholder="E-mail" minLength={2} maxLength={30} required
          // value={email} 
          // onChange={({target: {value}}) => setEmail(value)}
          />
        </label>
        <p className="profile__registration">Редактировать</p>
        <Link className="profile__logout link" to={'/signin'}>Выйти из аккаунта</Link>
      </div>
    </div>
  );
}

export { Profile };