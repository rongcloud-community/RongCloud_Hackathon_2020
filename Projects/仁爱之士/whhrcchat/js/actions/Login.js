import Types from './types';
import * as IMClient from 'react-native-rongcloud-imlib/src';
import {ToastAndroid} from 'react-native';
import * as Api from '../api';

export function onLogin(navigation, phone, password) {
  return dispatch => {
    dispatch({type: Types.LOGIN_LOADING_CHANGE, loginLoading: true});
    Api.login(phone, password).then(res => {
      dispatch({type: Types.MY_INFO_CHANGE, myToken: res.result.token, myId: res.result.id, myPhone: phone});
      IMClient.connect(
          res.result.token,
          () => {
            Api.getUserInfo(res.result.id)
                .then(response => {
                  dispatch({type: Types.LOGIN_LOADING_CHANGE, loginLoading: false});
                  navigation.replace('Home');
                  dispatch({type: Types.MY_NAME_CHANGE, myName: response.result.nickname});
                  ToastAndroid.show('登录成功', ToastAndroid.SHORT);
                })
                .catch(e => {
                  dispatch({type: Types.LOGIN_LOADING_CHANGE, loginLoading: false});
                  ToastAndroid.show('登录失败 ' + e.toString(), ToastAndroid.SHORT);
                });
          },
          (errorCode) => {
            dispatch({type: Types.LOGIN_LOADING_CHANGE, loginLoading: false});
            ToastAndroid.show('errorCode： ' + errorCode, ToastAndroid.SHORT);
            if (errorCode === 34001) {
              IMClient.disconnect();
            }
          },
          (databaseOpenStatus) => {
            console.log('databaseOpenStatus ' + databaseOpenStatus);
          },
      );
    }).catch(e => {
      dispatch({type: Types.LOGIN_LOADING_CHANGE, loginLoading: false});
      ToastAndroid.show('登录失败 ' + e.toString(), ToastAndroid.SHORT);
    });
  };
}

export function onRegister(navigation, phone, code, nickname, password) {
  return dispatch => {
    if (!(phone && code && nickname && password)) {
      ToastAndroid.show('请完善内容', ToastAndroid.SHORT);
      return;
    }
    dispatch({type: Types.REGISTER_LOADING_CHANGE, registerLoading: true});
    Api.verifyCodeYp(phone, code)
        .then(response => {
          Api.register(nickname, password, response.result.verification_token)
              .then(() => {
                dispatch({type: Types.REGISTER_LOADING_CHANGE, registerLoading: false});
                ToastAndroid.show('注册成功', ToastAndroid.SHORT);
                navigation.pop();
              })
              .catch(e => {
                dispatch({type: Types.REGISTER_LOADING_CHANGE, registerLoading: false});
                console.log(e);
              });
        })
        .catch(e => {
          dispatch({type: Types.REGISTER_LOADING_CHANGE, registerLoading: false});
          console.log(e);
        });
  };
}

export function onExit(navigation) {
  return dispatch => {
    dispatch({type: Types.CHAT_LOADING_CHANGE, chatLoading: true});
    Api.logout().then(_ => {
      dispatch({type: Types.CHAT_LOADING_CHANGE, chatLoading: false});
      dispatch({type: Types.CLEAR_MESSAGE});
      IMClient.disconnect();
      navigation.replace('Login');
    }).catch(e => {
      dispatch({type: Types.CHAT_LOADING_CHANGE, chatLoading: false});
      console.log(e);
    });
  };
}
