import './Register.css';
import { useState, useEffect } from 'react';
import logo from '../../images/logo/logo-smile.svg'
import { Link, useNavigate } from 'react-router-dom';
import useValidation from '../../hooks/useValidation.js';
import { register } from '../../utils/MainApi.js';

function Register(props) {

  const { 
    setIsError,
    setInfoPopup,
    setInfoPopupText,
  } = props;

  const [isEditing, setIsEditing] = useState(false); // режим изменения для редактирования
  
  const { errors, isValid, handleChange, resetForm, formValue } = useValidation();
  const navigate = useNavigate();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleInputChange = (evt) => {
    handleChange(evt);
    setIsError(false);
  };

  function handleSubmit (evt) {
    evt.preventDefault();
    handleRegister({
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
    })
  };

 // регистрация
 function handleRegister({ name, email, password }) {
  setIsEditing(true);

  return register({ name, email, password })
  .then((res) => {
    if (res) {
      console.log(res);
      navigate('/signin');
      setInfoPopup(true);
      setInfoPopupText('Вы успешно зарегистрировались!');
    }
  }).catch(error => {

    if (error === 409) {
      setInfoPopup(true);
      setInfoPopupText('Пользователь с таким email уже существует.')   
    } else if (error === 500) {
      setInfoPopup(true);
      setInfoPopupText('На сервере произошла ошибка.');
    } else {
      setInfoPopup(true);
      setInfoPopupText('Что-то пошло не так! Попробуйте ещё раз.');
      console.log(error)
    }
  })
  .finally(() => {
    setIsEditing(false);
  })
};

  return (
    <section className='register'>
      <div className='register__container'>
      <Link className='register__link' to='/'>
          <img
            className='register-logo'
            src={logo}
            alt='белый улыбающийся смайлик на зелёном фоне'
          />
        </Link>
        <h3 className='register__title'>Добро пожаловать!</h3>
        <form 
          action='#' 
          name='register' 
          className='register__form'
          noValidate
          onSubmit={handleSubmit}
        >
          <label className='register__field'>
            <h6 className='register__discription'>Имя</h6>
            <input 
              id='register-input-name' 
              type='text' 
              name='name'
              className='register__input_type_name register__input'
              placeholder="Имя" 
              minLength={2} 
              maxLength={30} 
              required
              pattern='[A-Za-zА-Яа-я]{2,30}'
              title='Имя должно сост. из не менее чем 2 симв., вкл. только латиницу и кириллицу.'
              value={formValue.name || ''} 
              onChange={handleInputChange}
            />
            <span className={`register__input-error ${!isValid && errors.name
              ? 'register__input-error' 
              : ''}`} id='name-error' >{errors.name || ''}
            </span>
          </label>
          <label className='register__field'>
            <h6 className='register__discription'>E-mail</h6>
            <input 
              id='register-input-email' 
              type='email' 
              name='email'
              className='register__input_type_email register__input'
              placeholder='E-mail' 
              minLength={2} 
              maxLength={30} 
              required
              pattern='^.+@.+\..+$'
              title='Поле e-mail должно быть обязательно заполнено.'
              value={formValue.email || ''} 
              onChange={handleInputChange}
            />
            <span className={`register__input-error ${!isValid && errors.email 
              ? 'register__input-error' 
              : ''}`} id='email-error'>{errors.email || ''}
            </span>
          </label>
          <label className='register__field'>
            <h6 className='register__discription'>Пароль</h6>
            <input 
              id='password-register-input' 
              name='password'
              className='register__input_type_password register__input'
              placeholder='Пароль' 
              type='password' 
              required
              pattern='.{8,}'
              title='Пароль должен состоять из не менее чем 8 символов.'
              value={formValue.password || ''}
              onChange={handleInputChange} 
            />
            <span className={`register__input-error ${!isValid && errors.password 
              ? 'register__input-error' 
              : ''}`} id='email-error'>{errors.password || ''}
            </span>
          </label>
          <button name='button'
            type='submit' 
            disabled={!isValid}
            className={`register__button ${!isValid && errors 
              ? 'register__button_disabled' 
              : ''}`}
            >Зарегистрироваться
          </button>
          <div className='register__login'>
            <p className='register__text'
            >Уже зарегистрированы?
            </p>
            <Link className='register__text register__enter link' to={'/signin'}
            >Войти
            </Link>
          </div>
        </form> 
      </div> 
    </section>
  );
};

export { Register };