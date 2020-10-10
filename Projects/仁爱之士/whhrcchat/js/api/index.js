import HttpUtil from './HttpUtil';

export function sendCodeYp(phone) {
  return HttpUtil.postHttp('/user/send_code_yp', {
    phone,
    region: '86',
  });
}

export function verifyCodeYp(phone, code) {
  return HttpUtil.postHttp('/user/verify_code_yp', {
    phone, code, region: '86',
  });
}

export function login(phone, password) {
  return HttpUtil.postHttp('/user/login', {
    phone,
    region: '86',
    password,
  });
}

export function logout() {
  return HttpUtil.postHttp('/user/logout');
}

export function findUserByPhone(phone) {
  return HttpUtil.getHttp(`/user/find/86/${phone}`);
}

export function register(nickname, password, verification_token) {
  return HttpUtil.postHttp('/user/register', {
    nickname, password, verification_token,
  });
}

export function getAllFriend() {
  return HttpUtil.getHttp('/friendship/all');
}

export function agreeOrIgnoreFriend(isReject, friendId) {
  return HttpUtil.postHttp(isReject ? '/friendship/ignore' : '/friendship/agree', {
    friendId,
  });
}

export function getUserInfo(id) {
  return HttpUtil.getHttp(`/user/${id}`);
}

export function inviteFriend(friendId, message) {
  return HttpUtil.postHttp('/friendship/invite', {
    friendId, message,
  });
}

