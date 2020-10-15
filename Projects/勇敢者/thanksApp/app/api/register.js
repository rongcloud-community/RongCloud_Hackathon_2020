import {BASE_URL} from './login';

export function verify_code_yp(phone, code) {
  return fetch(BASE_URL + '/user/verify_code_yp', {
    method: 'POST', body: JSON.stringify({
      phone: phone,
      region: '86',
      code: code,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}

export function registerUser(nickname, password, verification_token) {
  return fetch(BASE_URL + '/user/register', {
    method: 'POST', body: JSON.stringify({
      nickname,
      password,
      verification_token,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}

export function send_code_yp(phone) {
  return fetch(BASE_URL + '/user/send_code_yp', {
    method: 'POST', body: JSON.stringify({
      phone,
      region: '86',
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}
