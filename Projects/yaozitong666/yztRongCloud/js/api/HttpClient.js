/** 基于fetch封装的网络请求工具类 **/

import React from 'react';
import UserDao from '../dao/UserDao';

const BASE_URL = 'http://chat.linpr.cn:31092';

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
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

/**
 * fetch 网络请求超时处理
 * @param original_fetch 原始的fetch
 * @param timeout 超时时间 10s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (original_fetch, timeout = 10000) => {
  let timeoutBlock = () => {
  };
  let timeout_promise = new Promise((resolve, reject) => {
    timeoutBlock = () => {
      // 请求超时处理
      reject('请求超时，请稍后重试');
    };
  });

  // Promise.race(iterable)方法返回一个promise
  // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
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

export default class HttpClient {

  /**
   * fetch 网络请求的header，可自定义header 内容
   * @type {{Accept: string, Content-Type: string, X-FM-SHOOTING-TOKEN: *}}
   */
  static header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  static returnResponseJson = (response, reject) => {
    if (response) {
      // 设置cookie
      if (response.headers && response.headers.map && response.headers.map['set-cookie']) {
        HttpClient.header = {
          'Content-Type': 'application/json',
          'cookie': response.headers.map['set-cookie'],
        };
        UserDao.saveUserCookie(response.headers.map['set-cookie']);
      }
      return response.json();
    } else {
      reject('服务器繁忙，请稍后重试');
    }
  };

  static handleResponse = (response, resolve, reject) => {
    // response.code：是与服务器端约定code：1表示请求成功，非1表示请求失败，msg：请求失败内容
    if (response && response.code === 200) {
      resolve(response);
    } else {
      reject(response);
    }
    // console.log('handleResponse ', response)
  };

  /**
   * 基于fetch 封装的GET 网络请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static getRequest = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      timeoutFetch(fetch(handleUrl(BASE_URL + url)(params), {
        credentials: 'include',
        method: 'GET',
        headers: HttpClient.header,
      }))
          .then((response) => {
            return HttpClient.returnResponseJson(response, reject);
          })
          .then((response) => {
            HttpClient.handleResponse(response, resolve, reject);
          })
          .catch((error) => {
            reject('服务器繁忙，请稍后重试');
            console.log('getRequest error ', error);
          });
    });
  };

  /**
   * 基于fetch 的 POST 请求
   * @param url 请求的URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static postRequest = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      timeoutFetch(fetch(BASE_URL + url, {
        credentials: 'include',
        method: 'POST',
        headers: HttpClient.header,
        body: JSON.stringify(params),
      }))
          .then(response => {
            return HttpClient.returnResponseJson(response, reject);
          })
          .then(response => {
            HttpClient.handleResponse(response, resolve, reject);
          })
          .catch((error) => {
            reject('服务器繁忙，请稍后重试');
            console.log('postRequest error ', error);
          });
    });
  };
}
