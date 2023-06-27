class Api {
  constructor({ basePath }) {
    this._basePath = basePath;
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // не забыть зарефакторить!
  // setToken(token) {
  //   this._headers.authorization = `Bearer ${token}`;
  // }

  getServerCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._basePath}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._getJson);
  }

  postNewCard(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getJson);
  }

  // Получить данные о пользователе
  getCurrentUser() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._basePath}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getJson);
  }

  // Обновить данные пользователя
  updateUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      })
    }).then(this._getJson);
  }

  updateAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getJson);
  }

  deleteCard(_id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._basePath}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getJson);
  }

  changeLikeCardStatus(_id, isLiked) {
    const token = localStorage.getItem('jwt');
    if (isLiked) {
      return fetch(`${this._basePath}/cards/${_id}/likes`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(this._getJson);
    } else {
      return fetch(`${this._basePath}/cards/${_id}/likes`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }).then(this._getJson);
    }
  }
}

export const api = new Api({
  basePath: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
