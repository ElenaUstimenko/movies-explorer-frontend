import './Profile.css';
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { Link, useNavigate } from 'react-router-dom';
import useValidation from '../../hooks/useValidation.js';

function Profile(props) {

  const { 
    loggedIn,
    setLoggedIn,  
    isError,
    setIsError,
    userInformation,
    setCurrentUser,
    setInfoPopup,
    setInfoPopupText,
  } = props;

  const [isLoading, setIsLoading] = useState(false); // процесс загрузки данных
  const [isEditing, setIsEditing] = useState(false); // режим изменения для редактирования
  const [isSending, setIsSending] = useState(false); // для блокировки формы во время отправки запроса

  const currentUser = useContext(CurrentUserContext);
  const { errors, isValid, handleChange, resetForm, formValue } = useValidation();
  const navigate = useNavigate();

  const isDataChanged =
  formValue.name !== currentUser.name ||
  formValue.email !== currentUser.email;

  const handleInputChange = (evt) => {
    handleChange(evt);
    setIsError(false);
  };

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsError(false);
  }, [resetForm, currentUser, isEditing, setIsError]);

  function handleSubmit (evt) {
    evt.preventDefault();
    handleUpdateUser({ 
      name: formValue.name,
      email: formValue.email,
    });
  };

// редактирование профиля 
const handleUpdateUser = ({ name, email }) => {
  setIsLoading(true);
  setIsSending(true);
  userInformation({ name, email })
  .then(({ name, email }) => {
    setCurrentUser({ ...currentUser, name, email });
    setInfoPopup(true);
    setInfoPopupText('Данные успешно отредактированы!');

  }).catch(error => {

    if (error === 409) {
      setInfoPopup(true);
      setInfoPopupText('Пользователь с таким email уже существует.')   
    } else if (error === 500) {
      setInfoPopup(true);
      setInfoPopupText('На сервере произошла ошибка.')   
    } else {
      setInfoPopup(true);
      setInfoPopupText('Что-то пошло не так! Попробуйте ещё раз.');
    }
  }).finally(() => {
    setIsLoading(false);
    setIsEditing(false);
    setIsSending(false);
  });
};

 // режим редактирования
 const handleEditClick = () => {
  setIsEditing(true);
  setIsError(false);
};

  // выход из профиля
  const handleSignout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('search');
    localStorage.removeItem('isShort');
    localStorage.removeItem('movies');
    navigate('/');
  };


  return (
    <section className='profile'>
      <div className='profile__container'>
        <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
        <form
          className='form profile__form'
          name='profile'
          onSubmit={handleSubmit}
          disabled={isSending} 
          noValidate>
          <div className='profile__field'>
            <label className='profile__input-tittle'>Имя</label>

            {isEditing ? (
              <input 
                id='profile-input-name' 
                type='text' 
                name='name'
                className='profile__input_type_name profile__input'
                minLength={2} 
                maxLength={30} 
                required
                placeholder='Имя'
                value={formValue.name || ''}
                onChange={handleInputChange}
                pattern='[A-Za-zА-Яа-я]{2,30}'
                title='Имя должно сост. из не менее чем 2 симв., вкл.только латиницу и кириллицу.'
              /> 
            ) : (
                <p className='profile__input_type_text'>{currentUser.name}</p>
            )}
            <span 
              className={`profile__input-error ${!isValid && errors.name 
              ? 'profile__input-error' 
              : ''}`} id="name-error" >{errors.name || ''}
            </span>
          </div>
          <div className='profile__field'>
            <label className='profile__input-tittle profile__input-tittle_type_email'
              > E-mail
            </label>

            {isEditing ? (
              <input 
                id='profile-input-email' 
                type='email' 
                name='email'
                className='profile__input_type_email profile__input'
                placeholder='E-mail'
                minLength={2} 
                maxLength={30} 
                required
                value={formValue.email || ''}
                onChange={handleInputChange}
                pattern='^.+@.+\..+$'
                title='Поле e-mail должно быть обязательно заполнено.'
              />
            ) : (
                <p className='profile__input_type_text'>{currentUser.email}</p>
            )}
            <span 
              className={`profile__input-error ${!isValid && errors.email
                ? 'profile__input-error' 
                : ''}`} id="email-error" >{errors.email || ''}
             </span>
          </div>

          <div className='profile__container-button'>
          
          {isEditing ? (
            <>
              <button
                className='button profile__save-button'
                type='submit'
                aria-label='Сохранение данных профиля'
                disabled={!isValid || isError || !isDataChanged || isSending}
              >
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </>
          ) : (  
            <>
              <button
                className="button profile__registration"
                type='button'
                aria-label='Редактирование данных профиля'
                onClick={handleEditClick}>
                Редактировать
              </button>
              <Link
                className='profile__logout link'
                to={'/'}
                type='button'
                aria-label='Выход из личного кабинета пользователя'
                onClick={handleSignout}>
                Выйти из аккаунта
              </Link>
            </>
          )}
          </div>
        </form>
      </div>
    </section>
  );
};

export { Profile };