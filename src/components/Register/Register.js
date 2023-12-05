import React, { useState, useEffect } from 'react';
import './Register.css';
import logo from '../../images/logo/logo-smile.svg'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [nameFilled, setNameFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);

  const [nameError, setNameError] = useState('Поле имя не может быть пустым');
  const [emailError, setEmailError] = useState('Поле email не может быть пустым');
  const [passwordError, setPasswordError] = useState('Поле пароль не может быть пустым');

  const [formValid, setFormValid] = useState(false);

  useEffect (() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError, passwordError])

  const clearHandler = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setNameFilled(true);
        break;
      case 'email':
        setEmailFilled(true);
        break;
      case 'password':
        setPasswordFilled(true);
        break;
        default:  
    }
  }

  const nameHandler = (evt) => {
    setName(evt.target.value)
    if(evt.target.value.length < 2) {
      setNameError('Имя должно быть от 2 до 30 символов');
      if(!evt.target.value) {
        setNameError('Поле имя не может быть пустым');
      }
    } else {
      setNameError("");
    }
  }

  const emailHandler = (evt) => {
    setEmail(evt.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
      if(!evt.target.value) {
        setEmailError('Поле email не может быть пустым');
      }
    } else {
      setEmailError("");
    }
  }

  const passwordHandler = (evt) => {
    setPassword(evt.target.value)
    if(evt.target.value.length < 6 || evt.target.value.length < 8) {
      setPasswordError('Пароль должен быть от 6 до 8 символов');
      if(!evt.target.value) {
        setPasswordError('Поле пароль не может быть пустым');
      }
    } else {
      setPasswordError("");
    }
  }

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
        <form action='#' name='register' className='register__form'
          noValidate
          // onSubmit={handleSubmit}
        >
          <label className='register__field'>
            <h6 className='register__discription'>Имя</h6>
        
            <input id='register-input-name' type='text' name='name'
              className='register__input_type_name register__input'
              placeholder="Имя" minLength={2} maxLength={30} required
              value={name} 
              onBlur={evt => clearHandler(evt)}
              onChange={evt => nameHandler(evt)}
            />
            {(nameFilled && nameError) && <div className='register__input-error'>{nameError}</div>}
            
          </label>
          <label className='register__field'>
            <h6 className='register__discription'>E-mail</h6>
            <input id='register-input-email' type='email' name='email'
              className='register__input_type_email register__input'
              placeholder='E-mail' minLength={2} maxLength={30} required
              value={email} 
              onBlur={evt => clearHandler(evt)}
              onChange={evt => emailHandler(evt)}
            />
            {(emailFilled && emailError) && <div className='register__input-error'>{emailError}</div>}
            
          </label>
          <label className='register__field'>
            <h6 className='register__discription'>Пароль</h6>
            <input id='password-register-input' name='password'
              className='register__input_type_password register__input'
              placeholder='Пароль' type='password' required
              value={password} 
              // onChange={({target: {value}}) => setPassword(value)}
              onBlur={evt => clearHandler(evt)}
              onChange={evt => passwordHandler(evt)}
            />
            {(passwordFilled && passwordError) && <div className='register__input-error'>{passwordError}</div>}
            
          </label> 
          <button name='button'
            type='submit' 
            disabled={!formValid}
            className='register__button'>Зарегистрироваться</button>
          <div className='register__login'>
            
              <p className='register__text'>Уже зарегистрированы?</p>
              <Link className='register__text register__enter link' to={'/signin'}>Войти</Link>
          
          </div>
        </form> 
      </div> 
    </section>
  );
}

export { Register };