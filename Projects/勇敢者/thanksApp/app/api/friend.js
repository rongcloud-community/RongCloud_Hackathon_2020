import {BASE_URL} from './login';

export function inviteFriend(friendId, message, cookie) {
  return fetch(BASE_URL + '/friendship/invite', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      friendId,
      message,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'cookie': cookie,
    },
  });
}

export function searchFriend(phone, cookie) {
  return fetch(BASE_URL + '/user/find/86/' + phone, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'cookie': cookie,
    },
  });
}

export function agreeFriend(friendId, cookie) {
  return fetch(BASE_URL + '/friendship/agree', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      friendId,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'cookie': cookie,
    },
  });
}

export function ignoreFriend(friendId, cookie) {
  return fetch(BASE_URL + '/friendship/ignore', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      friendId,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'cookie': cookie,
    },
  });
}
