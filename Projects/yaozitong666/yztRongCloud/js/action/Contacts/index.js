import {agreeOrIgnoreFriend, getAllFriend} from '../../api/friendship';
import Types from '../actionTypes';
import {fromJS} from 'immutable';
import {ToastAndroid} from 'react-native';

export function onChangeNewFriendList(userId) {
  return dispatch => {
    dispatch({type: Types.CHANGE_NEW_FRIEND_LIST_LOADING, newFriendListRefreshing: true});
    getAllFriend()
        .then(response => {
          let friendList = response.result.filter(value => {
            if (value.user.id === userId) {
              return false;
            } else {
              return !(value.status === 30 || value.status === 21);
            }
          });
          dispatch({
            type: Types.CHANGE_NEW_FRIEND_LIST,
            newFriendList: friendList && friendList.length > 0 ? fromJS(friendList) : fromJS([]),
            newFriendListRefreshing: false,
          });
        })
        .catch(e => {
          console.log(e);
          dispatch({type: Types.CHANGE_NEW_FRIEND_LIST_LOADING, newFriendListRefreshing: false});
        });
  };
}

export function onAgreeOrIgnoreFriend(loadingModal, isDeleteUser, friendId, callback) {
  return dispatch => {
    loadingModal.show();
    agreeOrIgnoreFriend(isDeleteUser, friendId)
        .then(response => {
          loadingModal.hide();
          ToastAndroid.show(isDeleteUser ? '已拒绝好友请求' : '已通过好友请求', ToastAndroid.SHORT);
          if (typeof callback === 'function') {
            callback();
          }
        })
        .catch(e => {
          loadingModal.hide();
          console.log(e);
        });
  };
}

export function onChangeContactFriendList(userId) {
  return dispatch => {
    dispatch({type: Types.CHANGE_CONTACT_FRIEND_LIST_LOADING, contactFriendListRefreshing: true});
    getAllFriend()
        .then(response => {
          let friendList = response.result.filter(value => {
            if (value.user.id === userId) {
              return false;
            } else {
              return value.status === 20;
            }
          });
          dispatch({
            type: Types.CHANGE_CONTACT_FRIEND_LIST,
            contactFriendList: friendList && friendList.length > 0 ? fromJS(friendList) : fromJS([]),
            contactFriendListRefreshing: false,
          });
        })
        .catch(e => {
          console.log(e);
          dispatch({type: Types.CHANGE_CONTACT_FRIEND_LIST_LOADING, contactFriendListRefreshing: false});
        });
  };
}
