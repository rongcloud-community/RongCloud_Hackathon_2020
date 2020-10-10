import {loginByPassword, logout, verifyCodeYp, registerByToken, getUserInfo} from '../../api/user';
import {ToastAndroid} from 'react-native';
import UserDao from '../../dao/UserDao';
import Types from '../actionTypes';
import * as IMClient from 'react-native-rongcloud-imlib/src';

export function onPasswordLogin(loadingModal, navigation, userPhone, password) {
  return dispatch => {
    loadingModal.show('登录中');
    loginByPassword(userPhone, password).then(res => {
      UserDao.saveUserInfo({phone: userPhone, password});
      dispatch({type: Types.CHANGE_USER_INFO, userToken: res.result.token, userId: res.result.id, userPhone});
      IMClient.connect(
          res.result.token,
          () => {
            onGetUserInfo(dispatch, loadingModal, navigation, res.result.id);
          },
          (errorCode) => {
            console.log('ErrorCode：' + errorCode);
            loadingModal.hide();
            ToastAndroid.show('ErrorCode： ' + errorCode + ' ，请稍后重试', ToastAndroid.SHORT);
            if (errorCode === 34001) {
              IMClient.disconnect();
            }
          },
          (databaseOpenStatus) => {
            console.log('databaseOpenStatus ' + databaseOpenStatus);
          },
      );
    }).catch(e => {
      loadingModal.hide();
      ToastAndroid.show('登录失败 ' + e.toString(), ToastAndroid.SHORT);
    });
  };
}

export function onGetUserInfo(dispatch, loadingModal, navigation, id) {
  getUserInfo(id)
      .then(response => {
        loadingModal.hide();
        navigation.replace('Main');
        dispatch({type: Types.CHANGE_USER_NAME, userName: response.result.nickname});
        ToastAndroid.show('登录成功', ToastAndroid.SHORT);
      })
      .catch(e => {
        loadingModal.hide();
        ToastAndroid.show('登录失败 ' + e.toString(), ToastAndroid.SHORT);
      });
}

export function onRegisterByPhoneAndPassword(loadingModal, navigation, phone, code, nickname, password) {
  return dispatch => {
    loadingModal.show();
    verifyCodeYp(phone, code)
        .then(response => {
          registerByToken(nickname, password, response.result.verification_token)
              .then(resp => {
                loadingModal.hide();
                ToastAndroid.show('注册成功！', ToastAndroid.SHORT);
                navigation.pop();
              })
              .catch(e => {
                loadingModal.hide();
                console.log(e);
              });
        })
        .catch(e => {
          loadingModal.hide();
          console.log(e);
        });
  };
}

export function onExitApp(loadingModal, navigation) {
  return dispatch => {
    loadingModal.show();
    logout().then(r => {
      loadingModal.hide();
      dispatch({type: Types.CLEAR_MESSAGE});
      IMClient.disconnect();
      navigation.replace('Login');
    }).catch(e => {
      loadingModal.hide();
      console.log(e);
    });
  };
}
