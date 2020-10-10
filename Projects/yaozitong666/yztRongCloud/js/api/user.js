import HttpClient from './HttpClient';

export function loginByPassword(phone, password) {
  return HttpClient.postRequest('/user/login', {
    phone,
    region: '86',
    password,
  });
}

export function sendMsg(phone) {
  return HttpClient.postRequest('/user/send_code_yp', {
    phone,
    region: '86',
  });
}

export function verifyCodeYp(phone, code) {
  return HttpClient.postRequest('/user/verify_code_yp', {
    phone, code, region: '86',
  });
}

export function registerByToken(nickname, password, verification_token) {
  return HttpClient.postRequest('/user/register', {
    nickname, password, verification_token,
  });
}

export function getUserInfo(id) {
  return HttpClient.getRequest(`/user/${id}`);
}

export function logout() {
  return HttpClient.postRequest('/user/logout');
}

export function searchUserByPhone(phone) {
  return HttpClient.getRequest(`/user/find/86/${phone}`);
}
