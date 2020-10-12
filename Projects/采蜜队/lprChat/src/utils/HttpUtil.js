import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const BASE_URL = 'http://chat.linpr.cn:31094';

export default class HttpUtil {

  static header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  static doGet = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      timeoutFetch(fetch(handleUrl(BASE_URL + url)(params), {
        credentials: 'include',
        method: 'GET',
        headers: HttpUtil.header,
      }))
          .then((response) => {
            if (response) {
              if (response.headers && response.headers.map && response.headers.map['set-cookie']) {
                HttpUtil.header = {
                  'Content-Type': 'application/json',
                  'cookie': response.headers.map['set-cookie'],
                };

                AsyncStorage.setItem('cookie', response.headers.map['set-cookie']);
              }
              return response.json();
            } else {
              reject('服务器繁忙，请稍后重试');
            }
          })
          .then((response) => {
            if (response && response.code === 200) {
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error.toString());
          });
    });
  };

  static doPost = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      timeoutFetch(fetch(BASE_URL + url, {
        credentials: 'include',
        method: 'POST',
        headers: HttpUtil.header,
        body: JSON.stringify(params),
      }))
          .then(response => {
            if (response) {
              if (response.headers && response.headers.map && response.headers.map['set-cookie']) {
                HttpUtil.header = {
                  'Content-Type': 'application/json',
                  'cookie': response.headers.map['set-cookie'],
                };

                AsyncStorage.setItem('cookie', response.headers.map['set-cookie']);
              }
              return response.json();
            } else {
              reject('服务器繁忙，请稍后重试');
            }
          })
          .then(response => {
            if (response && response.code === 200) {
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error.toString());
          });
    });
  };
}

const timeoutFetch = (original_fetch, timeout = 10000) => {
  let timeoutBlock = () => {
  };
  let timeout_promise = new Promise((resolve, reject) => {
    timeoutBlock = () => {
      reject('time out');
    };
  });

  let abortable_promise = Promise.race([
    original_fetch,
    timeout_promise,
  ]);

  setTimeout(() => {
        timeoutBlock();
      },
      timeout);

  return abortable_promise;
};

const handleUrl = url => params => {
  if (params) {
    let paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
    if (url.search(/\?/) === -1) {
      typeof (params) === 'object' ? url += '?' + paramsArray.join('&') : url;
    } else {
      url += '&' + paramsArray.join('&');
    }
  }
  return url;
};

