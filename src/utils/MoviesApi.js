import { MOVIES_API_SETTINGS } from './constants.js';
class MoviesApi {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  getMovies() {
    return fetch(`${this._url}`, {
      headers: {},
    }).then(this._handleResponse);
  }
};

const moviesApi = new MoviesApi(MOVIES_API_SETTINGS);
export { moviesApi };