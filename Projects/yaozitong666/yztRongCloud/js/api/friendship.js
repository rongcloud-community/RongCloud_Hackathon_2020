import HttpClient from './HttpClient';

export function inviteFriend(friendId, message) {
  return HttpClient.postRequest('/friendship/invite', {
    friendId, message,
  });
}

export function getAllFriend() {
  return HttpClient.getRequest('/friendship/all');
}


export function agreeOrIgnoreFriend(isDeleteUser, friendId) {
  if (isDeleteUser) {
    return HttpClient.postRequest('/friendship/ignore', {
      friendId,
    });
  } else {
    return HttpClient.postRequest('/friendship/agree', {
      friendId,
    });
  }
}
