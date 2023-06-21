// export const base_URL = 'http://104.131.160.75:3000';
export const base_URL = 'https://auth.nomoreparties.co';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const getJson = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${base_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({email, password})
  })
  .then((res) => getJson(res));
};

export const authorize = (email, password) => {
  return fetch(`${base_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({email, password})
  })
  .then(res => res.json())
  .then((res) => {
      localStorage.setItem('jwt', res.token);
      return res.token;
    }
  )
  .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${base_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
}
