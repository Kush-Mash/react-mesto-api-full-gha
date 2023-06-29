export const basePath = 'https://api.mesto.kush-mash.nomoreparties.sbs';
// export const basePath = 'http://localhost:3000';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const getJson = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${basePath}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({email, password})
  })
  .then((res) => getJson(res));
};

export const authorize = (email, password) => {
  return fetch(`${basePath}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({email, password})
  })
  .then(res => getJson(res))
  .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${basePath}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => getJson(res))
  .then(data => data)
}
