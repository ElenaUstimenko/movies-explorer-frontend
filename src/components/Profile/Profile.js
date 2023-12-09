import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import useFormValidation from '../../hooks/useFormValidation.js';

import {
  PATTERN_NAME,
  PATTERN_EMAIL,
} from "../../utils/constants.js";
import { VALIDATION_MESSAGES } from "../../utils/validation.js";

function Profile({ 
  onUpdateUser, 
  onSignOut, 
  loggedIn,
  //setSearchFormValueSavedMovies,
  //setIsFilterCheckboxSavedMoviesChecked,
  setCurrentUser,
  onUpdate,
  //onLoad,
  isLoading,
  isButtonSaveVisible,
  setIsButtonSaveVisible,
  onSuccessMessages,
  //setSuccessMessages,
  error,
  setErrorMessages,
}) {

  //const { isLoading } = props;

  const navigate = useNavigate();

  const currentUser = useContext(CurrentUserContext);
  const { name, email } = currentUser;

  const [prevValues, setPrevValues] = useState({});
  const { values, setValues, errors, isValid, setIsValid, handleChange } = 
    useFormValidation();
    
  useEffect(() => {
    setValues({ name, email });
    setIsButtonSaveVisible(false);
    //setSuccessMessages('');
    //setErrorMessages({ updatingUserInfoResponse: '' });
  }, [navigate]);

  /*useEffect(() => {
    setValues((values) => ({
      ...values,
      name: currentUser.name,
      email: currentUser.email,
    }));
    setIsButtonSaveVisible(false);
    if (currentUser) {
      setValid((isValid) => ({ ...isValid, name: true, email: true }));
    }
  }, [currentUser]);*/


  function showSaveButton({ target }) {
    setIsButtonSaveVisible(true);
    //setSuccessMessages('');
    const data = {};
    Array.from(target.closest('.profile__form').children[0].children).forEach(
      (wrapper) => {
        const input = wrapper.children[1];
        data[input.name] = input.value;
      }
    );
    setPrevValues(data);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email } = values;
    console.log(prevValues);

    onUpdate({
      name: name.trim().replace(/\s+/g, ''),
      email: email.trim().replace(/\s/g, ''),
    });
    setIsValid(false);
  }

  return (
    <section className='profile'>
      <div className='profile__container'>
        <h3 className='profile__title'>Привет, {name}!</h3>
        <form
          className='profile__form'
          name='profile'
          onSubmit={handleSubmit}
          noValidate
          >
          <label className='profile__field'>
          <input 
            id='profile-input-name' 
            type='text' 
            name='name'
            className='profile__input_type_name profile__input'
            placeholder='Имя' 
            minLength={2} 
            maxLength={30} 
            required
            value={name}
            onChange={handleChange}
            pattern={PATTERN_NAME}
            disabled={isButtonSaveVisible ? false : true}
          />
          </label>
          <label className='profile__field'>
          <input 
            id='profile-input-email' 
            type='email' 
            name='email'
            className='profile__input_type_email profile__input'
            placeholder='E-mail' 
            minLength={2} 
            maxLength={30} 
            required
            value={email}
            onChange={handleChange}
            pattern={PATTERN_EMAIL}
            disabled={isButtonSaveVisible ? false : true}
          />
          </label>
        
          <div className='profile__container-button'>
          <span
            className={`error${
              ((errors?.email || errors?.name) && ' error_visible') || ''
            }`}>
            {errors?.name && VALIDATION_MESSAGES.frontend.name + '\n'}
            {errors?.email && VALIDATION_MESSAGES.frontend.email}
          </span>

            <span
              className={`error${
                (error?.updatingUserInfoResponse && ' error_visible') || ''
              }`}>
              {error?.updatingUserInfoResponse}
            </span>
            <span
              className={`success${
                (onSuccessMessages?.updatingUserInfoResponse &&
                  !error?.updatingUserInfoResponse &&
                  ' success_visible') ||
                ''
              }`}>
              {onSuccessMessages?.updatingUserInfoResponse}
            </span>

            {isButtonSaveVisible ? (
              <button
                className="button profile__save-button"
                type='submit'
                aria-label='Сохранение данных профиля'
                disabled={
                  !isValid ||
                  isLoading ||
                  (prevValues.email === values.email &&
                    prevValues.name === values.name)
                }>
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            ) : (
              <button
                className="button profile__registration"
                type='button'
                aria-label='Редактирование данных профиля'
                onClick={(evt) => showSaveButton(evt)}>
                Редактировать
              </button>
            )}
          </div>
        </form>

        {!isButtonSaveVisible && (
          <Link
            className='profile__logout link'
            to={'/signin'}
            type='button'
            aria-label='Выход из личного кабинета пользователя'
            onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        )}

      </div>
    </section>
  );
}

export { Profile };