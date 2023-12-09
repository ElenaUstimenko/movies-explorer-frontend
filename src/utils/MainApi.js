//export const baseURL = 'http://localhost:3000';
export const baseURL = 'https://api.diplommovies.nomoredomainsmonster.ru';

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


const handleResponse = (res) => {
  if (res.ok) {
    return res.json() // возвращает promise 
  } else {
    return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняет promise 
  }
};

/*class MainApi extends Api {
  constructor({ baseUrl, headers, credentials }) {
    super({ baseUrl, headers, credentials });
  }

  async getMoviesList() {
    const params = {
      relativePath: '/movies',
      method: 'GET',
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async addMovies({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) {
    const params = {
      relativePath: '/movies',
      method: 'POST',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        movieId,
        nameRU,
        nameEN,
        thumbnail,
      }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async deleteMovies(id) {
    const params = {
      relativePath: `/movies/${id}`,
      method: 'DELETE',
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async signUp({ name, password, email }) {
    const params = {
      relativePath: '/signup',
      method: 'POST',
      body: JSON.stringify({ name, password, email }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

 



  async signIn({ password, email }) {
    const params = {
      relativePath: '/signin',
      method: 'POST',
      body: JSON.stringify({ password, email }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async signOut() {
    const params = {
      relativePath: '/signout',
      method: 'GET',
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async getUserInfo() {
    const params = {
      relativePath: '/users/me',
      method: 'GET',
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async setUserInfo({ name, email }) {
    const params = {
      relativePath: '/users/me',
      method: 'PATCH',
      body: JSON.stringify({ name, email }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }
}

export default new MainApi(MAIN_API_SETTINGS);*/