import AsyncStorage from '@react-native-community/async-storage';

export const COOKIE_KEY = 'COOKIE_KEY';
export const USER_INFO_KEY = 'USER_INFO_KEY';

export default class UserDao {

  static saveUserCookie(value) {
    AsyncStorage.setItem(COOKIE_KEY, value);
  }

  static getUserCookie() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(COOKIE_KEY, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  }

  // {phone : '', password : ''}
  static saveUserInfo(value) {
    AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(value));
  }

  static getUserInfo() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(USER_INFO_KEY, (error, result) => {
        if (!error) {
          resolve(JSON.parse(result));
        } else {
          reject(error);
        }
      });
    });
  }
}

