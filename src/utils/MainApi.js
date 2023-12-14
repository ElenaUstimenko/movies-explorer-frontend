export const baseURL = 'https://api.diplommovies.nomoredomainsmonster.ru';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
};

// получение данных пользователя при загрузке
export const getAllContent = (token) => {
  return fetch(`${baseURL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then((res) => res.json());
};

export const register = ({ name, email, password }) => {
  return fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  }).then(handleResponse);
 };

export const login = ({ name, email, password }) => {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(handleResponse);
 };

export const checkToken = () => {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse);
};

// загрузка инфо о пользователе с сервера
export const getUserIDInfo = () => {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse)
  };

// редактирование профиля
export const userInformation = ({ name, email }) => {
  return fetch(`${baseURL}/users/me`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },   
    body: JSON.stringify({
      name: name,
      email: email,
    })
  }).then(handleResponse)
};

// получение фильмов
export const getSavedMovies = (token) => {
  return fetch(`${baseURL}/movies`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse)
};

// сохранение фильма
export const saveCard = (data, token) => {
  return fetch(`${baseURL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      description: data.description,
      year: data.year,
      image: `https://api.nomoreparties.co${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      movieId: data.id,
    }),
  }).then(handleResponse);
};

// удаление фильма
export const deleteCard = (cardId, token) => {
  return fetch(`${baseURL}/movies/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse);
};