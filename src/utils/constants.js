/*export const URL_BASE_LOCAL = 'http://localhost:3000';
export const URL_BASE = 'https://api.nomoreparties.co';
//export const URL_MOVIES = ;*/

export const MOVIES_API_SETTINGS = {
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const MAIN_API_SETTINGS = {
  baseUrl: "https://api.diplommovies.nomoredomainsmonster.ru",
  //baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};


export const PATTERN_NAME = '[A-я-\\s]{2,30}';

export const PATTERN_EMAIL =
  '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';

export const PATTERN_PASSWORD =
  '(?=.*[A-z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,}).*';


 
  



/*export const PROPS_REGISTRATIONS = {
  inputsList: [
    { name: 'name', label: 'Имя', type: 'text', maxLength: 30 },
    { name: 'email', label: 'E-mail', type: 'text' },
    { name: 'password', label: 'Пароль', type: 'password' },
  ],
  defaultValues: {
    name: '',
    email: '',
    password: '',
  },
  title: 'Добро пожаловать!',
  name: 'register',
  submitText: 'Зарегистрироваться',
  footerData: {
    description: 'Уже зарегистрированы?',
    linkTo: '/signin',
    linkText: 'Войти',
  },
  validators: {
    name: {
      required: (value) => {
        return {
          valid: !!value,
          message: 'Поле имя не может быть пустым',
        };
      },
      minLength: (value) => {
        return {
          valid: value.length > 1,
          message: 'Имя должно содержать минимум 2 символа',
        };
      },
      mask: (value) => {
        return {
          valid: !/[^a-z-\s]/i.test(value),
          message: 'Поле имя может содержать только латиницу, кириллицу, пробел или дефис',
        };
      },
    },
    email: {
      required: (value) => {
        return {
          valid: !!value,
          message: 'Поле e-mail не может быть пустым',
        };
      },
      minLength: (value) => {
        return {
          valid: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
          message: 'Некорректный e-mail',
        };
      },
    },
    password: {
      required: (value) => {
        return {
          valid: !!value,
          message: 'Поле пароль не может быть пустым',
        };
      },
      minLength: (value) => {
        return {
          valid: value.length < 6 || value.length < 8,
          message: 'Пароль должен быть от 6 до 8 символов',
        };
      },
    },
  },
};

export const PROPS_LOGIN = {
  inputsList: [
    { name: 'email', label: 'E-mail', type: 'text' },
    { name: 'password', label: 'Пароль', type: 'password' },
  ],
  defaultValues: {
    password: 'someone1',
    email: 'someone@email.ru',
  },
  onlyDifferent: false,
  title: 'Рады видеть!',
  name: 'login',
  submitText: 'Войти',
  footerData: {
    description: 'Ещё не зарегистрированы?',
    linkTo: '/signup',
    linkText: 'Регистрация',
  },
  validators: {
    email: {
      required: (value) => {
        return {
          valid: !!value,
          message: 'Поле e-mail не может быть пустым',
        };
      },
      minLength: (value) => {
        return {
          valid: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
          message: 'Некорректный e-mail',
        };
      },
    },
    password: {
      required: (value) => {
        return {
          valid: !!value,
          message: 'Поле пароль не может быть пустым',
        };
      },
      minLength: (value) => {
        return {
          valid: value.length < 6 || value.length < 8,
          message: 'Пароль должен быть от 6 до 8 символов',
        };
      },
    },
  },
};

export const PROPS_PROFILE = {
  inputsList: [
    { name: 'name', label: 'Имя', type: 'text', maxLength: 30 },
    { name: 'email', label: 'Почта', type: 'text' },
  ],
  defaultValues: {
    name: '',
    email: '',
  },
  validators: {
    name: {
      required: (value) => {
        return {
          valid: !!value,
          message: 'Поле имя не может быть пустым',
        };
      },
      minLength: (value) => {
        return {
          valid: value && value.length > 1,
          message: 'Имя должно содержать минимум 2 символа',
        };
      },
      mask: (value) => {
        return {
          valid: !/[^a-z-\s]/i.test(value),
          message: 'Поле имя может содержать только латиницу, кириллицу, пробел или дефис',
        };
      },
    },
    email: {
      required: (value) => {
        return {
          valid: !!value,
          message: 'Поле e-mail не может быть пустым',
        };
      },
      minLength: (value) => {
        return {
          valid: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
          message: 'Некорректный e-mail',
        };
      },
    },
  },
};*/