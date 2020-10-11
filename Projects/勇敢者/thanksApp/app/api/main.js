import {BASE_URL} from './login';

export function getUserInfo(userId, cookie) {
  return fetch(BASE_URL + '/user/' + userId, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'cookie': cookie,
    },
  });
}

export function getAllFriend(cookie) {
  return fetch(BASE_URL + '/friendship/all', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'cookie': cookie,
    },
  });
}

export function logout(cookie) {
  return fetch(BASE_URL + '/user/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'cookie': cookie,
    },
  });
}
