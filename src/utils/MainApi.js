import { Api } from "./Api.js";
import { MAIN_API_SETTINGS } from "./constants";

class MainApi extends Api {
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

  async getUserData() {
    const params = {
      relativePath: '/users/me',
      method: 'GET',
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async setUserData({ name, email }) {
    const params = {
      relativePath: '/users/me',
      method: 'PATCH',
      body: JSON.stringify({ name, email }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }
}

export default new MainApi(MAIN_API_SETTINGS);