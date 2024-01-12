import './Login.css';
import '../Register/Register.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo/logo-smile.svg'
import useValidation from '../../hooks/useValidation.js';
import { Preloader } from '../Preloader/Preloader.js';

function Login(props) {

  const { onLoginUser, isLoading, setIsError } = props;
  const { errors, isValid, handleChange, resetForm, formValue } = useValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleInputChange = (evt) => {
    handleChange(evt);
    setIsError(false);
  };

  function handleSubmit (evt) {
    evt.preventDefault();
    onLoginUser({
      email: formValue.email,
      password: formValue.password
    })
  };

  return (
    <section className='register login'>
      <div className='register__container'>
        <Link className='register__link' to='/'>
          <img
            className='register__logo'
            src={logo}
            alt='белый улыбающийся смайлик на зелёном фоне'
          />
        </Link>
        <h3 className='register__title'>Рады видеть!</h3>
        <form action='#' 
          name='register' 
          className='register__form'
          noValidate
          onSubmit={handleSubmit}
        >
          {isLoading ? <Preloader /> : ''}
          <label className='register__field'>
            <h6 className='register__discription'>E-mail</h6>
            <input 
              id='login-input-email' 
              type='email' 
              name='email'
              className='register__input_type_email register__input'
              placeholder='E-mail' 
              minLength={2} 
              maxLength={30} 
              required
              autoComplete='on'
              pattern='^.+@.+\..+$'
              title='Поле e-mail должно быть обязательно заполнено.'
              value={formValue.email || ''} 
              onChange={handleInputChange}
            />
            <span
                className={`register__input-error ${!isValid && errors.email
                  ? 'register__input-error' 
                  : ''}`}
                id="email-error"
            >{errors.email || ''}
            </span>
          </label>
          <label className='register__field'>
            <h6 className='register__discription'>Пароль</h6>
            <input 
              id='password-login-input' 
              name='password'
              className='register__input_type_password register__input'
              placeholder='Пароль' 
              type='password' 
              required
              autoComplete='on'
              pattern='.{8,}'
              title='Пароль должен состоять из не менее чем 8 символов.'
              value={formValue.password || ''} 
              onChange={handleInputChange}
            />
            <span
                className={`register__input-error ${!isValid && errors.password 
                  ? 'register__input-error' 
                  : ''}`}
                id="password-error"
            >{errors.password || ''}
            </span>
          </label> 
          <button 
            name='button' 
            type='submit'
            disabled={!isValid}
            className={`register__button login__button ${!isValid && errors 
              ? 'register__button_disabled' 
              : ''}`}
            >Войти</button>
          <div className='login__register'>
            <p className='register__text login__text'
            >Ещё не зарегистрированы?
            </p>
            <Link className='register__text register__enter login__enter link' to={'/signup'}
            >Регистрация
            </Link>
          </div>
        </form> 
      </div> 
    </section>
  ); 
};

export { Login };
