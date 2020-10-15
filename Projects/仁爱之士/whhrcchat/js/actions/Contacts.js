import Types from './types';
import {ToastAndroid} from 'react-native';
import * as Api from '../api';

export function onAgreeOrIgnoreFriend(isReject, friendId, callback) {
  return dispatch => {
    dispatch({type: Types.CONTACTS_LOADING_CHANGE, contactsLoading: true});
    Api.agreeOrIgnoreFriend(isReject, friendId)
        .then(_ => {
          dispatch({type: Types.CONTACTS_LOADING_CHANGE, contactsLoading: false});
          ToastAndroid.show(isReject ? '已拒绝' : '已通过', ToastAndroid.SHORT);
          if (typeof callback === 'function') {
            callback();
          }
        })
        .catch(e => {
          dispatch({type: Types.CONTACTS_LOADING_CHANGE, contactsLoading: false});
          console.log(e);
        });
  };
}

export function onChangeContactsArr(userId, isShowLoading) {
  return dispatch => {
    if (isShowLoading) {
      dispatch({type: Types.CONTACTS_ARR_LOADING_CHANGE, arrRefreshing: true});
    }
    Api.getAllFriend()
        .then(response => {
          let friendList = response.result.filter(value => {
            if (value.user.id === userId) {
              return false;
            } else {
              return value.status !== 21;
            }
          });
          dispatch({
            type: Types.CONTACTS_ARR_CHANGE,
            contactsArr: friendList && friendList.length > 0 ? friendList : [],
            arrRefreshing: false,
          });
        })
        .catch(e => {
          console.log(e);
          dispatch({type: Types.CONTACTS_ARR_LOADING_CHANGE, arrRefreshing: false});
        });
  };
}
