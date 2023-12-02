class Api {
  constructor({ baseUrl, headers, credentials = "" }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _getProxy({ relativePath, method, body = "", headers = {} }) {
    const options = {
      method,
      headers: { ...this._headers, ...headers },
    };

    if (body) {
      options.body = body;
    }
    if (this._credentials) {
      options.credentials = this._credentials;
    }

    return fetch(`${this._baseUrl}${relativePath}`, options);
  }

  async _handleResponse(res) {
    const description = await res.json();

    if (res.ok) {
      return description;
    } else {
      return Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    }
  }
}

export { Api };