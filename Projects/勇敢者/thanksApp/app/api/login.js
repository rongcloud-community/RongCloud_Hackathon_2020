export const BASE_URL = 'http://chat.linpr.cn:31093';

export function loginApi(phone, password) {
  return fetch(BASE_URL + '/user/login', {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      phone: phone,
      region: '86',
      password: password,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}
