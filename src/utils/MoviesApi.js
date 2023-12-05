import { Api } from './Api.js';
import { MOVIES_API_SETTINGS } from './constants.js';

class MoviesApi extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  async getMovies() {
    const params = {
      relativePath: '/beatfilm-movies',
      method: 'GET',
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }
};

export default new MoviesApi(MOVIES_API_SETTINGS);

/*function checkResponse(res) {
  if (res.ok) 
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
  }
}

export function MoviesApi() {
  return fetch('https://api.nomoreparties.co/beatfilm-movies')
    .then((res) => checkResponse(res))
}*/