import HttpUtil from '../../utils/HttpUtil';
import Types from '../action/types';
import * as IMClient from 'react-native-rongcloud-imlib/src';
import {ToastAndroid} from 'react-native';

export function onLogin(progressHUD, navigation, phone, password) {
  return dispatch => {
    progressHUD.show('登录中');
    HttpUtil.doPost('/user/login', {
      phone,
      region: '86',
      password,
    }).then(res => {
      dispatch({
        type: Types.USER_INFO_CHANGE,
        rongCloudToken: res.result.token,
        userId: res.result.id,
        userphone: phone,
      });
      IMClient.connect(
          res.result.token,
          () => {
            HttpUtil.doGet(`/user/${res.result.id}`)
                .then(response => {
                  progressHUD.hide();
                  navigation.replace('Home');
                  dispatch({type: Types.USER_NAME_CHANGE, username: response.result.nickname});
                  ToastAndroid.show('登录成功', ToastAndroid.SHORT);
                })
                .catch(e => {
                  progressHUD.hide();
                  ToastAndroid.show('登录失败 ' + e.toString(), ToastAndroid.SHORT);
                });
          },
          (errorCode) => {
            console.log('ErrorCode：' + errorCode);
            progressHUD.hide();
            ToastAndroid.show('ErrorCode： ' + errorCode, ToastAndroid.SHORT);
            if (errorCode === 34001) {
              IMClient.disconnect();
            }
          },
          (databaseOpenStatus) => {
            console.log('databaseOpenStatus ' + databaseOpenStatus);
          },
      );
    }).catch(e => {
      progressHUD.hide();
      ToastAndroid.show('登录失败 ' + e.toString(), ToastAndroid.SHORT);
    });
  };
}

export function onRegister(progressHUD, navigation, phone, code, nickname, password) {
  return dispatch => {
    if (!(phone && code && nickname && password)) {
      ToastAndroid.show('请完善内容', ToastAndroid.SHORT);
      return;
    }
    progressHUD.show();
    HttpUtil.doPost('/user/verify_code_yp', {
      phone, code, region: '86',
    })
        .then(response => {
          HttpUtil.doPost('/user/register', {
            nickname,
            password,
            verification_token: response.result.verification_token,
          })
              .then(resp => {
                progressHUD.hide();
                ToastAndroid.show('注册成功', ToastAndroid.SHORT);
                navigation.pop();
              })
              .catch(e => {
                progressHUD.hide();
                console.log(e);
              });
        })
        .catch(e => {
          progressHUD.hide();
          console.log(e);
        });
  };
}

export function onExit(progressHUD, navigation) {
  return dispatch => {
    progressHUD.show();
    HttpUtil.doPost('/user/logout').then(_ => {
      progressHUD.hide();
      dispatch({type: Types.CLEAR_MESSAGE});
      IMClient.disconnect();
      navigation.replace('Login');
    }).catch(e => {
      progressHUD.hide();
      console.log(e);
    });
  };
}

