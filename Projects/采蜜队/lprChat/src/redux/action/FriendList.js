import Types from '../action/types';
import {ToastAndroid} from 'react-native';
import HttpUtil from '../../utils/HttpUtil';

export function onAgreeOrIgnoreFriend(progressHUD, isIgnore, friendId, callback) {
  return dispatch => {
    progressHUD.show();
    HttpUtil.doPost(isIgnore ? '/friendship/ignore' : '/friendship/agree', {friendId})
        .then(response => {
          progressHUD.hide();
          ToastAndroid.show(isIgnore ? '已拒绝' : '已通过', ToastAndroid.SHORT);
          if (typeof callback === 'function') {
            callback();
          }
        })
        .catch(e => {
          progressHUD.hide();
          console.log(e);
        });
  };
}

export function onChangeFriendList(userId) {
  return dispatch => {
    dispatch({type: Types.CONTACT_FRIEND_LIST_LOADING_CHANGE, friendListRefreshing: true});
    HttpUtil.doGet('/friendship/all')
        .then(response => {
          let friendList = response.result.filter(value => {
            if (value.user.id === userId) {
              return false;
            } else {
              return value.status !== 21;
            }
          });
          dispatch({
            type: Types.CONTACT_FRIEND_LIST_CHANGE,
            friendList: friendList && friendList.length > 0 ? friendList : [],
            friendListRefreshing: false,
          });
        })
        .catch(e => {
          console.log(e);
          dispatch({type: Types.CONTACT_FRIEND_LIST_LOADING_CHANGE, friendListRefreshing: false});
        });
  };
}
