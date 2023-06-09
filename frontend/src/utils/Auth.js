import React from 'react';

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const BASE_URL = 'https://api.mesto.alisa.nomoredomains.monster';

// export const BASE_URL = 'http://localhost:3001';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then((response) => getResponse(response))
  .then((res) => {
    console.log(res)
    return res;
  })
};  

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then((res) => getResponse(res))
  .then((data) => {
    localStorage.setItem('Authorized', 'true');
    return data;
  })
}; 

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => getResponse(res))
  .then(data => data)
}