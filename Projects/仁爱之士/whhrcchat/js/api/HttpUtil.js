import React from 'react';

const BASE_URL = 'http://chat.linpr.cn:31095';

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

export default class HttpUtil {
  static header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  static getHttp = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      fetch(handleUrl(BASE_URL + url)(params), {
        credentials: 'include',
        method: 'GET',
        headers: HttpUtil.header,
      })
          .then((response) => {
            if (response) {
              if (response.headers && response.headers.map && response.headers.map['set-cookie']) {
                HttpUtil.header = {
                  'Content-Type': 'application/json',
                  'cookie': response.headers.map['set-cookie'],
                };
              }
              return response.json();
            } else {
              reject('网络错误');
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

  static postHttp = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        credentials: 'include',
        method: 'POST',
        headers: HttpUtil.header,
        body: JSON.stringify(params),
      })
          .then(response => {
            if (response) {
              if (response.headers && response.headers.map && response.headers.map['set-cookie']) {
                HttpUtil.header = {
                  'Content-Type': 'application/json',
                  'cookie': response.headers.map['set-cookie'],
                };

              }
              return response.json();
            } else {
              reject('网络错误');
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

