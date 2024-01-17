import { MOVIES_API_SETTINGS } from './constants.js';
class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
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
      method: "GET",
      headers: {},
    }).then(this._handleResponse);
  }
};

const moviesApi = new MoviesApi(MOVIES_API_SETTINGS);
export { moviesApi };