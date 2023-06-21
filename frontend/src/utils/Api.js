// Токен: 545040d2-ca8d-4af4-bb28-cd05a11607d7
// Идентификатор группы: cohort-61
// Адрес сервера проекта Mesto: https://mesto.nomoreparties.co.

// Идентификатор группы должен быть в URL сразу после v1. Всегда обращайтесь к своей группе. Если обратиться к чужой, сервер вернёт ошибку.

// GET https://nomoreparties.co/v1/cohortId/users/me

class Api {
  constructor({ basePath, headers }) {
    this._basePath = basePath;
    this._headers = headers;
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getServerCards() {
    return fetch(`${this._basePath}/cards`, {
      headers: this._headers,
    }).then(this._getJson);
  }

  postNewCard(data) {
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getJson);
  }

  // Получить данные о пользователе
  getCurrentUser() {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._headers,
    }).then(this._getJson);
  }

  // Обновить данные пользователя
  updateUserInfo(data) {
    return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      })
    }).then(this._getJson);
  }

  // Обновить аватар
  updateAvatar(data) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getJson);
  }

  deleteCard(_id) {
    return fetch(`${this._basePath}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJson);
  }

  changeLikeCardStatus(_id, isLiked) {
    if (isLiked) {
      return fetch(`${this._basePath}/cards/${_id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._getJson);
    } else {
      return fetch(`${this._basePath}/cards/${_id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getJson);
    }
  }
}

export const api = new Api({
  basePath: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "545040d2-ca8d-4af4-bb28-cd05a11607d7",
    "Content-Type": "application/json",
  },
});
