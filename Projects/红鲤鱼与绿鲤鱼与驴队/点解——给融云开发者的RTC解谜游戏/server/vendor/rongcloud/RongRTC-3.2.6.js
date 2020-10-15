/**
 * RongRTC.js v3.2.6
 * CodeVersion: 40ffd655008b7e36415979d1e4340fd27ecadf84
 * Release Date: Fri Sep 18 2020 21:26:30 GMT+0800 (GMT+08:00)
 * Copyright (c) 2020 RongCloud, Inc.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.RongRTC = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var noop = function noop() {};
  var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  var isArray = function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };
  var isFunction = function isFunction(arr) {
    return Object.prototype.toString.call(arr) === '[object Function]';
  };
  var isString = function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
  };
  var isBoolean = function isBoolean(str) {
    return Object.prototype.toString.call(str) === '[object Boolean]';
  };
  var isUndefined = function isUndefined(str) {
    return Object.prototype.toString.call(str) === '[object Undefined]';
  };
  var isNull = function isNull(str) {
    return Object.prototype.toString.call(str) === '[object Null]';
  };
  var isNumber = function isNumber(str) {
    return Object.prototype.toString.call(str) === '[object Number]';
  };
  var stringify = function stringify(obj) {
    return JSON.stringify(obj);
  };
  var parse = function parse(str) {
    return JSON.parse(str);
  };

  /**
   * options.isReverse  是否反向循环
   * */
  var forEach = function forEach(obj, callback, options) {
    options = options || {};
    callback = callback || noop;
    var _options = options,
        isReverse = _options.isReverse;

    var loopObj = function loopObj() {
      for (var key in obj) {
        callback(obj[key], key, obj);
      }
    };
    var loopArr = function loopArr() {
      if (isReverse) {
        for (var i = obj.length - 1; i >= 0; i--) {
          callback(obj[i], i);
        }
      } else {
        for (var j = 0, len = obj.length; j < len; j++) {
          callback(obj[j], j);
        }
      }
    };
    if (isObject(obj)) {
      loopObj();
    }
    if (isArray(obj)) {
      loopArr();
    }
  };

  var isEmpty = function isEmpty(obj) {
    var result = true;
    if (isObject(obj)) {
      forEach(obj, function () {
        result = false;
      });
    }
    if (isString(obj) || isArray(obj)) {
      result = obj.length === 0;
    }
    if (isNumber(obj)) {
      result = obj === 0;
    }
    return result;
  };
  var rename = function rename(origin, newNames) {
    var isObj = isObject(origin);
    if (isObj) {
      origin = [origin];
    }
    origin = parse(stringify(origin));
    var updateProperty = function updateProperty(val, key, obj) {
      delete obj[key];
      key = newNames[key];
      obj[key] = val;
    };
    forEach(origin, function (item) {
      forEach(item, function (val, key, obj) {
        var isRename = key in newNames;
        (isRename ? updateProperty : noop)(val, key, obj);
      });
    });
    return isObject ? origin[0] : origin;
  };
  var extend = function extend(destination, sources) {
    for (var key in sources) {
      var value = sources[key];
      if (!isUndefined(value)) {
        destination[key] = value;
      }
    }
    return destination;
  };
  var Defer = Promise;
  var deferred = function deferred(callback) {
    return new Defer(callback);
  };
  var tplEngine = function tplEngine(tpl, data, regexp) {
    if (!isArray(data)) {
      data = [data];
    }
    var ret = [];
    var replaceAction = function replaceAction(object) {
      return tpl.replace(regexp || /\\?\{([^}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') return match.slice(1);
        return object[name] !== undefined ? object[name] : '{' + name + '}';
      });
    };
    for (var i = 0, j = data.length; i < j; i++) {
      ret.push(replaceAction(data[i]));
    }
    return ret.join('');
  };
  // 暂时支持 String
  var isContain = function isContain(str, keyword) {
    return str.indexOf(keyword) > -1;
  };
  var isEqual = function isEqual(source, target) {
    return source === target;
  };
  var Cache = function Cache(cache) {
    if (!isObject(cache)) {
      cache = {};
    }
    var set$$1 = function set$$1(key, value) {
      cache[key] = value;
    };
    var get$$1 = function get$$1(key) {
      return cache[key];
    };
    var remove = function remove(key) {
      delete cache[key];
    };
    var getKeys = function getKeys() {
      var keys = [];
      for (var key in cache) {
        keys.push(key);
      }
      return keys;
    };
    var clear = function clear() {
      cache = {};
    };
    return {
      set: set$$1,
      get: get$$1,
      remove: remove,
      getKeys: getKeys,
      clear: clear
    };
  };
  var request = function request(url, option) {
    return deferred(function (resolve, reject) {
      option = option || {};
      var xhr = new XMLHttpRequest();
      var method = option.method || 'GET';
      xhr.open(method, url, true);
      var headers = option.headers || {};
      forEach(headers, function (header, name) {
        xhr.setRequestHeader(name, header);
      });
      var body = option.body || {};
      var isSuccess = function isSuccess() {
        return (/^(200|202)$/.test(xhr.status)
        );
      };
      var timeout = option.timeout;
      if (timeout) {
        xhr.timeout = timeout;
      }
      xhr.onreadystatechange = function () {
        if (isEqual(xhr.readyState, 4)) {
          var responseText = xhr.responseText;

          responseText = responseText || '{}';
          var result = JSON.parse(responseText);
          if (isSuccess()) {
            resolve(result);
          } else {
            var status = xhr.status;

            extend(result, {
              status: status
            });
            reject(result);
          }
        }
      };
      xhr.onerror = function (error) {
        reject(error);
      };
      xhr.send(body);
    });
  };
  var map = function map(arrs, callback) {
    return arrs.map(callback);
  };
  var filter = function filter(arrs, callback) {
    return arrs.filter(callback);
  };
  var uniq = function uniq(arrs, callback) {
    var newData = [],
        tempData = {};
    arrs.forEach(function (target) {
      var temp = callback(target);
      tempData[temp.key] = temp.value;
    });
    forEach(tempData, function (val) {
      newData.push(val);
    });
    return newData;
  };
  var some = function some(arrs, callback) {
    return arrs.some(callback);
  };
  var toJSON = function toJSON(value) {
    return JSON.stringify(value);
  };
  var toArray$1 = function toArray$$1(obj) {
    var arrs = [];
    forEach(obj, function (v, k) {
      arrs.push([k, v]);
    });
    return arrs;
  };
  var isPromise = function isPromise(val) {
    var isTrue = false;
    try {
      isTrue = Object.prototype.toString.call(val) === '[object Promise]' || val && val.then && val.catch && val.finally;
    } catch (e) {
      isTrue = false;
    }
    return isTrue;
  };
  function Timer(_option) {
    _option = _option || {};
    var option = {
      timeout: 0,
      // interval | timeout
      type: 'interval'
    };
    extend(option, _option);
    var timers = [];
    var _timeout = option.timeout,
        type = option.type;

    var timerType = {
      resume: {
        interval: function interval(callback, immediate) {
          if (immediate) {
            callback();
          }
          return setInterval(callback, _timeout);
        },
        timeout: function timeout(callback, immediate) {
          if (immediate) {
            callback();
          }
          return setTimeout(callback, _timeout);
        }
      },
      pause: {
        interval: function interval(timer) {
          return clearInterval(timer);
        },
        timeout: function timeout(timer) {
          return clearTimeout(timer);
        }
      }
    };
    this.resume = function (callback, immediate) {
      callback = callback || noop;
      var resume = timerType.resume;

      var timer = resume[type](callback, immediate);
      timers.push(timer);
    };
    this.pause = function () {
      var pause = timerType.pause;

      forEach(timers, function (timer) {
        pause[type](timer);
      });
    };
  }
  var isInclude = function isInclude(str, match) {
    return str.indexOf(match) > -1;
  };
  var clone = function clone(source) {
    return JSON.parse(JSON.stringify(source));
  };
  function Index() {
    var index = 0;
    this.add = function () {
      index += 1;
    };
    this.get = function () {
      return index;
    };
    this.reset = function () {
      index = 0;
    };
  }
  function Observer() {
    var observers = [];
    this.add = function (observer, force) {
      if (isFunction(observer)) {
        if (force) {
          return observers = [observer];
        }
        observers.push(observer);
      }
    };
    this.remove = function (observer) {
      observers = filter(observers, function (_observer) {
        return _observer !== observer;
      });
    };
    this.emit = function (data) {
      forEach(observers, function (observer) {
        observer(data);
      });
    };
  }
  function Prosumer() {
    var data = [],
        isConsuming = false;
    this.produce = function (res) {
      data.push(res);
    };
    this.consume = function (callback, finished) {
      if (isConsuming) {
        return;
      }
      isConsuming = true;
      var next = function next() {
        var res = data.shift();
        if (isUndefined(res)) {
          isConsuming = false;
          finished && finished();
          return;
        }
        callback(res, next);
      };
      next();
    };
    this.isExeuting = function () {
      return isConsuming;
    };
  }
  /* 
   prosumer.consume(function(data, next){
    //dosomething
    next();
   });
  */
  var Log = console;
  var getBrowser = function getBrowser() {
    var userAgent = navigator.userAgent;
    var name = '',
        version = '';
    if (/(Msie|Firefox|Opera|Chrome|Netscape)\D+(\d[\d.]*)/.test(userAgent)) {
      name = RegExp.$1;
      version = RegExp.$2;
    }
    if (/Version\D+(\d[\d.]*).*Safari/.test(userAgent)) {
      name = 'Safari';
      version = RegExp.$1;
    }
    return {
      name: name,
      version: version
    };
  };

  var string10to64 = function string10to64(number) {
    var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ+/'.split(''),
        radix = chars.length + 1,
        qutient = +number,
        arr = [];
    do {
      var mod = qutient % radix;
      qutient = (qutient - mod) / radix;
      arr.unshift(chars[mod]);
    } while (qutient);
    return arr.join('');
  };

  var getUUID = function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  /* 获取 22 位的 UUID */
  var getUUID22 = function getUUID22() {
    var uuid = getUUID();
    uuid = uuid.replace(/-/g, '') + '0';
    uuid = parseInt(uuid, 16);
    uuid = string10to64(uuid);
    if (uuid.length > 22) {
      uuid = uuid.slice(0, 22);
    }
    return uuid;
  };

  var Storage = function () {
    var keyNS = 'rong-rtc-';

    function isKeyExist(key) {
      // do not depend on value cause of '和0
      return Object.prototype.hasOwnProperty.call(localStorage, key) || Object.prototype.hasOwnProperty.call(sessionStorage, key);
    }

    function get$$1(key) {
      var tempKey = keyNS + key;
      if (!isKeyExist(tempKey)) {
        return null;
      }
      var val = localStorage.getItem(tempKey) || sessionStorage.getItem(tempKey);
      val = JSON.parse(val);
      if (val !== null && Object.prototype.hasOwnProperty.call(val, 'type') && Object.prototype.hasOwnProperty.call(val, 'data')) {
        return val.data;
      }
      return null;
    }

    function set$$1(key, val, isTemp) {
      var store = void 0;
      if (isTemp) {
        store = sessionStorage;
      } else {
        store = localStorage;
      }
      store.setItem(keyNS + key, JSON.stringify({
        data: val,
        type: typeof val === 'undefined' ? 'undefined' : _typeof(val)
      }));
    }

    function remove(key) {
      var tempKey = keyNS + key;
      localStorage.removeItem(tempKey);
      sessionStorage.removeItem(tempKey);
    }

    return {
      get: get$$1,
      set: set$$1,
      remove: remove
    };
  }();

  var handleObjKeys = function handleObjKeys(obj, event) {
    obj = obj || {};
    var newObj = {};
    forEach(obj, function (value, key) {
      var newKey = event ? event(key) : key;
      newObj[newKey] = isObject(value) ? handleObjKeys(value, event) : value;
    });
    return newObj;
  };

  var clearEselessFields = function clearEselessFields(obj) {
    obj = obj || {};
    var newObj = clone(obj);
    forEach(newObj, function (value, key) {
      if (isUndefined(value)) {
        delete newObj[key];
      } else if (isObject(value)) {
        value = clearEselessFields(value);
      }
    });
    return newObj;
  };

  var lineToHump = function lineToHump(str) {
    return str.replace(/_(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
  };

  var humpToLine = function humpToLine(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  };

  var getKeys = function getKeys(_object) {
    var keys = [];
    for (var key in _object) {
      keys.push(key);
    }
    return keys;
  };

  /* 去重合并 */
  var merge = function merge(arr1, arr2, options) {
    options = options || {};
    var isReverse = options.isReverse;
    var newArr = [];
    forEach(arr1, function (item) {
      newArr.push(item);
    });
    forEach(arr2, function (item) {
      var index = newArr.indexOf(item);
      if (index > -1) {
        newArr.splice(index, 1);
      }
      isReverse ? newArr.unshift(item) : newArr.push(item);
    }, options);
    return newArr;
  };

  /**
   * 断言测试，当表达式值为 false，打印 Assertion failed 信息，同时返回表达式对应的 boolean 值
   * @param {Boolean} condition
   * @param {String} message
   */
  var assert = function assert(condition, message) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    /* eslint-disable no-console */
    if (console.assert) {
      var _console;

      (_console = console).assert.apply(_console, [condition, message].concat(args));
    }
    /* eslint-enable no-console */
    return !!condition;
  };

  var utils = {
    Prosumer: Prosumer,
    Log: Log,
    Observer: Observer,
    Timer: Timer,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isString: isString,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction,
    stringify: stringify,
    parse: parse,
    rename: rename,
    extend: extend,
    clone: clone,
    deferred: deferred,
    Defer: Defer,
    forEach: forEach,
    tplEngine: tplEngine,
    isContain: isContain,
    noop: noop,
    Cache: Cache,
    request: request,
    map: map,
    filter: filter,
    uniq: uniq,
    some: some,
    isEqual: isEqual,
    isEmpty: isEmpty,
    toJSON: toJSON,
    isInclude: isInclude,
    isNull: isNull,
    isNumber: isNumber,
    toArray: toArray$1,
    isPromise: isPromise,
    Index: Index,
    getBrowser: getBrowser,
    getUUID: getUUID,
    getUUID22: getUUID22,
    Storage: Storage,
    handleObjKeys: handleObjKeys,
    lineToHump: lineToHump,
    humpToLine: humpToLine,
    clearEselessFields: clearEselessFields,
    getKeys: getKeys,
    merge: merge,
    assert: assert
  };

  var DownEvent = {
    ROOM_USER_JOINED: 'room_user_joined',
    ROOM_USER_LEFT: 'room_user_left',
    ROOM_USER_KICK: 'room_user_kick',

    STREAM_PUBLISHED: 'stream_published',
    STREAM_UNPUBLISHED: 'stream_unpublished',
    STREAM_DISABLED: 'stream_disabled',
    STREAM_ENABLED: 'stream_enabled',
    STREAM_MUTED: 'stream_muted',
    STREAM_UNMUTED: 'stream_unmuted',

    RTC_ERROR: 'rtc_error',
    RTC_MOUNTED: 'rtc_mounted',
    RTC_UNMOUNTED: 'rtc_unmounted',

    MESSAGE_RECEIVED: 'message_received',

    REPORT_SPOKE: 'report_spoke',

    MONITOR_STATS: 'monitor_stats'
  };

  var UpEvent = {
    ROOM_JOIN: 'room_join',
    ROOM_LEAVE: 'room_leave',
    ROOM_GET: 'room_get',
    ROOM_GET_SESSONID: 'room_getsessionid',
    // 获取房间人员设备状态数据
    ROOM_GET_STATS: 'room_getstats',

    STREAM_PUBLISH: 'stream_publish',
    STREAM_PUBLISH_DEFAULT: 'stream_publish_default',
    STREAM_UNPUBLISH: 'stream_UNPUBLISH',
    STREAM_SUBSCRIBE: 'stream_subscribe',
    STREAM_UNSUBSCRIBE: 'stream_unsubscribe',
    STREAM_RESIZE: 'stream_resize',
    STREAM_GET: 'stream_get',

    LIVE_CONFIG: 'live_config',

    AUDIO_MUTE: 'audio_mute',
    AUDIO_UNMUTE: 'audio_unmute',

    VIDEO_DISABLE: 'video_disable',
    VIDEO_ENABLE: 'video_enable',

    STORAGE_SET: 'strorage_set',
    STORAGE_GET: 'strorage_get',
    STORAGE_REMOVE: 'strorage_remove',

    MESSAGE_SEND: 'message_send',

    DEVICE_GET: 'device_get',

    REPORT_START: 'report_start',
    REPORT_STOP: 'report_stop',

    MONITOR_SET_FREQUENCY: 'monitor_set_frequency'
  };

  var RoomEvents = [{
    name: DownEvent.ROOM_USER_JOINED,
    type: 'joined'
  }, {
    name: DownEvent.ROOM_USER_LEFT,
    type: 'left'
  }, {
    name: DownEvent.ROOM_USER_KICK,
    type: 'kick'
  }];

  var StreamEvents = [{
    name: DownEvent.STREAM_PUBLISHED,
    type: 'published'
  }, {
    name: DownEvent.STREAM_UNPUBLISHED,
    type: 'unpublished'
  }, {
    name: DownEvent.STREAM_DISABLED,
    type: 'disabled'
  }, {
    name: DownEvent.STREAM_ENABLED,
    type: 'enabled'
  }, {
    name: DownEvent.STREAM_MUTED,
    type: 'muted'
  }, {
    name: DownEvent.STREAM_UNMUTED,
    type: 'unmuted'
  }];

  var MessageEvents = [{
    name: DownEvent.MESSAGE_RECEIVED,
    type: 'received'
  }];

  var ReportEvents = [{
    name: DownEvent.REPORT_SPOKE,
    type: 'spoke'
  }];
  var MonitorEvents = [{
    name: DownEvent.MONITOR_STATS,
    type: 'stats'
  }];

  var getErrors = function getErrors() {
    var errors = [{
      code: 10000,
      name: 'INSTANCE_IS_DESTROYED',
      msg: 'RongRTC instance has been destroyed'
    }, {
      code: 50000,
      name: 'IM_NOT_CONNECTED',
      msg: 'IM not connected'
    }, {
      code: 50001,
      name: 'ROOM_ID_IS_ILLEGAL',
      msg: 'The roomId is illegal and can contain only upper and lower case letters, Arabic numerals, +, =, -, _ and cannot exceed 64 characters in length'
    }, {
      code: 50002,
      name: 'ROOM_REPEAT_JOIN',
      msg: 'Not rejoin the room'
    }, {
      code: 50003, //50004,
      name: 'RTC_NOT_JOIN_ROOM',
      msg: 'Please join the room first'
    }, {
      code: 50004, //50059,
      name: 'NO_AUDIO_AND_VIDEO_SERVICE',
      msg: 'No audio and video services have been activated'
    }, {
      code: 50010,
      name: '',
      msg: 'Http request timeout'
    }, {
      code: 50011,
      name: '',
      msg: 'http response error'
    },
    // {
    //   code: 50012,
    //   name: '',
    //   msg: 'Network unavailable'
    // },
    {
      code: 50012, //50052,
      name: 'NETWORK_UNAVAILABLE',
      msg: 'Network unavailable'
    }, {
      code: 50020,
      name: '',
      msg: 'Resources has been published'
    }, {
      code: 50021,
      name: 'SET_OFFER_ERROR',
      msg: 'Set offer error'
    }, {
      code: 50022,
      name: 'SET_ANSWER_ERROR',
      msg: 'Set answer error'
    }, {
      code: 50023,
      name: 'PUBLISH_STREAM_EXCEED_LIMIT',
      msg: 'The maximum number of published resources has been reached'
    }, {
      code: 50024,
      name: 'STREAM_NOT_EXIST',
      msg: 'Stream not exist. Please check user.id、stream.type or stream.tag'
    }, {
      code: 50030,
      name: 'SUBSCRIBE_STREAM_NOT_EXIST',
      msg: 'Subscribe to non-existent resource'
    }, {
      code: 50030,
      name: 'STREAM_TRACK_NOT_EXIST',
      msg: 'Track not exist. Please check user.id、stream.type or stream.tag'
    }, {
      code: 50031,
      name: 'STREAM_SUBSCRIBED',
      msg: 'Resources has been subscribed'
    }, {
      code: 50032,
      name: 'UNSUBSCRIBE_STREAM_NOT_EXIST',
      msg: 'Unsubscribe to non-existent resource'
    }, {
      code: 53001, //50051
      name: 'SOCKET_UNAVAILABLE',
      msg: 'IM socket unavailable'
    }, {
      code: 53002, //50053
      name: 'IM_SDK_VER_NOT_MATCH',
      msg: 'IM SDK version is too low, minimum version 2.4.0, please check: https://www.rongcloud.cn/docs/web_rtclib.html'
    }, {
      code: 53003, //50054,
      name: 'STREAM_DESKTOPID_ILLEGAL',
      msg: 'Failed to get screen shared stream, illegal desktopStreamId'
    }, {
      code: 53004, //50055,
      name: 'PARAMTER_ILLEGAL',
      msg: 'Please check the parameters, the {name} parameter is mandatory'
    }, {
      code: 53005, //50056,
      name: 'ENGINE_ERROR',
      msg: 'RTC engine error'
    }, {
      code: 53006, //50057,
      name: 'MEDIA_SERVER_ERROR',
      msg: 'Network is abnormal or Media Server is unavailable'
    }, {
      code: 53007, //50058, 未引用需要排查是否有透传如没有可去掉
      name: 'MEDIA_SERVER_RESPONSE_EMPTY',
      msg: 'Media Server response body is empty'
    }, {
      code: 53008, //50060,
      name: 'WRONG_ROLE_SETTING',
      msg: 'The set role is invalid'
    }, {
      code: 53009, //50061,
      name: 'WRONG_AUDIENCE_EVENT',
      msg: 'This method cannot be called by the audience'
    }, {
      code: 53010, //50062,
      name: 'SET_LIVE_CONFIG_MODE_ERROR',
      msg: 'This method can only be called in live mode'
    }, {
      code: 53011, //50063,
      name: 'SET_LIVE_CONFIG_ROLE_ERROR',
      msg: 'This method can only be called by the anchor'
    }, {
      code: 53012, //50064,
      name: 'MUST_PUBLISHED_BEFORE_SETMIXCONFIG',
      msg: 'Must be published before setMixConfig'
    }, {
      code: 53013, //50065,
      name: 'ROOM_USER_KICK',
      msg: 'You have been removed from the room！'
    }, {
      code: 53014, //50066,
      name: 'ROOM_USER_BLOCK',
      msg: 'You are not allowed to join the room！'
    }, {
      code: 40001,
      name: 'NOT_IN_ROOM',
      msg: 'Not in the room'
    }, {
      code: 40002,
      name: 'INTERNAL_ERROR',
      msg: 'IM Server internal error'
    }, {
      code: 40003,
      name: 'HAS_NO_ROOM',
      msg: 'IM Server room info not exist'
    }, {
      code: 40004,
      name: 'INVALID_USERID',
      msg: 'UserId illegal'
    }, {
      code: 40005,
      name: 'REPEAT_JOIN_ROOM',
      msg: 'Not rejoin the room'
    }];

    var errorMap = {
      Inner: {},
      Outer: {}
    };
    utils.forEach(errors, function (error) {
      var name = error.name,
          code = error.code,
          msg = error.msg;

      var info = {
        code: code,
        msg: msg
      };
      errorMap.Inner[name] = info;
      errorMap[code] = info;
      errorMap.Outer[name] = code;
    });
    return errorMap;
  };
  var ErrorType = getErrors();

  var StreamType = {
    NODE: -1,
    AUDIO: 0,
    VIDEO: 1,
    AUDIO_AND_VIDEO: 2
  };

  var StreamSize = {
    MAX: 1,
    MIN: 2
  };

  var StreamState = {
    ENABLE: 1,
    DISBALE: 0
  };

  var UserState = {
    JOINED: 0,
    LEFT: 1,
    OFFLINE: 2
  };

  var PingCount = 4;

  var LogTag = {
    ICE: 'ice',
    LIFECYCLE: 'lifecycle',
    ROOM: 'room',
    STREAM: 'stream',
    STREAM_HANDLER: 'stream_handler',
    LIVE_HANDLER: 'live_handler',
    ROOM_HANDLER: 'room_handler',
    STORAGE_HANDLER: 'storage_handler',
    IM: 'im',
    MESSAGE: 'message',
    DEVICE: 'device',
    STAT: 'stat'
  };

  var LogLevel = {
    INFO: 'I',
    DEBUG: 'D',
    VERBOSE: 'V',
    WARN: 'W',
    ERROR: 'E'
  };

  var EventType = {
    REQUEST: 1,
    RESPONSE: 2
  };

  var StorageType = {
    ROOM: 1,
    USER: 2
  };

  var REGEXP_ROOM_ID = /[A-Za-z0-9+=_-]+$/;

  var LENGTH_ROOM_ID = 64;

  var DEFAULT_MS_PROFILE = {
    height: 480,
    width: 640,
    frameRate: 15
  };
  var MIN_STREAM_SUFFIX = 'tiny';

  var AUDIO_LEVEL = [0, 1, 2, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];

  var REPORT_FREQUENCY = 1 * 1000;

  var REQUEST_TIMEOUT = 10 * 1000; // 默认改为 10s

  var MEDIASERVER_SUCCESS = 10000;

  /** 直播模式 */
  var RTC_MODE = {
    RTC: 0, // 普通音视频
    LIVE: 2 // 直播
  };

  /** 直播类型 */
  var LIVE_TYPE = {
    AUDIO_AND_VIDEO: 0,
    AUDIO: 1
  };

  /** 直播角色 */
  var LIVE_ROLE = {
    /**
     * 主播
     */
    ANCHOR: 1,
    /**
     * 观众
     */
    AUDIENCE: 2
  };

  /** 直播布局模式 */
  var LIVE_LAYOUT_MODE = {
    /**
     * 自定义布局
     */
    CUSTOMIZE: 1,
    /**
     * 悬浮布局
     */
    SUSPENSION: 2,
    /**
     * 自适应布局
     */
    ADAPTATION: 3
  };

  /* 直播自定义布局, 视频渲染方式 */
  var LIVE_RENDER_MODE = {
    CROP: 1, // 裁剪
    WHOLE: 2 // 填充
  };

  var LIVE_CONFIG_VERSION = 1;

  /* 直播设置(自定义布局设置, 请求 mediaServer 时传入) */
  var LIVE_CONFIG = {
    version: LIVE_CONFIG_VERSION
    // mode: LIVE_LAYOUT_MODE.SUSPENSION
  };

  var TAG_V2 = '';

  var STAT_FREQUENCY = 2 * 1000;

  var STAT_TPL = {
    R1: 'R1\t{rtcVersion}\t{imVersion}\t{platform}\t{pcName}\t{pcVersion}\t{browserName}\t{browserVersion}\t{deviceId}',

    R2: 'R2\t{type}\t{state}\t{deviceId}\r{trackIds}',

    R3_ITEM: '{googTrackId}\t{googCodecName}\t{audioLevel}\t{samplingRate}\t{trackSent}\t{packLostSentRate}\t{frameRate}\t{resolution}\t{googRenderDelayMs}\t{googJitterSent}\t{googNacksSent}\t{googPlisSent}\t{googRtt}\t{googFirsSent}\t{codecImplementationName}\t{trackState}',
    R3: 'R3\t{totalRate}\t-1\t-1\t-1\t{networkType}\t{rtt}\t{localAddress}\t{receiveBand}\t{sendBand}\t{packetsLost}\t{deviceId}\r{tracks}',
    R3_KEYS: ['mediaType', 'googTrackId', 'googCodecName', 'audioLevel', 'samplingRate', 'trackSent', 'packLostSentRate', 'frameRate', 'resolution', 'googRenderDelayMs', 'googJitterSent', 'googNacksSent', 'googPlisSent', 'googRtt', 'googFirsSent', 'codecImplementationName', 'trackState', 'googFirsReceived', 'googPlisReceived', 'googNacksReceived'],

    R4_ITEM: '{googTrackId}\t{googCodecName}\t{audioLevel}\t{samplingRate}\t{trackReceived}\t{packLostReceivedRate}\t{frameRate}\t{resolution}\t{googRenderDelayMs}\t{googJitterReceived}\t{googNacksReceived}\t{googPlisReceived}\t{googRtt}\t{googFirsReceived}\t{codecImplementationName}\t{trackState}',
    R4: 'R4\t{totalRate}\t-1\t-1\t-1\t{networkType}\t{rtt}\t{localAddress}\t{receiveBand}\t{sendBand}\t{packetsLost}\t{deviceId}\r{tracks}',
    R4_KEYS: ['mediaType', 'googTrackId', 'googCodecName', 'audioLevel', 'samplingRate', 'trackReceived', 'packLostReceivedRate', 'frameRate', 'resolution', 'googRenderDelayMs', 'googJitterReceived', 'googNacksReceived', 'googPlisReceived', 'googRtt', 'googFirsReceived', 'codecImplementationName', 'trackState', 'googNacksSent', 'googFirsSent']

  };

  var STAT_NONE = '-1';

  var STAT_SEPARATOR = '\n';

  var STAT_NAME = {
    R1: 'r1',
    R2: 'r2',
    R3: 'r3',
    R4: 'r4'
  };

  var SDK_VERSION = '3.2.5';

  var TRACK_STATE = {
    DISABLE: 0,
    ENABLE: 1
  };

  var STORAGE_KEY = {
    UUID: 'uuid'
  };

  var PROTOCOL = {
    HTTP: 'http://',
    HTTPS: 'https://'
  };

  /* 实时日志上传 RTC Tag  */
  var RTCLogTag = {
    /* 加入房间相关 */
    A_JR_T: 'A-joinRoom-T',
    A_JR_R: 'A-joinRoom-R',
    A_JR_E: 'A-joinRoom-E',
    L_JR_T: 'L-joinRoom-T',
    L_JR_R: 'L-joinRoom-R',
    L_JR_E: 'L-joinRoom-E',
    P_JRAGD_T: 'P-joinRoomAndGetData-T',
    P_JRAGD_R: 'P-joinRoomAndGetData-R',
    P_JRAGD_E: 'P-joinRoomAndGetData-E',
    /* 断线后重新加入房间 Todo */
    L_REJR_T: 'L-rejoinRoom-T',
    L_REJR_R: 'L-rejoinRoom-R',
    L_REJR_E: 'L-rejoinRoom-E',
    /* 退出房间相关 */
    A_LR_T: 'A-leaveRoom-T',
    A_LR_R: 'A-leaveRoom-R',
    A_LR_E: 'A-leaveRoom-E',
    L_LR_T: 'L-leaveRoom-T',
    L_LR_R: 'L-leaveRoom-R',
    L_LR_E: 'L-leaveRoom-E',
    L_MSLR_T: 'L-mediaLeaveRoom-T',
    L_MSLR_R: 'L-mediaLeaveRoom-R',
    L_MSLR_E: 'L-mediaLeaveRoom-E',
    /* 发布资源相关 */
    A_PAVS_T: 'A-publishAVStream-T',
    A_PAVS_R: 'A-publishAVStream-R',
    A_PAVS_E: 'A-publishAVStream-E',
    /* 取消发布资源相关 */
    A_UPAVS_T: 'A-unpublishAVStream-T',
    A_UPAVS_R: 'A-unpublishAVStream-R',
    A_UPAVS_E: 'A-unpublishAVStream-E',
    /* MediaServer Exchange 接口 */
    L_MSE_T: 'L-MSExchange-T',
    L_MSE_R: 'L-MSExchange-R',
    L_MSE_E: 'L-MSExchange-E',
    /* 订阅资源相关 */
    A_SAVS_T: 'A-subscribeAVStream-T',
    A_SAVS_R: 'A-subscribeAVStream-R',
    A_SAVS_E: 'A-subscribeAVStream-E',
    /* 取消订阅资源相关 */
    A_USAVS_T: 'A-unsubscribeAVStream-T',
    A_USAVS_R: 'A-unsubscribeAVStream-R',
    A_USAVS_E: 'A-unsubscribeAVStream-E',
    /* MediaServer Subscribe 接口 */
    L_MSS_T: 'L-MSSub-T',
    L_MSS_R: 'L-MSSub-R',
    L_MSS_E: 'L-MSSub-E',
    /* 获取 RTC Token */
    L_GRT_T: 'L-getRtcToken-T',
    L_GRT_R: 'L-getRtcToken-R',
    L_GRT_E: 'L-getRtcToken-E',
    /* 订阅直播流 */
    A_SLS_T: 'A-subscribeLiveStream-T',
    A_SLS_R: 'A-subscribeLiveStream-R',
    A_SLS_E: 'A-subscribeLiveStream-E',
    L_MSSL_T: 'L-MSSubLive-T',
    L_MSSL_R: 'L-MSSubLive-R',
    L_MSSL_E: 'L-MSSubLive-E',
    /* 取消订阅直播流 */
    A_USLS_T: 'A-unsubscribeLiveStream-T',
    A_USLS_R: 'A-unsubscribeLiveStream-R',
    A_USLS_E: 'A-unsubscribeLiveStream-E',
    L_MLL_T: 'L-mediaLiveLeave-T',
    L_MLL_R: 'L-mediaLiveLeave-R',
    L_MLL_E: 'L-mediaLiveLeave-E',
    /* 设置MCU合流布局 */
    A_SMC_T: 'A-setMixConfig-T',
    A_SMC_R: 'A-setMixConfig-R',
    A_SMC_E: 'A-setMixConfig-E',
    /* 中间状态值 */
    A_RTCC_S: 'A-RTCConfig-S',
    A_UJ_S: 'A-userJoined-S',
    A_UL_S: 'A-userLeft-S'
  };

  var PROTOCOL_SUFFIX = '://';

  var RongRTCVideoResolution = {
    '176_132': 'RESOLUTION_176_132',
    '256_144': 'RESOLUTION_256_144',
    '320_180': 'RESOLUTION_320_180',
    '240_240': 'RESOLUTION_240_240',
    '320_240': 'RESOLUTION_320_240',
    '480_360': 'RESOLUTION_480_360',
    '640_360': 'RESOLUTION_640_360',
    '480_480': 'RESOLUTION_480_480',
    '640_480': 'RESOLUTION_640_480',
    '720_480': 'RESOLUTION_720_480',
    '1280_720': 'RESOLUTION_1280_720',
    '1920_1080': 'RESOLUTION_1920_1080'
  };

  var RongRTCVideoBitRate = {
    RESOLUTION_176_132: { width: 176, height: 132, maxBitRate: 150, minBitRate: 80 },
    RESOLUTION_256_144: { width: 256, height: 144, maxBitRate: 240, minBitRate: 120 },
    RESOLUTION_320_180: { width: 320, height: 180, maxBitRate: 280, minBitRate: 120 },
    RESOLUTION_240_240: { width: 240, height: 240, maxBitRate: 280, minBitRate: 120 },
    RESOLUTION_320_240: { width: 320, height: 240, maxBitRate: 400, minBitRate: 120 },
    RESOLUTION_480_360: { width: 480, height: 360, maxBitRate: 650, minBitRate: 150 },
    RESOLUTION_640_360: { width: 640, height: 360, maxBitRate: 800, minBitRate: 180 },
    RESOLUTION_480_480: { width: 480, height: 480, maxBitRate: 800, minBitRate: 180 },
    RESOLUTION_640_480: { width: 640, height: 480, maxBitRate: 900, minBitRate: 200 },
    RESOLUTION_720_480: { width: 720, height: 480, maxBitRate: 1000, minBitRate: 200 },
    RESOLUTION_1280_720: { width: 1280, height: 720, maxBitRate: 2200, minBitRate: 250 },
    RESOLUTION_1920_1080: { width: 1920, height: 1080, maxBitRate: 4000, minBitRate: 400 }
  };
  var Multiplier = {
    10: 1,
    15: 1,
    24: 1.5,
    30: 1.5
  };
  var RongRTCVideoFps = {
    10: 10,
    15: 15,
    24: 24,
    30: 30
  };

  var Storage$1 = utils.Storage;


  var getClientID = function getClientID() {
    var key = STORAGE_KEY.UUID;
    var uuid = Storage$1.get(key);
    if (!uuid) {
      uuid = utils.getUUID22();
      Storage$1.set(key, uuid);
    }
    return uuid;
  };

  /* 
    // TODO: 未校验参数数据类型
    data： 任意对象
    rules: 校验规则，数组
    let user = {
      id: '',
      stream: {
        type: 1,
        tag: 2
      }
    };
    // 校验必传入参数, 暂时支持 2 级
    check(user, ['id', 'stream.type', 'stream.tag', 'stream.mediaStream']);
  */
  var check = function check(data, rules) {
    var isIllegal = false,
        name = '';
    var getBody = function getBody() {
      return {
        isIllegal: isIllegal,
        name: name
      };
    };
    if (!utils.isArray(rules)) {
      rules = [rules];
    }
    if (!utils.isObject(data)) {
      throw new Error('check(data, rules): data must be an object');
    }
    utils.forEach(rules, function (rule) {
      var isTier = rule.indexOf('.') > -1;
      if (!isTier) {
        isIllegal = utils.isUndefined(data[rule]);
        if (isIllegal) {
          return name = rule;
        }
      }
      if (isTier) {
        var props = rule.split('.');

        var _props = slicedToArray(props, 2),
            parent = _props[0],
            child = _props[1];

        var parentData = data[parent];
        isIllegal = utils.isUndefined(parentData);
        if (isIllegal) {
          return name = parent;
        }
        if (!utils.isArray(parentData)) {
          parentData = [parentData];
        }
        utils.forEach(parentData, function (parent) {
          var childData = parent[child];
          isIllegal = utils.isUndefined(childData);
          if (isIllegal) {
            return name = child;
          }
        });
      }
    });
    return getBody();
  };

  var getError = function getError(name) {
    var error = ErrorType.Inner.PARAMTER_ILLEGAL;
    var msg = error.msg;

    msg = utils.tplEngine(msg, {
      name: name
    });
    return utils.extend(error, {
      msg: msg
    });
  };

  var getHeaders = function getHeaders(im, option, others) {
    others = others || {};
    var roomId = im.getRoomId();
    var token = im.getRTCToken();
    var clientSessionId = im.getClientSessionId();
    var userId = im.getUserId();

    var _im$getAppInfo = im.getAppInfo(),
        appKey = _im$getAppInfo.appKey;

    var browser = utils.getBrowser();
    var tpl = 'web|{name}|{version}';
    var type = utils.tplEngine(tpl, browser);
    var headers = {
      'App-Key': appKey,
      RoomId: roomId,
      Token: token,
      ClientType: type,
      ClientVersion: SDK_VERSION,
      'Client-Session-Id': clientSessionId
    };
    var liveMode = RTC_MODE.LIVE;
    if (option.setUserId) {
      headers.UserId = userId;
    }
    if (option.mode === liveMode) {
      headers.RoomType = liveMode;
    }
    headers = utils.extend(headers, others);
    return headers;
  };

  var getLiveHeaders = function getLiveHeaders(im, token) {
    var _im$getAppInfo2 = im.getAppInfo(),
        appKey = _im$getAppInfo2.appKey;

    var tpl = 'web|{name}|{version}';
    var browser = utils.getBrowser();
    var type = utils.tplEngine(tpl, browser);
    var roomType = RTC_MODE.LIVE;
    var userId = im.getUserId();
    var headers = {
      'App-Key': appKey,
      RoomType: roomType,
      ClientType: type,
      ClientVersion: SDK_VERSION,
      UserId: userId,
      RoomId: userId
    };
    if (token) {
      headers.Token = token;
    }
    return headers;
  };

  /**
   * 构建直播模式 MCU 混流及 CDN 配置
   * @param {object} config 混流配置
   * @param {string[]} publishUrls CDN 推流地址
   */
  var formatLiveConfig = function formatLiveConfig(config, publishUrls) {
    config = config || {};
    config.video = config.video || {};
    config.audio = config.audio || {};
    config.tinyVideo = config.tinyVideo || {};

    var customLayout = utils.handleObjKeys(config.customLayout, utils.humpToLine); // 驼峰转化为下划线
    var liveConfig = utils.extend(LIVE_CONFIG, {
      host_user_id: config.hostUserId,
      host_stream_id: config.hostStreamId,
      mode: config.layoutMode || LIVE_LAYOUT_MODE.SUSPENSION,
      output: {
        video: {
          normal: config.video,
          tiny: config.tinyVideo,
          exparams: {
            renderMode: config.video.renderMode
          }
        },
        audio: config.audio
      },
      input: customLayout
    });
    // 若不设置混流，则不传 CDN 值，因 CDN 会根据布局调整分辨率，影响 mediaserver 性能
    if (publishUrls.length > 0) {
      liveConfig.output.cdn = publishUrls.map(function (url) {
        return {
          pushurl: url
        };
      });
    }
    return utils.clearEselessFields(liveConfig);
  };

  var dispatchStreamEvent = function dispatchStreamEvent(user, callback) {
    var id = user.id,
        uris = user.uris;

    if (utils.isString(uris)) {
      uris = utils.parse(uris);
    }
    var streams = [user];
    if (uris) {
      streams = utils.uniq(uris, function (target) {
        var tag = target.tag,
            mediaType = target.mediaType,
            state = target.state;

        var streamId = target.streamId || target.msid;
        var msUris = utils.filter(uris, function (uri) {
          var _msid = uri.streamId || uri.msid;
          return utils.isEqual(_msid, streamId);
        });
        return {
          key: [streamId].join('_'),
          value: {
            tag: tag,
            uris: msUris,
            mediaType: mediaType,
            state: state
          }
        };
      });
    }
    utils.forEach(streams, function (stream) {
      callback({
        id: id,
        stream: stream
      });
    });
  };

  var dispatchOperationEvent = function dispatchOperationEvent(user, callback) {
    var getModifyEvents = function getModifyEvents() {
      var events = {},
          tpl = '{type}_{state}';
      // 禁用视频
      var name = utils.tplEngine(tpl, {
        type: StreamType.VIDEO,
        state: StreamState.DISBALE
      });
      events[name] = DownEvent.STREAM_DISABLED;
      // 启用视频
      name = utils.tplEngine(tpl, {
        type: StreamType.VIDEO,
        state: StreamState.ENABLE
      });
      events[name] = DownEvent.STREAM_ENABLED;
      // 音频静音
      name = utils.tplEngine(tpl, {
        type: StreamType.AUDIO,
        state: StreamState.DISBALE
      });
      events[name] = DownEvent.STREAM_MUTED;
      // 音频取消静音
      name = utils.tplEngine(tpl, {
        type: StreamType.AUDIO,
        state: StreamState.ENABLE
      });
      events[name] = DownEvent.STREAM_UNMUTED;
      return events;
    };
    var _user$stream = user.stream,
        type = _user$stream.mediaType,
        state = _user$stream.state;

    var tpl = '{type}_{state}';
    var name = utils.tplEngine(tpl, {
      type: type,
      state: state
    });
    var events = getModifyEvents();
    var event = events[name];
    return callback(event, user);
  };

  var isSafari = function isSafari() {
    return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    );
  };

  var isV2Tag = function isV2Tag(tag) {
    return utils.isUndefined(tag) || utils.isEmpty(tag);
  };

  var getVersion = function getVersion() {
    return SDK_VERSION;
  };

  /**
   * 判断当前角色是否为直播模式观众身份
   * @param {*} rongRTC 
   */
  var isLiveAudience = function isLiveAudience(rongRTC) {
    var mode = rongRTC.option.mode;

    var liveRole = rongRTC.getLiveRole();
    return mode === RTC_MODE.LIVE && liveRole === LIVE_ROLE.AUDIENCE;
  };

  var isAudienceToAnchor = function isAudienceToAnchor(newRole, oldRole) {
    return oldRole === LIVE_ROLE.AUDIENCE && newRole === LIVE_ROLE.ANCHOR;
  };

  var getTrackIds = function getTrackIds(user) {
    var id = user.id,
        streams = user.stream;

    if (!utils.isArray(streams)) {
      streams = [streams];
    }
    var getTracks = function getTracks(type) {
      var tracks = [{
        kind: 'video',
        type: StreamType.VIDEO
      }, {
        kind: 'audio',
        type: StreamType.AUDIO
      }];
      if (utils.isEqual(type, StreamType.AUDIO_AND_VIDEO)) {
        return tracks;
      }
      return utils.filter(tracks, function (track) {
        return utils.isEqual(track.type, type);
      });
    };
    var trackIds = [];
    var tpl = '{id}_{tag}_{kind}';
    utils.forEach(streams, function (stream) {
      var tag = stream.tag,
          type = stream.type;

      var tracks = getTracks(type);
      utils.forEach(tracks, function (track) {
        var kind = track.kind;

        var trackId = utils.tplEngine(tpl, {
          id: id,
          tag: tag,
          kind: kind
        });
        trackIds.push(trackId);
      });
    });
    return trackIds;
  };

  var getMCUConfigUrl = function getMCUConfigUrl(configUrl) {
    var tpl = '{protocol}//{configUrl}';
    var protocol = location.protocol;
    return utils.tplEngine(tpl, {
      protocol: protocol,
      configUrl: configUrl
    });
  };

  var formatProtocolPath = function formatProtocolPath(path) {
    path = path || '';
    var flag = PROTOCOL_SUFFIX;
    var hasProtocol = utils.isContain(path, flag);
    var protocol = '';
    if (utils.isEqual(location.protocol, 'https:')) {
      protocol = PROTOCOL.HTTPS;
      if (hasProtocol) {
        var domainSplitIndex = path.indexOf(flag) + flag.length;
        path = path.substring(domainSplitIndex);
      }
    } else {
      if (!hasProtocol) {
        protocol = PROTOCOL.HTTP;
      }
    }

    return utils.tplEngine('{protocol}{domain}', {
      protocol: protocol,
      domain: path
    });
  };

  /* 
    1. http 下, 全部认为有效
    2. https 下, 没有协议头(请求时会自动拼接)或协议头为 https 认为有效
   */
  var isValidMediaServer = function isValidMediaServer(url) {
    if (utils.isEqual(location.protocol, 'http:')) {
      return true;
    }
    var flag = PROTOCOL_SUFFIX;
    var hasProtocol = utils.isContain(url, flag);
    if (hasProtocol) {
      var protocol = url.substring(0, url.indexOf(flag) + flag.length);
      return protocol === PROTOCOL.HTTPS;
    } else {
      return true;
    }
  };

  function Logger() {
    var observer = new utils.Observer();
    var write = function write(level, tag, meta) {
      var time = new Date().getTime();
      var log = {
        level: level,
        tag: tag,
        meta: meta,
        time: time,
        platform: 'web'
      };
      observer.emit(log);
    };
    var warn = function warn(tag, meta) {
      return write(LogLevel.WARN, tag, meta);
    };
    var error = function error(tag, meta) {
      return write(LogLevel.ERROR, tag, meta);
    };
    var info = function info(tag, meta) {
      return write(LogLevel.INFO, tag, meta);
    };
    var log = function log(tag, meta) {
      return write(LogLevel.VERBOSE, tag, meta);
    };
    var watch = function watch(watcher, force) {
      observer.add(watcher, force);
    };
    return {
      warn: warn,
      error: error,
      info: info,
      log: log,
      watch: watch
    };
  }
  var Logger$1 = Logger();

  function logger() {
    var Logger = void 0,
        Level = void 0,
        hasLogger = false;
    var init = function init(imlib) {
      if (imlib.Logger && imlib.LoggerLevel) {
        hasLogger = true;
        Logger = imlib.Logger;
        Level = imlib.LoggerLevel;
      }
    };
    var write = function write(level, tag, meta) {
      Logger.writeLog({
        level: level,
        tag: tag,
        content: meta,
        type: 'RTC'
      });
    };

    var fatal = function fatal(tag, meta) {
      return hasLogger && write(Level.F, tag, meta);
    };
    var error = function error(tag, meta) {
      return hasLogger && write(Level.E, tag, meta);
    };
    var warn = function warn(tag, meta) {
      return hasLogger && write(Level.W, tag, meta);
    };
    var info = function info(tag, meta) {
      return hasLogger && write(Level.I, tag, meta);
    };
    var debug = function debug(tag, meta) {
      return hasLogger && write(Level.D, tag, meta);
    };
    return {
      init: init,
      fatal: fatal,
      error: error,
      warn: warn,
      info: info,
      debug: debug
    };
  }

  var IMLogger = logger();

  var Room = function () {
    function Room(option) {
      classCallCheck(this, Room);

      var context = this;
      // TODO: 语法错误

      var _ref = option || '',
          id = _ref.id;

      var roomIdLen = id.length;
      var client = context.getClient();
      if (!REGEXP_ROOM_ID.test(id) || roomIdLen > LENGTH_ROOM_ID) {
        var Inner = ErrorType.Inner;

        return client.emit(DownEvent.RTC_ERROR, Inner.ROOM_ID_IS_ILLEGAL);
      }
      utils.forEach(RoomEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, user) {
          event = option[type] || utils.noop;
          event(user, error);
          Logger$1.log(LogTag.ROOM, {
            event: type,
            user: user
          });
          switch (type) {
            case 'joined':
              IMLogger.info(RTCLogTag.A_UJ_S, user);
              break;
            case 'left':
              IMLogger.info(RTCLogTag.A_UL_S, user);
              break;
          }
        });
      });
      utils.extend(context, {
        option: option,
        client: client,
        room: {
          id: id
        }
      });
    }

    createClass(Room, [{
      key: 'join',
      value: function join(user) {
        IMLogger.info(RTCLogTag.A_JR_T, { user: user });

        var _check = check(user, ['id']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          IMLogger.warn(RTCLogTag.A_JR_E, { desc: error });
          return utils.Defer.reject(error);
        }
        var room = this.room,
            client = this.client;

        utils.extend(room, {
          user: user
        });
        IMLogger.info(RTCLogTag.A_JR_R, { user: user });
        return client.exec({
          event: UpEvent.ROOM_JOIN,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'leave',
      value: function leave() {
        var room = this.room,
            client = this.client;

        IMLogger.info(RTCLogTag.A_LR_T, {
          roomId: room.id,
          uid: room.user.id
        });
        client.emit('leave-by-self');
        return client.exec({
          event: UpEvent.ROOM_LEAVE,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'get',
      value: function get$$1() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_GET,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'getSessionId',
      value: function getSessionId() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_GET_SESSONID,
          type: 'room',
          args: [room]
        });
      }
    }, {
      key: 'getStats',
      value: function getStats() {
        var room = this.room,
            client = this.client;

        return client.exec({
          event: UpEvent.ROOM_GET_STATS,
          type: 'room',
          args: [room]
        }).then(function (data) {
          var stats = {};
          for (var userId in data) {
            var uris = JSON.parse(data[userId].uris || '[]');
            stats[userId] = uris.map(function (item) {
              return {
                mediaType: item.mediaType,
                state: item.state,
                tag: item.tag
              };
            });
          }
          return Promise.resolve(stats);
        });
      }
    }]);
    return Room;
  }();

  function Video(client) {
    return {
      disable: function disable(user) {
        var _check = check(user, ['id', 'stream.tag']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.VIDEO_DISABLE,
          type: 'stream',
          args: [user]
        });
      },
      enable: function enable(user) {
        var _check2 = check(user, ['id', 'stream.tag']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.VIDEO_ENABLE,
          type: 'stream',
          args: [user]
        });
      }
    };
  }

  function Audio(client) {
    return {
      mute: function mute(user) {
        var _check = check(user, ['id', 'stream.tag']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.AUDIO_MUTE,
          type: 'stream',
          args: [user]
        });
      },
      unmute: function unmute(user) {
        var _check2 = check(user, ['id', 'stream.tag']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.AUDIO_UNMUTE,
          type: 'stream',
          args: [user]
        });
      }
    };
  }

  var Stream = function () {
    function Stream(option) {
      classCallCheck(this, Stream);

      var context = this;
      var client = context.getClient();
      utils.forEach(StreamEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, user) {
          event = option[type] || utils.noop;
          event(user, error);
          Logger$1.log(LogTag.STREAM, {
            event: type,
            user: user
          });
        });
      });

      // 备份用户 setMixConfig 配置
      var tmpConf = {};
      // cdn 推流地址缓存
      var publishUrls = [];

      // 清理 CDN 及备份的 mix 数据
      client.on('leave-by-self', function () {
        publishUrls.length = 0;
        tmpConf = {};
      });

      client.extendOption(option);
      utils.extend(context, {
        option: option,
        client: client,
        video: new Video(client),
        audio: new Audio(client),
        tmpConf: tmpConf,
        publishUrls: publishUrls
      });
    }

    createClass(Stream, [{
      key: 'publish',
      value: function publish(user) {
        IMLogger.info(RTCLogTag.A_PAVS_T, { user: user });

        var _check = check(user, ['id', 'stream.tag', 'stream.mediaStream', 'stream.type']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          IMLogger.warn(RTCLogTag.A_PAVS_E, { desc: error });
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_PUBLISH,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'unpublish',
      value: function unpublish(user) {
        // let { client } = this;
        // let { rongRTC } = client;
        // if (isLiveAudience(rongRTC)) {
        //   return utils.Defer.reject(error);
        // }
        IMLogger.info(RTCLogTag.A_UPAVS_T, { user: user });

        var _check2 = check(user, ['id', 'stream.tag', 'stream.type']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          IMLogger.warn(RTCLogTag.A_UPAVS_E, { desc: error });
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_UNPUBLISH,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'subscribe',
      value: function subscribe(user) {
        var client = this.client;
        var rongRTC = client.rongRTC;


        var checkResult = void 0,
            logStartTag = void 0,
            logErrorTag = void 0;
        if (isLiveAudience(rongRTC)) {
          checkResult = check(user, ['liveUrl']);
          logStartTag = RTCLogTag.A_SLS_T;
          logErrorTag = RTCLogTag.A_SLS_E;
        } else {
          checkResult = check(user, ['id', 'stream.tag', 'stream.type']);
          logStartTag = RTCLogTag.A_SAVS_T;
          logErrorTag = RTCLogTag.A_SAVS_E;
        }
        IMLogger.info(logStartTag, { user: user });
        var _checkResult = checkResult,
            isIllegal = _checkResult.isIllegal,
            name = _checkResult.name;

        if (isIllegal) {
          var error = getError(name);
          IMLogger.warn(logErrorTag, { desc: error });
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.STREAM_SUBSCRIBE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(user) {
        var client = this.client;
        var rongRTC = client.rongRTC;


        var checkResult = void 0,
            logStartTag = void 0,
            logErrorTag = void 0;
        if (isLiveAudience(rongRTC)) {
          checkResult = check(user, []);
          logStartTag = RTCLogTag.A_USLS_T;
          logErrorTag = RTCLogTag.A_USLS_E;
        } else {
          checkResult = check(user, ['id', 'stream.tag', 'stream.type']);
          logStartTag = RTCLogTag.A_USAVS_T;
          logErrorTag = RTCLogTag.A_USAVS_E;
        }
        IMLogger.info(logStartTag, { user: user });
        var _checkResult2 = checkResult,
            isIllegal = _checkResult2.isIllegal,
            name = _checkResult2.name;

        if (isIllegal) {
          var error = getError(name);
          IMLogger.warn(logErrorTag, { desc: error });
          return utils.Defer.reject(error);
        }
        return client.exec({
          event: UpEvent.STREAM_UNSUBSCRIBE,
          type: 'stream',
          args: [user]
        });
      }
    }, {
      key: 'resize',
      value: function resize(user) {
        var _check3 = check(user, ['id', 'stream.tag']),
            isIllegal = _check3.isIllegal,
            name = _check3.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_RESIZE,
          type: 'stream',
          args: [user]
        });
      }
      /**
       * 添加 CDN 推流地址，如：rmtp://
       * @param  {...string} urls 
       */

    }, {
      key: 'addPublishStreamUrl',
      value: function addPublishStreamUrl() {
        var _this = this;

        for (var _len = arguments.length, urls = Array(_len), _key = 0; _key < _len; _key++) {
          urls[_key] = arguments[_key];
        }

        if (urls.length === 0) {
          return;
        }
        urls.forEach(function (url) {
          if (!/^rtmp:\/\//.test(url)) {
            return;
          }
          if (_this.publishUrls.includes(url)) {
            return;
          }
          _this.publishUrls.push(url);
        });
        this.setMixConfig(this.tmpConf);
      }
      /**
       * 删除 CDN 推流地址
       * @param  {...string} urls 待删除的推流地址
       */

    }, {
      key: 'removePublishStreamUrl',
      value: function removePublishStreamUrl() {
        var _this2 = this;

        for (var _len2 = arguments.length, urls = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          urls[_key2] = arguments[_key2];
        }

        if (urls.length === 0) {
          return;
        }
        urls.forEach(function (url) {
          var index = _this2.publishUrls.indexOf(url);
          if (index >= 0) {
            _this2.publishUrls.splice(index, 1);
          }
        });
        this.setMixConfig(this.tmpConf);
      }
      /**
       * 设置直播混流配置，仅直播模式此方法有效
       * @param {Object} config
       * @example 
       * stream.setMixConfig({
       *  layoutMode: RongRTC.LayoutMode.SUSPENSION,
       *  video: {}
       * })
       */

    }, {
      key: 'setMixConfig',
      value: function setMixConfig(config) {
        var client = this.client;
        var rongRTC = client.rongRTC;
        var mode = rongRTC.option.mode;

        var liveRole = rongRTC.getLiveRole();

        var isLiveMode = mode === RTC_MODE.LIVE; // 直播模式
        var isAnchor = liveRole === LIVE_ROLE.ANCHOR; // 主播

        if (!isLiveMode) {
          // 非直播模式
          return utils.Defer.reject(ErrorType.Inner.SET_LIVE_CONFIG_MODE_ERROR);
        }
        if (!isAnchor) {
          // 非主播
          return utils.Defer.reject(ErrorType.Inner.SET_LIVE_CONFIG_ROLE_ERROR);
        }

        var _check4 = check(config, ['layoutMode']),
            isIllegal = _check4.isIllegal,
            name = _check4.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }

        if (config.layoutMode === LIVE_LAYOUT_MODE.CUSTOMIZE) {
          var props = ['userId', 'streamId', 'x', 'y', 'width', 'height'];
          // 断言验证
          utils.assert(config.customLayout, '自定义布局需要提供明确的 customLayout 定义') && utils.assert(config.customLayout.video instanceof Array, 'customLayout.video 必须是数组') && utils.assert(config.customLayout.video.every(function (item) {
            return !check(item, props).isIllegal;
          }), 'customLayout.video \u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u4E2D\u5FC5\u987B\u5305\u542B ' + props.join('、') + ' \u5C5E\u6027');
        }

        // 因 CDN 推流使用全量配置，此处对用户配置临时存储，方便后续设置 CDN 推流时继续使用
        this.tmpConf = config;

        return client.exec({
          event: UpEvent.LIVE_CONFIG,
          type: 'stream',
          args: [config, this.publishUrls]
        });
      }
    }, {
      key: 'get',
      value: function get$$1(constraints) {
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_GET,
          type: 'stream',
          args: [constraints]
        });
      }
    }, {
      key: 'publishDefault',
      value: function publishDefault(constraints) {
        var client = this.client;

        return client.exec({
          event: UpEvent.STREAM_PUBLISH_DEFAULT,
          type: 'stream',
          args: [constraints]
        });
      }
    }]);
    return Stream;
  }();

  var EventEmitter = function () {
    function EventEmitter() {
      classCallCheck(this, EventEmitter);

      this.events = {};
      this.onceEvents = {};
    }

    createClass(EventEmitter, [{
      key: 'on',
      value: function on(name, event) {
        var events = this.events[name] || [];
        events.push(event);
        this.events[name] = events;
      }
    }, {
      key: 'off',
      value: function off(name, offEvent) {
        if (offEvent) {
          var events = this.events[name] || [];
          utils.forEach(events, function (event, index) {
            if (utils.isEqual(event, offEvent)) {
              events.splice(index, 1);
            }
          }, {
            isReverse: true
          });
        } else {
          delete this.events[name];
        }
      }
    }, {
      key: 'emit',
      value: function emit(name, data, error) {
        var events = this.events[name];
        utils.forEach(events, function (event) {
          event(error, data);
        });

        var onceEvent = this.onceEvents[name] || utils.noop;
        onceEvent(error, data);
        delete this.onceEvents[name];
      }
    }, {
      key: 'once',
      value: function once(name, event) {
        this.onceEvents[name] = event;
      }
    }, {
      key: 'teardown',
      value: function teardown() {
        for (var name in this.events) {
          this.off(name);
        }
        for (var _name in this.onceEvents) {
          delete this.onceEvents[_name];
        }
      }
    }]);
    return EventEmitter;
  }();

  var PeerConnectionEvent = {
    ADDED: 'p_stream_added',
    REMOVED: 'p_stream_removed',
    RECEIVED: 'p_stream_received',
    CHANGED: 'p_ice_changed',
    TRACK_RECEIVED: 'p_track_received',
    SIGNAL_STATE_CHANGE: 'p_signaling_state_change'
  };

  var ICEEvent = {
    FAILED: 'failed',
    DISCONNECTED: 'disconnected',
    CLOSED: 'closed'
  };

  var CommonEvent = {
    JOINED: 'common_joined',
    LEFT: 'common_left',
    ERROR: 'common_error',
    CONSUME: 'common_consume',
    REQUEST_CONSUME: 'common_request_consume',
    CONNECTED: 'common_connected',
    PEERCONN_CREATED: 'common_peerconn_created',
    PEERCONN_DESTROYED: 'common_peerconn_destroyed',
    PUBLISHED_STREAM: 'common_published_stream',
    SEND_REPORT: 'common_send_report',
    TRACK_MODIFY: 'common_track_modify',
    SET_URIS: 'common_set_uris',
    CHANGE_ROLE: 'common_change_role'
  };

  var Network = function () {
    function Network(_option) {
      classCallCheck(this, Network);

      _option = _option || {};
      var option = {
        url: 'https://cdn.ronghub.com/detecting',
        timeout: 1500,
        max: 30
      };
      utils.extend(option, _option);
      utils.extend(this, {
        option: option
      });
    }

    createClass(Network, [{
      key: 'detect',
      value: function detect(callback) {
        var context = this;
        var detecting = context.detecting,
            option = context.option;

        if (detecting) {
          return;
        }
        utils.extend(context, {
          detecting: true
        });
        var url = option.url,
            timeout = option.timeout,
            max = option.max;

        var count = 1;
        var getCount = function getCount() {
          count += 1;
          return count;
        };
        var isOnline = false;
        var ajax = function ajax() {
          count = getCount();
          utils.request(url).then(function () {
            return callback(true);
          }, function (_ref) {
            var status = _ref.status;

            if (utils.isEqual(status, 404)) {
              utils.extend(context, {
                detecting: false
              });
              isOnline = true;
              return callback(isOnline);
            }
            if (utils.isEqual(max, count)) {
              return callback(isOnline);
            }
            setTimeout(function () {
              ajax();
            }, timeout);
          });
        };
        ajax();
      }
    }]);
    return Network;
  }();

  var Path = {
    PUBLISH: '/exchange',
    UNPUBLISH: '/exchange',
    RESIZE: '/exchange',
    SUBSCRIBE: '/exchange',
    ONLY_SUBSCRIBE: '/subscribe',
    UNSUBSCRIBE: '/subscribe',
    LIVE_SUBSCRIBE: '/broadcast/subscribe', // 直播模式, 订阅接口
    LIVE_CONFIG: '/server/mcu/config', // 直播模式, 自定义更改配置接口
    LIVE_EXIT: '/broadcast/exit', // 直播模式, 退出接口
    EXIT: '/exit'
  };

  var Config = {
    urls: [],
    errorUrls: [],
    clusterIdUrl: '',
    timeout: REQUEST_TIMEOUT
  };

  var tpl = '{domain}{path}';
  var prosumer = new utils.Prosumer();
  var eventEmitter = new EventEmitter();

  var addClusterIdUrl = function addClusterIdUrl(url) {
    Config.clusterIdUrl = url;
  };

  var addErrorUrl = function addErrorUrl(url) {
    Config.errorUrls.push(url);
  };

  var clearErrorUrl = function clearErrorUrl() {
    Config.errorUrls.length = 0;
  };

  var getValidUrl = function getValidUrl() {
    var errorUrls = Config.errorUrls,
        urls = Config.urls,
        clusterIdUrl = Config.clusterIdUrl;


    if (clusterIdUrl && !utils.isInclude(errorUrls, clusterIdUrl)) {
      // 优先使用 clusterIdUrl
      var hasProtocol = /(http|https):\/\/([\w.]+\/?)\S*/.test(clusterIdUrl);
      return hasProtocol ? clusterIdUrl : 'https://' + clusterIdUrl; // 不带协议时，默认使用 https
    }

    var validUrls = utils.filter(utils.clone(urls), function (url) {
      var isError = utils.isInclude(errorUrls, url);
      return !isError;
    });
    var isEmpty = utils.isEmpty(validUrls);
    return isEmpty ? null : validUrls[0];
  };

  var addUrls = function addUrls(urls) {
    if (utils.isEmpty(urls) || !utils.isArray(urls)) {
      return;
    }
    urls = utils.map(urls, function (url) {
      return formatProtocolPath(url); // 校验格式
    });
    // 反向合并. 比如已有 [4、5、6], 传入 [1、2、3], 结果 [1、2、3、4、5、6]
    Config.urls = utils.merge(Config.urls, urls, {
      isReverse: true
    });
  };

  var addUrl = function addUrl(url) {
    addUrls([url]);
  };

  var setOption = function setOption(_config) {
    _config = _config || {};
    var urls = _config.urls;
    if (!utils.isEmpty(urls)) {
      // 将 urls 设置提出, 统一在 setUrls 内校验格式
      addUrls(urls);
      delete _config.urls;
    }
    utils.extend(Config, _config);
  };

  var getOption = function getOption() {
    return Config;
  };

  var isUrlsExisted = function isUrlsExisted(urls) {
    if (!utils.isArray(urls)) {
      urls = [urls];
    }
    var isExisted = true;
    utils.forEach(urls, function (url) {
      var formatedUrl = formatProtocolPath(url);
      if (!utils.isInclude(Config.urls, formatedUrl)) {
        isExisted = false;
      }
    });
    return isExisted;
  };

  var postProcess = function postProcess(option) {
    // TODO: 错误，options 中有地址信息
    var domain = option.urls && option.urls.length > 0 ? option.urls[0] : getValidUrl();
    if (utils.isEmpty(domain)) {
      // 没有可用的 mediaServer, 返回服务无效
      clearErrorUrl();
      return utils.Defer.reject(ErrorType.Inner.NO_AUDIO_AND_VIDEO_SERVICE);
    }

    var path = option.path,
        body = option.body;

    var url = utils.tplEngine(tpl, { domain: domain, path: path });
    var headers = utils.extend(option.headers || {}, {
      'Content-Type': 'application/json;charset=UTF-8',
      'Request-Id': Date.now().toString()
    });

    utils.assert(!!headers.Token, '与 MediaServer 交互必须携带 Token 信息');

    return utils.request(url, {
      method: 'POST',
      timeout: Config.timeout,
      body: JSON.stringify(body),
      headers: headers
    }).then(function (result) {
      var isSuccess = utils.isEqual(result.resultCode, MEDIASERVER_SUCCESS);
      return isSuccess ? result : utils.Defer.reject(result);
    }, function (error) {
      var status = error.status;

      if (utils.isInclude([403], status)) {
        return utils.Defer.reject(error);
      }
      addErrorUrl(domain);
      return postProcess(option); // 重新请求
    });
  };

  eventEmitter.on(CommonEvent.REQUEST_CONSUME, function () {
    prosumer.consume(function (_ref, next) {
      var option = _ref.option,
          resolve = _ref.resolve,
          reject = _ref.reject;

      postProcess(option).then(function (result) {
        resolve(result);
        next();
      }, function (error) {
        reject(error);
        next();
      });
    });
  });

  var post = function post(option) {
    return utils.deferred(function (resolve, reject) {
      prosumer.produce({ option: option, resolve: resolve, reject: reject });
      eventEmitter.emit(CommonEvent.REQUEST_CONSUME);
    });
  };

  var request$1 = {
    setOption: setOption,
    getOption: getOption,
    post: post,
    addUrls: addUrls,
    addUrl: addUrl,
    isUrlsExisted: isUrlsExisted,
    addClusterIdUrl: addClusterIdUrl
  };

  var globalPC = void 0; // pc 为单例, 可从 PeerConnection.getInstance 获取

  var setGlobalPC = function setGlobalPC(pc) {
    globalPC = pc;
  };

  // sdp 信息行末可能会有遗留的空格，导致 Chrome 86 以上版本 SDP 信息设置失败
  var trimRight = function trimRight(sdp) {
    return sdp.replace(/\s+\r\n/g, '\r\n');
  };

  var PeerConnection = function (_EventEmitter) {
    inherits(PeerConnection, _EventEmitter);

    function PeerConnection(option) {
      classCallCheck(this, PeerConnection);

      var _this = possibleConstructorReturn(this, (PeerConnection.__proto__ || Object.getPrototypeOf(PeerConnection)).call(this));

      setGlobalPC(_this);
      var context = _this;
      context.bandWidthCount = 0;
      var pc = new RTCPeerConnection({
        sdpSemantics: 'plan-b',
        // Chrome 49 Test
        iceServers: []
      });
      utils.extend(context, {
        option: option
      });
      var events = {
        onaddstream: function onaddstream(event) {
          var stream = event.stream;

          context.emit(PeerConnectionEvent.ADDED, stream);
        },
        onremovestream: function onremovestream(event) {
          var stream = event.stream;

          context.emit(PeerConnectionEvent.REMOVED, stream);
        },
        ontrack: function ontrack(event) {
          var streams = event.streams;

          context.emit(PeerConnectionEvent.TRACK_RECEIVED, streams);
        },
        ondatachannel: function ondatachannel(event) {
          //TODO: 具体返回参数
          context.emit(PeerConnectionEvent.RECEIVED, event);
        },
        oniceconnectionstatechange: function oniceconnectionstatechange() {
          var state = pc.iceConnectionState;
          utils.extend(context, {
            state: state
          });
          context.emit(PeerConnectionEvent.CHANGED, state);
          Logger$1.log(LogTag.ICE, { state: state });
        },
        onsignalingstatechange: function onsignalingstatechange() {
          var streams = pc.getRemoteStreams();
          context.emit(PeerConnectionEvent.SIGNAL_STATE_CHANGE, streams);
        }
      };
      utils.forEach(events, function (event, name) {
        pc[name] = event;
      });
      utils.extend(context, {
        pc: pc
      });
      return _this;
    }

    createClass(PeerConnection, [{
      key: 'addStream',
      value: function addStream(user) {
        var context = this;
        var pc = context.pc;
        var stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }
        utils.forEach(stream, function (_ref) {
          var mediaStream = _ref.mediaStream;

          pc.addStream(mediaStream);
        });
        return context.createOffer(user);
      }
    }, {
      key: 'removeStream',
      value: function removeStream(user) {
        var context = this;
        var pc = context.pc;
        var stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }
        utils.forEach(stream, function (_ref2) {
          var mediaStream = _ref2.mediaStream;

          pc.removeStream(mediaStream);
        });
        return context.createOffer(user);
      }
    }, {
      key: 'setOffer',
      value: function setOffer(desc) {
        var context = this;
        var pc = context.pc;

        desc.sdp = trimRight(desc.sdp);
        return pc.setLocalDescription(desc);
      }
    }, {
      key: 'setAnwser',
      value: function setAnwser(answer) {
        var context = this;
        var pc = context.pc;

        answer = context.setBitrate(answer);
        answer.sdp = trimRight(answer.sdp);
        return pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    }, {
      key: 'setAnwserOnly',
      value: function setAnwserOnly(answer) {
        // 直播重复订阅仅设置，不修改 sdp, 防止 offer answer 不匹配
        var context = this;
        var pc = context.pc;

        answer.sdp = trimRight(answer.sdp);
        return pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    }, {
      key: 'setRemoteAnwser',
      value: function setRemoteAnwser(answer) {
        var context = this;
        var pc = context.pc;
        // answer = context.setBitrate(answer);

        answer.sdp = trimRight(answer.sdp);
        return pc.setRemoteDescription(new RTCSessionDescription(answer)).then(function () {
          return pc.createAnswer().then(function (answer) {
            return pc.setLocalDescription(answer);
          });
        });
      }
    }, {
      key: 'setBitrate',
      value: function setBitrate(answer) {
        var context = this;
        var bitrate = context.option.bitrate;
        var sdp = answer.sdp;

        var lineFeed = '\n';
        // sdp = sdp.replace(/a=mid:video\n/g, ['a=mid:video', 'b=AS:' + bitrate.max + lineFeed].join(lineFeed));
        // utils.extend(answer, {
        //   sdp
        // });
        var sdpDetails = sdp.split(lineFeed);
        var findIndex = function findIndex(keyword) {
          var index = null;
          for (var i = 0; i < sdpDetails.length; i++) {
            var item = sdpDetails[i];
            if (utils.isInclude(item, keyword)) {
              index = i;
              break;
            }
          }
          return index;
        };

        var midVideo = 'a=mid:video';
        var midVideoIndex = findIndex(midVideo);
        if (utils.isNull(midVideoIndex)) {
          return answer;
        }
        sdpDetails[midVideoIndex] = [sdpDetails[midVideoIndex], 'b=AS:' + bitrate.max].join(lineFeed);

        var mVideo = 'm=video';
        var mVideoIndex = findIndex(mVideo);
        if (utils.isNull(mVideoIndex)) {
          return answer;
        }
        var separator = ' ';
        var videoDesc = sdpDetails[mVideoIndex];
        // m=video 10 UDP/TLS/RTP/SAVPF
        var videoDescDetails = videoDesc.split(separator);
        var firstVideoCodec = videoDescDetails[3];
        var codecDesc = 'a=fmtp:' + firstVideoCodec;
        var codecDescIndex = findIndex(codecDesc);
        if (utils.isNull(codecDescIndex)) {
          return answer;
        }
        context.bandWidthCount++;
        bitrate = JSON.parse(JSON.stringify(bitrate));
        if (context.bandWidthCount % 2 == 0) {
          bitrate.min = bitrate.min + 1;
        }
        var desc = ';x-google-min-bitrate=' + bitrate.min + ';x-google-max-bitrate=' + bitrate.max;
        if (utils.isNumber(bitrate.start)) {
          desc += ';x-google-start-bitrate=' + bitrate.start;
        }
        sdpDetails[codecDescIndex] = [sdpDetails[codecDescIndex].replace(/[\r\n]+$/, ''), desc].join('');
        sdp = sdpDetails.join(lineFeed);
        utils.extend(answer, {
          sdp: sdp
        });
        return answer;
      }
    }, {
      key: 'close',
      value: function close() {
        var context = this;
        var pc = context.pc;

        context.bandWidthCount = 0;
        pc.close();
        context.pc = null;
        delete context.pc;
      }
    }, {
      key: 'isClosed',
      value: function isClosed() {
        var context = this;
        return !context.pc;
      }
    }, {
      key: 'getOption',
      value: function getOption() {
        return {
          iceRestart: true,
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        };
      }
    }, {
      key: 'isNegotiate',
      value: function isNegotiate() {
        var state = this.state;

        return utils.isEqual(state, ICEEvent.FAILED) || utils.isEqual(state, ICEEvent.DISCONNECTED) || utils.isEqual(state, ICEEvent.CLOSED);
      }
    }, {
      key: 'createOffer',
      value: function createOffer(user) {
        var context = this;
        var pc = context.pc;
        var stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }
        var option = context.getOption();
        return utils.deferred(function (resole, reject) {
          pc.createOffer(function (desc) {
            utils.forEach(stream, function (_ref3) {
              var mediaStream = _ref3.mediaStream,
                  size = _ref3.size;

              var newStreamId = context.getStreamId(user, size);
              var streamId = mediaStream.id;
              var _desc = desc,
                  sdp = _desc.sdp;
              // 修改流标识

              sdp = sdp.replace(new RegExp(streamId, 'g'), newStreamId);
              utils.extend(desc, {
                sdp: sdp
              });
            });
            desc = context.renameCodec(desc);
            utils.extend(context, {
              desc: desc
            });
            // desc = context.setBitrate(desc);
            resole(desc);
          }, function (error) {
            reject(error);
          }, option);
        });
      }
    }, {
      key: 'getOffer',
      value: function getOffer(callback) {
        var context = this;
        var pc = context.pc;

        var option = context.getOption();
        // option.iceRestart = false;
        var success = function success(desc) {
          desc = context.renameCodec(desc);
          callback && callback(desc);
          // desc = context.setBitrate(desc);
          return desc;
        };
        return pc.createOffer(option).then(success);
      }
    }, {
      key: 'renameCodec',
      value: function renameCodec(offer) {
        var sdp = offer.sdp;
        // sdp = sdp.replace(new RegExp('a=group:BUNDLE 0 1', 'g'), 'a=group:BUNDLE audio video')

        var codecs = [{
          name: 'H264/90000',
          code: 98,
          rtx: 99,
          value: ['a=rtpmap:98 H264/90000', 'a=rtcp-fb:98 goog-remb', 'a=rtcp-fb:98 transport-cc', 'a=rtcp-fb:98 ccm fir', 'a=rtcp-fb:98 nack', 'a=rtcp-fb:98 nack pli', 'a=fmtp:98 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f', 'a=rtpmap:99 rtx/90000', 'a=fmtp:99 apt=98'].join('\r\n')
        }, {
          name: 'VP8/90000',
          code: 96,
          rtx: 97,
          value: ['a=rtpmap:96 VP8/90000', 'a=rtcp-fb:96 ccm fir', 'a=rtcp-fb:96 nack', 'a=rtcp-fb:96 nack pli', 'a=rtcp-fb:96 goog-remb', 'a=rtcp-fb:96 transport-cc', 'a=rtpmap:97 rtx/90000', 'a=fmtp:97 apt=96'].join('\r\n')
        }, {
          name: 'red/90000',
          rtx: 101,
          code: 100,
          value: ['a=rtpmap:100 red/90000', 'a=rtpmap:101 rtx/90000', 'a=fmtp:101 apt=100'].join('\r\n')
        }, {
          name: 'ulpfec/90000',
          code: 127,
          value: 'a=rtpmap:127 ulpfec/90000'
        }, {
          name: 'flexfec-03/90000',
          code: 125,
          value: ['a=rtpmap:125 flexfec-03/90000', 'a=rtcp-fb:125 transport-cc', 'a=rtcp-fb:125 goog-remb', 'a=fmtp:125 repair-window=10000000'].join('\r\n')
        }];
        var separator = '\r\n';
        var getVideoCodecs = function getVideoCodecs(len) {
          var matches = sdp.match(/m=video\s+[\w\s/]+/);
          var videoDesc = matches[0];
          var codecs = videoDesc.split(' ');
          // m=video 55382 UDP/TLS/RTP/SAVPF 98....
          codecs.length = len;
          return codecs;
        };
        // 获取 m=video 编码表的前三位
        var videoCodecs = getVideoCodecs(3);

        // 得到 Video 描述信息列表
        var videoTotalIndex = sdp.indexOf('m=video');
        var ssrcIndex = sdp.indexOf('a=ssrc-group');
        if (utils.isEqual(ssrcIndex, -1)) {
          ssrcIndex = sdp.length;
        }
        var videoBody = sdp.substring(videoTotalIndex, ssrcIndex);
        var videoDescs = videoBody.split(separator);
        var supportCodecs = {};
        utils.forEach(codecs, function (codec) {
          var name = codec.name;

          utils.forEach(videoDescs, function (desc) {
            if (utils.isInclude(desc, name)) {
              supportCodecs[name] = codec;
            }
          });
        });
        var sdpBody = '';
        utils.forEach(supportCodecs, function (codec) {
          var code = codec.code,
              value = codec.value,
              rtx = codec.rtx;

          sdpBody += value + separator;
          videoCodecs.push(code);
          rtx && videoCodecs.push(rtx);
        });
        // 新 SDP = m=video + 所有 a=rtpmap + sdpFooter
        videoBody = videoBody.split(separator);
        videoBody.shift();
        videoBody = videoBody.join(separator);
        var headerIndex = videoBody.indexOf('a=rtpmap');
        var sdpHeader = sdp.substring(0, videoTotalIndex);
        var videoHeader = videoBody.substring(0, headerIndex);
        // 包含 ssrc 信息
        var sdpFooter = sdp.substring(ssrcIndex, sdp.length);
        sdp = sdpHeader + videoCodecs.join(' ') + '\r\n' + videoHeader + sdpBody + sdpFooter;
        utils.extend(offer, {
          sdp: sdp
        });
        return offer;
      }
      /* 
        let ratio = {
          msid: {
            // 1大流    2小流 
            simulcast: 1,
            resolution: "0x0"
          }
        }
      */

    }, {
      key: 'getStreamRatio',
      value: function getStreamRatio(streams) {
        var ratio = {},
            tpl = '{width}x{height}';
        utils.forEach(streams, function (_ref4) {
          var id = _ref4.id,
              mediaStream = _ref4.mediaStream;

          var resolutions = ratio[id] || [];
          var videoTrack = mediaStream.getVideoTracks()[0];
          var simulcast = StreamSize.MAX;
          if (!utils.isUndefined(videoTrack)) {
            var _videoTrack$getConstr = videoTrack.getConstraints(),
                height = _videoTrack$getConstr.height,
                width = _videoTrack$getConstr.width;

            var videoTrackId = videoTrack.id;

            height = height || 0; // 屏幕共享，取不到真实的分辨率时，传 0
            width = width || 0;
            if (utils.isInclude(id, MIN_STREAM_SUFFIX)) {
              simulcast = StreamSize.MIN;
            }
            var resolution = utils.tplEngine(tpl, {
              height: height,
              width: width
            });
            resolutions.push({
              simulcast: simulcast,
              resolution: resolution,
              videoTrackId: videoTrackId
            });
            ratio[id] = resolutions;
          }
        });
        return ratio;
      }
    }, {
      key: 'getStreamId',
      value: function getStreamId(user, size) {
        var tpl = '{userId}_{tag}';
        var userId = user.id,
            stream = user.stream;

        if (!utils.isArray(stream)) {
          stream = [stream];
        }

        var _stream = stream,
            _stream2 = slicedToArray(_stream, 1),
            tag = _stream2[0].tag;

        if (utils.isEqual(size, StreamSize.MIN)) {
          tpl = '{userId}_{tag}_{suffix}';
        }
        if (isV2Tag(tag)) {
          return userId;
        }
        return utils.tplEngine(tpl, {
          userId: userId,
          tag: tag,
          suffix: MIN_STREAM_SUFFIX
        });
      }
    }, {
      key: 'getTagByStreamId',
      value: function getTagByStreamId(id) {
        var details = id.split('_');
        return details[details.length - 1];
      }
    }, {
      key: 'getStreamSymbolById',
      value: function getStreamSymbolById(id) {
        var connector = '_';
        var details = id.split(connector);
        if (utils.isEqual(details.length, 1)) {
          details.push(TAG_V2);
          return details;
        }
        var tag = details.pop();
        var userId = details.join(connector);
        return [userId, tag];
      }
    }, {
      key: 'getStats',
      value: function getStats(callback) {
        var context = this;
        var pc = context.pc;

        return pc.getStats(function (resports) {
          var stats = [];
          resports.result().forEach(function (res) {
            var report = {};
            res.names().forEach(function (name) {
              report[name] = res.stat(name);
            });
            utils.extend(report, res);
            stats.push(report);
          });
          callback(stats);
        });
      }
    }]);
    return PeerConnection;
  }(EventEmitter);


  PeerConnection.getInstance = function () {
    return globalPC;
  };

  var LiveStream = function () {
    function LiveStream(im, option) {
      classCallCheck(this, LiveStream);

      var self = this;
      var detect = option.detect;


      utils.extend(self, {
        option: option,
        im: im,
        rtcToken: null,
        clientId: getClientID()
      });

      self.network = new Network(detect); // 网络嗅探
      self.SubPromiseCache = {}; // 观众仅能订阅一个视频流, 且视频流 id 无规律
      self.SubLiveUrlsCache = null; // 目前逻辑只能有一个 liveUrl
      self.SubStreamCache = null;
      self.setPC();
    }

    createClass(LiveStream, [{
      key: 'getRTCToken',
      value: function getRTCToken() {
        var im = this.im,
            rtcToken = this.rtcToken;

        if (rtcToken) {
          return utils.Defer.resolve(rtcToken);
        }
        return im.getRTCTokenAsyn(im.getUserId());
      }
    }, {
      key: 'setPC',
      value: function setPC() {
        var self = this;
        // 如果已创建 peerconnection, 则不再处理
        if (self.pc && !self.pc.isClosed()) {
          return;
        }

        self.pc = new PeerConnection(self.option);
        self.im.emit(CommonEvent.PEERCONN_CREATED, self.pc);

        var pc = self.pc,
            im = self.im,
            network = self.network;


        pc.on(PeerConnectionEvent.ADDED, function (error, stream) {
          if (error) {
            throw error;
          }
          self.SubPromiseCache.resolve({
            mediaStream: stream
          });
          self.SubStreamCache = stream;
          var tag = stream.id;
          var index = tag.lastIndexOf('_');
          tag = tag.substring(index + 1, tag.length);
          // let type;      

          var user = {
            id: im.getUserId(),
            stream: { mediaStream: stream, type: 0, tag: tag }
          };
          var trackIds = getTrackIds(user);
          im.emit(CommonEvent.SEND_REPORT, {
            type: STAT_NAME.R2,
            name: UpEvent.STREAM_PUBLISH,
            content: {
              trackIds: trackIds
            }
          });
        });

        pc.on(PeerConnectionEvent.TRACK_RECEIVED, function (error, streams) {
          if (error) {
            throw error;
          }
          utils.forEach(streams, function (stream) {
            self.SubPromiseCache.resolve({
              mediaStream: stream
            });
          });
        });

        pc.on(PeerConnectionEvent.SIGNAL_STATE_CHANGE, function (error, streams) {
          if (error) {
            throw error;
          }
          utils.forEach(streams, function (stream) {
            self.SubPromiseCache.resolve({
              mediaStream: stream
            });
          });
        });

        pc.on(PeerConnectionEvent.CHANGED, function () {
          if (pc.isNegotiate()) {
            network.detect(function (isOnline) {
              if (isOnline) {
                self.reconnect();
              } else {
                var Inner = ErrorType.Inner;

                im.emit(CommonEvent.ERROR, Inner.NETWORK_UNAVAILABLE);
              }
            });
          }
        });
      }
    }, {
      key: 'subscribe',
      value: function subscribe(room, callback) {
        var self = this;
        var pc = self.pc,
            im = self.im;
        var liveUrl = room.liveUrl,
            type = room.type,
            size = room.size;
        // if (self.isSubscribed()) {
        //   return utils.Defer.reject(ErrorType.Inner.STREAM_SUBSCRIBED);
        //   // 如果已经订阅过，用户再次订阅视为切换流
        // }

        return utils.deferred(function (resolve, reject) {
          return self.getRTCToken().then(function (result) {
            var rtcToken = result.rtcToken;

            self.SubPromiseCache = { resolve: resolve, reject: reject };
            pc.getOffer().then(function (offer) {
              var url = Path.LIVE_SUBSCRIBE;
              var headers = getLiveHeaders(im, rtcToken);
              var body = {
                liveUrl: liveUrl,
                sdp: offer,
                mediaType: type,
                simulcast: size
              };
              var option = {
                path: url,
                body: body,
                headers: headers
              };
              Logger$1.log(LogTag.LIVE_HANDLER, {
                msg: 'subscribe:request',
                room: room,
                option: option
              });
              IMLogger.info(RTCLogTag.L_MSSL_T, { room: room, option: option });
              request$1.post(option).then(function (response) {
                var answer = response.sdp,
                    clusterId = response.clusterId;

                clusterId && request$1.addClusterIdUrl(clusterId);
                pc.setOffer(offer).then(function () {
                  if (self.isSubscribed()) {
                    pc.setAnwserOnly(answer);
                  } else {
                    pc.setAnwser(answer);
                  }
                });
                utils.extend(im, { room: { id: response.roomId } });
                im.emit(CommonEvent.SEND_REPORT, {
                  type: STAT_NAME.R1,
                  name: UpEvent.STREAM_SUBSCRIBE,
                  content: {}
                });
                Logger$1.log(LogTag.LIVE_HANDLER, {
                  msg: 'subscribe:response:stream:arriving',
                  room: room,
                  response: response
                });
                IMLogger.info(RTCLogTag.L_MSSL_R, { room: room, response: response });
                self.setSubLiveUrl(liveUrl);
                callback && callback();
              }, function (error) {
                Logger$1.log(LogTag.LIVE_HANDLER, {
                  msg: 'subscribe:response:error',
                  room: room,
                  error: error
                });
                IMLogger.info(RTCLogTag.L_MSSL_E, { room: room, error: error });
                self.SubPromiseCache.reject(error);
              });
            });
          }, function (error) {
            Logger$1.log(LogTag.LIVE_HANDLER, {
              msg: 'getrtctoken:error',
              error: error
            });
            return error;
          });
        });
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe() {
        var self = this;
        var pc = self.pc,
            im = self.im;

        var liveUrl = self.getSubLiveUrl();
        return self.getRTCToken().then(function (result) {
          var rtcToken = result.rtcToken;

          return pc.getOffer().then(function (offer) {
            var url = Path.LIVE_EXIT;
            var headers = getLiveHeaders(im, rtcToken);
            var body = {
              sdp: offer,
              liveUrl: liveUrl
            };
            var option = {
              path: url,
              body: body,
              headers: headers
            };
            Logger$1.log(LogTag.LIVE_HANDLER, {
              msg: 'unsubscribe:request',
              option: option
            });
            IMLogger.info(RTCLogTag.L_MLL_T, { option: option });
            request$1.post(option).then(function (response) {
              Logger$1.log(LogTag.LIVE_HANDLER, {
                msg: 'unsubscribe:request:success',
                response: response
              });
              IMLogger.info(RTCLogTag.L_MLL_R, { response: response });
              self.clearSubLiveUrl();
              self.SubStreamCache = null;
            }, function (error) {
              Logger$1.log(LogTag.LIVE_HANDLER, {
                msg: 'unsubscribe:request:error',
                error: error
              });
              IMLogger.error(RTCLogTag.L_MLL_E, { error: error });
              return error;
            });
          });
        }, function (error) {
          Logger$1.log(LogTag.LIVE_HANDLER, {
            msg: 'getrtctoken:error',
            error: error
          });
          return error;
        });
      }
    }, {
      key: 'setSubLiveUrl',
      value: function setSubLiveUrl(liveUrl) {
        this.SubLiveUrlsCache = liveUrl;
      }
    }, {
      key: 'getSubLiveUrl',
      value: function getSubLiveUrl() {
        return this.SubLiveUrlsCache;
      }
    }, {
      key: 'clearSubLiveUrl',
      value: function clearSubLiveUrl() {
        this.SubLiveUrlsCache = null;
      }
    }, {
      key: 'isSubscribed',
      value: function isSubscribed() {
        return !!this.SubLiveUrlsCache;
      }
    }, {
      key: 'reconnect',
      value: function reconnect() {
        var self = this;
        var liveUrl = self.getSubLiveUrl();
        self.clearSubLiveUrl();
        self.subscribe({
          liveUrl: liveUrl
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var self = this;
        var pc = self.pc,
            im = self.im;

        if (pc) {
          pc.close();
          im.emit(CommonEvent.PEERCONN_DESTROYED);
        }
      }
    }]);
    return LiveStream;
  }();

  var isIMV3 = function isIMV3(option) {
    var RongIMLib = option.RongIMLib;

    return RongIMLib.SDK_VERSION; // im v3 可通过 SDK_VERSION 获取版本号
  };

  var getIMEventsByV2 = function getIMEventsByV2(option) {
    var im = option.RongIMLib.RongIMClient,
        RongIMLib = option.RongIMLib;

    var instance = im.getInstance();

    var isCompatibleIM = function isCompatibleIM(key) {
      var imInstance = im.getInstance();
      if (imInstance[key]) {
        return true;
      }
      Logger$1.warn(LogTag.IM, {
        msg: 'Low version IM SDK is not supported, please update IM SDK'
      });
      return false;
    };

    var registMessage = function registMessage(name, message) {
      var isCounted = false,
          isPersited = false;
      var tag = new RongIMLib.MessageTag(isCounted, isPersited);
      var content = message.content;

      var props = utils.map(utils.toArray(content), function (columns) {
        return columns[0];
      });
      im.registerMessageType(name, name, tag, props);
    };

    var getCurrentConnectionStatus = function getCurrentConnectionStatus() {
      var connectState = -1;
      try {
        connectState = im.getInstance().getCurrentConnectionStatus();
      } catch (error) {
        Logger$1.error(LogTag.IM, {
          content: error,
          pos: 'new RongRTC'
        });
      }
      return connectState;
    };

    return {
      CONNECTION_STATUS: RongIMLib.ConnectionStatus,
      isConnected: function isConnected() {
        var connectState = getCurrentConnectionStatus();
        return utils.isEqual(connectState, RongIMLib.ConnectionStatus.CONNECTED);
      },
      statusWatch: im.statusWatch,
      messageWatch: function messageWatch(event) {
        event = event || utils.noop;
        im.messageWatch(function (message) {
          var messageType = message.messageType;

          var isCustom = utils.isEqual(im.MessageType.UnknownMessage, messageType);
          var msg = utils.parse(utils.toJSON(message));
          var content = {};
          if (isCustom) {
            var customMsg = msg.content;
            content = customMsg.message.content;
          } else {
            content = msg.content;
          }
          utils.extend(msg, {
            content: content
          });
          msg = {
            name: msg.objectName,
            uId: msg.messageUId,
            senderId: msg.senderUserId,
            content: msg.content
          };
          event(msg);
        });
      },
      joinRTCRoom: function joinRTCRoom(room) {
        return utils.deferred(function (resolve, reject) {
          instance.joinRTCRoom(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      quitRTCRoom: function quitRTCRoom(room) {
        return utils.deferred(function (resolve, reject) {
          instance.quitRTCRoom(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getRTCRoomInfo: function getRTCRoomInfo(room) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCRoomInfo(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getRTCUserInfoList: function getRTCUserInfoList(room) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCUserInfoList(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getRTCToken: function getRTCToken(room) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCToken(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getNavi: function getNavi() {
        return instance.getNavi();
      },
      getCurrentUserId: function getCurrentUserId() {
        return instance.getCurrentUserId();
      },
      getCurrentConnectionStatus: getCurrentConnectionStatus,
      setRTCUserInfo: function setRTCUserInfo(room, info) {
        return utils.deferred(function (resolve, reject) {
          instance.setRTCUserInfo(room, info, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      removeRTCUserInfo: function removeRTCUserInfo(room, info) {
        return utils.deferred(function (resolve, reject) {
          instance.removeRTCUserInfo(room, info, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      /**
       * 发布资源 / 取消发布
       */
      setRTCUserData: function setRTCUserData(id, key, value, isInner, message) {
        return utils.deferred(function (resolve, reject) {
          instance.setRTCUserData(id, key, value, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      },
      /**
       * 全量 URI 资源发布
       * @param {string} roomId 房间 ID
       * @param {{ name: string, content: string }} message 旧版本消息，含消息名及消息内容
       * @param {string} valueInfo 全量消息数据
       * @param {string} objectName 全量 URI 消息名
       */
      setRTCUserTotalRes: function setRTCUserTotalRes(roomId, message, valueInfo, objectName) {
        return utils.deferred(function (resolve, reject) {
          instance.setRTCUserTotalRes(roomId, message, valueInfo, objectName, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },

      getRTCUserData: function getRTCUserData(id, keys, isInner) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCUserData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      removeRTCUserData: function removeRTCUserData(id, keys, isInner, message) {
        return utils.deferred(function (resolve, reject) {
          instance.removeRTCUserData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      },
      setRTCRoomData: function setRTCRoomData(id, key, value, isInner, message) {
        return utils.deferred(function (resolve, reject) {
          instance.setRTCRoomData(id, key, value, isInner, {
            onSuccess: resolve,
            onError: reject
          }, message);
        });
      },
      getRTCRoomData: function getRTCRoomData(id, keys, isInner) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCRoomData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      removeRTCRoomData: function removeRTCRoomData(id, keys, isInner, message) {
        return utils.deferred(function (resolve, reject) {
          instance.removeRTCRoomData(id, keys, isInner, {
            onSuccess: resolve,
            onError: reject
          });
        }, message);
      },
      setRTCState: function setRTCState(room, content) {
        if (!isCompatibleIM('setRTCState')) {
          return '';
        }
        return utils.deferred(function (resolve, reject) {
          instance.setRTCState(room, content, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getRTCUserList: function getRTCUserList(room) {
        return utils.deferred(function (resolve, reject) {
          instance.getRTCUserList(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getAppInfo: function getAppInfo() {
        var appInfo = instance.getAppInfo();
        return {
          appKey: appInfo.appKey
        };
      },
      RTCPing: function RTCPing(room) {
        return utils.deferred(function (resolve, reject) {
          instance.RTCPing(room, {
            onSuccess: resolve,
            onError: reject
          });
        });
      },
      getIMVersion: function getIMVersion() {
        if (!isCompatibleIM('getSDKInfo')) {
          return '';
        }
        var info = im.getInstance().getSDKInfo();
        return info.version || '';
      },
      isSupportRTC: function isSupportRTC() {
        var isSupport = false;
        if (utils.isFunction(im.prototype.RTCPing)) {
          isSupport = true;
        }
        return isSupport;
      },
      sendMessage: function sendMessage(message, roomId) {
        var name = message.name,
            content = message.content;

        var conversationType = 12;
        var isRegisted = im.RegisterMessage[name];
        !isRegisted && registMessage(name, message);
        var msg = new im.RegisterMessage[name](content);
        return utils.deferred(function (resolve, reject) {
          instance.sendMessage(conversationType, roomId, msg, {
            onSuccess: resolve,
            onError: reject
          });
        });
      }
    };
  };

  var getIMEventsByV3 = function getIMEventsByV3(option) {
    var RongIMLib = option.RongIMLib;

    var im = RongIMLib.RongIMClient ? RongIMLib.RongIMClient.getIMv3() : RongIMLib.getInstance();
    var CONNECTION_STATUS = RongIMLib.CONNECTION_STATUS;

    if (!(im.rtcInnerUnwatch && im.rtcInnerWatch)) {
      throw new Error('Please upgrade RongIMLib version');
    }

    return {
      CONNECTION_STATUS: CONNECTION_STATUS,
      isConnected: function isConnected() {
        var connectionStatus = im.getConnectionStatus();
        return utils.isEqual(connectionStatus, CONNECTION_STATUS.CONNECTED);
      },
      statusWatch: function statusWatch(event) {
        im.rtcInnerWatch({
          status: function status(_ref) {
            var _status = _ref.status;

            event(_status);
          }
        });
      },
      messageWatch: function messageWatch(event) {
        event = event || utils.noop;
        im.rtcInnerWatch({
          message: function message(_ref2) {
            var _message = _ref2.message;
            var name = _message.messageType,
                type = _message.type;

            var isRTCMsg = utils.isEqual(type, RongIMLib.CONVERSATION_TYPE.RTC_ROOM);
            isRTCMsg && event({
              name: name,
              uId: _message.messageUId,
              senderId: _message.senderUserId,
              content: _message.content
            });
          }
        });
      },
      joinRTCRoom: function joinRTCRoom(room) {
        var rtc = new im.RTC(room);
        return rtc.join();
      },
      quitRTCRoom: function quitRTCRoom(room) {
        var rtc = new im.RTC(room);
        return rtc.quit();
      },
      getRTCRoomInfo: function getRTCRoomInfo(room) {
        var rtc = new im.RTC(room);
        return rtc.getRoomInfo();
      },
      getRTCUserInfoList: function getRTCUserInfoList(room) {
        var rtc = new im.RTC(room);
        return rtc.getUserInfoList();
      },
      getRTCToken: function getRTCToken(room) {
        var rtc = new im.RTC(room);
        return rtc.getToken();
      },
      getNavi: function getNavi() {
        var appInfo = im.getAppInfo();
        return appInfo.navi;
      },
      getCurrentUserId: function getCurrentUserId() {
        return im.getConnectionUserId();
      },
      getCurrentConnectionStatus: function getCurrentConnectionStatus() {
        return im.getConnectionStatus();
      },
      setRTCUserInfo: function setRTCUserInfo(room, info) {
        var rtc = new im.RTC(room);
        return rtc.setUserInfo(info);
      },
      removeRTCUserInfo: function removeRTCUserInfo(room, info) {
        var rtc = new im.RTC(room);
        return rtc.removeUserInfo(info);
      },
      setRTCUserData: function setRTCUserData(id, key, value, isInner, message) {
        var rtc = new im.RTC({ id: id });
        return rtc.setUserData(key, value, isInner, message);
      },
      /**
       * 全量 URI 资源发布
       * @param {string} roomId 房间 ID
       * @param {{ name: string, content: string }} message 旧版本消息，含消息名及消息内容
       * @param {string} valueInfo 全量消息数据
       * @param {string} objectName 全量 URI 消息名
       */
      setRTCUserTotalRes: function setRTCUserTotalRes(roomId, message, valueInfo, objectName) {
        var rtc = new im.RTC({ id: roomId });
        return rtc.setRTCUserData(message, valueInfo, objectName);
      },

      getRTCUserData: function getRTCUserData(id, keys, isInner) {
        var rtc = new im.RTC({ id: id });
        return rtc.getUserData(keys, isInner);
      },
      removeRTCUserData: function removeRTCUserData(id, keys, isInner, message) {
        var rtc = new im.RTC({ id: id });
        return rtc.removeUserData(keys, isInner, message);
      },
      setRTCRoomData: function setRTCRoomData(id, key, value, isInner, message) {
        var rtc = new im.RTC({ id: id });
        return rtc.setRoomData(key, value, isInner, message);
      },
      getRTCRoomData: function getRTCRoomData(id, keys, isInner) {
        var rtc = new im.RTC({ id: id });
        return rtc.getRoomData(keys, isInner);
      },
      removeRTCRoomData: function removeRTCRoomData(id, keys, isInner, message) {
        var rtc = new im.RTC({ id: id });
        return rtc.removeRoomData(keys, isInner, message);
      },
      setRTCState: function setRTCState(room, content) {
        var rtc = new im.RTC(room);
        return rtc.setState(content);
      },
      getRTCUserList: function getRTCUserList(room) {
        var rtc = new im.RTC(room);
        return rtc.getUserList();
      },
      getAppInfo: function getAppInfo() {
        var appInfo = im.getAppInfo();
        return {
          appKey: appInfo.appkey
        };
      },
      RTCPing: function RTCPing(room) {
        var rtc = new im.RTC(room);
        return rtc.ping();
      },
      getIMVersion: function getIMVersion() {
        return RongIMLib.SDK_VERSION;
      },
      isSupportRTC: function isSupportRTC() {
        var isSupport = false;
        if (im.RTC) {
          isSupport = true;
        }
        return isSupport;
      },
      sendMessage: function sendMessage(message, roomId) {
        var name = message.name,
            content = message.content;

        var rtc = new im.RTC({ id: roomId });
        return rtc.send({
          messageType: name,
          content: content
        });
      }
    };
  };

  var get$1 = function get(option) {
    return isIMV3(option) ? getIMEventsByV3(option) : getIMEventsByV2(option);
  };

  var IMAdapt = {
    get: get$1
  };

  var Message = {
    PUBLISH: 'RTCPublishResourceMessage',
    UNPUBLISH: 'RTCUnpublishResourceMessage',
    MODIFY: 'RTCModifyResourceMessage',
    STATE: 'RTCUserChangeMessage',
    ROOM_NOTIFY: 'RTCRoomDataNotifyMessage',
    USER_NOTIFY: 'RTCUserDataNotifyMessage',
    KICK: 'RTCUserKickMessage',
    TOTAL_CONTENT_RESOURCE: 'TotalContentResources'
  };

  var MessageName = {
    PUBLISH: 'RCRTC:PublishResource',
    UNPUBLISH: 'RCRTC:UnpublishResource',
    MODIFY: 'RCRTC:ModifyResource',
    STATE: 'RCRTC:state',
    ROOM_NOTIFY: 'RCRTC:RoomNtf',
    USER_NOTIFY: 'RCRTC:UserNtf',
    KICK: 'RCRTC:kick',
    TOTAL_CONTENT_RESOURCE: 'RCRTC:TotalContentResources'
  };
  var Timeout = {
    TIME: 10 * 1000
  };
  var errorHandler = function errorHandler(code) {
    var error = ErrorType[code] || {
      code: code
    };
    return error;
  };
  var getMsgName = function getMsgName(type) {
    switch (type) {
      case Message.PUBLISH:
        return MessageName.PUBLISH;
      case Message.UNPUBLISH:
        return MessageName.UNPUBLISH;
      case Message.MODIFY:
        return MessageName.MODIFY;
      case Message.STATE:
        return MessageName.STATE;
      case Message.ROOM_NOTIFY:
        return MessageName.ROOM_NOTIFY;
      case Message.USER_NOTIFY:
        return MessageName.USER_NOTIFY;
      case Message.KICK:
        return MessageName.KICK;
      case Message.TOTAL_CONTENT_RESOURCE:
        return MessageName.TOTAL_CONTENT_RESOURCE;
    }
  };

  var delUri = function delUri(uris, unpublished) {
    return uris.filter(function (item) {
      return unpublished.every(function (_ref) {
        var msid = _ref.msid,
            mediaType = _ref.mediaType;

        return msid !== item.msid || mediaType !== item.mediaType;
      });
    });
  };
  var addUri = function addUri(uris, published) {
    published.forEach(function (item) {
      var msid = item.msid,
          mediaType = item.mediaType;

      if (uris.some(function (uri) {
        return uri.msid === msid && mediaType === uri.mediaType;
      })) {
        return;
      }
      uris.push(item);
    });
    return uris;
  };
  var modify = function modify(uris, modified) {
    modified.forEach(function (item) {
      var msid = item.msid,
          mediaType = item.mediaType,
          state = item.state;

      for (var i = uris.length - 1; i >= 0; i -= 1) {
        var uri = uris[i];
        if (msid === uri.msid && mediaType === uri.mediaType) {
          uri.state = state;
          break;
        }
      }
    });
    return uris;
  };

  var IM = function (_EventEmitter) {
    inherits(IM, _EventEmitter);

    function IM(option) {
      classCallCheck(this, IM);

      // 己方已已发布的全量资源清单
      var _this = possibleConstructorReturn(this, (IM.__proto__ || Object.getPrototypeOf(IM)).call(this));

      _this.uris = [];
      // 接收到的已发布资源全量清单
      _this.otherUris = {};
      var timer = new utils.Timer({
        timeout: Timeout.TIME
      });
      var v2Users = utils.Cache();
      var context = _this;
      var isJoinRoom = false;
      var clientSessionId = '';
      utils.extend(context, {
        timer: timer,
        isJoinRoom: isJoinRoom,
        clientSessionId: clientSessionId,
        v2Users: v2Users,
        option: option
      });
      var im = IMAdapt.get(option);
      var CONNECTION_STATUS = im.CONNECTION_STATUS;
      var init = function init() {
        if (context.isJoinRoom) {
          context.rePing();
        }
        var urls = context.getMSUrl();
        var timeout = context.getRequestTimeout();
        !request$1.isUrlsExisted(urls) && request$1.addUrls(urls);
        request$1.setOption({ timeout: timeout });
      };
      var connectState = im.getCurrentConnectionStatus();
      utils.extend(context, {
        connectState: connectState,
        im: im
      });
      // 如果实例化 RongRTC 时，IM 已连接成功，主动触发内部 init
      if (im.isConnected()) {
        init();
      }
      im.statusWatch = im.statusWatch || utils.noop;
      im.statusWatch(function (status) {
        switch (status) {
          case CONNECTION_STATUS.CONNECTED:
            init();
            context.emit(CommonEvent.CONNECTED);
            break;
        }
        utils.extend(context, {
          connectState: status
        });
      });
      var roomEventHandler = function roomEventHandler(users) {
        utils.forEach(users, function (user) {
          var id = user.userId,
              state = user.state;

          switch (+state) {
            case UserState.JOINED:
              context.emit(DownEvent.ROOM_USER_JOINED, { id: id });
              break;
            case UserState.LEFT:
            case UserState.OFFLINE:
              Logger$1.log(LogTag.ROOM, {
                msg: 'room:member:left',
                user: user
              });
              delete _this.otherUris[id];
              context.emit(DownEvent.ROOM_USER_LEFT, { id: id });
              break;
            default:
              Logger$1.warn('UserState: unkown state ' + state);
          }
        });
      };

      im.messageWatch = im.messageWatch || utils.noop;
      var handleMessage = function handleMessage(message) {
        /*
          新版本 RTC SDK 通过 TotalContentResource 消息处理资源订阅，
          通过记录的资源与 TotalContentResource 内的 uris 数据比对来定义用户是增加发布或取消发布
          PublishResource、UnpublishResource、ModifyResource 消息内增加 ignore 属性，用于通知新版 SDK 略过处理
         */
        var name = message.name,
            id = message.senderId,
            _message$content = message.content,
            uris = _message$content.uris,
            users = _message$content.users,
            ignore = _message$content.ignore,
            uId = message.uId;

        if (ignore === true) {
          Logger$1.log(LogTag.IM, {
            msg: 'receive:message',
            ignore: ignore,
            message: message
          });
          return;
        }
        if (name === MessageName.TOTAL_CONTENT_RESOURCE) {
          Logger$1.log(LogTag.IM, {
            msg: 'receive:message',
            message: message
          });
          var nowUris = _this.otherUris[id] || (_this.otherUris[id] = []);
          // 没有资源记录，资源为新发布，模拟 PublishResource 消息进行递归，以复用原业务代码
          if (nowUris.length === 0) {
            _this.otherUris[id] = uris;
            handleMessage({ name: MessageName.PUBLISH, senderId: id, content: { uris: uris }, uId: uId });
            return;
          }
          // 已有资源记录，比对资源

          var _ref2 =
          /**
           * @param {Array} before
           * @param {Array} now
           */
          function (before, now) {
            var published = [];var modified = [];var unpublished = [];
            now.forEach(function (newItem) {
              // 新资源数据
              var newType = newItem.mediaType,
                  newMsid = newItem.msid,
                  newState = newItem.state,
                  newUri = newItem.uri;
              // 遍历旧版资源

              for (var i = before.length - 1; i >= 0; i -= 1) {
                var _before$i = before[i],
                    mediaType = _before$i.mediaType,
                    msid = _before$i.msid,
                    state = _before$i.state,
                    uri = _before$i.uri;

                if (mediaType === newType && msid === newMsid) {
                  if (newUri !== uri) {
                    // 资源已重新发布
                    published.push(newItem);
                  } else if (state !== newState) {
                    // 状态变更的资源
                    modified.push(newItem);
                  }
                  // 删除相同资源避免多余的计算
                  before.splice(i, 1);
                  return;
                }
              }
              // 剩余新增资源
              published.push(newItem);
            });
            // 剩余未删除资源为已取消发布资源
            unpublished.push.apply(unpublished, toConsumableArray(before));
            return { published: published, modified: modified, unpublished: unpublished };
          }(nowUris.slice(), uris.slice()),
              published = _ref2.published,
              modified = _ref2.modified,
              unpublished = _ref2.unpublished;

          // 重新备份记录


          _this.otherUris[id] = uris;

          // 增加发布的流信息
          if (published.length > 0) {
            handleMessage({ name: MessageName.PUBLISH, senderId: id, content: { uris: published }, uId: uId });
          }
          // 取消发布的流信息
          if (unpublished.length > 0) {
            handleMessage({ name: MessageName.UNPUBLISH, senderId: id, content: { uris: unpublished }, uId: uId });
          }
          // 状态变更
          if (modified.length > 0) {
            handleMessage({ name: MessageName.MODIFY, senderId: id, content: { uris: modified }, uId: uId });
          }
          return;
        }

        var user = { id: id };
        if (utils.isArray(uris)) {
          uris = utils.map(uris, function (uri) {
            var tag = uri.tag;

            if (isV2Tag(tag)) {
              utils.extend(uri, {
                tag: TAG_V2
              });
            }
            return uri;
          });
        }
        switch (name) {
          case MessageName.STATE:
            roomEventHandler(users);
            break;
          case MessageName.KICK:
            context.emit(DownEvent.ROOM_USER_KICK, { msg: ErrorType.Inner.ROOM_USER_KICK });
            break;
          case MessageName.PUBLISH:
            user = { id: id, uris: uris };
            if (utils.isInclude(id, '_')) {
              v2Users.set(id, true);
            }
            dispatchStreamEvent(user, function (user) {
              context.emit(DownEvent.STREAM_PUBLISHED, user);
            });
            break;
          case MessageName.UNPUBLISH:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              context.emit(DownEvent.STREAM_UNPUBLISHED, user);
            });
            break;
          case MessageName.MODIFY:
            user = { id: id, uris: uris };
            dispatchStreamEvent(user, function (user) {
              dispatchOperationEvent(user, function (event, user) {
                context.emit(event, user);
              });
            });
            break;
          default:
            context.emit(DownEvent.MESSAGE_RECEIVED, message);
        }
      };
      im.messageWatch(handleMessage);
      return _this;
    }

    createClass(IM, [{
      key: 'isConnected',
      value: function isConnected() {
        return this.im.isConnected();
      }
    }, {
      key: 'joinRoom',
      value: function joinRoom(room) {
        var context = this;
        var im = context.im;

        utils.extend(context, {
          room: room,
          isJoinRoom: true,
          clientSessionId: utils.getUUID()
        });
        IMLogger.info(RTCLogTag.P_JRAGD_T, {
          room: room
        });
        return im.joinRTCRoom(room).then(function (_ref3) {
          var users = _ref3.users,
              token = _ref3.token,
              sessionId = _ref3.sessionId;

          context.rtcPing(room);

          var _context$getUser = context.getUser(),
              currentUserId = _context$getUser.id;
          // 更新 uris


          var otherUris = context.otherUris = {};

          var tempUsers = utils.clone(users);
          Logger$1.log(LogTag.IM, {
            msg: 'join:room:inner:success',
            users: tempUsers
          });
          utils.forEach(tempUsers, function (tUser, userId) {
            tUser = tUser || {};
            // 过滤自己 utils.isEmpty(tUser) ||
            if (utils.isEqual(currentUserId, userId)) {
              delete users[userId];
            } else {
              var user = users[userId];
              var uris = user.uris;

              context.v2Users.set(userId, true);
              if (!utils.isUndefined(uris)) {
                uris = utils.isString(uris) ? utils.parse(uris) : uris;
                utils.extend(user, {
                  uris: uris
                });
              }
              otherUris[userId] = uris;
            }
          });
          utils.extend(room, {
            rtcToken: token,
            users: users,
            sessionId: sessionId
          });
          context.emit(CommonEvent.JOINED, room);
          IMLogger.info(RTCLogTag.P_JRAGD_R, {
            roomId: room.id,
            users: users,
            rtcToken: token,
            sessionId: sessionId
          });
          return users;
        }).catch(function (code) {
          IMLogger.warn(RTCLogTag.P_JRAGD_E, {
            roomId: room.id,
            code: code
          });
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'leaveRoom',
      value: function leaveRoom() {
        var context = this;
        // 清除全量 URI 相关缓存数据
        this.otherUris = {};
        this.uris.length = [];
        var im = context.im,
            room = context.room,
            timer = context.timer;

        timer.pause();
        utils.extend(context, {
          isJoinRoom: false,
          clientSessionId: ''
        });
        context.emit(CommonEvent.LEFT, room);
        return im.quitRTCRoom(room).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'getRoom',
      value: function getRoom() {
        var im = this.im,
            room = this.room;

        return im.getRTCRoomInfo(room).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'getUsers',
      value: function getUsers() {
        var im = this.im,
            room = this.room;

        return im.getRTCUserInfoList(room).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'getRTCToken',
      value: function getRTCToken() {
        var rtcToken = this.room.rtcToken;

        return rtcToken;
      }
    }, {
      key: 'getRTCTokenAsyn',
      value: function getRTCTokenAsyn(id) {
        var im = this.im,
            _option = this.option,
            mode = _option.mode,
            liveType = _option.liveType;

        return im.getRTCToken({
          id: id,
          mode: mode,
          broadcastType: liveType
        }).then(function (result) {
          IMLogger.info(RTCLogTag.L_GRT_R, {
            result: result
          });
          return result;
        }).catch(function (error) {
          IMLogger.info(RTCLogTag.L_GRT_E, {
            error: error,
            desc: 'get rtc token asyn'
          });
          return utils.Defer.reject(error);
        });
      }
    }, {
      key: 'getRoomId',
      value: function getRoomId() {
        var id = this.room.id;

        return id;
      }
    }, {
      key: 'getClientSessionId',
      value: function getClientSessionId() {
        return this.clientSessionId;
      }
    }, {
      key: 'getSessionId',
      value: function getSessionId() {
        var sessionId = this.room.sessionId;

        return sessionId;
      }
    }, {
      key: 'getNaviRTCInfo',
      value: function getNaviRTCInfo() {
        var im = this.im;

        var navi = im.getNavi();
        var rtcInfo = navi.voipCallInfo;

        rtcInfo = rtcInfo || '{"callEngine": [{}]}';
        rtcInfo = utils.parse(rtcInfo);
        var engines = rtcInfo.callEngine;
        var engine = utils.filter(engines, function (e) {
          return e.engineType === 4;
        })[0] || {};
        return engine;
      }
    }, {
      key: 'getRequestTimeout',
      value: function getRequestTimeout() {
        var engine = this.getNaviRTCInfo();
        var timeOut = engine.timeOut;

        if (timeOut && utils.isNumber(timeOut)) {
          timeOut = timeOut * 1000; // navi 下发单位为 s
        } else {
          timeOut = REQUEST_TIMEOUT;
        }
        return timeOut;
      }
    }, {
      key: 'getMSUrl',
      value: function getMSUrl() {
        var engine = this.getNaviRTCInfo();
        var urls = engine.backupMediaServer,
            mediaServer = engine.mediaServer;

        if (utils.isUndefined(urls)) {
          urls = [];
        }
        /**
         * 四端已约定，backupMediaServer 值必须为数组，但由于 IM 2.0 SDK 内部错误会导致
         * navi 缓存数据被篡改为非数组，故暂时无法删除兼容代码
         */
        if (utils.isString(urls)) {
          urls = urls.split(',');
        }
        if (!utils.isUndefined(mediaServer)) {
          urls.unshift(mediaServer);
        }
        urls = utils.filter(urls, function (url) {
          return isValidMediaServer(url);
        });
        return urls;
      }
    }, {
      key: 'getUser',
      value: function getUser() {
        var user = this.room.user;

        return user;
      }
    }, {
      key: 'getUserId',
      value: function getUserId() {
        var im = this.im;

        return im.getCurrentUserId();
      }
    }, {
      key: 'setUserInfo',
      value: function setUserInfo(key, value) {
        var room = this.room,
            im = this.im;

        value = utils.toJSON(value);
        var info = {
          key: key,
          value: value
        };
        return im.setRTCUserInfo(room, info);
      }
    }, {
      key: 'removeUserInfo',
      value: function removeUserInfo(keys) {
        var room = this.room,
            im = this.im;

        var info = {
          keys: keys
        };
        return im.removeRTCUserInfo(room, info);
      }
    }, {
      key: 'setUserData',
      value: function setUserData(key, value, isInner, message) {
        var id = this.room.id,
            im = this.im;

        value = utils.toJSON(value);
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'setUserData:before',
          roomId: id,
          value: value,
          message: message
        });

        var messageType = message.name;
        var messageContent = JSON.parse(message.content);
        // messageContent 内容增加 ignore 字段，以通知新版本 SDK 规避此消息（移动端需求）
        messageContent.ignore = true;
        message.content = JSON.stringify(messageContent);

        // 记录资源发布、取消发布、资源修改后的全量 URI 信息
        if (messageType === MessageName.UNPUBLISH) {
          this.uris = delUri(this.uris, messageContent.uris);
        } else if (message.name === MessageName.PUBLISH) {
          this.uris = addUri(this.uris, messageContent.uris);
        } else if (message.name === MessageName.MODIFY) {
          this.uris = modify(this.uris, messageContent.uris);
        }
        var valueInfo = JSON.stringify(this.uris);

        // 发布全量 URI 资源
        var promise = im.setRTCUserTotalRes(id, message, valueInfo, MessageName.TOTAL_CONTENT_RESOURCE);
        // 2020-07-15: 服务会代发旧版本 SDK 无需再发送
        // ~~旧版本信令需照常发送，以适配老版本 SDK~~
        // im.setRTCUserData(id, key, value, isInner, message).then(() => {
        //   Logger.log(LogTag.STREAM_HANDLER, {
        //     msg: 'setUserData:after',
        //     roomId: id,
        //     value,
        //     message
        //   });
        // });
        return promise;
      }
    }, {
      key: 'getUserData',
      value: function getUserData(keys, isInner) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return im.getRTCUserData(id, keys, isInner);
      }
    }, {
      key: 'removeUserData',
      value: function removeUserData(keys, isInner, message) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return im.removeRTCUserData(id, keys, isInner, message);
      }
    }, {
      key: 'setRoomData',
      value: function setRoomData(key, value, isInner, message) {
        var id = this.room.id,
            im = this.im;

        return im.setRTCRoomData(id, key, value, isInner, message);
      }
    }, {
      key: 'getRoomData',
      value: function getRoomData(keys, isInner) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return im.getRTCRoomData(id, keys, isInner);
      }
    }, {
      key: 'removeRoomData',
      value: function removeRoomData(keys, isInner, message) {
        var id = this.room.id,
            im = this.im;

        if (!utils.isArray(keys)) {
          keys = [keys];
        }
        return im.removeRTCRoomData(id, keys, isInner, message);
      }
    }, {
      key: 'getExistUsers',
      value: function getExistUsers() {
        var im = this.im,
            room = this.room;

        return im.getRTCUserList(room).catch(function (code) {
          return utils.Defer.reject(errorHandler(code));
        });
      }
    }, {
      key: 'sendMessage',
      value: function sendMessage(message) {
        var im = this.im,
            room = this.room;

        Logger$1.log(LogTag.IM, {
          msg: 'send:before',
          message: message
        });
        return im.sendMessage(message, room.id).then(function () {
          Logger$1.log(LogTag.IM, {
            msg: 'send:after',
            message: message
          });
          return room;
        }).catch(function (code) {
          Logger$1.log(LogTag.IM, {
            msg: 'send:after',
            error: code
          });
          return utils.Defer.reject(code);
        });
      }
    }, {
      key: 'getMessage',
      value: function getMessage(type, content) {
        var name = getMsgName(type);
        content = utils.toJSON(content);
        return {
          name: name,
          content: content
        };
      }
    }, {
      key: 'isIMReady',
      value: function isIMReady() {
        var context = this;
        var im = context.im;

        return context.connectState === im.CONNECTION_STATUS.CONNECTED;
      }
    }, {
      key: 'getAppInfo',
      value: function getAppInfo() {
        var context = this;
        var im = context.im;

        return im.getAppInfo();
      }
    }, {
      key: 'isJoined',
      value: function isJoined() {
        var context = this;
        return context.isJoinRoom;
      }
    }, {
      key: 'isSupportRTC',
      value: function isSupportRTC() {
        var context = this;
        var im = context.im;

        return im.isSupportRTC();
      }
    }, {
      key: 'rePing',
      value: function rePing() {
        var context = this;
        var timer = context.timer;

        var roomId = context.getRoomId();
        if (!utils.isUndefined(roomId)) {
          timer.pause();
          context.rtcPing({
            id: roomId
          });
        }
      }
    }, {
      key: 'rtcPing',
      value: function rtcPing(room) {
        var context = this;
        var im = context.im,
            timer = context.timer;

        var count = 0;
        var isPinging = false;
        var Status = {
          reset: function reset() {
            count = 0;
            isPinging = false;
          },
          sum: function sum() {
            count += 1;
          }
        };
        var Inner = ErrorType.Inner;

        timer.resume(function () {
          if (count > PingCount) {
            timer.pause();
            utils.extend(context, {
              isJoinRoom: false,
              clientSessionId: ''
            });
            im.isJoinedRTCRoom = false;
            context.emit(CommonEvent.LEFT);
            return context.emit(CommonEvent.ERROR, Inner.SOCKET_UNAVAILABLE);
          }
          // 如果上次 Ping 没有结束，累计 Ping 次数
          if (isPinging) {
            Status.sum();
          }
          isPinging = true;
          im.RTCPing(room).then(function () {
            Status.reset();
          }).catch(function (code) {
            Logger$1.error(LogTag.IM, {
              msg: 'RTC Ping Error' + code
            });
          });
        }, true);
      }
    }, {
      key: 'getIMVersion',
      value: function getIMVersion() {
        return this.im.getIMVersion();
      }
    }, {
      key: 'setRTCState',
      value: function setRTCState(content) {
        var im = this.im,
            room = this.room;

        return im.setRTCState(room, content);
      }
    }]);
    return IM;
  }(EventEmitter);

  var DataCacheName = {
    USERS: 'room_users',
    // 全部通知后一次性交换 SDP
    IS_NOTIFY_READY: 'is_notify_ready'
  };

  var getUser = function getUser(im) {
    return {
      SET_USERINFO: 'uris',
      set: function set$$1(key, data, isInner, message) {
        return im.setUserData(key, data, isInner, message);
      }
    };
  };

  var getUserMedia = function getUserMedia(constraints) {
    return navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
      return { mediaStream: mediaStream };
    });
  };

  var getScreen = function getScreen(constraints) {
    var _constraints = constraints,
        desktopStreamId = _constraints.desktopStreamId;

    if (!desktopStreamId) {
      var Inner = ErrorType.Inner;

      return utils.Defer.reject(Inner.STREAM_DESKTOPID_ILLEGAL);
    }
    constraints = {
      video: {
        getDisplayMedia: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: desktopStreamId
        }
      }
    };
    return getUserMedia(constraints);
  };

  var getMS = function getMS(constraints) {
    if (utils.isEmpty(constraints)) {
      constraints = {
        video: true,
        audio: true
      };
    }
    var _constraints2 = constraints,
        video = _constraints2.video;

    if (utils.isObject(video)) {
      var isCustomResolution = !utils.isEmpty(video.resolution) && utils.isObject(RongRTCVideoBitRate[video.resolution]);
      isCustomResolution ? video = utils.extend(video, RongRTCVideoBitRate[video.resolution]) : video = utils.extend(video, DEFAULT_MS_PROFILE);
      // if (!utils.isEmpty(video.resolution) && utils.isObject(RongRTCVideoBitRate[video.resolution])) {
      //   video = utils.extend(video, RongRTCVideoBitRate[video.resolution]);
      // }
      // video = utils.extend(video, DEFAULT_MS_PROFILE);
    }
    if (utils.isBoolean(video) && video) {
      video = DEFAULT_MS_PROFILE;
    }
    utils.extend(constraints, {
      video: video
    });
    return getUserMedia(constraints);
  };

  var currentUserDeviceSwitchCache = {
    switchCahce: {},
    set: function set$$1(type, isEnabled) {
      switch (type) {
        case StreamType.AUDIO:
          this.switchCahce.audio = isEnabled;
          break;
        case StreamType.VIDEO:
          this.switchCahce.video = isEnabled;
          break;
        default:
          break;
      }
    },
    get: function get$$1() {
      return this.switchCahce;
    },
    clear: function clear() {
      this.switchCahce = {};
    }
  };

  var DefaultStream = function () {
    function DefaultStream(im, option) {
      classCallCheck(this, DefaultStream);

      var self = this;

      self.StreamCache = utils.Cache(); // 缓存已订阅 MediaStream, 规则 userId_type: mediaStream, 方便视频流操作
      self.DataCache = utils.Cache();
      self.SubPromiseCache = utils.Cache(); // 缓存订阅 Promise
      self.PubResourceCache = utils.Cache(); // 缓存发布资源
      self.PublishStreamCache = utils.Cache(); // 缓存自己发布的视频流

      self.subCache = utils.Cache(); // 缓存订阅关系，每次修改需同步全量数据. userId: [{ streamId: '', uri: '', type: 1, tag: ''}]

      var detect = option.detect;


      utils.extend(self, {
        option: option,
        im: im
      });

      self.network = new Network(detect); // 网络嗅探
      self.User = getUser(im);
      self.SubscribeCache = {
        get: function get$$1(userId) {
          return self.subCache.get(userId);
        },
        set: function set$$1(userId, subs) {
          return self.subCache.set(userId, subs);
        },
        getKeys: function getKeys() {
          return self.subCache.getKeys();
        },
        remove: function remove(user) {
          var pc = self.pc;
          var userId = user.id;

          var stream = user.stream || {};
          var isNoType = utils.isUndefined(stream.type);
          var removeType = isNoType ? StreamType.AUDIO_AND_VIDEO : stream.type;
          var streamId = pc.getStreamId(user);
          var subs = self.subCache.get(userId) || [];
          subs = utils.filter(subs, function (_ref) {
            var msid = _ref.msid,
                type = _ref.type;

            var isStreamNeedRemove = utils.isEqual(streamId, msid);
            var isTypeNeedRemove = utils.isEqual(type, removeType) || utils.isEqual(removeType, StreamType.AUDIO_AND_VIDEO);
            return !(isStreamNeedRemove && isTypeNeedRemove);
          });
          self.subCache.set(userId, subs);
        },
        clear: function clear() {
          self.subCache.clear();
        },
        setState: function setState(userId, option) {
          option = option || {};
          var _option = option,
              type = _option.type,
              state = _option.state;

          var subs = self.SubscribeCache.get(userId);
          utils.forEach(subs, function (sub, index) {
            var subType = sub.type;

            if (utils.isEqual(type, subType)) {
              subs[index].state = state;
            }
          });
        }
      };

      self.setPC();

      im.on(CommonEvent.CONNECTED, function () {
        var DataCache = self.DataCache;

        var users = DataCache.get(DataCacheName.USERS);
        if (users) {
          self.compare();
        }
      });

      im.on(DownEvent.STREAM_PUBLISHED, function (error, user) {
        if (error) {
          throw error;
        }
        // 缓存 URIs 上报数据
        var stream = user.stream;

        im.emit(CommonEvent.SET_URIS, stream.uris);
        self.dispatchStreamEvent(user, function (key, uri) {
          self.DataCache.set(key, uri);
        });
      });

      im.on(CommonEvent.LEFT, function () {
        var StreamCache = self.StreamCache,
            pc = self.pc;

        var streamIds = StreamCache.getKeys();
        utils.forEach(streamIds, function (streamId) {
          var stream = StreamCache.get(streamId);
          var tracks = stream.getTracks();
          utils.forEach(tracks, function (track) {
            track.stop();
          });
        });
        self.clear();
        if (pc) {
          pc.close();
        }
      });

      im.on(CommonEvent.JOINED, function (error, room) {
        if (error) {
          throw error;
        }
        self.setPC();
        var users = room.users;

        self.usersHandler(users);
        Logger$1.log(LogTag.ROOM, {
          msg: 'join successfully',
          room: room
        });
      });

      im.on(DownEvent.ROOM_USER_LEFT, function (error, user) {
        if (error) {
          throw error;
        }
        var users = self.getUsersById(user);
        utils.forEach(users, function (user) {
          self.unsubscribe(user);
        });
      });

      im.on(DownEvent.STREAM_UNPUBLISHED, function (error, user) {
        if (error) {
          throw error;
        }
        self.dispatchStreamEvent(user, function (key) {
          self.DataCache.remove(key);
        });
        self.unsubscribe(user);
      });

      im.on(DownEvent.STREAM_DISABLED, function (error, user) {
        var pc = self.pc,
            StreamCache = self.StreamCache;

        var streamId = pc.getStreamId(user);
        var stream = StreamCache.get(streamId);
        self.SubscribeCache.setState(user.id, {
          type: StreamType.VIDEO,
          state: StreamState.DISBALE
        });
        if (!stream) return;
        var videoTracks = stream.getVideoTracks();
        utils.forEach(videoTracks, function (track) {
          track.enabled = false;
        });
      });

      im.on(DownEvent.STREAM_ENABLED, function (error, user) {
        var pc = self.pc,
            StreamCache = self.StreamCache;

        var streamId = pc.getStreamId(user);
        var stream = StreamCache.get(streamId);
        self.SubscribeCache.setState(user.id, {
          type: StreamType.VIDEO,
          state: StreamState.ENABLE
        });
        if (!stream) return;
        var videoTracks = stream.getVideoTracks();
        utils.forEach(videoTracks, function (track) {
          track.enabled = true;
        });
      });

      im.on(DownEvent.STREAM_MUTED, function (error, user) {
        self.SubscribeCache.setState(user.id, {
          type: StreamType.AUDIO,
          state: StreamState.DISABLE
        });
      });

      im.on(DownEvent.STREAM_UNMUTED, function (error, user) {
        self.SubscribeCache.setState(user.id, {
          type: StreamType.AUDIO,
          state: StreamState.ENABLE
        });
      });

      // im.on(DownEvent.STREAM_MUTED, (error, user) => {
      //   let { pc, StreamCache } = self;
      //   let streamId = pc.getStreamId(user);
      //   var stream = StreamCache.get(streamId);
      //   let audioTracks = stream.getAudioTracks();
      //   utils.forEach(audioTracks, (track) => {
      //     track.enabled = false;
      //   });
      // });
      // im.on(DownEvent.STREAM_UNMUTED, (error, user) => {
      //   let { pc, StreamCache } = self;
      //   let streamId = pc.getStreamId(user);
      //   var stream = StreamCache.get(streamId);
      //   let audioTracks = stream.getAudioTracks();
      //   utils.forEach(audioTracks, (track) => {
      //     track.enabled = true;
      //   });
      // });
    }

    createClass(DefaultStream, [{
      key: 'setPC',
      value: function setPC() {
        var self = this;
        // 如果已创建 peerconnection, 则不再处理
        if (self.pc && !self.pc.isClosed()) {
          return;
        }

        self.pc = new PeerConnection(self.option);
        self.im.emit(CommonEvent.PEERCONN_CREATED, self.pc);

        var pc = self.pc,
            im = self.im,
            network = self.network,
            StreamCache = self.StreamCache,
            SubscribeCache = self.SubscribeCache,
            SubPromiseCache = self.SubPromiseCache;


        var onStreamAdded = function onStreamAdded(stream) {
          var id = stream.id;

          StreamCache.set(id, stream);
          var user = self.getStreamUser(stream);
          var uris = SubscribeCache.get(user.id) || [];
          utils.forEach(uris, function (uri) {
            var state = uri.state,
                type = uri.type;

            var isVideo = utils.isEqual(StreamType.VIDEO, type);
            var isDisabled = utils.isEqual(state, StreamState.DISBALE);
            var isId = utils.isEqual(stream.id, uri.msid);
            if (isVideo && isDisabled && isId) {
              // if (isVideo && isDisabled) {
              var videoTracks = stream.getVideoTracks();
              utils.forEach(videoTracks, function (track) {
                track.enabled = false;
              });
            }
          });
          im.emit(CommonEvent.PUBLISHED_STREAM, {
            mediaStream: stream,
            user: user
          });
          var uid = self.getSubPromiseUId(user);
          var promise = SubPromiseCache.get(uid);
          if (utils.isUndefined(promise)) {
            return Logger$1.log(LogTag.STREAM, {
              msg: 'stream added-part',
              user: user,
              tracks: stream.getTracks()
            });
          }
          Logger$1.log(LogTag.STREAM, {
            msg: 'stream added',
            user: user,
            tracks: stream.getTracks()
          });
          promise.resolve(user);
        };

        pc.on(PeerConnectionEvent.ADDED, function (error, stream) {
          if (error) {
            throw error;
          }
          onStreamAdded(stream);
        });
        pc.on(PeerConnectionEvent.REMOVED, function (error, stream) {
          if (error) {
            throw error;
          }
          var id = stream.id;

          StreamCache.remove(id);
        });
        pc.on(PeerConnectionEvent.TRACK_RECEIVED, function (error, streams) {
          if (error) {
            throw error;
          }
          utils.isArray(streams) && utils.forEach(streams, onStreamAdded);
        });
        pc.on(PeerConnectionEvent.SIGNAL_STATE_CHANGE, function (error, streams) {
          // 当订阅对方音视频后, 取消订阅视频或音频, 再重新订阅时, ontrack、onaddstream 都不会触发. 因取消订阅不会移除 track, 只会使其失效
          // 所以在此增加监听, 避免上述情况 subscribe 无回调
          if (error) {
            throw error;
          }
          utils.isArray(streams) && utils.forEach(streams, onStreamAdded);
        });
        pc.on(PeerConnectionEvent.CHANGED, function () {
          if (pc.isNegotiate() && im.isJoined()) {
            network.detect(function (isOnline) {
              if (isOnline) {
                self.reconnect();
              } else {
                var Inner = ErrorType.Inner;

                im.emit(CommonEvent.ERROR, Inner.NETWORK_UNAVAILABLE);
              }
            });
          }
        });
      }

      /* 清空缓存数据 */

    }, {
      key: 'clear',
      value: function clear() {
        var self = this;
        self.DataCache.clear();
        self.SubPromiseCache.clear();
        self.PubResourceCache.clear();
        self.StreamCache.clear();
        self.SubscribeCache.clear();
        self.PublishStreamCache.clear();
      }
    }, {
      key: 'getUsersById',
      value: function getUsersById(user) {
        var SubscribeCache = this.SubscribeCache;
        var id = user.id;

        var subs = SubscribeCache.get(id);
        var streams = {},
            msTypes = {};
        utils.forEach(subs, function (_ref2) {
          var msid = _ref2.msid,
              tag = _ref2.tag,
              type = _ref2.type;

          streams[msid] = tag;
          var types = msTypes[msid] || [];
          types.push(type);
          msTypes[msid] = types;
        });
        var users = [];
        utils.forEach(streams, function (tag, msid) {
          var types = msTypes[msid] || [];
          var type = msTypes[0];
          type = utils.isEqual(types.length, 2) ? StreamType.AUDIO_AND_VIDEO : type;
          users.push({
            id: id,
            stream: {
              tag: tag,
              type: type
            }
          });
        });
        return users;
      }
    }, {
      key: 'getStreamUser',
      value: function getStreamUser(stream) {
        var im = this.im,
            pc = this.pc,
            DataCache = this.DataCache;
        var id = stream.id;

        var hasUnderline = im.v2Users.get(id);

        var type = StreamType.NODE,
            userId = void 0,
            tag = void 0;
        if (hasUnderline) {
          userId = id;
          tag = TAG_V2;
        } else {
          var _pc$getStreamSymbolBy = pc.getStreamSymbolById(id);

          var _pc$getStreamSymbolBy2 = slicedToArray(_pc$getStreamSymbolBy, 2);

          userId = _pc$getStreamSymbolBy2[0];
          tag = _pc$getStreamSymbolBy2[1];

          if (isV2Tag(tag)) {
            tag = TAG_V2;
          }
        }

        var videoTracks = stream.getVideoTracks();
        var audioTrakcks = stream.getAudioTracks();
        var isEmtpyVideo = utils.isEmpty(videoTracks);
        var isEmptyAudio = utils.isEmpty(audioTrakcks);
        var tpl = '{id}_{type}';
        var videoTrackId = utils.tplEngine(tpl, {
          id: id,
          type: StreamType.VIDEO
        });
        var audioTrackId = utils.tplEngine(tpl, {
          id: id,
          type: StreamType.AUDIO
        });

        var videoTrack = DataCache.get(videoTrackId);
        var audioTrack = DataCache.get(audioTrackId);
        isEmtpyVideo = isEmtpyVideo || utils.isEmpty(videoTrack);
        isEmptyAudio = isEmptyAudio || utils.isEmpty(audioTrack);

        if (isEmtpyVideo) {
          type = StreamType.AUDIO;
        }
        if (isEmptyAudio) {
          type = StreamType.VIDEO;
        }
        var enableVideo = true;
        var enableAudio = true;

        if (!isEmptyAudio && !isEmtpyVideo) {
          type = StreamType.AUDIO_AND_VIDEO;
          if (utils.isEqual(videoTrack.state, StreamState.DISBALE)) {
            enableVideo = false;
          } else if (utils.isEqual(audioTrack.state, StreamState.DISBALE)) {
            enableAudio = false;
          }
        }

        return {
          id: userId,
          stream: {
            tag: tag,
            type: type,
            mediaStream: stream,
            enable: {
              video: enableVideo,
              audio: enableAudio
            }
          }
        };
      }

      /* 获取缓存的 Promise 唯一标识, 可共用 */

    }, {
      key: 'getSubPromiseUId',
      value: function getSubPromiseUId(user) {
        var id = user.id,
            tag = user.stream.tag;

        var tpl = '{id}_{tag}'; // 不同 type, 都为一道流, 可只根据 tag、id 辨别
        return utils.tplEngine(tpl, {
          id: id,
          tag: tag
        });
      }

      /* 可共用 */

    }, {
      key: 'getUId',
      value: function getUId(user, tpl) {
        tpl = tpl || '{userId}_{tag}_{type}';
        var userId = user.id,
            _user$stream = user.stream,
            tag = _user$stream.tag,
            type = _user$stream.type;

        if (utils.isEmpty(tag)) {
          tpl = '{userId}_{type}';
        }
        return utils.tplEngine(tpl, {
          userId: userId,
          tag: tag,
          type: type
        });
      }

      /* 获取缓存的所有 subs */

    }, {
      key: 'getSubs',
      value: function getSubs() {
        var self = this;
        var SubscribeCache = self.SubscribeCache;

        var subs = [];
        var userIds = SubscribeCache.getKeys();
        utils.forEach(userIds, function (userId) {
          var streams = SubscribeCache.get(userId);
          utils.forEach(streams, function (stream) {
            subs.push(stream);
          });
        });
        return subs;
      }

      /* 获取请求 body 体 */

    }, {
      key: 'getBody',
      value: function getBody(desc) {
        var self = this;
        var pc = self.pc,
            PublishStreamCache = self.PublishStreamCache;

        var subs = self.getSubs();
        var streams = [];
        var streamIds = PublishStreamCache.getKeys();
        streams = utils.map(streamIds, function (id) {
          var mediaStream = PublishStreamCache.get(id);
          return {
            id: id, mediaStream: mediaStream
          };
        });
        var resolutionInfo = pc.getStreamRatio(streams);
        var ext = function (resolution) {
          var res = [];
          for (var key in resolution) {
            var item = { trackId: resolution[key][0].videoTrackId };
            delete item.videoTrackId;
            delete resolution[key][0].videoTrackId;

            utils.extend(item, resolution[key][0]);
            res.push(item);
          }
          return JSON.stringify({ resolutionInfo: res });
        }(resolutionInfo);
        var body = {
          subscribeList: subs,
          resolutionInfo: resolutionInfo,
          extend: ext
        };
        if (desc) {
          utils.extend(body, {
            sdp: desc
          });
          return utils.Defer.resolve(body);
        }
        return pc.getOffer().then(function (offer) {
          utils.extend(body, {
            sdp: offer
          });
          return body;
        });
      }

      /* 设置远端 anwser, 本地 offer */

    }, {
      key: 'negotiate',
      value: function negotiate(offer, response) {
        var pc = this.pc;

        pc.setOffer(offer);
        var sdp = response.sdp;

        pc.setAnwser(sdp);
      }
    }, {
      key: 'getDeviceSwitchState',
      value: function getDeviceSwitchState(tag, mediaType) {
        var deviceSwitchCache = currentUserDeviceSwitchCache.get();
        var state = StreamState.ENABLE;
        if (/RongCloudRTC/.test(tag)) {
          if (mediaType === StreamType.AUDIO) {
            state = deviceSwitchCache.audio;
          } else if (mediaType === StreamType.VIDEO) {
            state = deviceSwitchCache.video;
          }
        }
        return state;
      }
    }, {
      key: 'getUris',
      value: function getUris(publishList) {
        var _this = this;

        var pc = this.pc;

        return utils.map(publishList, function (stream) {
          var msid = stream.msid,
              mediaType = stream.mediaType;

          var tag = pc.getTagByStreamId(msid);
          utils.extend(stream, {
            tag: tag,
            state: _this.getDeviceSwitchState(tag, mediaType)
          });
          return stream;
        });
      }

      /* 获取流 track 的可用状态, 格式为: { video: false, audio: true }. 可共用 */

    }, {
      key: 'getTrackState',
      value: function getTrackState(streams) {
        if (!utils.isArray(streams)) {
          streams = [streams];
        }
        var result = {};
        utils.forEach(streams, function (_ref3) {
          var mediaStream = _ref3.mediaStream;
          var streamId = mediaStream.streamId;

          var videoTracks = mediaStream.getVideoTracks();
          var audioTracks = mediaStream.getAudioTracks();
          var func = function func(track) {
            return utils.isEqual(track.enabled, false);
          };
          var video = StreamState.ENABLE;
          if (utils.some(videoTracks, func)) {
            video = StreamState.DISBALE;
          }
          var audio = StreamState.ENABLE;
          if (utils.some(audioTracks, func)) {
            audio = StreamState.DISBALE;
          }
          result[streamId] = {
            video: video,
            audio: audio
          };
        });
        return result;
      }
    }, {
      key: 'dispatchStreamEvent',
      value: function dispatchStreamEvent$$1(user, callback) {
        var self = this;
        var id = user.id,
            uris = user.stream.uris;

        utils.forEach(uris, function (uri) {
          var tag = uri.tag,
              type = uri.mediaType;

          var key = self.getUId({ id: id, stream: { tag: tag, type: type } });
          callback(key, uri);
        });
      }
    }, {
      key: 'updateTrackState',
      value: function updateTrackState(user, sendUris, uris) {
        var self = this;
        var streams = user.stream;

        var states = self.getTrackState(streams);
        var update = function update(_uris) {
          utils.forEach(states, function (_ref4, streamId) {
            var audio = _ref4.audio,
                video = _ref4.video;

            utils.map(_uris, function (uri) {
              var isSameStream = utils.isEqual(uri.msid, streamId);
              if (isSameStream && utils.isEqual(uri.mediaType, StreamType.VIDEO)) {
                utils.extend(uri, {
                  state: video
                });
              }
              if (isSameStream && utils.isEqual(uri.mediaType, StreamType.AUDIO)) {
                utils.extend(uri, {
                  state: audio
                });
              }
              return uri;
            });
          });
        };
        update(sendUris);
        update(uris);
        return {
          sendUris: sendUris,
          uris: uris
        };
      }
    }, {
      key: 'appendStreamId',
      value: function appendStreamId(user) {
        var pc = this.pc;
        var id = user.id;
        var streams = user.stream;

        if (!utils.isArray(streams)) {
          streams = [streams];
        }
        utils.map(streams, function (stream) {
          var streamId = pc.getStreamId({
            id: id,
            stream: stream
          });
          var mediaStream = stream.mediaStream;

          utils.extend(mediaStream, {
            streamId: streamId
          });
        });
      }
    }, {
      key: 'usersHandler',
      value: function usersHandler(users) {
        var self = this;
        var DataCache = self.DataCache,
            im = self.im;

        DataCache.set(DataCacheName.USERS, users);

        var _im$getUser = im.getUser(),
            currentUserId = _im$getUser.id;

        utils.forEach(users, function (data, id) {
          var uris = data.uris;

          if (utils.isUndefined(uris)) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'user exist, uris is empty',
              user: {
                id: id
              }
            });
            return;
          }
          if (utils.isEqual(currentUserId, id)) {
            var _uris2 = slicedToArray(uris, 1),
                stream = _uris2[0];

            if (utils.isUndefined(stream)) {
              return;
            }
            var type = stream.mediaType,
                tag = stream.tag;

            type = utils.isEqual(uris.length, 1) ? type : StreamType.AUDIO_AND_VIDEO;
            var currentUser = {
              id: id,
              stream: {
                tag: tag,
                type: type
              }
            };
            return self.unpublish(currentUser); // 会议内已有自己, 先 unpublish
          }
          utils.forEach(uris, function (uri) {
            var type = uri.mediaType,
                tag = uri.tag;

            var key = self.getUId({
              id: id,
              stream: {
                type: type,
                tag: tag
              }
            });
            DataCache.set(key, uri);
          });
          var streams = utils.uniq(uris, function (target) {
            var tag = target.tag;

            var streamId = target.msid || target.streamId;
            if (isV2Tag(tag)) {
              tag = TAG_V2;
            }
            return {
              key: [streamId].join('_'),
              value: {
                tag: tag
              }
            };
          });
          utils.forEach(streams, function (stream) {
            var tag = stream.tag;

            var msUris = utils.filter(uris, function (_ref5) {
              var msid = _ref5.msid;

              return utils.isInclude(msid, tag);
            });
            setTimeout(function () {
              im.emit(DownEvent.STREAM_PUBLISHED, {
                id: id,
                stream: {
                  tag: tag,
                  uris: msUris
                }
              });
            });
          });
        });
      }
    }, {
      key: 'setOptionBitrate',
      value: function setOptionBitrate(max, min) {
        var bitrate = this.option.bitrate;

        bitrate.max += max;
        bitrate.min += min;
        bitrate.start = bitrate.max * 0.7;
        bitrate.max = bitrate.max > RongRTCVideoBitRate['RESOLUTION_176_132'].maxBitRate ? bitrate.max : RongRTCVideoBitRate['RESOLUTION_176_132'].maxBitRate;
        bitrate.min = bitrate.min > RongRTCVideoBitRate['RESOLUTION_176_132'].minBitRate ? bitrate.min : RongRTCVideoBitRate['RESOLUTION_176_132'].minBitRate;
        bitrate.start = bitrate.start > bitrate.max * 0.7 ? bitrate.start : bitrate.max * 0.7;
      }
    }, {
      key: 'setBitrate',
      value: function setBitrate(user, type) {
        var context = this;
        // let { option: { bitrate } } = context;
        var streams = user.stream;

        if (!utils.isArray(streams)) {
          streams = [streams];
        }
        utils.forEach(streams, function (stream) {
          var customBitrate = stream.bitrate;
          var mediaStream = stream.mediaStream;
          var streamInfo = {};
          var max = 0;
          var min = 0;

          if (!utils.isEmpty(mediaStream.getVideoTracks())) {
            streamInfo = mediaStream.getVideoTracks()[0].getConstraints();
          }
          var key = 'RESOLUTION_' + streamInfo.width + '_' + streamInfo.height;
          var resolution = RongRTCVideoBitRate[key];

          if (utils.isEmpty(resolution)) {
            resolution = RongRTCVideoBitRate['RESOLUTION_640_480'];
          }

          if (!utils.isEmpty(customBitrate)) {
            max = customBitrate.max || resolution.maxBitRate;
            min = customBitrate.min || resolution.minBitRate;
            context.setOptionBitrate(max, min);
            return;
          }

          if (!utils.isEmpty(resolution) && utils.isObject(resolution)) {
            var multiplier = Multiplier[streamInfo.frameRate] || 1;
            max = resolution.maxBitRate * multiplier * type;
            min = resolution.minBitRate * multiplier * type;
            context.setOptionBitrate(max, min);
          }
        });
      }
    }, {
      key: 'exchangeHandler',
      value: function exchangeHandler(result, user, type, offer) {
        var self = this;
        var pc = self.pc,
            im = self.im,
            PubResourceCache = self.PubResourceCache,
            User = self.User;
        var publishList = result.publishList,
            sdp = result.sdp;

        pc.setOffer(offer);
        // if(publishList.length){ //如果只发布一个视频资源，取消发布不修改 SDK
        pc.setAnwser(sdp);
        // }
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'exchangeHandler set sdp'
        });
        var uris = self.getUris(publishList);
        self.appendStreamId(user);
        var getTempUris = function getTempUris(type) {
          var userId = user.id;

          var cacheUris = PubResourceCache.get(userId) || [];
          var isPublish = utils.isEqual(type, Message.PUBLISH);
          if (isPublish) {
            cacheUris = uris;
          }
          var streamId = pc.getStreamId(user);
          var getCondition = function getCondition(stream) {
            var msid = stream.msid;

            return utils.isEqual(msid, streamId);
          };
          var tempUris = utils.filter(cacheUris, function (stream) {
            return getCondition(stream);
          });
          // 第一次 publish 过滤后 tempUris 为空，使用默认值
          return utils.isEmpty(tempUris) ? uris : tempUris;
        };
        var sendUris = getTempUris(type);
        self.updateTrackState(user, sendUris, uris);
        var content = {
          uris: sendUris
        };
        var message = im.getMessage(type, content);
        var isInner = true;
        User.set(User.SET_USERINFO, uris, isInner, message);
        return PubResourceCache.set(user.id, uris);
      }
    }, {
      key: 'compare',
      value: function compare() {
        var im = this.im,
            pc = this.pc,
            DataCache = this.DataCache;

        var format = function format(users) {
          var streams = {};
          utils.forEach(users, function (_ref6) {
            var uris = _ref6.uris;

            utils.forEach(uris, function (uri) {
              var msid = uri.msid;

              var resources = streams[msid] || [];
              resources.push(uri);
              streams[msid] = resources;
            });
          });
          return streams;
        };
        var dispatch = function dispatch(event, id, uris, callback) {
          dispatchStreamEvent({ id: id, uris: uris }, function (user) {
            if (utils.isFunction(callback)) {
              return callback(user);
            }
            im.emit(event, user);
          });
        };
        // 发布、取消发布、视频操作、音频操作
        var compareStreams = function compareStreams(localUsers, remoteUsers) {
          localUsers = format(localUsers);
          remoteUsers = format(remoteUsers);
          var tempLocalUsers = utils.clone(localUsers);
          utils.forEach(remoteUsers, function (remoteUris, remoteMSId) {
            /** 
             * 包含本地资源说明流没有变化，删除 tempLocalUsers，且需比对 track 变化，state 有差异，以 remoteUsers 为准
             * 未包含说明是新发布资源，触发 published 事件 
             * 遍历后 tempLocalUsers 还有数据认为是取消发布
             */
            var isInclude = remoteMSId in localUsers;

            var _pc$getStreamSymbolBy3 = pc.getStreamSymbolById(remoteMSId),
                _pc$getStreamSymbolBy4 = slicedToArray(_pc$getStreamSymbolBy3, 1),
                userId = _pc$getStreamSymbolBy4[0];

            var _im$getUser2 = im.getUser(),
                currentUserId = _im$getUser2.id;

            var isCurrent = utils.isEqual(currentUserId, userId);
            if (isInclude) {
              delete tempLocalUsers[remoteMSId];
              var tempRemote = utils.toJSON(remoteUris);
              var localUris = localUsers[remoteMSId];
              var tempLocal = utils.toJSON(localUris);
              if (!utils.isEqual(tempRemote, tempLocal)) {
                dispatch('', userId, remoteUris, function (user) {
                  dispatchOperationEvent(user, function (event, user) {
                    im.emit(event, user);
                  });
                });
              }
            } else {
              if (!isCurrent) {
                dispatch(DownEvent.STREAM_PUBLISHED, userId, remoteUris);
              }
            }
          });
          utils.forEach(tempLocalUsers, function (localUris, localMSId) {
            var _pc$getStreamSymbolBy5 = pc.getStreamSymbolById(localMSId),
                _pc$getStreamSymbolBy6 = slicedToArray(_pc$getStreamSymbolBy5, 1),
                userId = _pc$getStreamSymbolBy6[0];

            dispatch(DownEvent.STREAM_UNPUBLISHED, userId, localUris);
          });
        };
        // 成员加入、退出
        var compareUser = function compareUser(localUsers, remoteUsers) {
          var tempLocalUsers = utils.clone(localUsers);
          var tempRemoteUsers = utils.toArray(remoteUsers);

          var _im$getUser3 = im.getUser(),
              currentUserId = _im$getUser3.id;

          utils.forEach(tempRemoteUsers, function (_ref7) {
            var _ref8 = slicedToArray(_ref7, 1),
                remoteUserId = _ref8[0];

            var isInclude = remoteUserId in localUsers;
            var isCurrent = utils.isEqual(currentUserId, remoteUserId);
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'stream:compareuser',
              currentUserId: currentUserId,
              remoteUserId: remoteUserId,
              isInclude: isInclude,
              localUsers: localUsers
            });
            if (isInclude) {
              delete tempLocalUsers[remoteUserId];
            } else {
              if (!isCurrent) {
                im.emit(DownEvent.ROOM_USER_JOINED, { id: remoteUserId });
              }
            }
          });
          tempLocalUsers = utils.toArray(tempLocalUsers);
          utils.forEach(tempLocalUsers, function (_ref9) {
            var _ref10 = slicedToArray(_ref9, 1),
                id = _ref10[0];

            im.emit(DownEvent.ROOM_USER_LEFT, { id: id });
          });
        };
        im.getUsers().then(function (remoteUsers) {
          utils.forEach(remoteUsers, function (user) {
            var uris = user.uris;

            uris = utils.parse(uris);
            utils.extend(user, {
              uris: uris
            });
          });
          var localUsers = DataCache.get(DataCacheName.USERS);
          compareUser(localUsers, remoteUsers);
          compareStreams(localUsers, remoteUsers);
          DataCache.set(DataCacheName.USERS, remoteUsers);
        });
      }
    }, {
      key: 'reconnect',
      value: function reconnect() {
        var self = this;
        var im = self.im,
            option = self.option;

        var roomId = im.getRoomId();
        self.getBody().then(function (body) {
          var url = utils.tplEngine(Path.SUBSCRIBE, {
            roomId: roomId
          });
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'publish:reconnect:request',
            roomId: roomId,
            body: body
          });
          var headers = getHeaders(im, option);
          var offer = body.sdp;

          return request$1.post({
            path: url,
            body: body,
            headers: headers
          }).then(function (response) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'publish:reconnect:response',
              roomId: roomId,
              response: response
            });
            self.negotiate(offer, response);
          }, function (error) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'publish:reconnect:response',
              roomId: roomId,
              error: error
            });
            return error;
          });
        });
      }
    }, {
      key: 'isTrackExist',
      value: function isTrackExist(user, types) {
        var self = this;
        var DataCache = self.DataCache;
        var userId = user.id,
            tag = user.stream.tag;

        var isError = false;
        utils.forEach(types, function (type) {
          var tUser = {
            id: userId,
            stream: {
              tag: tag,
              type: type
            }
          };
          var key = self.getUId(tUser);

          var _ref11 = DataCache.get(key) || {},
              uri = _ref11.uri;

          if (utils.isUndefined(uri)) {
            isError = true;
          }
        });
        return isError;
      }
    }, {
      key: 'publish',
      value: function publish(user) {
        var self = this;
        var pc = self.pc,
            im = self.im,
            PublishStreamCache = self.PublishStreamCache,
            StreamCache = self.StreamCache,
            option = self.option;
        var streams = user.stream;

        if (!utils.isArray(streams)) {
          streams = [streams];
        }
        var id = user.id;

        utils.forEach(streams, function (stream) {
          var mediaStream = stream.mediaStream,
              size = stream.size;

          var streamId = pc.getStreamId({
            id: id,
            stream: stream
          }, size);
          StreamCache.set(streamId, mediaStream);
          PublishStreamCache.set(streamId, mediaStream);
          if (!utils.isUndefined(mediaStream)) {
            im.emit(CommonEvent.PUBLISHED_STREAM, {
              mediaStream: mediaStream,
              user: user
            });
          }
        });
        var trackIds = getTrackIds(user);
        im.emit(CommonEvent.SEND_REPORT, {
          type: STAT_NAME.R2,
          name: UpEvent.STREAM_PUBLISH,
          content: {
            trackIds: trackIds
          }
        });
        pc.addStream(user);
        var roomId = im.getRoomId();
        return utils.deferred(function (resolve, reject) {
          pc.createOffer(user).then(function (desc) {
            return self.getBody(desc).then(function (body) {
              var url = utils.tplEngine(Path.PUBLISH, {
                roomId: roomId
              });
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'publish:request',
                roomId: roomId,
                user: user,
                body: body
              });
              var headers = getHeaders(im, option);
              IMLogger.info(RTCLogTag.L_MSE_T, { url: url, roomId: roomId, body: body });
              return request$1.post({
                path: url,
                body: body,
                headers: headers
              }).then(function (response) {
                var publishList = response.publishList,
                    urls = response.urls,
                    clusterId = response.clusterId;

                self.setBitrate(user, 1);
                var result = {};
                urls = urls || {};
                if (utils.isArray(publishList)) {
                  im.emit(CommonEvent.SET_URIS, publishList);
                }
                Logger$1.log(LogTag.STREAM_HANDLER, {
                  msg: 'publish:response',
                  roomId: roomId,
                  user: user,
                  response: response
                });
                IMLogger.info(RTCLogTag.L_MSE_R, { roomId: roomId, response: response });
                self.exchangeHandler(response, user, Message.PUBLISH, desc);
                result = utils.extend(result, urls);
                clusterId && request$1.addClusterIdUrl(clusterId);

                urls.configUrl && request$1.setOption({
                  mcuUrls: [getMCUConfigUrl(urls.configUrl)] // 目前 server 要求加入 8080
                });
                resolve(result);
              }, function (error) {
                Logger$1.log(LogTag.STREAM_HANDLER, {
                  msg: 'publish:response:error',
                  roomId: roomId,
                  user: user,
                  error: error
                });
                IMLogger.error(RTCLogTag.L_MSE_E, { roomId: roomId, error: error });
                reject(error);
              });
            });
          });
        });
      }
    }, {
      key: 'unpublish',
      value: function unpublish(user) {
        var self = this;
        var im = self.im,
            pc = self.pc,
            option = self.option,
            StreamCache = self.StreamCache,
            PublishStreamCache = self.PublishStreamCache;


        user = utils.clone(user);
        var streamId = pc.getStreamId(user);
        var mediaStream = StreamCache.get(streamId);
        if (!mediaStream) {
          mediaStream = new MediaStream();
        }
        var streams = [];
        var _user = user,
            stream = _user.stream;

        var tinyStream = utils.clone(stream);
        var _user2 = user,
            id = _user2.id;

        stream = utils.extend(stream, {
          mediaStream: mediaStream
        });
        streams.push(stream);

        var tinyStreamId = pc.getStreamId({
          id: id,
          stream: tinyStream
        }, StreamSize.MIN);
        var tinyMeidaStream = StreamCache.get(tinyStreamId);
        if (tinyMeidaStream) {
          tinyStream = utils.extend(tinyStream, {
            mediaStream: tinyMeidaStream
          });
          streams.push(tinyStream);
        }
        utils.extend(user, {
          stream: streams
        });
        var roomId = im.getRoomId();
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unpublish:start',
          roomId: roomId,
          user: user
        });
        utils.forEach(streams, function (_ref12) {
          var mediaStream = _ref12.mediaStream;

          var tracks = mediaStream.getTracks();
          utils.forEach(tracks, function (track) {
            track.stop();
          });
          var streamId = mediaStream.id;

          PublishStreamCache.remove(streamId);
        });
        StreamCache.remove(streamId);
        var trackIds = getTrackIds(user);
        im.emit(CommonEvent.SEND_REPORT, {
          type: STAT_NAME.R2,
          name: UpEvent.STREAM_UNPUBLISH,
          content: {
            trackIds: trackIds
          }
        });
        return pc.removeStream(user).then(function (desc) {
          return self.getBody().then(function (body) {
            var url = utils.tplEngine(Path.UNPUBLISH, {
              roomId: roomId
            });
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'unpublish:request',
              roomId: roomId,
              user: user,
              body: body
            });
            var headers = getHeaders(im, option);
            IMLogger.info(RTCLogTag.L_MSE_T, { url: url, roomId: roomId, body: body });
            return request$1.post({
              path: url,
              body: body,
              headers: headers
            }).then(function (response) {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'unpublish:response',
                roomId: roomId,
                user: user,
                response: response
              });
              IMLogger.info(RTCLogTag.L_MSE_R, { roomId: roomId, response: response });
              // if(response.publishList.length){//如果只发布一个视频资源，取消发布不修改 SDK
              self.setBitrate(user, -1);
              // }
              self.exchangeHandler(response, user, Message.UNPUBLISH, desc);
            }, function (error) {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'unpublish:response',
                roomId: roomId,
                user: user,
                error: error
              });
              IMLogger.error(RTCLogTag.L_MSE_E, { roomId: roomId, error: error });
            });
          });
        });
      }
    }, {
      key: 'publishDefault',
      value: function publishDefault(constraints) {
        var self = this;
        return getMS(constraints).then(function (_ref13) {
          var mediaStream = _ref13.mediaStream;

          var user = {
            id: constraints.userId,
            stream: {
              tag: 'RongCloudRTC',
              type: constraints.type,
              mediaStream: mediaStream
            }
          };
          return self.publish(user).then(function () {
            return utils.Defer.resolve({ mediaStream: mediaStream });
          });
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'publishDefault:error',
            constraints: constraints,
            error: error
          });
          return utils.Defer.reject(error);
        });
      }
    }, {
      key: 'subscribe',
      value: function subscribe(user, callback) {
        var self = this;
        var pc = self.pc,
            im = self.im,
            option = self.option,
            SubscribeCache = self.SubscribeCache,
            SubPromiseCache = self.SubPromiseCache,
            DataCache = self.DataCache;
        var userId = user.id,
            _user$stream2 = user.stream,
            tag = _user$stream2.tag,
            type = _user$stream2.type;

        var subs = SubscribeCache.get(userId) || [];
        var types = [StreamType.VIDEO, StreamType.AUDIO];
        if (!utils.isEqual(type, StreamType.AUDIO_AND_VIDEO)) {
          types = [type];
        }
        if (self.isTrackExist(user, types)) {
          var Inner = ErrorType.Inner;

          return utils.Defer.reject(Inner.STREAM_TRACK_NOT_EXIST);
        }
        // let isTypeEnabled = (type) => {
        //   return types.indexOf(type) !== -1;
        // };
        utils.forEach(types, function (type) {
          var tUser = {
            id: userId,
            stream: {
              tag: tag,
              type: type
            }
          };
          var key = self.getUId(tUser);
          var uri = DataCache.get(key);
          var isAdd = true;
          utils.forEach(subs, function (sub) {
            var existType = sub.type,
                existTag = sub.tag;

            if (isV2Tag(existTag)) {
              tag = TAG_V2;
            }
            var isExist = utils.isEqual(type, existType) && utils.isEqual(tag, existTag);
            if (isExist) {
              isAdd = false;
            }
          });
          if (isAdd && !utils.isUndefined(uri)) {
            uri = utils.clone(uri);
            uri = utils.rename(uri, {
              mediaType: 'type'
            });
            // uri.state = isTypeEnabled(uri.type) ? TRACK_STATE.ENABLE : TRACK_STATE.DISABLE;
            if (uri.type == StreamType.VIDEO) {
              uri.simulcast = StreamSize.MIN;
            }
            uri.state = StreamState.ENABLE;
            subs.push(uri);
          }
        });

        var roomId = im.getRoomId();

        var url = utils.tplEngine(Path.SUBSCRIBE, {
          roomId: roomId
        });
        var isOnlySubscribe = false;
        if (SubscribeCache.getKeys().length > 0 || self.PublishStreamCache.getKeys().length > 0) {
          url = utils.tplEngine(Path.ONLY_SUBSCRIBE, {
            roomId: roomId
          });
          isOnlySubscribe = true;
        }

        SubscribeCache.set(userId, subs);

        var trackIds = getTrackIds(user);
        im.emit(CommonEvent.SEND_REPORT, {
          type: STAT_NAME.R2,
          name: UpEvent.STREAM_SUBSCRIBE,
          content: {
            trackIds: trackIds
          }
        });
        return utils.deferred(function (resolve, reject) {
          var uid = self.getSubPromiseUId(user);
          SubPromiseCache.set(uid, {
            resolve: resolve,
            reject: reject,
            type: type
          });
          self.getBody().then(function (body) {
            var offer = body.sdp;
            // let url = utils.tplEngine(Path.SUBSCRIBE, {
            //   roomId
            // });

            var headers = getHeaders(im, option);
            var reqOption = {
              path: url,
              body: body,
              headers: headers
            };
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'subscribe:request',
              roomId: roomId,
              reqOption: reqOption
            });
            IMLogger.info(RTCLogTag.L_MSS_T, { url: url, roomId: roomId, reqOption: reqOption });
            request$1.post(reqOption).then(function (response) {
              // pc.setOffer(offer);
              var answer = response.sdp,
                  clusterId = response.clusterId;

              clusterId && request$1.addClusterIdUrl(clusterId);
              if (!isOnlySubscribe) {
                pc.setOffer(offer);
                pc.setAnwser(answer).then(callback).catch(callback); // Promise finally Chrome 63+ 才支持
              } else {
                pc.setRemoteAnwser(answer).then(callback).catch(callback); // Promise finally Chrome 63+ 才支持
              }
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'subscribe:response:stream:not:arrive',
                roomId: roomId,
                user: user,
                response: response
              });
              IMLogger.info(RTCLogTag.L_MSS_R, { roomId: roomId, response: response });
            }, function (error) {
              Logger$1.log(LogTag.STREAM_HANDLER, {
                msg: 'subscribe:response:error',
                roomId: roomId,
                user: user,
                error: error
              });
              IMLogger.error(RTCLogTag.L_MSS_E, { roomId: roomId, error: error });
              var uid = self.getSubPromiseUId(user);
              var promise = SubPromiseCache.get(uid);
              if (!utils.isUndefined(promise)) {
                promise.reject(error);
              }
            });
          });
        });
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(user) {
        var self = this;
        var pc = self.pc,
            im = self.im,
            option = self.option,
            SubscribeCache = self.SubscribeCache;


        if (utils.isNull(pc) || !SubscribeCache.get(user.id)) {
          return utils.Defer.resolve();
        }
        SubscribeCache.remove(user);
        var roomId = im.getRoomId();
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'unsubscribe:start',
          roomId: roomId,
          user: user
        });
        var trackIds = getTrackIds(user);
        im.emit(CommonEvent.SEND_REPORT, {
          type: STAT_NAME.R2,
          name: UpEvent.STREAM_UNSUBSCRIBE,
          content: {
            trackIds: trackIds
          }
        });

        return self.getBody().then(function (body) {
          var url = utils.tplEngine(Path.UNSUBSCRIBE, {
            roomId: roomId
          });
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'unsubscribe:request',
            roomId: roomId,
            user: user,
            body: body
          });
          IMLogger.info(RTCLogTag.L_MSS_T, { url: url, roomId: roomId, body: body });
          var headers = getHeaders(im, option);
          // let { sdp: offer } = body;
          return request$1.post({
            path: url,
            body: body,
            headers: headers
          }).then(function (response) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'unsubscribe:response',
              roomId: roomId,
              user: user,
              response: response
            });
            IMLogger.info(RTCLogTag.L_MSS_R, { roomId: roomId, response: response });
            // self.negotiate(offer, response);

            var answer = response.sdp;

            return pc.setRemoteAnwser(answer);
          }, function (error) {
            Logger$1.error(LogTag.STREAM_HANDLER, {
              msg: 'unsubscribe:response:error',
              roomId: roomId,
              user: user,
              error: error
            });
            IMLogger.error(RTCLogTag.L_MSS_E, { roomId: roomId, error: error });
          }).catch(function (error) {
            Logger$1.error(LogTag.STREAM_HANDLER, {
              msg: 'unsubscribe:response:error',
              roomId: roomId,
              user: user,
              error: error
            });
          });
        });
      }
    }, {
      key: 'resize',
      value: function resize(user) {
        var self = this;
        var im = self.im,
            pc = self.pc,
            option = self.option,
            SubscribeCache = self.SubscribeCache;
        var size = user.stream.size,
            id = user.id;

        var streams = SubscribeCache.get(id);
        if (utils.isUndefined(streams)) {
          return utils.Defer.reject(ErrorType.Inner.STREAM_NOT_EXIST);
        }
        var roomId = im.getRoomId();
        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'resize:start',
          roomId: roomId,
          user: user
        });
        return self.getBody().then(function (body) {
          var streamId = pc.getStreamId(user);
          var stream = utils.filter(streams, function (stream) {
            var msid = stream.msid;

            return utils.isEqual(streamId, msid);
          })[0];
          if (!stream) {
            var error = ErrorType.Inner.STREAM_NOT_EXIST;
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'resize:response',
              roomId: roomId,
              user: user,
              error: error
            });
            return utils.Defer.reject(error);
          }
          var msid = stream.msid;

          utils.forEach(body.subscribeList, function (stream) {
            if (utils.isEqual(stream.msid, msid)) {
              utils.extend(stream, {
                simulcast: size
              });
            }
          });
          var url = utils.tplEngine(Path.RESIZE, {
            roomId: roomId
          });
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'resize:request',
            roomId: roomId,
            user: user,
            body: body
          });
          var headers = getHeaders(im, option);
          return request$1.post({
            path: url,
            body: body,
            headers: headers
          }).then(function (response) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'resize:response',
              roomId: roomId,
              user: user,
              response: response
            });
          }, function (error) {
            Logger$1.log(LogTag.STREAM_HANDLER, {
              msg: 'resize:response',
              roomId: roomId,
              user: user,
              error: error
            });
          });
        });
      }
    }, {
      key: 'get',
      value: function get$$1(constraints) {
        constraints = constraints || {};
        var _constraints3 = constraints,
            screen = _constraints3.screen;

        return screen ? getScreen(constraints) : getMS(constraints);
      }

      /**
       * 设置混流
       * @param {Object} config 混流配置
       * @param {Array} publishUrls 直接推流地址配置
       */

    }, {
      key: 'setMixConfig',
      value: function setMixConfig(config, publishUrls) {
        var im = this.im,
            option = this.option;

        var domains = request$1.getOption().mcuUrls || [];
        if (utils.isEmpty(domains)) {
          return utils.Defer.reject(ErrorType.Inner.MUST_PUBLISHED_BEFORE_SETMIXCONFIG);
        }

        var url = Path.LIVE_CONFIG;
        var sessionId = im.getSessionId();
        var headers = getHeaders(im, option, {
          SessionId: sessionId
        });
        headers['AppKey'] = headers['App-Key'];
        delete headers['App-Key'];

        var body = formatLiveConfig(config, publishUrls);

        Logger$1.log(LogTag.STREAM_HANDLER, {
          msg: 'setMixConfig:request',
          headers: headers,
          body: body
        });
        IMLogger.info(RTCLogTag.A_SMC_T, { url: url, body: body });
        return request$1.post({
          urls: domains,
          path: url,
          body: body,
          headers: headers
        }).then(function (response) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'setMixConfig:response',
            headers: headers,
            body: body,
            response: response
          });
          IMLogger.info(RTCLogTag.A_SMC_R, { response: response });
          return response;
        }, function (error) {
          Logger$1.log(LogTag.STREAM_HANDLER, {
            msg: 'setMixConfig:error',
            headers: headers,
            body: body,
            error: error
          });
          IMLogger.error(RTCLogTag.A_SMC_E, { error: error });
          return error;
        });
      }
    }, {
      key: 'trackHandler',
      value: function trackHandler(user, type, isEnable) {
        var self = this;
        var streamConfig = user.stream;

        streamConfig = streamConfig || {};
        var pc = self.pc,
            im = self.im,
            StreamCache = self.StreamCache;

        var streamId = pc.getStreamId(user, streamConfig.size);
        var stream = StreamCache.get(streamId);
        if (stream) {
          var isAudio = utils.isEqual(type, StreamType.AUDIO);
          type = isAudio ? 'Audio' : 'Video';
          var tpl = 'get{type}Tracks';
          type = utils.tplEngine(tpl, {
            type: type
          });
          var tracks = stream[type]();
          utils.forEach(tracks, function (track) {
            im.emit(CommonEvent.TRACK_MODIFY, {
              id: track.id,
              isEnable: isEnable
            });
            track.enabled = isEnable;
          });
        }
      }
    }, {
      key: 'getFitUris',
      value: function getFitUris(user, type, state) {
        var self = this;
        var PubResourceCache = self.PubResourceCache,
            pc = self.pc;
        var id = user.id;

        var uris = PubResourceCache.get(id) || [];
        var targetId = pc.getStreamId(user);
        uris = utils.filter(uris, function (stream) {
          var msid = stream.msid,
              mediaType = stream.mediaType;

          var isSameStream = utils.isEqual(targetId, msid),
              isSameType = utils.isEqual(mediaType, type);
          var isFit = isSameStream && isSameType;
          // state 默认为 StreamState.ENABLE，为 DISABLE 未发布资源
          if (isFit) {
            utils.extend(stream, {
              state: state
            });
          }
          return isFit;
        });
        return uris;
      }
    }, {
      key: 'saveModify',
      value: function saveModify(user, type, state) {
        var self = this;
        var im = self.im,
            PubResourceCache = self.PubResourceCache,
            User = self.User;

        var uris = self.getFitUris(user, type, state);
        // uris 为空表示没有发布资源，不需要修改
        if (!utils.isEmpty(uris)) {
          var id = user.id;

          var fullUris = PubResourceCache.get(id);
          var content = {
            uris: uris
          };
          var message = im.getMessage(Message.MODIFY, content);
          var isInner = true;
          User.set(User.SET_USERINFO, fullUris, isInner, message);
        }
        return utils.Defer.resolve();
      }
    }, {
      key: 'isCurrentUser',
      value: function isCurrentUser(user) {
        var im = this.im;

        var _im$getUser4 = im.getUser(),
            id = _im$getUser4.id;

        return utils.isEqual(user.id, id);
      }
    }, {
      key: 'modifyTrack',
      value: function modifyTrack(user, type, state, isEnabled) {
        var self = this;
        self.trackHandler(user, type, isEnabled);
        if (self.isCurrentUser(user)) {
          //缓存自己设备操作配置
          currentUserDeviceSwitchCache.set(type, state);
          self.saveModify(user, type, state);
        }
        return utils.Defer.resolve();
      }
    }, {
      key: 'mute',
      value: function mute(user) {
        var isEnabled = false;
        return this.modifyTrack(user, StreamType.AUDIO, StreamState.DISBALE, isEnabled);
      }
    }, {
      key: 'unmute',
      value: function unmute(user) {
        var isEnabled = true;
        return this.modifyTrack(user, StreamType.AUDIO, StreamState.ENABLE, isEnabled);
      }
    }, {
      key: 'enable',
      value: function enable(user) {
        var isEnabled = true;
        return this.modifyTrack(user, StreamType.VIDEO, StreamState.ENABLE, isEnabled);
      }
    }, {
      key: 'disable',
      value: function disable(user) {
        var isEnabled = false;
        return this.modifyTrack(user, StreamType.VIDEO, StreamState.DISBALE, isEnabled);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var self = this;
        var pc = self.pc,
            im = self.im;

        self.clear();
        if (pc) {
          pc.close();
          im.emit(CommonEvent.PEERCONN_DESTROYED);
        }
      }
    }]);
    return DefaultStream;
  }();

  function StreamHandler(im, option, rongRTC) {

    var prosumer = new utils.Prosumer();
    var eventEmitter = new EventEmitter();

    var stream = void 0;

    /**
     * 区分直播还是普通音视频
     * 注意: 直播的主播端所有流程与普通音视频相同, 依然走 DefaultStream
     */
    var reloadStream = function reloadStream() {
      if (stream) {
        stream.destroy();
      }

      if (isLiveAudience(rongRTC)) {
        // 直播模式的非主播角色使用的 Stream
        stream = new LiveStream(im, option);
      } else {
        stream = new DefaultStream(im, option);
      }
    };

    reloadStream();

    im.on(CommonEvent.CHANGE_ROLE, function (error, roles) {
      var newRole = roles.newRole,
          oldRole = roles.oldRole;
      // 当由观众转化为主播时

      if (isAudienceToAnchor(newRole, oldRole)) {
        reloadStream();
      }
    });

    im.on(CommonEvent.ERROR, function () {
      // 监听到 rtc 不可用时, 销毁 stream、peerconnection
      stream && stream.destroy();
    });

    eventEmitter.on(CommonEvent.CONSUME, function () {
      prosumer.consume(function (_ref, next) {
        var _stream, _stream2, _stream3, _stream4, _stream5, _stream6, _stream7, _stream8, _stream9, _stream10, _stream11, _stream12;

        var event = _ref.event,
            args = _ref.args,
            resolve = _ref.resolve,
            reject = _ref.reject;

        switch (event) {
          case UpEvent.STREAM_PUBLISH:
            return (_stream = stream).publish.apply(_stream, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_PUBLISH_DEFAULT:
            return (_stream2 = stream).publishDefault.apply(_stream2, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UNPUBLISH:
            return (_stream3 = stream).unpublish.apply(_stream3, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_SUBSCRIBE:
            // 此处使用 callback 返回是因为, http 请求成功后即可返回. 若等到 promise 执行(onaddstream), 可能会延迟较大
            return (_stream4 = stream).subscribe.apply(_stream4, toConsumableArray(args).concat([function () {
              next();
            }])).then(function (result) {
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_UNSUBSCRIBE:
            return (_stream5 = stream).unsubscribe.apply(_stream5, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_RESIZE:
            return (_stream6 = stream).resize.apply(_stream6, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.STREAM_GET:
            return (_stream7 = stream).get.apply(_stream7, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.AUDIO_MUTE:
            return (_stream8 = stream).mute.apply(_stream8, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.AUDIO_UNMUTE:
            return (_stream9 = stream).unmute.apply(_stream9, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.VIDEO_DISABLE:
            return (_stream10 = stream).disable.apply(_stream10, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.VIDEO_ENABLE:
            return (_stream11 = stream).enable.apply(_stream11, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          case UpEvent.LIVE_CONFIG:
            return (_stream12 = stream).setMixConfig.apply(_stream12, toConsumableArray(args)).then(function (result) {
              next();
              resolve(result);
            }).catch(function (error) {
              next();
              reject(error);
            });
          default:
            Logger$1.warn(LogTag.STREAM_HANDLER, {
              event: event,
              msg: 'unkown event'
            });
        }
      });
    });

    var dispatch = function dispatch(event, args) {
      return utils.deferred(function (resolve, reject) {
        prosumer.produce({ event: event, args: args, resolve: resolve, reject: reject });
        eventEmitter.emit(CommonEvent.CONSUME);
      });
    };
    return {
      dispatch: dispatch
    };
  }

  function RoomHandler(im, option) {
    var join = function join(room) {
      Logger$1.log(LogTag.ROOM_HANDLER, {
        msg: 'join:before',
        room: room
      });
      IMLogger.info(RTCLogTag.L_JR_T, {
        roomId: room.id,
        userId: room.user.id
      });
      var Inner = ErrorType.Inner;

      if (im.isJoined()) {
        Logger$1.log(LogTag.ROOM_HANDLER, {
          msg: 'join:after',
          extra: 'repeate join room'
        });
        IMLogger.warn(RTCLogTag.L_JR_E, {
          desc: 'repeate join room',
          roomId: room.id,
          userId: room.user.id
        });
        return utils.Defer.reject(Inner.ROOM_REPEAT_JOIN);
      }
      if (!im.isIMReady()) {
        Logger$1.log(LogTag.ROOM_HANDLER, {
          msg: 'im:connected',
          extra: 'IM not connected'
        });
        IMLogger.warn(RTCLogTag.L_JR_E, {
          desc: 'IM not connected',
          roomId: room.id,
          userId: room.user.id
        });
        return utils.Defer.reject(Inner.IM_NOT_CONNECTED);
      }
      return utils.deferred(function (resolve, reject) {
        var mode = option.mode,
            liveType = option.liveType;

        utils.extend(room, {
          mode: mode,
          broadcastType: liveType
        });
        im.joinRoom(room).then(function (users) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'join:after',
            users: users
          });
          users = utils.toArray(users);
          users = utils.map(users, function (user) {
            var _user = slicedToArray(user, 2),
                id = _user[0],
                data = _user[1];

            var state = {};
            var arr = data && data.uris ? data.uris : [];
            arr.forEach(function (item) {
              var mediaType = item.mediaType,
                  tag = item.tag,
                  deviceState = item.state;
              // 普通音视频流

              if (/RongCloudRTC/.test(tag)) {
                if (mediaType === StreamType.AUDIO) {
                  state.audio = !!deviceState;
                } else if (mediaType === StreamType.VIDEO) {
                  state.video = !!deviceState;
                }
              }
            });
            return {
              id: id,
              state: state
            };
          });
          im.emit(CommonEvent.SEND_REPORT, {
            type: STAT_NAME.R1,
            name: UpEvent.ROOM_JOIN,
            content: {}
          });
          IMLogger.info(RTCLogTag.L_JR_R, { remoteUids: users });
          resolve({
            users: users
          });
        }).catch(function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'join:after:error',
            room: room,
            error: error
          });
          IMLogger.error(RTCLogTag.L_JR_E, {
            code: error,
            desc: 'join:after:error',
            roomId: room.id,
            userId: room.user.id
          });
          reject(error);
        });
      });
    };
    var leave = function leave() {
      var roomId = im.getRoomId();
      var user = im.getUser();
      Logger$1.log(LogTag.ROOM_HANDLER, {
        msg: 'leave:before',
        roomId: roomId,
        user: user
      });

      var token = im.getRTCToken();
      var url = utils.tplEngine(Path.EXIT, {
        roomId: roomId
      });
      var headers = getHeaders(im, option);
      utils.extend(im, {
        isJoinRoom: false
      });
      var leaveRoom = function leaveRoom(resolve, reject) {
        IMLogger.info(RTCLogTag.L_LR_T, {
          roomId: roomId,
          uid: user.id
        });
        im.leaveRoom().then(function () {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'leave:after',
            roomId: roomId,
            user: user
          });
          IMLogger.info(RTCLogTag.L_LR_R, {
            roomId: roomId,
            uid: user.id
          });
          resolve();
        }, function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'leave:im:error',
            roomId: roomId,
            error: error,
            user: user
          });
          IMLogger.warn(RTCLogTag.L_LR_E, {
            msg: 'leave:im:error',
            roomId: roomId,
            error: error,
            uid: user.id
          });
          reject(error);
        });
      };
      return utils.deferred(function (resolve, reject) {
        IMLogger.info(RTCLogTag.L_MSLR_T, {
          roomId: roomId,
          mediaUrl: url
        });
        request$1.post({
          path: url,
          headers: headers,
          body: {
            token: token
          }
        }).then(function () {
          IMLogger.warn(RTCLogTag.L_MSLR_R, { roomId: roomId });
          leaveRoom(resolve, reject);
        }, function (error) {
          Logger$1.log(LogTag.ROOM_HANDLER, {
            msg: 'leave:ms:error',
            roomId: roomId,
            error: error,
            user: user
          });
          IMLogger.warn(RTCLogTag.L_MSLR_E, {
            msg: 'leave:ms:error',
            roomId: roomId,
            error: error,
            uid: user.id
          });
          leaveRoom(resolve, reject);
        });
      });
    };
    var get$$1 = function get$$1() {
      return im.getRoom();
    };
    var getSessionId = function getSessionId() {
      // let sessionId = im.getSessionId();
      // return utils.Defer.resolve(sessionId);
      return im.getSessionId();
    };
    var getStats = function getStats() {
      return im.getUsers();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.ROOM_JOIN:
          return join.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_LEAVE:
          return leave.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_GET_SESSONID:
          return getSessionId.apply(undefined, toConsumableArray(args));
        case UpEvent.ROOM_GET_STATS:
          return getStats.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.ROOM_HANDLER, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function StorageHandler(im) {
    var isInner = false;
    var getType = function getType(type) {
      return utils.isEqual(type, StorageType.ROOM) ? 'Room' : 'User';
    };
    var getName = function getName(operate, type) {
      var tpl = '{operate}{type}Data';
      type = getType(type);
      return utils.tplEngine(tpl, {
        operate: operate,
        type: type
      });
    };
    var set$$1 = function set$$1(type, key, value, message) {
      var name = getName('set', type);
      return im[name](key, value, isInner, message);
    };
    var get$$1 = function get$$1(type, key) {
      var name = getName('get', type);
      return im[name](key, isInner);
    };
    var remove = function remove(type, key, message) {
      var name = getName('remove', type);
      return im[name](key, isInner, message);
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.STORAGE_SET:
          return set$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.STORAGE_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        case UpEvent.STORAGE_REMOVE:
          return remove.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.STORAGE_HANDLER, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function MessageHandler(im) {
    var send = function send(message) {
      return im.sendMessage(message);
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.MESSAGE_SEND:
          return send.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.MESSAGE, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function DeviceHandler() {
    var get$$1 = function get$$1() {
      return navigator.mediaDevices.enumerateDevices();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.DEVICE_GET:
          return get$$1.apply(undefined, toConsumableArray(args));
        default:
          Logger$1.warn(LogTag.DEVICE, {
            event: event,
            msg: 'unkown event'
          });
      }
    };
    return {
      dispatch: dispatch
    };
  }

  function Stat(im, option) {
    var statTimer = 0;
    var stat = option.stat || {};
    var frequency = stat.frequency || STAT_FREQUENCY;
    var isNormalMode = option.mode === RTC_MODE.RTC;
    var isAudience = option.liveRole === LIVE_ROLE.AUDIENCE;

    var StatCacheName = {
      TOTAL_PACAKS_LOST: 'total_packs_lost',
      IS_FIRST: 'is_first',
      PACKAGE_SENT: 'package_sent',
      PACKAGE_RECEIVED: 'package_received',
      PACKAGE_SENT_LOST: 'package_sent_lost',
      PACKAGE_RECEIVED_LOST: 'package_received_lost',
      PACKAGE_SENT_ENUM: {
        AUDIO: 'package_sent_audio',
        VIDEO: 'package_sent_video'
      },
      PACKAGE_RECEIVED_ENUM: {
        AUDIO: 'package_received_audio',
        VIDEO: 'package_received_video'
      },
      PACKAGE_SENT_LOST_ENUM: {
        AUDIO: 'package_sent_lost_audio',
        VIDEO: 'package_sent_lost_video'
      },
      PACKAGE_RECEIVED_LOST_ENUM: {
        AUDIO: 'package_received_lost_audio',
        VIDEO: 'package_received_lost_video'
      },
      BYTES_SENT: 'bytes_sent',
      BYTES_RECEIVED: 'bytes_received'
    };
    var StatCache = utils.Cache();
    var TrackStateCache = utils.Cache();

    var urisCache = utils.Cache();
    var URIsCache = {
      get: function get(ssrc) {
        return urisCache.get(ssrc);
      },
      set: function set(uris) {
        if (!utils.isArray(uris)) {
          uris = [uris];
        }
        var kinds = {
          1: 'video',
          0: 'audio'
        };
        utils.forEach(uris, function (item) {
          var uri = item.uri,
              msid = item.msid,
              mediaType = item.mediaType;

          uri = utils.parse(uri);
          var _uri = uri,
              ssrc = _uri.ssrc;

          var kind = kinds[mediaType];
          var trackId = utils.tplEngine('{msid}_{kind}', {
            msid: msid,
            kind: kind
          });
          urisCache.set(ssrc, trackId);
        });
      },
      remove: function remove(ssrc) {
        urisCache.remove(ssrc);
      }
    };

    im.on(CommonEvent.SET_URIS, function (error, uris) {
      if (error) {
        return;
      }
      URIsCache.set(uris);
    });

    im.on(CommonEvent.TRACK_MODIFY, function (error, track) {
      if (error) {
        return;
      }
      var id = track.id,
          isEnable = track.isEnable;

      TrackStateCache.set(id, isEnable);
    });
    /* 
      data = {
        content: ''
      }
      or
      data = [{
        content: ''
      }]
    */
    var send = function send(report) {
      if (!isSafari() && im.isConnected()) {
        if (!isNormalMode && isAudience) return; //直播模式观众端不加入房间，无法上报数据
        im.setRTCState(report);
        Logger$1.log(LogTag.STAT, report);
      }
    };
    var getR1 = function getR1(content) {
      return utils.tplEngine(STAT_TPL.R1, content);
    };
    var getR2 = function getR2(content) {
      return utils.tplEngine(STAT_TPL.R2, content);
    };
    var getR3Item = function getR3Item(content) {
      return utils.tplEngine(STAT_TPL.R3_ITEM, content);
    };
    var getR3 = function getR3(content) {
      return utils.tplEngine(STAT_TPL.R3, content);
    };
    var getR3Object = function getR3Object(ssrc) {
      var item = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = STAT_TPL.R3_KEYS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          item[key] = ssrc[key];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return item;
    };
    var getR4Item = function getR4Item(content) {
      return utils.tplEngine(STAT_TPL.R4_ITEM, content);
    };
    var getR4 = function getR4(content) {
      return utils.tplEngine(STAT_TPL.R4, content);
    };

    var getR4Object = function getR4Object(ssrc) {
      var item = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = STAT_TPL.R4_KEYS[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          item[key] = ssrc[key];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return item;
    };

    /* 封装日志格式 */
    var format = function format(stats) {
      var getResolution = function getResolution(stat) {
        var googFrameWidthSent = stat.googFrameWidthSent,
            googFrameHeightSent = stat.googFrameHeightSent,
            googFrameHeightReceived = stat.googFrameHeightReceived,
            googFrameWidthReceived = stat.googFrameWidthReceived;

        var tpl = '{width}x{height}';
        var send = utils.tplEngine(tpl, {
          height: googFrameHeightSent,
          width: googFrameWidthSent
        });
        send = utils.isInclude(send, 'height') ? STAT_NONE : send;
        var receive = utils.tplEngine(tpl, {
          height: googFrameHeightReceived,
          width: googFrameWidthReceived
        });
        receive = utils.isInclude(receive, 'height') ? STAT_NONE : receive;

        return {
          send: send,
          receive: receive
        };
      };
      var getRate = function getRate(ssrc) {
        var bytesSent = ssrc.bytesSent,
            bytesReceived = ssrc.bytesReceived;
        var googTrackId = ssrc.googTrackId;

        var transferRate = bytesSent ? bytesSent : bytesReceived;
        var lastRate = StatCache.get(googTrackId);
        StatCache.set(googTrackId, transferRate);
        // 发送、接收总码率为空，直接返回，下次有合法值再行计算
        if (utils.isUndefined(lastRate)) {
          return STAT_NONE;
        }

        var getCurrent = function getCurrent(current, latest) {
          var rate = (current - latest) * 8 / 1024 / (frequency / 1000);
          return rate;
        };
        var rate = getCurrent(transferRate, lastRate);
        return rate;
      };
      var getTrack = function getTrack(stat) {
        var track = {};
        var audioLevel = stat['audioOutputLevel'] || stat['audioInputLevel'] || STAT_NONE;
        var frameRate = stat['googFrameRateInput'] || stat['googFrameRateOutput'] || STAT_NONE;
        var samplingRate = STAT_NONE,
            transferRate = STAT_NONE;
        var id = stat.id;

        var ratio = getResolution(stat);

        var trackId = stat.googTrackId;
        var trackState = TRACK_STATE.DISABLE;
        var trackEnabled = TrackStateCache.get(trackId);
        if (utils.isUndefined(trackEnabled) || trackEnabled) {
          trackState = TRACK_STATE.ENABLE;
        }

        var isSender = utils.isInclude(id, 'send');
        var resolution = ratio.receive;
        if (isSender) {
          resolution = ratio.send;
        }

        var rate = getRate(stat);
        var trackSent = STAT_NONE,
            trackReceived = STAT_NONE;

        var calcLostRate = function calcLostRate(stat) {
          var packetsSent = stat.packetsSent,
              packetsReceived = stat.packetsReceived,
              packetsLost = stat.packetsLost,
              mediaType = stat.mediaType;

          var calc = function calc(packets, prePackets, packetsLost, prePacketsLost) {
            var _packets = Math.abs(packets - prePackets);
            var _packetsLost = Math.abs(packetsLost - prePacketsLost);
            if (_packets == 0) {
              return 100;
            }
            var rate = _packetsLost / (_packets + _packetsLost);
            if (rate.toString() === 'NaN') {
              return 0;
            }
            rate = rate > 1 ? 1 : rate;
            return rate.toFixed(2);
          };
          var _mediaType = mediaType.toUpperCase();
          var calcHandles = {
            sender: function sender() {
              var prePacketsSent = StatCache.get(StatCacheName.PACKAGE_SENT_ENUM[_mediaType]);
              StatCache.set(StatCacheName.PACKAGE_SENT_ENUM[_mediaType], packetsSent);

              var prePacketsLostSent = StatCache.get(StatCacheName.PACKAGE_SENT_LOST_ENUM[_mediaType]);
              StatCache.set(StatCacheName.PACKAGE_SENT_LOST_ENUM[_mediaType], packetsLost);

              return calc(packetsSent, prePacketsSent, packetsLost, prePacketsLostSent);
            },
            receiver: function receiver() {
              var prePacketsReceived = StatCache.get(StatCacheName.PACKAGE_RECEIVED_ENUM[_mediaType]);
              StatCache.set(StatCacheName.PACKAGE_RECEIVED_ENUM[_mediaType], packetsReceived);

              var prePacketsLostReceived = StatCache.get(StatCacheName.PACKAGE_RECEIVED_LOST_ENUM[_mediaType]);
              StatCache.set(StatCacheName.PACKAGE_RECEIVED_LOST_ENUM[_mediaType], packetsLost);

              return calc(packetsReceived, prePacketsReceived, packetsLost, prePacketsLostReceived);
            }
          };

          var name = isSender ? 'sender' : 'receiver';
          var func = calcHandles[name];
          return func();
        };
        var lostRate = calcLostRate(stat);
        var packLostReceivedRate = 0,
            packLostSentRate = 0;

        if (isSender) {
          trackSent = rate;
          packLostSentRate = lostRate;
        } else {
          packLostReceivedRate = lostRate;
          trackReceived = rate;
        }
        var props = ['googCodecName', 'packetsLost', 'googJitterReceived', 'googNacksReceived', 'googPlisReceived', 'googRtt', 'googFirsReceived', 'codecImplementationName', 'googRenderDelayMs', 'googJitterSent', 'googNacksSent', 'googPlisSent', 'googFirsSent', 'mediaType'];
        utils.forEach(props, function (prop) {
          track[prop] = stat[prop] || STAT_NONE;
        });

        var googTrackId = stat.googTrackId,
            ssrc = stat.ssrc;

        googTrackId = URIsCache.get(ssrc) || STAT_NONE;
        utils.extend(track, {
          googTrackId: googTrackId,
          audioLevel: audioLevel,
          samplingRate: samplingRate,
          frameRate: frameRate,
          transferRate: transferRate,
          resolution: resolution,
          trackState: trackState,
          trackSent: trackSent,
          trackReceived: trackReceived,
          packLostSentRate: packLostSentRate,
          packLostReceivedRate: packLostReceivedRate,
          isSender: isSender
        });
        return track;
      };
      var getProps = function getProps(prop, isArray) {
        var props = utils.filter(stats, function (stat) {
          var type = stat.type;

          return utils.isEqual(type, prop);
        });
        return isArray ? props : props[0];
      };
      var getPair = function getPair(pair) {
        pair = pair || {};
        var _pair = pair,
            _bytesReceived = _pair.bytesReceived,
            _bytesSent = _pair.bytesSent,
            googLocalAddress = _pair.googLocalAddress;

        var preBytesSent = StatCache.get(StatCacheName.BYTES_SENT);
        var preBytesReceived = StatCache.get(StatCacheName.BYTES_RECEIVED);

        var totalSend = STAT_NONE,
            totalReceive = STAT_NONE;
        if (preBytesSent) {
          totalSend = (_bytesSent - preBytesSent) * 8 / 1024 / (frequency / 1000);
        }
        if (preBytesReceived) {
          totalReceive = (_bytesReceived - preBytesReceived) * 8 / 1024 / (frequency / 1000);
        }
        StatCache.set(StatCacheName.BYTES_SENT, _bytesSent);
        StatCache.set(StatCacheName.BYTES_RECEIVED, _bytesReceived);
        return {
          totalSend: totalSend,
          totalReceive: totalReceive,
          localAddress: googLocalAddress
        };
      };
      var ssrcs = getProps('ssrc', true);
      var videoBwe = getProps('VideoBwe');
      var localcandidate = getProps('localcandidate');
      var googCandidatePair = getProps('googCandidatePair');

      ssrcs = utils.map(ssrcs, function (ssrc) {
        var track = getTrack(ssrc);
        return track;
      });
      googCandidatePair = getPair(googCandidatePair);
      var _googCandidatePair = googCandidatePair,
          totalSend = _googCandidatePair.totalSend,
          totalReceive = _googCandidatePair.totalReceive,
          localAddress = _googCandidatePair.localAddress;


      var totalPacketsLost = 0;
      utils.forEach(ssrcs, function (ssrc) {
        var packetsLost = ssrc.packetsLost;

        packetsLost = Number(packetsLost);
        if (!utils.isEqual(packetsLost, STAT_NONE)) {
          totalPacketsLost += packetsLost;
        }
      });

      if (utils.isUndefined(localcandidate)) {
        return {};
      }
      var networkType = localcandidate.networkType,
          rtt = localcandidate.stunKeepaliveRttTotal;
      var receiveBand = videoBwe.googAvailableReceiveBandwidth,
          sendBand = videoBwe.googAvailableSendBandwidth;


      var R5Data = {
        networkType: networkType,
        rtt: rtt,
        receiveBand: receiveBand,
        localAddress: localAddress,
        sendBand: sendBand,
        packetsLost: totalPacketsLost,
        deviceId: im.getUserId()
      };

      var sendTracks = [],
          sendTracksObj = [],
          receiveTracks = [],
          receiveTracksObj = [];
      utils.forEach(ssrcs, function (ssrc) {
        var isSender = ssrc.isSender,
            trackSent = ssrc.trackSent;


        if (isSender) {
          if (trackSent != '0.00') {
            var track = getR3Item(ssrc);
            sendTracks.push(track);
            sendTracksObj.push(getR3Object(ssrc));
          }
        } else {
          var _track = getR4Item(ssrc);
          receiveTracks.push(_track);
          receiveTracksObj.push(getR4Object(ssrc));
        }
      });
      var R3 = void 0,
          R4 = void 0,
          reports = {};
      if (!utils.isEmpty(sendTracks)) {
        var content = {
          totalRate: totalSend,
          tracks: sendTracks.join(STAT_SEPARATOR)
        };
        utils.extend(content, R5Data);
        R3 = getR3(content);
        var sender = { totalRate: totalSend, tracks: sendTracksObj };
        utils.extend(sender, R5Data);
        reports.sender = sender;
      }
      if (!utils.isEmpty(receiveTracks)) {
        var _content = {
          totalRate: totalReceive,
          tracks: receiveTracks.join(STAT_SEPARATOR)
        };
        utils.extend(_content, R5Data);
        R4 = getR4(_content);
        var received = { totalRate: totalReceive, tracks: receiveTracksObj, rtt: rtt };
        // utils.extend(received, R5Data);
        reports.received = received;
      }
      if (utils.isUndefined(StatCache.get(StatCacheName.IS_FIRST))) {
        StatCache.set(StatCacheName.IS_FIRST, true);
        return {};
      }
      return {
        data: {
          R3: R3,
          R4: R4
        },
        reports: reports
      };
    };
    /* 根据条件调用 Send 方法 */
    var sendReport = function sendReport(reports) {
      utils.forEach(reports, function (report) {
        if (report) {
          send({
            report: report
          });
        }
      });
    };
    var clear = function clear() {
      if (statTimer) {
        clearInterval(statTimer);
      }
    };
    // 过滤重复的用户
    var filterInValidReports = function filterInValidReports(reportsData) {
      try {
        for (var key in reportsData) {
          var reportData = reportsData[key] || {};
          if (reportData.tracks) {
            reportData.tracks = utils.uniq(reportData.tracks, function (data) {
              return {
                key: data.googTrackId,
                value: data
              };
            });
            reportData.tracks = utils.filter(reportData.tracks, function (_ref) {
              var googTrackId = _ref.googTrackId;

              return googTrackId && !utils.isEqual(googTrackId, STAT_NONE); // 过滤没有 googTrackId 的值
            });
            reportsData[key].tracks = reportData.tracks;
          }
        }
      } catch (e) {
        // do nothing
      }
      return reportsData;
    };
    var take = function take(pc) {
      statTimer = setInterval(function () {
        pc.getStats(function (stats) {
          var reports = format(stats);
          if (isNormalMode) {
            reports.reports = filterInValidReports(reports.reports);
          }
          sendReport(reports.data);
          if (reports.reports) {
            im.emit(DownEvent.MONITOR_STATS, reports.reports);
          }
        });
      }, frequency);
    };
    var globalPC = PeerConnection.getInstance();
    if (globalPC) {
      take(globalPC);
    }
    im.on(CommonEvent.LEFT, function () {
      clear();
    });
    im.on(CommonEvent.PEERCONN_CREATED, function (error, pc) {
      if (error) {
        throw error;
      }
      if (!isSafari()) {
        take(pc);
      }
    });
    im.on(CommonEvent.PEERCONN_DESTROYED, function (error) {
      if (error) {
        throw error;
      }
      clear();
    });
    var getType = function getType(name) {
      var type = '',
          state = '';
      switch (name) {
        case UpEvent.STREAM_PUBLISH:
          type = 'publish';
          state = 'begin';
          break;
        case UpEvent.STREAM_UNPUBLISH:
          type = 'publish';
          state = 'end';
          break;
        case UpEvent.STREAM_SUBSCRIBE:
          type = 'subscribe';
          state = 'begin';
          break;
        case UpEvent.STREAM_UNSUBSCRIBE:
          type = 'subscribe';
          state = 'end';
          break;
      }
      return {
        type: type,
        state: state
      };
    };
    im.on(CommonEvent.SEND_REPORT, function (error, data) {
      if (utils.isUndefined(error)) {
        var type = data.type,
            name = data.name,
            trackIds = data.content.trackIds;

        var report = '';
        var borwser = utils.getBrowser();
        switch (type) {
          case STAT_NAME.R1:
            report = getR1({
              rtcVersion: getVersion(),
              imVersion: im.getIMVersion(),
              platform: 'Web',
              pcName: navigator.platform,
              pcVersion: STAT_NONE,
              browserName: borwser.name,
              browserVersion: borwser.version,
              deviceId: getClientID()
            });
            break;
          case STAT_NAME.R2:
            {
              var _getType = getType(name),
                  _type = _getType.type,
                  state = _getType.state;

              report = getR2({
                type: _type,
                state: state,
                deviceId: getClientID(),
                trackIds: trackIds.join('\t')
              });
            }
            break;
        }
        if (!utils.isEmpty(report)) {
          send({
            report: report
          });
        }
      }
    });
  }

  /* 
      版本更新须知: 原版 adapter.js 不支持 es6 引入，将原始文件 factory 定义 Adapter 方法，通过模块引用初始化
  */
  function Adapter() {
  return function () {
      function r(e, n, t) {
        function o(i, f) {
          if (!n[i]) {
            if (!e[i]) {
              var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
            }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
              var n = e[i][1][r];return o(n || r);
            }, p, p.exports, r, e, n, t);
          }return n[i].exports;
        }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
          o(t[i]);
        }return o;
      }return r;
    }()({ 1: [function (require, module, exports) {

        var _adapter_factory = require('./adapter_factory.js');

        var adapter = (0, _adapter_factory.adapterFactory)({ window: window });
        module.exports = adapter; // this is the difference from adapter_core.
      }, { "./adapter_factory.js": 2 }], 2: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.adapterFactory = adapterFactory;

        var _utils = require('./utils');

        var utils = _interopRequireWildcard(_utils);

        var _chrome_shim = require('./chrome/chrome_shim');

        var chromeShim = _interopRequireWildcard(_chrome_shim);

        var _edge_shim = require('./edge/edge_shim');

        var edgeShim = _interopRequireWildcard(_edge_shim);

        var _firefox_shim = require('./firefox/firefox_shim');

        var firefoxShim = _interopRequireWildcard(_firefox_shim);

        var _safari_shim = require('./safari/safari_shim');

        var safariShim = _interopRequireWildcard(_safari_shim);

        var _common_shim = require('./common_shim');

        var commonShim = _interopRequireWildcard(_common_shim);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        // Shimming starts here.
        /*
         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
         *
         *  Use of this source code is governed by a BSD-style license
         *  that can be found in the LICENSE file in the root of the source
         *  tree.
         */
        function adapterFactory() {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              window = _ref.window;

          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            shimChrome: true,
            shimFirefox: true,
            shimEdge: true,
            shimSafari: true
          };

          // Utils.
          var logging = utils.log;
          var browserDetails = utils.detectBrowser(window);

          var adapter = {
            browserDetails: browserDetails,
            commonShim: commonShim,
            extractVersion: utils.extractVersion,
            disableLog: utils.disableLog,
            disableWarnings: utils.disableWarnings
          };

          // Shim browser if found.
          switch (browserDetails.browser) {
            case 'chrome':
              if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
                logging('Chrome shim is not included in this adapter release.');
                return adapter;
              }
              logging('adapter.js shimming chrome.');
              // Export to the adapter global object visible in the browser.
              adapter.browserShim = chromeShim;

              chromeShim.shimGetUserMedia(window);
              chromeShim.shimMediaStream(window);
              chromeShim.shimPeerConnection(window);
              chromeShim.shimOnTrack(window);
              chromeShim.shimAddTrackRemoveTrack(window);
              chromeShim.shimGetSendersWithDtmf(window);
              chromeShim.shimSenderReceiverGetStats(window);
              chromeShim.fixNegotiationNeeded(window);

              commonShim.shimRTCIceCandidate(window);
              commonShim.shimConnectionState(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;
            case 'firefox':
              if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
                logging('Firefox shim is not included in this adapter release.');
                return adapter;
              }
              logging('adapter.js shimming firefox.');
              // Export to the adapter global object visible in the browser.
              adapter.browserShim = firefoxShim;

              firefoxShim.shimGetUserMedia(window);
              firefoxShim.shimPeerConnection(window);
              firefoxShim.shimOnTrack(window);
              firefoxShim.shimRemoveStream(window);
              firefoxShim.shimSenderGetStats(window);
              firefoxShim.shimReceiverGetStats(window);
              firefoxShim.shimRTCDataChannel(window);

              commonShim.shimRTCIceCandidate(window);
              commonShim.shimConnectionState(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;
            case 'edge':
              if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
                logging('MS edge shim is not included in this adapter release.');
                return adapter;
              }
              logging('adapter.js shimming edge.');
              // Export to the adapter global object visible in the browser.
              adapter.browserShim = edgeShim;

              edgeShim.shimGetUserMedia(window);
              edgeShim.shimGetDisplayMedia(window);
              edgeShim.shimPeerConnection(window);
              edgeShim.shimReplaceTrack(window);

              // the edge shim implements the full RTCIceCandidate object.

              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;
            case 'safari':
              if (!safariShim || !options.shimSafari) {
                logging('Safari shim is not included in this adapter release.');
                return adapter;
              }
              logging('adapter.js shimming safari.');
              // Export to the adapter global object visible in the browser.
              adapter.browserShim = safariShim;

              safariShim.shimRTCIceServerUrls(window);
              safariShim.shimCreateOfferLegacy(window);
              safariShim.shimCallbacksAPI(window);
              safariShim.shimLocalStreamsAPI(window);
              safariShim.shimRemoteStreamsAPI(window);
              safariShim.shimTrackEventTransceiver(window);
              safariShim.shimGetUserMedia(window);

              commonShim.shimRTCIceCandidate(window);
              commonShim.shimMaxMessageSize(window);
              commonShim.shimSendThrowTypeError(window);
              break;
            default:
              logging('Unsupported browser!');
              break;
          }

          return adapter;
        }

        // Browser shims.
      }, { "./chrome/chrome_shim": 3, "./common_shim": 6, "./edge/edge_shim": 7, "./firefox/firefox_shim": 11, "./safari/safari_shim": 14, "./utils": 15 }], 3: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        var _getusermedia = require('./getusermedia');

        Object.defineProperty(exports, 'shimGetUserMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getusermedia.shimGetUserMedia;
          }
        });

        var _getdisplaymedia = require('./getdisplaymedia');

        Object.defineProperty(exports, 'shimGetDisplayMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getdisplaymedia.shimGetDisplayMedia;
          }
        });
        exports.shimMediaStream = shimMediaStream;
        exports.shimOnTrack = shimOnTrack;
        exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
        exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
        exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
        exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
        exports.shimPeerConnection = shimPeerConnection;
        exports.fixNegotiationNeeded = fixNegotiationNeeded;

        var _utils = require('../utils.js');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        /* iterates the stats graph recursively. */
        function walkStats(stats, base, resultSet) {
          if (!base || resultSet.has(base.id)) {
            return;
          }
          resultSet.set(base.id, base);
          Object.keys(base).forEach(function (name) {
            if (name.endsWith('Id')) {
              walkStats(stats, stats.get(base[name]), resultSet);
            } else if (name.endsWith('Ids')) {
              base[name].forEach(function (id) {
                walkStats(stats, stats.get(id), resultSet);
              });
            }
          });
        }

        /* filter getStats for a sender/receiver track. */
        function filterStats(result, track, outbound) {
          var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
          var filteredResult = new Map();
          if (track === null) {
            return filteredResult;
          }
          var trackStats = [];
          result.forEach(function (value) {
            if (value.type === 'track' && value.trackIdentifier === track.id) {
              trackStats.push(value);
            }
          });
          trackStats.forEach(function (trackStat) {
            result.forEach(function (stats) {
              if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
                walkStats(result, stats, filteredResult);
              }
            });
          });
          return filteredResult;
        }

        function shimMediaStream(window) {
          window.MediaStream = window.MediaStream || window.webkitMediaStream;
        }

        function shimOnTrack(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
              get: function get$$1() {
                return this._ontrack;
              },
              set: function set$$1(f) {
                if (this._ontrack) {
                  this.removeEventListener('track', this._ontrack);
                }
                this.addEventListener('track', this._ontrack = f);
              },

              enumerable: true,
              configurable: true
            });
            var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
            window.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var _this = this;

              if (!this._ontrackpoly) {
                this._ontrackpoly = function (e) {
                  // onaddstream does not fire when a track is added to an existing
                  // stream. But stream.onaddtrack is implemented so we use that.
                  e.stream.addEventListener('addtrack', function (te) {
                    var receiver = void 0;
                    if (window.RTCPeerConnection.prototype.getReceivers) {
                      receiver = _this.getReceivers().find(function (r) {
                        return r.track && r.track.id === te.track.id;
                      });
                    } else {
                      receiver = { track: te.track };
                    }

                    var event = new Event('track');
                    event.track = te.track;
                    event.receiver = receiver;
                    event.transceiver = { receiver: receiver };
                    event.streams = [e.stream];
                    _this.dispatchEvent(event);
                  });
                  e.stream.getTracks().forEach(function (track) {
                    var receiver = void 0;
                    if (window.RTCPeerConnection.prototype.getReceivers) {
                      receiver = _this.getReceivers().find(function (r) {
                        return r.track && r.track.id === track.id;
                      });
                    } else {
                      receiver = { track: track };
                    }
                    var event = new Event('track');
                    event.track = track;
                    event.receiver = receiver;
                    event.transceiver = { receiver: receiver };
                    event.streams = [e.stream];
                    _this.dispatchEvent(event);
                  });
                };
                this.addEventListener('addstream', this._ontrackpoly);
              }
              return origSetRemoteDescription.apply(this, arguments);
            };
          } else {
            // even if RTCRtpTransceiver is in window, it is only used and
            // emitted in unified-plan. Unfortunately this means we need
            // to unconditionally wrap the event.
            utils.wrapPeerConnectionEvent(window, 'track', function (e) {
              if (!e.transceiver) {
                Object.defineProperty(e, 'transceiver', { value: { receiver: e.receiver } });
              }
              return e;
            });
          }
        }

        function shimGetSendersWithDtmf(window) {
          // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
            var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
              return {
                track: track,
                get dtmf() {
                  if (this._dtmf === undefined) {
                    if (track.kind === 'audio') {
                      this._dtmf = pc.createDTMFSender(track);
                    } else {
                      this._dtmf = null;
                    }
                  }
                  return this._dtmf;
                },
                _pc: pc
              };
            };

            // augment addTrack when getSenders is not available.
            if (!window.RTCPeerConnection.prototype.getSenders) {
              window.RTCPeerConnection.prototype.getSenders = function () {
                this._senders = this._senders || [];
                return this._senders.slice(); // return a copy of the internal state.
              };
              var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
              window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
                var sender = origAddTrack.apply(this, arguments);
                if (!sender) {
                  sender = shimSenderWithDtmf(this, track);
                  this._senders.push(sender);
                }
                return sender;
              };

              var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
              window.RTCPeerConnection.prototype.removeTrack = function (sender) {
                origRemoveTrack.apply(this, arguments);
                var idx = this._senders.indexOf(sender);
                if (idx !== -1) {
                  this._senders.splice(idx, 1);
                }
              };
            }
            var origAddStream = window.RTCPeerConnection.prototype.addStream;
            window.RTCPeerConnection.prototype.addStream = function (stream) {
              var _this2 = this;

              this._senders = this._senders || [];
              origAddStream.apply(this, [stream]);
              stream.getTracks().forEach(function (track) {
                _this2._senders.push(shimSenderWithDtmf(_this2, track));
              });
            };

            var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
            window.RTCPeerConnection.prototype.removeStream = function (stream) {
              var _this3 = this;

              this._senders = this._senders || [];
              origRemoveStream.apply(this, [stream]);

              stream.getTracks().forEach(function (track) {
                var sender = _this3._senders.find(function (s) {
                  return s.track === track;
                });
                if (sender) {
                  // remove sender
                  _this3._senders.splice(_this3._senders.indexOf(sender), 1);
                }
              });
            };
          } else if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
            var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
            window.RTCPeerConnection.prototype.getSenders = function () {
              var _this4 = this;

              var senders = origGetSenders.apply(this, []);
              senders.forEach(function (sender) {
                return sender._pc = _this4;
              });
              return senders;
            };

            Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
              get: function get$$1() {
                if (this._dtmf === undefined) {
                  if (this.track.kind === 'audio') {
                    this._dtmf = this._pc.createDTMFSender(this.track);
                  } else {
                    this._dtmf = null;
                  }
                }
                return this._dtmf;
              }
            });
          }
        }

        function shimSenderReceiverGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
            return;
          }

          // shim sender stats.
          if (!('getStats' in window.RTCRtpSender.prototype)) {
            var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
            if (origGetSenders) {
              window.RTCPeerConnection.prototype.getSenders = function () {
                var _this5 = this;

                var senders = origGetSenders.apply(this, []);
                senders.forEach(function (sender) {
                  return sender._pc = _this5;
                });
                return senders;
              };
            }

            var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            if (origAddTrack) {
              window.RTCPeerConnection.prototype.addTrack = function () {
                var sender = origAddTrack.apply(this, arguments);
                sender._pc = this;
                return sender;
              };
            }
            window.RTCRtpSender.prototype.getStats = function () {
              var sender = this;
              return this._pc.getStats().then(function (result) {
                return (
                  /* Note: this will include stats of all senders that
                   *   send a track with the same id as sender.track as
                   *   it is not possible to identify the RTCRtpSender.
                   */
                  filterStats(result, sender.track, true)
                );
              });
            };
          }

          // shim receiver stats.
          if (!('getStats' in window.RTCRtpReceiver.prototype)) {
            var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
            if (origGetReceivers) {
              window.RTCPeerConnection.prototype.getReceivers = function () {
                var _this6 = this;

                var receivers = origGetReceivers.apply(this, []);
                receivers.forEach(function (receiver) {
                  return receiver._pc = _this6;
                });
                return receivers;
              };
            }
            utils.wrapPeerConnectionEvent(window, 'track', function (e) {
              e.receiver._pc = e.srcElement;
              return e;
            });
            window.RTCRtpReceiver.prototype.getStats = function () {
              var receiver = this;
              return this._pc.getStats().then(function (result) {
                return filterStats(result, receiver.track, false);
              });
            };
          }

          if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
            return;
          }

          // shim RTCPeerConnection.getStats(track).
          var origGetStats = window.RTCPeerConnection.prototype.getStats;
          window.RTCPeerConnection.prototype.getStats = function () {
            if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
              var track = arguments[0];
              var sender = void 0;
              var receiver = void 0;
              var err = void 0;
              this.getSenders().forEach(function (s) {
                if (s.track === track) {
                  if (sender) {
                    err = true;
                  } else {
                    sender = s;
                  }
                }
              });
              this.getReceivers().forEach(function (r) {
                if (r.track === track) {
                  if (receiver) {
                    err = true;
                  } else {
                    receiver = r;
                  }
                }
                return r.track === track;
              });
              if (err || sender && receiver) {
                return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
              } else if (sender) {
                return sender.getStats();
              } else if (receiver) {
                return receiver.getStats();
              }
              return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
            }
            return origGetStats.apply(this, arguments);
          };
        }

        function shimAddTrackRemoveTrackWithNative(window) {
          // shim addTrack/removeTrack with native variants in order to make
          // the interactions with legacy getLocalStreams behave as in other browsers.
          // Keeps a mapping stream.id => [stream, rtpsenders...]
          window.RTCPeerConnection.prototype.getLocalStreams = function () {
            var _this7 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
              return _this7._shimmedLocalStreams[streamId][0];
            });
          };

          var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
          window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
            if (!stream) {
              return origAddTrack.apply(this, arguments);
            }
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};

            var sender = origAddTrack.apply(this, arguments);
            if (!this._shimmedLocalStreams[stream.id]) {
              this._shimmedLocalStreams[stream.id] = [stream, sender];
            } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
              this._shimmedLocalStreams[stream.id].push(sender);
            }
            return sender;
          };

          var origAddStream = window.RTCPeerConnection.prototype.addStream;
          window.RTCPeerConnection.prototype.addStream = function (stream) {
            var _this8 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};

            stream.getTracks().forEach(function (track) {
              var alreadyExists = _this8.getSenders().find(function (s) {
                return s.track === track;
              });
              if (alreadyExists) {
                throw new DOMException('Track already exists.', 'InvalidAccessError');
              }
            });
            var existingSenders = this.getSenders();
            origAddStream.apply(this, arguments);
            var newSenders = this.getSenders().filter(function (newSender) {
              return existingSenders.indexOf(newSender) === -1;
            });
            this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            delete this._shimmedLocalStreams[stream.id];
            return origRemoveStream.apply(this, arguments);
          };

          var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
          window.RTCPeerConnection.prototype.removeTrack = function (sender) {
            var _this9 = this;

            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            if (sender) {
              Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
                var idx = _this9._shimmedLocalStreams[streamId].indexOf(sender);
                if (idx !== -1) {
                  _this9._shimmedLocalStreams[streamId].splice(idx, 1);
                }
                if (_this9._shimmedLocalStreams[streamId].length === 1) {
                  delete _this9._shimmedLocalStreams[streamId];
                }
              });
            }
            return origRemoveTrack.apply(this, arguments);
          };
        }

        function shimAddTrackRemoveTrack(window) {
          if (!window.RTCPeerConnection) {
            return;
          }
          var browserDetails = utils.detectBrowser(window);
          // shim addTrack and removeTrack.
          if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
            return this.shimAddTrackRemoveTrackWithNative(window);
          }

          // also shim pc.getLocalStreams when addTrack is shimmed
          // to return the original streams.
          var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
          window.RTCPeerConnection.prototype.getLocalStreams = function () {
            var _this10 = this;

            var nativeStreams = origGetLocalStreams.apply(this);
            this._reverseStreams = this._reverseStreams || {};
            return nativeStreams.map(function (stream) {
              return _this10._reverseStreams[stream.id];
            });
          };

          var origAddStream = window.RTCPeerConnection.prototype.addStream;
          window.RTCPeerConnection.prototype.addStream = function (stream) {
            var _this11 = this;

            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};

            stream.getTracks().forEach(function (track) {
              var alreadyExists = _this11.getSenders().find(function (s) {
                return s.track === track;
              });
              if (alreadyExists) {
                throw new DOMException('Track already exists.', 'InvalidAccessError');
              }
            });
            // Add identity mapping for consistency with addTrack.
            // Unless this is being used with a stream from addTrack.
            if (!this._reverseStreams[stream.id]) {
              var newStream = new window.MediaStream(stream.getTracks());
              this._streams[stream.id] = newStream;
              this._reverseStreams[newStream.id] = stream;
              stream = newStream;
            }
            origAddStream.apply(this, [stream]);
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};

            origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
            delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
            delete this._streams[stream.id];
          };

          window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
            var _this12 = this;

            if (this.signalingState === 'closed') {
              throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
            }
            var streams = [].slice.call(arguments, 1);
            if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
              return t === track;
            })) {
              // this is not fully correct but all we can manage without
              // [[associated MediaStreams]] internal slot.
              throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
            }

            var alreadyExists = this.getSenders().find(function (s) {
              return s.track === track;
            });
            if (alreadyExists) {
              throw new DOMException('Track already exists.', 'InvalidAccessError');
            }

            this._streams = this._streams || {};
            this._reverseStreams = this._reverseStreams || {};
            var oldStream = this._streams[stream.id];
            if (oldStream) {
              // this is using odd Chrome behaviour, use with caution:
              // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
              // Note: we rely on the high-level addTrack/dtmf shim to
              // create the sender with a dtmf sender.
              oldStream.addTrack(track);

              // Trigger ONN async.
              Promise.resolve().then(function () {
                _this12.dispatchEvent(new Event('negotiationneeded'));
              });
            } else {
              var newStream = new window.MediaStream([track]);
              this._streams[stream.id] = newStream;
              this._reverseStreams[newStream.id] = stream;
              this.addStream(newStream);
            }
            return this.getSenders().find(function (s) {
              return s.track === track;
            });
          };

          // replace the internal stream id with the external one and
          // vice versa.
          function replaceInternalStreamId(pc, description) {
            var sdp = description.sdp;
            Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
              var externalStream = pc._reverseStreams[internalId];
              var internalStream = pc._streams[externalStream.id];
              sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
            });
            return new RTCSessionDescription({
              type: description.type,
              sdp: sdp
            });
          }
          function replaceExternalStreamId(pc, description) {
            var sdp = description.sdp;
            Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
              var externalStream = pc._reverseStreams[internalId];
              var internalStream = pc._streams[externalStream.id];
              sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
            });
            return new RTCSessionDescription({
              type: description.type,
              sdp: sdp
            });
          }
          ['createOffer', 'createAnswer'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              var _this13 = this;

              var args = arguments;
              var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
              if (isLegacyCall) {
                return nativeMethod.apply(this, [function (description) {
                  var desc = replaceInternalStreamId(_this13, description);
                  args[0].apply(null, [desc]);
                }, function (err) {
                  if (args[1]) {
                    args[1].apply(null, err);
                  }
                }, arguments[2]]);
              }
              return nativeMethod.apply(this, arguments).then(function (description) {
                return replaceInternalStreamId(_this13, description);
              });
            };
          });

          var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
          window.RTCPeerConnection.prototype.setLocalDescription = function () {
            if (!arguments.length || !arguments[0].type) {
              return origSetLocalDescription.apply(this, arguments);
            }
            arguments[0] = replaceExternalStreamId(this, arguments[0]);
            return origSetLocalDescription.apply(this, arguments);
          };

          // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

          var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
          Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
            get: function get$$1() {
              var description = origLocalDescription.get.apply(this);
              if (description.type === '') {
                return description;
              }
              return replaceInternalStreamId(this, description);
            }
          });

          window.RTCPeerConnection.prototype.removeTrack = function (sender) {
            var _this14 = this;

            if (this.signalingState === 'closed') {
              throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
            }
            // We can not yet check for sender instanceof RTCRtpSender
            // since we shim RTPSender. So we check if sender._pc is set.
            if (!sender._pc) {
              throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
            }
            var isLocal = sender._pc === this;
            if (!isLocal) {
              throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
            }

            // Search for the native stream the senders track belongs to.
            this._streams = this._streams || {};
            var stream = void 0;
            Object.keys(this._streams).forEach(function (streamid) {
              var hasTrack = _this14._streams[streamid].getTracks().find(function (track) {
                return sender.track === track;
              });
              if (hasTrack) {
                stream = _this14._streams[streamid];
              }
            });

            if (stream) {
              if (stream.getTracks().length === 1) {
                // if this is the last track of the stream, remove the stream. This
                // takes care of any shimmed _senders.
                this.removeStream(this._reverseStreams[stream.id]);
              } else {
                // relying on the same odd chrome behaviour as above.
                stream.removeTrack(sender.track);
              }
              this.dispatchEvent(new Event('negotiationneeded'));
            }
          };
        }

        function shimPeerConnection(window) {
          if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
            // very basic support for old versions.
            window.RTCPeerConnection = window.webkitRTCPeerConnection;
          }
          if (!window.RTCPeerConnection) {
            return;
          }

          var origGetStats = window.RTCPeerConnection.prototype.getStats;
          window.RTCPeerConnection.prototype.getStats = function (selector, successCallback, errorCallback) {
            var _this15 = this;

            var args = arguments;

            // If selector is a function then we are in the old style stats so just
            // pass back the original getStats format to avoid breaking old users.
            if (arguments.length > 0 && typeof selector === 'function') {
              return origGetStats.apply(this, arguments);
            }

            // When spec-style getStats is supported, return those when called with
            // either no arguments or the selector argument is null.
            if (origGetStats.length === 0 && (arguments.length === 0 || typeof arguments[0] !== 'function')) {
              return origGetStats.apply(this, []);
            }

            var fixChromeStats_ = function fixChromeStats_(response) {
              var standardReport = {};
              var reports = response.result();
              reports.forEach(function (report) {
                var standardStats = {
                  id: report.id,
                  timestamp: report.timestamp,
                  type: {
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                  }[report.type] || report.type
                };
                report.names().forEach(function (name) {
                  standardStats[name] = report.stat(name);
                });
                standardReport[standardStats.id] = standardStats;
              });

              return standardReport;
            };

            // shim getStats with maplike support
            var makeMapStats = function makeMapStats(stats) {
              return new Map(Object.keys(stats).map(function (key) {
                return [key, stats[key]];
              }));
            };

            if (arguments.length >= 2) {
              var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                args[1](makeMapStats(fixChromeStats_(response)));
              };

              return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
            }

            // promise-support
            return new Promise(function (resolve, reject) {
              origGetStats.apply(_this15, [function (response) {
                resolve(makeMapStats(fixChromeStats_(response)));
              }, reject]);
            }).then(successCallback, errorCallback);
          };

          // shim implicit creation of RTCSessionDescription/RTCIceCandidate
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          });

          // support for addIceCandidate(null or undefined)
          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
          window.RTCPeerConnection.prototype.addIceCandidate = function () {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }
              return Promise.resolve();
            }
            return nativeAddIceCandidate.apply(this, arguments);
          };
        }

        function fixNegotiationNeeded(window) {
          utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
            var pc = e.target;
            if (pc.signalingState !== 'stable') {
              return;
            }
            return e;
          });
        }
      }, { "../utils.js": 15, "./getdisplaymedia": 4, "./getusermedia": 5 }], 4: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = shimGetDisplayMedia;
        function shimGetDisplayMedia(window, getSourceId) {
          if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
            return;
          }
          if (!window.navigator.mediaDevices) {
            return;
          }
          // getSourceId is a function that returns a promise resolving with
          // the sourceId of the screen/window/tab to be shared.
          if (typeof getSourceId !== 'function') {
            console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
            return;
          }
          window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
            return getSourceId(constraints).then(function (sourceId) {
              var widthSpecified = constraints.video && constraints.video.width;
              var heightSpecified = constraints.video && constraints.video.height;
              var frameRateSpecified = constraints.video && constraints.video.frameRate;
              constraints.video = {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sourceId,
                  maxFrameRate: frameRateSpecified || 3
                }
              };
              if (widthSpecified) {
                constraints.video.mandatory.maxWidth = widthSpecified;
              }
              if (heightSpecified) {
                constraints.video.mandatory.maxHeight = heightSpecified;
              }
              return window.navigator.mediaDevices.getUserMedia(constraints);
            });
          };
        }
      }, {}], 5: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.shimGetUserMedia = shimGetUserMedia;

        var _utils = require('../utils.js');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        var logging = utils.log;

        function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          if (!navigator.mediaDevices) {
            return;
          }

          var browserDetails = utils.detectBrowser(window);

          var constraintsToChrome_ = function constraintsToChrome_(c) {
            if ((typeof c === 'undefined' ? 'undefined' : _typeof$$1(c)) !== 'object' || c.mandatory || c.optional) {
              return c;
            }
            var cc = {};
            Object.keys(c).forEach(function (key) {
              if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                return;
              }
              var r = _typeof$$1(c[key]) === 'object' ? c[key] : { ideal: c[key] };
              if (r.exact !== undefined && typeof r.exact === 'number') {
                r.min = r.max = r.exact;
              }
              var oldname_ = function oldname_(prefix, name) {
                if (prefix) {
                  return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                }
                return name === 'deviceId' ? 'sourceId' : name;
              };
              if (r.ideal !== undefined) {
                cc.optional = cc.optional || [];
                var oc = {};
                if (typeof r.ideal === 'number') {
                  oc[oldname_('min', key)] = r.ideal;
                  cc.optional.push(oc);
                  oc = {};
                  oc[oldname_('max', key)] = r.ideal;
                  cc.optional.push(oc);
                } else {
                  oc[oldname_('', key)] = r.ideal;
                  cc.optional.push(oc);
                }
              }
              if (r.exact !== undefined && typeof r.exact !== 'number') {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_('', key)] = r.exact;
              } else {
                ['min', 'max'].forEach(function (mix) {
                  if (r[mix] !== undefined) {
                    cc.mandatory = cc.mandatory || {};
                    cc.mandatory[oldname_(mix, key)] = r[mix];
                  }
                });
              }
            });
            if (c.advanced) {
              cc.optional = (cc.optional || []).concat(c.advanced);
            }
            return cc;
          };

          var shimConstraints_ = function shimConstraints_(constraints, func) {
            if (browserDetails.version >= 61) {
              return func(constraints);
            }
            constraints = JSON.parse(JSON.stringify(constraints));
            if (constraints && _typeof$$1(constraints.audio) === 'object') {
              var remap = function remap(obj, a, b) {
                if (a in obj && !(b in obj)) {
                  obj[b] = obj[a];
                  delete obj[a];
                }
              };
              constraints = JSON.parse(JSON.stringify(constraints));
              remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
              remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
              constraints.audio = constraintsToChrome_(constraints.audio);
            }
            if (constraints && _typeof$$1(constraints.video) === 'object') {
              // Shim facingMode for mobile & surface pro.
              var face = constraints.video.facingMode;
              face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof$$1(face)) === 'object' ? face : { ideal: face });
              var getSupportedFacingModeLies = browserDetails.version < 66;

              if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                delete constraints.video.facingMode;
                var matches = void 0;
                if (face.exact === 'environment' || face.ideal === 'environment') {
                  matches = ['back', 'rear'];
                } else if (face.exact === 'user' || face.ideal === 'user') {
                  matches = ['front'];
                }
                if (matches) {
                  // Look for matches in label, or use last cam for back (typical).
                  return navigator.mediaDevices.enumerateDevices().then(function (devices) {
                    devices = devices.filter(function (d) {
                      return d.kind === 'videoinput';
                    });
                    var dev = devices.find(function (d) {
                      return matches.some(function (match) {
                        return d.label.toLowerCase().includes(match);
                      });
                    });
                    if (!dev && devices.length && matches.includes('back')) {
                      dev = devices[devices.length - 1]; // more likely the back cam
                    }
                    if (dev) {
                      constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
                    }
                    constraints.video = constraintsToChrome_(constraints.video);
                    logging('chrome: ' + JSON.stringify(constraints));
                    return func(constraints);
                  });
                }
              }
              constraints.video = constraintsToChrome_(constraints.video);
            }
            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          };

          var shimError_ = function shimError_(e) {
            if (browserDetails.version >= 64) {
              return e;
            }
            return {
              name: {
                PermissionDeniedError: 'NotAllowedError',
                PermissionDismissedError: 'NotAllowedError',
                InvalidStateError: 'NotAllowedError',
                DevicesNotFoundError: 'NotFoundError',
                ConstraintNotSatisfiedError: 'OverconstrainedError',
                TrackStartError: 'NotReadableError',
                MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                MediaDeviceKillSwitchOn: 'NotAllowedError',
                TabCaptureError: 'AbortError',
                ScreenCaptureError: 'AbortError',
                DeviceCaptureError: 'AbortError'
              }[e.name] || e.name,
              message: e.message,
              constraint: e.constraint || e.constraintName,
              toString: function toString() {
                return this.name + (this.message && ': ') + this.message;
              }
            };
          };

          var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
            shimConstraints_(constraints, function (c) {
              navigator.webkitGetUserMedia(c, onSuccess, function (e) {
                if (onError) {
                  onError(shimError_(e));
                }
              });
            });
          };
          navigator.getUserMedia = getUserMedia_.bind(navigator);

          // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
          // function which returns a Promise, it does not accept spec-style
          // constraints.
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (cs) {
            return shimConstraints_(cs, function (c) {
              return origGetUserMedia(c).then(function (stream) {
                if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                  stream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                  throw new DOMException('', 'NotFoundError');
                }
                return stream;
              }, function (e) {
                return Promise.reject(shimError_(e));
              });
            });
          };
        }
      }, { "../utils.js": 15 }], 6: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.shimRTCIceCandidate = shimRTCIceCandidate;
        exports.shimMaxMessageSize = shimMaxMessageSize;
        exports.shimSendThrowTypeError = shimSendThrowTypeError;
        exports.shimConnectionState = shimConnectionState;

        var _sdp = require('sdp');

        var _sdp2 = _interopRequireDefault(_sdp);

        var _utils = require('./utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function shimRTCIceCandidate(window) {
          // foundation is arbitrarily chosen as an indicator for full support for
          // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
          if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
            return;
          }

          var NativeRTCIceCandidate = window.RTCIceCandidate;
          window.RTCIceCandidate = function (args) {
            // Remove the a= which shouldn't be part of the candidate string.
            if ((typeof args === 'undefined' ? 'undefined' : _typeof$$1(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
              args = JSON.parse(JSON.stringify(args));
              args.candidate = args.candidate.substr(2);
            }

            if (args.candidate && args.candidate.length) {
              // Augment the native candidate with the parsed fields.
              var nativeCandidate = new NativeRTCIceCandidate(args);
              var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
              var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

              // Add a serializer that does not serialize the extra attributes.
              augmentedCandidate.toJSON = function () {
                return {
                  candidate: augmentedCandidate.candidate,
                  sdpMid: augmentedCandidate.sdpMid,
                  sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                  usernameFragment: augmentedCandidate.usernameFragment
                };
              };
              return augmentedCandidate;
            }
            return new NativeRTCIceCandidate(args);
          };
          window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

          // Hook up the augmented candidate in onicecandidate and
          // addEventListener('icecandidate', ...)
          utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
            if (e.candidate) {
              Object.defineProperty(e, 'candidate', {
                value: new window.RTCIceCandidate(e.candidate),
                writable: 'false'
              });
            }
            return e;
          });
        }

        function shimMaxMessageSize(window) {
          if (window.RTCSctpTransport || !window.RTCPeerConnection) {
            return;
          }
          var browserDetails = utils.detectBrowser(window);

          if (!('sctp' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
              get: function get$$1() {
                return typeof this._sctp === 'undefined' ? null : this._sctp;
              }
            });
          }

          var sctpInDescription = function sctpInDescription(description) {
            var sections = _sdp2.default.splitSections(description.sdp);
            sections.shift();
            return sections.some(function (mediaSection) {
              var mLine = _sdp2.default.parseMLine(mediaSection);
              return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
            });
          };

          var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
            // TODO: Is there a better solution for detecting Firefox?
            var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
            if (match === null || match.length < 2) {
              return -1;
            }
            var version = parseInt(match[1], 10);
            // Test for NaN (yes, this is ugly)
            return version !== version ? -1 : version;
          };

          var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
            // Every implementation we know can send at least 64 KiB.
            // Note: Although Chrome is technically able to send up to 256 KiB, the
            //       data does not reach the other peer reliably.
            //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
            var canSendMaxMessageSize = 65536;
            if (browserDetails.browser === 'firefox') {
              if (browserDetails.version < 57) {
                if (remoteIsFirefox === -1) {
                  // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                  // fragmentation.
                  canSendMaxMessageSize = 16384;
                } else {
                  // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                  // messages. Thus, supporting ~2 GiB when sending.
                  canSendMaxMessageSize = 2147483637;
                }
              } else if (browserDetails.version < 60) {
                // Currently, all FF >= 57 will reset the remote maximum message size
                // to the default value when a data channel is created at a later
                // stage. :(
                // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
              } else {
                // FF >= 60 supports sending ~2 GiB
                canSendMaxMessageSize = 2147483637;
              }
            }
            return canSendMaxMessageSize;
          };

          var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
            // Note: 65536 bytes is the default value from the SDP spec. Also,
            //       every implementation we know supports receiving 65536 bytes.
            var maxMessageSize = 65536;

            // FF 57 has a slightly incorrect default remote max message size, so
            // we need to adjust it here to avoid a failure when sending.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
            if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
              maxMessageSize = 65535;
            }

            var match = _sdp2.default.matchPrefix(description.sdp, 'a=max-message-size:');
            if (match.length > 0) {
              maxMessageSize = parseInt(match[0].substr(19), 10);
            } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
              // If the maximum message size is not present in the remote SDP and
              // both local and remote are Firefox, the remote peer can receive
              // ~2 GiB.
              maxMessageSize = 2147483637;
            }
            return maxMessageSize;
          };

          var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
          window.RTCPeerConnection.prototype.setRemoteDescription = function () {
            this._sctp = null;

            if (sctpInDescription(arguments[0])) {
              // Check if the remote is FF.
              var isFirefox = getRemoteFirefoxVersion(arguments[0]);

              // Get the maximum message size the local peer is capable of sending
              var canSendMMS = getCanSendMaxMessageSize(isFirefox);

              // Get the maximum message size of the remote peer.
              var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

              // Determine final maximum message size
              var maxMessageSize = void 0;
              if (canSendMMS === 0 && remoteMMS === 0) {
                maxMessageSize = Number.POSITIVE_INFINITY;
              } else if (canSendMMS === 0 || remoteMMS === 0) {
                maxMessageSize = Math.max(canSendMMS, remoteMMS);
              } else {
                maxMessageSize = Math.min(canSendMMS, remoteMMS);
              }

              // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
              // attribute.
              var sctp = {};
              Object.defineProperty(sctp, 'maxMessageSize', {
                get: function get$$1() {
                  return maxMessageSize;
                }
              });
              this._sctp = sctp;
            }

            return origSetRemoteDescription.apply(this, arguments);
          };
        }

        function shimSendThrowTypeError(window) {
          if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
            return;
          }

          // Note: Although Firefox >= 57 has a native implementation, the maximum
          //       message size can be reset for all data channels at a later stage.
          //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

          function wrapDcSend(dc, pc) {
            var origDataChannelSend = dc.send;
            dc.send = function () {
              var data = arguments[0];
              var length = data.length || data.size || data.byteLength;
              if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
                throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
              }
              return origDataChannelSend.apply(dc, arguments);
            };
          }
          var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
          window.RTCPeerConnection.prototype.createDataChannel = function () {
            var dataChannel = origCreateDataChannel.apply(this, arguments);
            wrapDcSend(dataChannel, this);
            return dataChannel;
          };
          utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
            wrapDcSend(e.channel, e.target);
            return e;
          });
        }

        /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
         * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
         * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
         * since DTLS failures would be hidden. See
         * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
         * for the Firefox tracking bug.
         */
        function shimConnectionState(window) {
          if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
            return;
          }
          var proto = window.RTCPeerConnection.prototype;
          Object.defineProperty(proto, 'connectionState', {
            get: function get$$1() {
              return {
                completed: 'connected',
                checking: 'connecting'
              }[this.iceConnectionState] || this.iceConnectionState;
            },

            enumerable: true,
            configurable: true
          });
          Object.defineProperty(proto, 'onconnectionstatechange', {
            get: function get$$1() {
              return this._onconnectionstatechange || null;
            },
            set: function set$$1(cb) {
              if (this._onconnectionstatechange) {
                this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
                delete this._onconnectionstatechange;
              }
              if (cb) {
                this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
              }
            },

            enumerable: true,
            configurable: true
          });

          ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
            var origMethod = proto[method];
            proto[method] = function () {
              if (!this._connectionstatechangepoly) {
                this._connectionstatechangepoly = function (e) {
                  var pc = e.target;
                  if (pc._lastConnectionState !== pc.connectionState) {
                    pc._lastConnectionState = pc.connectionState;
                    var newEvent = new Event('connectionstatechange', e);
                    pc.dispatchEvent(newEvent);
                  }
                  return e;
                };
                this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
              }
              return origMethod.apply(this, arguments);
            };
          });
        }
      }, { "./utils": 15, "sdp": 17 }], 7: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

        var _getusermedia = require('./getusermedia');

        Object.defineProperty(exports, 'shimGetUserMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getusermedia.shimGetUserMedia;
          }
        });

        var _getdisplaymedia = require('./getdisplaymedia');

        Object.defineProperty(exports, 'shimGetDisplayMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getdisplaymedia.shimGetDisplayMedia;
          }
        });
        exports.shimPeerConnection = shimPeerConnection;
        exports.shimReplaceTrack = shimReplaceTrack;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        var _filtericeservers = require('./filtericeservers');

        var _rtcpeerconnectionShim = require('rtcpeerconnection-shim');

        var _rtcpeerconnectionShim2 = _interopRequireDefault(_rtcpeerconnectionShim);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function shimPeerConnection(window) {
          var browserDetails = utils.detectBrowser(window);

          if (window.RTCIceGatherer) {
            if (!window.RTCIceCandidate) {
              window.RTCIceCandidate = function (args) {
                return args;
              };
            }
            if (!window.RTCSessionDescription) {
              window.RTCSessionDescription = function (args) {
                return args;
              };
            }
            // this adds an additional event listener to MediaStrackTrack that signals
            // when a tracks enabled property was changed. Workaround for a bug in
            // addStream, see below. No longer required in 15025+
            if (browserDetails.version < 15025) {
              var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
              Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
                set: function set$$1(value) {
                  origMSTEnabled.set.call(this, value);
                  var ev = new Event('enabled');
                  ev.enabled = value;
                  this.dispatchEvent(ev);
                }
              });
            }
          }

          // ORTC defines the DTMF sender a bit different.
          // https://github.com/w3c/ortc/issues/714
          if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
            Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
              get: function get$$1() {
                if (this._dtmf === undefined) {
                  if (this.track.kind === 'audio') {
                    this._dtmf = new window.RTCDtmfSender(this);
                  } else if (this.track.kind === 'video') {
                    this._dtmf = null;
                  }
                }
                return this._dtmf;
              }
            });
          }
          // Edge currently only implements the RTCDtmfSender, not the
          // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
          if (window.RTCDtmfSender && !window.RTCDTMFSender) {
            window.RTCDTMFSender = window.RTCDtmfSender;
          }

          var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim2.default)(window, browserDetails.version);
          window.RTCPeerConnection = function (config) {
            if (config && config.iceServers) {
              config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
              utils.log('ICE servers after filtering:', config.iceServers);
            }
            return new RTCPeerConnectionShim(config);
          };
          window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
        }

        function shimReplaceTrack(window) {
          // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
          if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
            window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
          }
        }
      }, { "../utils": 15, "./filtericeservers": 8, "./getdisplaymedia": 9, "./getusermedia": 10, "rtcpeerconnection-shim": 16 }], 8: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.filterIceServers = filterIceServers;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        // Edge does not like
        // 1) stun: filtered after 14393 unless ?transport=udp is present
        // 2) turn: that does not have all of turn:host:port?transport=udp
        // 3) turn: with ipv6 addresses
        // 4) turn: occurring muliple times
        function filterIceServers(iceServers, edgeVersion) {
          var hasTurn = false;
          iceServers = JSON.parse(JSON.stringify(iceServers));
          return iceServers.filter(function (server) {
            if (server && (server.urls || server.url)) {
              var urls = server.urls || server.url;
              if (server.url && !server.urls) {
                utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
              }
              var isString = typeof urls === 'string';
              if (isString) {
                urls = [urls];
              }
              urls = urls.filter(function (url) {
                // filter STUN unconditionally.
                if (url.indexOf('stun:') === 0) {
                  return false;
                }

                var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
                if (validTurn && !hasTurn) {
                  hasTurn = true;
                  return true;
                }
                return validTurn && !hasTurn;
              });

              delete server.url;
              server.urls = isString ? urls[0] : urls;
              return !!urls.length;
            }
          });
        }
      }, { "../utils": 15 }], 9: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = shimGetDisplayMedia;
        function shimGetDisplayMedia(window) {
          if (!('getDisplayMedia' in window.navigator)) {
            return;
          }
          if (!window.navigator.mediaDevices) {
            return;
          }
          if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
            return;
          }
          window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator.mediaDevices);
        }
      }, {}], 10: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetUserMedia = shimGetUserMedia;
        function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          var shimError_ = function shimError_(e) {
            return {
              name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
              message: e.message,
              constraint: e.constraint,
              toString: function toString() {
                return this.name;
              }
            };
          };

          // getUserMedia error shim.
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (c) {
            return origGetUserMedia(c).catch(function (e) {
              return Promise.reject(shimError_(e));
            });
          };
        }
      }, {}], 11: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        var _getusermedia = require('./getusermedia');

        Object.defineProperty(exports, 'shimGetUserMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getusermedia.shimGetUserMedia;
          }
        });

        var _getdisplaymedia = require('./getdisplaymedia');

        Object.defineProperty(exports, 'shimGetDisplayMedia', {
          enumerable: true,
          get: function get$$1() {
            return _getdisplaymedia.shimGetDisplayMedia;
          }
        });
        exports.shimOnTrack = shimOnTrack;
        exports.shimPeerConnection = shimPeerConnection;
        exports.shimSenderGetStats = shimSenderGetStats;
        exports.shimReceiverGetStats = shimReceiverGetStats;
        exports.shimRemoveStream = shimRemoveStream;
        exports.shimRTCDataChannel = shimRTCDataChannel;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function shimOnTrack(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
            Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
              get: function get$$1() {
                return { receiver: this.receiver };
              }
            });
          }
        }

        function shimPeerConnection(window) {
          var browserDetails = utils.detectBrowser(window);

          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
            return; // probably media.peerconnection.enabled=false in about:config
          }
          if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
            // very basic support for old versions.
            window.RTCPeerConnection = window.mozRTCPeerConnection;
          }

          // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          });

          // support for addIceCandidate(null or undefined)
          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
          window.RTCPeerConnection.prototype.addIceCandidate = function () {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }
              return Promise.resolve();
            }
            return nativeAddIceCandidate.apply(this, arguments);
          };

          var modernStatsTypes = {
            inboundrtp: 'inbound-rtp',
            outboundrtp: 'outbound-rtp',
            candidatepair: 'candidate-pair',
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          };

          var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
          window.RTCPeerConnection.prototype.getStats = function (selector, onSucc, onErr) {
            return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
              if (browserDetails.version < 53 && !onSucc) {
                // Shim only promise getStats with spec-hyphens in type names
                // Leave callback version alone; misc old uses of forEach before Map
                try {
                  stats.forEach(function (stat) {
                    stat.type = modernStatsTypes[stat.type] || stat.type;
                  });
                } catch (e) {
                  if (e.name !== 'TypeError') {
                    throw e;
                  }
                  // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                  stats.forEach(function (stat, i) {
                    stats.set(i, Object.assign({}, stat, {
                      type: modernStatsTypes[stat.type] || stat.type
                    }));
                  });
                }
              }
              return stats;
            }).then(onSucc, onErr);
          };
        }

        function shimSenderGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
            return;
          }
          if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
            return;
          }
          var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
          if (origGetSenders) {
            window.RTCPeerConnection.prototype.getSenders = function () {
              var _this = this;

              var senders = origGetSenders.apply(this, []);
              senders.forEach(function (sender) {
                return sender._pc = _this;
              });
              return senders;
            };
          }

          var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
          if (origAddTrack) {
            window.RTCPeerConnection.prototype.addTrack = function () {
              var sender = origAddTrack.apply(this, arguments);
              sender._pc = this;
              return sender;
            };
          }
          window.RTCRtpSender.prototype.getStats = function () {
            return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
          };
        }

        function shimReceiverGetStats(window) {
          if (!((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
            return;
          }
          if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
            return;
          }
          var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
          if (origGetReceivers) {
            window.RTCPeerConnection.prototype.getReceivers = function () {
              var _this2 = this;

              var receivers = origGetReceivers.apply(this, []);
              receivers.forEach(function (receiver) {
                return receiver._pc = _this2;
              });
              return receivers;
            };
          }
          utils.wrapPeerConnectionEvent(window, 'track', function (e) {
            e.receiver._pc = e.srcElement;
            return e;
          });
          window.RTCRtpReceiver.prototype.getStats = function () {
            return this._pc.getStats(this.track);
          };
        }

        function shimRemoveStream(window) {
          if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
            return;
          }
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            var _this3 = this;

            utils.deprecated('removeStream', 'removeTrack');
            this.getSenders().forEach(function (sender) {
              if (sender.track && stream.getTracks().includes(sender.track)) {
                _this3.removeTrack(sender);
              }
            });
          };
        }

        function shimRTCDataChannel(window) {
          // rename DataChannel to RTCDataChannel (native fix in FF60):
          // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
          if (window.DataChannel && !window.RTCDataChannel) {
            window.RTCDataChannel = window.DataChannel;
          }
        }
      }, { "../utils": 15, "./getdisplaymedia": 12, "./getusermedia": 13 }], 12: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.shimGetDisplayMedia = shimGetDisplayMedia;
        function shimGetDisplayMedia(window, preferredMediaSource) {
          if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
            return;
          }
          if (!window.navigator.mediaDevices) {
            return;
          }
          window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
            if (!(constraints && constraints.video)) {
              var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
              err.name = 'NotFoundError';
              // from https://heycam.github.io/webidl/#idl-DOMException-error-names
              err.code = 8;
              return Promise.reject(err);
            }
            if (constraints.video === true) {
              constraints.video = { mediaSource: preferredMediaSource };
            } else {
              constraints.video.mediaSource = preferredMediaSource;
            }
            return window.navigator.mediaDevices.getUserMedia(constraints);
          };
        }
      }, {}], 13: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.shimGetUserMedia = shimGetUserMedia;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function shimGetUserMedia(window) {
          var browserDetails = utils.detectBrowser(window);
          var navigator = window && window.navigator;
          var MediaStreamTrack = window && window.MediaStreamTrack;

          navigator.getUserMedia = function (constraints, onSuccess, onError) {
            // Replace Firefox 44+'s deprecation warning with unprefixed version.
            utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
            navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
          };

          if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
            var remap = function remap(obj, a, b) {
              if (a in obj && !(b in obj)) {
                obj[b] = obj[a];
                delete obj[a];
              }
            };

            var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
            navigator.mediaDevices.getUserMedia = function (c) {
              if ((typeof c === 'undefined' ? 'undefined' : _typeof$$1(c)) === 'object' && _typeof$$1(c.audio) === 'object') {
                c = JSON.parse(JSON.stringify(c));
                remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
                remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
              }
              return nativeGetUserMedia(c);
            };

            if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
              var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
              MediaStreamTrack.prototype.getSettings = function () {
                var obj = nativeGetSettings.apply(this, arguments);
                remap(obj, 'mozAutoGainControl', 'autoGainControl');
                remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
                return obj;
              };
            }

            if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
              var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
              MediaStreamTrack.prototype.applyConstraints = function (c) {
                if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof$$1(c)) === 'object') {
                  c = JSON.parse(JSON.stringify(c));
                  remap(c, 'autoGainControl', 'mozAutoGainControl');
                  remap(c, 'noiseSuppression', 'mozNoiseSuppression');
                }
                return nativeApplyConstraints.apply(this, [c]);
              };
            }
          }
        }
      }, { "../utils": 15 }], 14: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
        exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
        exports.shimCallbacksAPI = shimCallbacksAPI;
        exports.shimGetUserMedia = shimGetUserMedia;
        exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
        exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
        exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

        var _utils = require('../utils');

        var utils = _interopRequireWildcard(_utils);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj.default = obj;return newObj;
          }
        }

        function shimLocalStreamsAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getLocalStreams = function () {
              if (!this._localStreams) {
                this._localStreams = [];
              }
              return this._localStreams;
            };
          }
          if (!('addStream' in window.RTCPeerConnection.prototype)) {
            var _addTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addStream = function (stream) {
              var _this = this;

              if (!this._localStreams) {
                this._localStreams = [];
              }
              if (!this._localStreams.includes(stream)) {
                this._localStreams.push(stream);
              }
              stream.getTracks().forEach(function (track) {
                return _addTrack.call(_this, track, stream);
              });
            };

            window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
              if (stream) {
                if (!this._localStreams) {
                  this._localStreams = [stream];
                } else if (!this._localStreams.includes(stream)) {
                  this._localStreams.push(stream);
                }
              }
              return _addTrack.call(this, track, stream);
            };
          }
          if (!('removeStream' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.removeStream = function (stream) {
              var _this2 = this;

              if (!this._localStreams) {
                this._localStreams = [];
              }
              var index = this._localStreams.indexOf(stream);
              if (index === -1) {
                return;
              }
              this._localStreams.splice(index, 1);
              var tracks = stream.getTracks();
              this.getSenders().forEach(function (sender) {
                if (tracks.includes(sender.track)) {
                  _this2.removeTrack(sender);
                }
              });
            };
          }
        }

        function shimRemoteStreamsAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getRemoteStreams = function () {
              return this._remoteStreams ? this._remoteStreams : [];
            };
          }
          if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
              get: function get$$1() {
                return this._onaddstream;
              },
              set: function set$$1(f) {
                var _this3 = this;

                if (this._onaddstream) {
                  this.removeEventListener('addstream', this._onaddstream);
                  this.removeEventListener('track', this._onaddstreampoly);
                }
                this.addEventListener('addstream', this._onaddstream = f);
                this.addEventListener('track', this._onaddstreampoly = function (e) {
                  e.streams.forEach(function (stream) {
                    if (!_this3._remoteStreams) {
                      _this3._remoteStreams = [];
                    }

                    // if (isExist(_this3._remoteStreams, stream)) {
                    //   return;
                    // }
                    _this3._remoteStreams.push(stream);
                    var event = new Event('addstream');
                    event.stream = stream;
                    _this3.dispatchEvent(event);
                  });
                });
              }
            });
            var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
            window.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var pc = this;
              if (!this._onaddstreampoly) {
                this.addEventListener('track', this._onaddstreampoly = function (e) {
                  e.streams.forEach(function (stream) {
                    if (!pc._remoteStreams) {
                      pc._remoteStreams = [];
                    }
                    if (pc._remoteStreams.indexOf(stream) >= 0) {
                      return;
                    }
                    pc._remoteStreams.push(stream);
                    var event = new Event('addstream');
                    event.stream = stream;
                    pc.dispatchEvent(event);
                  });
                });
              }
              return origSetRemoteDescription.apply(pc, arguments);
            };
          }
        }

        function shimCallbacksAPI(window) {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          var prototype = window.RTCPeerConnection.prototype;
          var createOffer = prototype.createOffer;
          var createAnswer = prototype.createAnswer;
          var setLocalDescription = prototype.setLocalDescription;
          var setRemoteDescription = prototype.setRemoteDescription;
          var addIceCandidate = prototype.addIceCandidate;

          prototype.createOffer = function (successCallback, failureCallback) {
            var options = arguments.length >= 2 ? arguments[2] : arguments[0];
            var promise = createOffer.apply(this, [options]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          prototype.createAnswer = function (successCallback, failureCallback) {
            var options = arguments.length >= 2 ? arguments[2] : arguments[0];
            var promise = createAnswer.apply(this, [options]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          var withCallback = function withCallback(description, successCallback, failureCallback) {
            var promise = setLocalDescription.apply(this, [description]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.setLocalDescription = withCallback;

          withCallback = function withCallback(description, successCallback, failureCallback) {
            var promise = setRemoteDescription.apply(this, [description]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.setRemoteDescription = withCallback;

          withCallback = function withCallback(candidate, successCallback, failureCallback) {
            var promise = addIceCandidate.apply(this, [candidate]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.addIceCandidate = withCallback;
        }

        function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.getUserMedia = function (constraints, cb, errcb) {
              navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
            }.bind(navigator);
          }
        }

        function shimRTCIceServerUrls(window) {
          // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
          var OrigPeerConnection = window.RTCPeerConnection;
          window.RTCPeerConnection = function (pcConfig, pcConstraints) {
            if (pcConfig && pcConfig.iceServers) {
              var newIceServers = [];
              for (var i = 0; i < pcConfig.iceServers.length; i++) {
                var server = pcConfig.iceServers[i];
                if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
                  utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                  server = JSON.parse(JSON.stringify(server));
                  server.urls = server.url;
                  delete server.url;
                  newIceServers.push(server);
                } else {
                  newIceServers.push(pcConfig.iceServers[i]);
                }
              }
              pcConfig.iceServers = newIceServers;
            }
            return new OrigPeerConnection(pcConfig, pcConstraints);
          };
          window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
          // wrap static methods. Currently just generateCertificate.
          if ('generateCertificate' in window.RTCPeerConnection) {
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
              get: function get$$1() {
                return OrigPeerConnection.generateCertificate;
              }
            });
          }
        }

        function shimTrackEventTransceiver(window) {
          // Add event.transceiver member over deprecated event.receiver
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object' && window.RTCPeerConnection && 'receiver' in window.RTCTrackEvent.prototype &&
          // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
          // defined for some reason even when window.RTCTransceiver is not.
          !window.RTCTransceiver) {
            Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
              get: function get$$1() {
                return { receiver: this.receiver };
              }
            });
          }
        }

        function shimCreateOfferLegacy(window) {
          var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
          window.RTCPeerConnection.prototype.createOffer = function (offerOptions) {
            if (offerOptions) {
              if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
                // support bit values
                offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
              }
              var audioTransceiver = this.getTransceivers().find(function (transceiver) {
                return transceiver.sender.track && transceiver.sender.track.kind === 'audio';
              });
              if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                if (audioTransceiver.direction === 'sendrecv') {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection('sendonly');
                  } else {
                    audioTransceiver.direction = 'sendonly';
                  }
                } else if (audioTransceiver.direction === 'recvonly') {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection('inactive');
                  } else {
                    audioTransceiver.direction = 'inactive';
                  }
                }
              } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
                this.addTransceiver('audio');
              }

              if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
                // support bit values
                offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
              }
              var videoTransceiver = this.getTransceivers().find(function (transceiver) {
                return transceiver.sender.track && transceiver.sender.track.kind === 'video';
              });
              if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                if (videoTransceiver.direction === 'sendrecv') {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection('sendonly');
                  } else {
                    videoTransceiver.direction = 'sendonly';
                  }
                } else if (videoTransceiver.direction === 'recvonly') {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection('inactive');
                  } else {
                    videoTransceiver.direction = 'inactive';
                  }
                }
              } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
                this.addTransceiver('video');
              }
            }
            return origCreateOffer.apply(this, arguments);
          };
        }
      }, { "../utils": 15 }], 15: [function (require, module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
        };

        exports.extractVersion = extractVersion;
        exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
        exports.disableLog = disableLog;
        exports.disableWarnings = disableWarnings;
        exports.log = log;
        exports.deprecated = deprecated;
        exports.detectBrowser = detectBrowser;
        var logDisabled_ = true;
        var deprecationWarnings_ = true;

        /**
         * Extract browser version out of the provided user agent string.
         *
         * @param {!string} uastring userAgent string.
         * @param {!string} expr Regular expression used as match criteria.
         * @param {!number} pos position in the version string to be returned.
         * @return {!number} browser version.
         */
        function extractVersion(uastring, expr, pos) {
          var match = uastring.match(expr);
          return match && match.length >= pos && parseInt(match[pos], 10);
        }

        // Wraps the peerconnection event eventNameToWrap in a function
        // which returns the modified event object (or false to prevent
        // the event).
        function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
          if (!window.RTCPeerConnection) {
            return;
          }
          var proto = window.RTCPeerConnection.prototype;
          var nativeAddEventListener = proto.addEventListener;
          proto.addEventListener = function (nativeEventName, cb) {
            if (nativeEventName !== eventNameToWrap) {
              return nativeAddEventListener.apply(this, arguments);
            }
            var wrappedCallback = function wrappedCallback(e) {
              var modifiedEvent = wrapper(e);
              if (modifiedEvent) {
                cb(modifiedEvent);
              }
            };
            this._eventMap = this._eventMap || {};
            this._eventMap[cb] = wrappedCallback;
            return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
          };

          var nativeRemoveEventListener = proto.removeEventListener;
          proto.removeEventListener = function (nativeEventName, cb) {
            if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
              return nativeRemoveEventListener.apply(this, arguments);
            }
            var unwrappedCb = this._eventMap[cb];
            delete this._eventMap[cb];
            return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
          };

          Object.defineProperty(proto, 'on' + eventNameToWrap, {
            get: function get$$1() {
              return this['_on' + eventNameToWrap];
            },
            set: function set$$1(cb) {
              if (this['_on' + eventNameToWrap]) {
                this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
                delete this['_on' + eventNameToWrap];
              }
              if (cb) {
                this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
              }
            },

            enumerable: true,
            configurable: true
          });
        }

        function disableLog(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof$$1(bool)) + '. Please use a boolean.');
          }
          logDisabled_ = bool;
          return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
        }

        /**
         * Disable or enable deprecation warnings
         * @param {!boolean} bool set to true to disable warnings.
         */
        function disableWarnings(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof$$1(bool)) + '. Please use a boolean.');
          }
          deprecationWarnings_ = !bool;
          return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
        }

        function log() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof$$1(window)) === 'object') {
            if (logDisabled_) {
              return;
            }
            if (typeof console !== 'undefined' && typeof console.log === 'function') {
              console.log.apply(console, arguments);
            }
          }
        }

        /**
         * Shows a deprecation warning suggesting the modern and spec-compatible API.
         */
        function deprecated(oldMethod, newMethod) {
          if (!deprecationWarnings_) {
            return;
          }
          console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
        }

        /**
         * Browser detector.
         *
         * @return {object} result containing browser and version
         *     properties.
         */
        function detectBrowser(window) {
          var navigator = window.navigator;

          // Returned result object.

          var result = { browser: null, version: null };

          // Fail early if it's not a browser
          if (typeof window === 'undefined' || !window.navigator) {
            result.browser = 'Not a browser.';
            return result;
          }

          if (navigator.mozGetUserMedia) {
            // Firefox.
            result.browser = 'firefox';
            result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
          } else if (navigator.webkitGetUserMedia) {
            // Chrome, Chromium, Webview, Opera.
            // Version matches Chrome/WebRTC version.
            result.browser = 'chrome';
            result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
          } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
            // Edge.
            result.browser = 'edge';
            result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
          } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
            // Safari.
            result.browser = 'safari';
            result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
          } else {
            // Default fallthrough: not supported.
            result.browser = 'Not a supported browser.';
            return result;
          }

          return result;
        }
      }, {}], 16: [function (require, module, exports) {

        var SDPUtils = require('sdp');

        function fixStatsType(stat) {
          return {
            inboundrtp: 'inbound-rtp',
            outboundrtp: 'outbound-rtp',
            candidatepair: 'candidate-pair',
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          }[stat.type] || stat.type;
        }

        function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
          var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

          // Map ICE parameters (ufrag, pwd) to SDP.
          sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

          // Map DTLS parameters to SDP.
          sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : dtlsRole || 'active');

          sdp += 'a=mid:' + transceiver.mid + '\r\n';

          if (transceiver.rtpSender && transceiver.rtpReceiver) {
            sdp += 'a=sendrecv\r\n';
          } else if (transceiver.rtpSender) {
            sdp += 'a=sendonly\r\n';
          } else if (transceiver.rtpReceiver) {
            sdp += 'a=recvonly\r\n';
          } else {
            sdp += 'a=inactive\r\n';
          }

          if (transceiver.rtpSender) {
            var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
            transceiver.rtpSender._initialTrackId = trackId;
            // spec.
            var msid = 'msid:' + (stream ? stream.id : '-') + ' ' + trackId + '\r\n';
            sdp += 'a=' + msid;
            // for Chrome. Legacy should no longer be required.
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;

            // RTX
            if (transceiver.sendEncodingParameters[0].rtx) {
              sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
              sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
            }
          }
          // FIXME: this should be written by writeRtpDescription.
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          }
          return sdp;
        }

        // Edge does not like
        // 1) stun: filtered after 14393 unless ?transport=udp is present
        // 2) turn: that does not have all of turn:host:port?transport=udp
        // 3) turn: with ipv6 addresses
        // 4) turn: occurring muliple times
        function filterIceServers(iceServers, edgeVersion) {
          var hasTurn = false;
          iceServers = JSON.parse(JSON.stringify(iceServers));
          return iceServers.filter(function (server) {
            if (server && (server.urls || server.url)) {
              var urls = server.urls || server.url;
              if (server.url && !server.urls) {
                console.warn('RTCIceServer.url is deprecated! Use urls instead.');
              }
              var isString = typeof urls === 'string';
              if (isString) {
                urls = [urls];
              }
              urls = urls.filter(function (url) {
                var validTurn = url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1 && url.indexOf('turn:[') === -1 && !hasTurn;

                if (validTurn) {
                  hasTurn = true;
                  return true;
                }
                return url.indexOf('stun:') === 0 && edgeVersion >= 14393 && url.indexOf('?transport=udp') === -1;
              });

              delete server.url;
              server.urls = isString ? urls[0] : urls;
              return !!urls.length;
            }
          });
        }

        // Determines the intersection of local and remote capabilities.
        function getCommonCapabilities(localCapabilities, remoteCapabilities) {
          var commonCapabilities = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: []
          };

          var findCodecByPayloadType = function findCodecByPayloadType(pt, codecs) {
            pt = parseInt(pt, 10);
            for (var i = 0; i < codecs.length; i++) {
              if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) {
                return codecs[i];
              }
            }
          };

          var rtxCapabilityMatches = function rtxCapabilityMatches(lRtx, rRtx, lCodecs, rCodecs) {
            var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
            var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
            return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
          };

          localCapabilities.codecs.forEach(function (lCodec) {
            for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
              var rCodec = remoteCapabilities.codecs[i];
              if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
                if (lCodec.name.toLowerCase() === 'rtx' && lCodec.parameters && rCodec.parameters.apt) {
                  // for RTX we need to find the local rtx that has a apt
                  // which points to the same local codec as the remote one.
                  if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) {
                    continue;
                  }
                }
                rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
                // number of channels is the highest common number of channels
                rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels);
                // push rCodec so we reply with offerer payload type
                commonCapabilities.codecs.push(rCodec);

                // determine common feedback mechanisms
                rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function (fb) {
                  for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                    if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                      return true;
                    }
                  }
                  return false;
                });
                // FIXME: also need to determine .parameters
                //  see https://github.com/openpeer/ortc/issues/569
                break;
              }
            }
          });

          localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
            for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
              var rHeaderExtension = remoteCapabilities.headerExtensions[i];
              if (lHeaderExtension.uri === rHeaderExtension.uri) {
                commonCapabilities.headerExtensions.push(rHeaderExtension);
                break;
              }
            }
          });

          // FIXME: fecMechanisms
          return commonCapabilities;
        }

        // is action=setLocalDescription with type allowed in signalingState
        function isActionAllowedInSignalingState(action, type, signalingState) {
          return {
            offer: {
              setLocalDescription: ['stable', 'have-local-offer'],
              setRemoteDescription: ['stable', 'have-remote-offer']
            },
            answer: {
              setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
              setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
            }
          }[type][action].indexOf(signalingState) !== -1;
        }

        function maybeAddCandidate(iceTransport, candidate) {
          // Edge's internal representation adds some fields therefore
          // not all fieldѕ are taken into account.
          var alreadyAdded = iceTransport.getRemoteCandidates().find(function (remoteCandidate) {
            return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
          });
          if (!alreadyAdded) {
            iceTransport.addRemoteCandidate(candidate);
          }
          return !alreadyAdded;
        }

        function makeError(name, description) {
          var e = new Error(description);
          e.name = name;
          // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
          e.code = {
            NotSupportedError: 9,
            InvalidStateError: 11,
            InvalidAccessError: 15,
            TypeError: undefined,
            OperationError: undefined
          }[name];
          return e;
        }

        module.exports = function (window, edgeVersion) {
          // https://w3c.github.io/mediacapture-main/#mediastream
          // Helper function to add the track to the stream and
          // dispatch the event ourselves.
          function addTrackToStreamAndFireEvent(track, stream) {
            stream.addTrack(track);
            stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack', { track: track }));
          }

          function removeTrackFromStreamAndFireEvent(track, stream) {
            stream.removeTrack(track);
            stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack', { track: track }));
          }

          function fireAddTrack(pc, track, receiver, streams) {
            var trackEvent = new Event('track');
            trackEvent.track = track;
            trackEvent.receiver = receiver;
            trackEvent.transceiver = { receiver: receiver };
            trackEvent.streams = streams;
            window.setTimeout(function () {
              pc._dispatchEvent('track', trackEvent);
            });
          }

          var RTCPeerConnection = function RTCPeerConnection(config) {
            var pc = this;

            var _eventTarget = document.createDocumentFragment();
            ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (method) {
              pc[method] = _eventTarget[method].bind(_eventTarget);
            });

            this.canTrickleIceCandidates = null;

            this.needNegotiation = false;

            this.localStreams = [];
            this.remoteStreams = [];

            this._localDescription = null;
            this._remoteDescription = null;

            this.signalingState = 'stable';
            this.iceConnectionState = 'new';
            this.connectionState = 'new';
            this.iceGatheringState = 'new';

            config = JSON.parse(JSON.stringify(config || {}));

            this.usingBundle = config.bundlePolicy === 'max-bundle';
            if (config.rtcpMuxPolicy === 'negotiate') {
              throw makeError('NotSupportedError', 'rtcpMuxPolicy \'negotiate\' is not supported');
            } else if (!config.rtcpMuxPolicy) {
              config.rtcpMuxPolicy = 'require';
            }

            switch (config.iceTransportPolicy) {
              case 'all':
              case 'relay':
                break;
              default:
                config.iceTransportPolicy = 'all';
                break;
            }

            switch (config.bundlePolicy) {
              case 'balanced':
              case 'max-compat':
              case 'max-bundle':
                break;
              default:
                config.bundlePolicy = 'balanced';
                break;
            }

            config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

            this._iceGatherers = [];
            if (config.iceCandidatePoolSize) {
              for (var i = config.iceCandidatePoolSize; i > 0; i--) {
                this._iceGatherers.push(new window.RTCIceGatherer({
                  iceServers: config.iceServers,
                  gatherPolicy: config.iceTransportPolicy
                }));
              }
            } else {
              config.iceCandidatePoolSize = 0;
            }

            this._config = config;

            // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
            // everything that is needed to describe a SDP m-line.
            this.transceivers = [];

            this._sdpSessionId = SDPUtils.generateSessionId();
            this._sdpSessionVersion = 0;

            this._dtlsRole = undefined; // role for a=setup to use in answers.

            this._isClosed = false;
          };

          Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
            configurable: true,
            get: function get$$1() {
              return this._localDescription;
            }
          });
          Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
            configurable: true,
            get: function get$$1() {
              return this._remoteDescription;
            }
          });

          // set up event handlers on prototype
          RTCPeerConnection.prototype.onicecandidate = null;
          RTCPeerConnection.prototype.onaddstream = null;
          RTCPeerConnection.prototype.ontrack = null;
          RTCPeerConnection.prototype.onremovestream = null;
          RTCPeerConnection.prototype.onsignalingstatechange = null;
          RTCPeerConnection.prototype.oniceconnectionstatechange = null;
          RTCPeerConnection.prototype.onconnectionstatechange = null;
          RTCPeerConnection.prototype.onicegatheringstatechange = null;
          RTCPeerConnection.prototype.onnegotiationneeded = null;
          RTCPeerConnection.prototype.ondatachannel = null;

          RTCPeerConnection.prototype._dispatchEvent = function (name, event) {
            if (this._isClosed) {
              return;
            }
            this.dispatchEvent(event);
            if (typeof this['on' + name] === 'function') {
              this['on' + name](event);
            }
          };

          RTCPeerConnection.prototype._emitGatheringStateChange = function () {
            var event = new Event('icegatheringstatechange');
            this._dispatchEvent('icegatheringstatechange', event);
          };

          RTCPeerConnection.prototype.getConfiguration = function () {
            return this._config;
          };

          RTCPeerConnection.prototype.getLocalStreams = function () {
            return this.localStreams;
          };

          RTCPeerConnection.prototype.getRemoteStreams = function () {
            return this.remoteStreams;
          };

          // internal helper to create a transceiver object.
          // (which is not yet the same as the WebRTC 1.0 transceiver)
          RTCPeerConnection.prototype._createTransceiver = function (kind, doNotAdd) {
            var hasBundleTransport = this.transceivers.length > 0;
            var transceiver = {
              track: null,
              iceGatherer: null,
              iceTransport: null,
              dtlsTransport: null,
              localCapabilities: null,
              remoteCapabilities: null,
              rtpSender: null,
              rtpReceiver: null,
              kind: kind,
              mid: null,
              sendEncodingParameters: null,
              recvEncodingParameters: null,
              stream: null,
              associatedRemoteMediaStreams: [],
              wantReceive: true
            };
            if (this.usingBundle && hasBundleTransport) {
              transceiver.iceTransport = this.transceivers[0].iceTransport;
              transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
            } else {
              var transports = this._createIceAndDtlsTransports();
              transceiver.iceTransport = transports.iceTransport;
              transceiver.dtlsTransport = transports.dtlsTransport;
            }
            if (!doNotAdd) {
              this.transceivers.push(transceiver);
            }
            return transceiver;
          };

          RTCPeerConnection.prototype.addTrack = function (track, stream) {
            if (this._isClosed) {
              throw makeError('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
            }

            var alreadyExists = this.transceivers.find(function (s) {
              return s.track === track;
            });

            if (alreadyExists) {
              throw makeError('InvalidAccessError', 'Track already exists.');
            }

            var transceiver;
            for (var i = 0; i < this.transceivers.length; i++) {
              if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) {
                transceiver = this.transceivers[i];
              }
            }
            if (!transceiver) {
              transceiver = this._createTransceiver(track.kind);
            }

            this._maybeFireNegotiationNeeded();

            if (this.localStreams.indexOf(stream) === -1) {
              this.localStreams.push(stream);
            }

            transceiver.track = track;
            transceiver.stream = stream;
            transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
            return transceiver.rtpSender;
          };

          RTCPeerConnection.prototype.addStream = function (stream) {
            var pc = this;
            if (edgeVersion >= 15025) {
              stream.getTracks().forEach(function (track) {
                pc.addTrack(track, stream);
              });
            } else {
              // Clone is necessary for local demos mostly, attaching directly
              // to two different senders does not work (build 10547).
              // Fixed in 15025 (or earlier)
              var clonedStream = stream.clone();
              stream.getTracks().forEach(function (track, idx) {
                var clonedTrack = clonedStream.getTracks()[idx];
                track.addEventListener('enabled', function (event) {
                  clonedTrack.enabled = event.enabled;
                });
              });
              clonedStream.getTracks().forEach(function (track) {
                pc.addTrack(track, clonedStream);
              });
            }
          };

          RTCPeerConnection.prototype.removeTrack = function (sender) {
            if (this._isClosed) {
              throw makeError('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
            }

            if (!(sender instanceof window.RTCRtpSender)) {
              throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.');
            }

            var transceiver = this.transceivers.find(function (t) {
              return t.rtpSender === sender;
            });

            if (!transceiver) {
              throw makeError('InvalidAccessError', 'Sender was not created by this connection.');
            }
            var stream = transceiver.stream;

            transceiver.rtpSender.stop();
            transceiver.rtpSender = null;
            transceiver.track = null;
            transceiver.stream = null;

            // remove the stream from the set of local streams
            var localStreams = this.transceivers.map(function (t) {
              return t.stream;
            });
            if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) {
              this.localStreams.splice(this.localStreams.indexOf(stream), 1);
            }

            this._maybeFireNegotiationNeeded();
          };

          RTCPeerConnection.prototype.removeStream = function (stream) {
            var pc = this;
            stream.getTracks().forEach(function (track) {
              var sender = pc.getSenders().find(function (s) {
                return s.track === track;
              });
              if (sender) {
                pc.removeTrack(sender);
              }
            });
          };

          RTCPeerConnection.prototype.getSenders = function () {
            return this.transceivers.filter(function (transceiver) {
              return !!transceiver.rtpSender;
            }).map(function (transceiver) {
              return transceiver.rtpSender;
            });
          };

          RTCPeerConnection.prototype.getReceivers = function () {
            return this.transceivers.filter(function (transceiver) {
              return !!transceiver.rtpReceiver;
            }).map(function (transceiver) {
              return transceiver.rtpReceiver;
            });
          };

          RTCPeerConnection.prototype._createIceGatherer = function (sdpMLineIndex, usingBundle) {
            var pc = this;
            if (usingBundle && sdpMLineIndex > 0) {
              return this.transceivers[0].iceGatherer;
            } else if (this._iceGatherers.length) {
              return this._iceGatherers.shift();
            }
            var iceGatherer = new window.RTCIceGatherer({
              iceServers: this._config.iceServers,
              gatherPolicy: this._config.iceTransportPolicy
            });
            Object.defineProperty(iceGatherer, 'state', { value: 'new', writable: true });

            this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
            this.transceivers[sdpMLineIndex].bufferCandidates = function (event) {
              var end = !event.candidate || Object.keys(event.candidate).length === 0;
              // polyfill since RTCIceGatherer.state is not implemented in
              // Edge 10547 yet.
              iceGatherer.state = end ? 'completed' : 'gathering';
              if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
                pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
              }
            };
            iceGatherer.addEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
            return iceGatherer;
          };

          // start gathering from an RTCIceGatherer.
          RTCPeerConnection.prototype._gather = function (mid, sdpMLineIndex) {
            var pc = this;
            var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
            if (iceGatherer.onlocalcandidate) {
              return;
            }
            var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
            this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
            iceGatherer.removeEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
            iceGatherer.onlocalcandidate = function (evt) {
              if (pc.usingBundle && sdpMLineIndex > 0) {
                // if we know that we use bundle we can drop candidates with
                // ѕdpMLineIndex > 0. If we don't do this then our state gets
                // confused since we dispose the extra ice gatherer.
                return;
              }
              var event = new Event('icecandidate');
              event.candidate = { sdpMid: mid, sdpMLineIndex: sdpMLineIndex };

              var cand = evt.candidate;
              // Edge emits an empty object for RTCIceCandidateComplete‥
              var end = !cand || Object.keys(cand).length === 0;
              if (end) {
                // polyfill since RTCIceGatherer.state is not implemented in
                // Edge 10547 yet.
                if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
                  iceGatherer.state = 'completed';
                }
              } else {
                if (iceGatherer.state === 'new') {
                  iceGatherer.state = 'gathering';
                }
                // RTCIceCandidate doesn't have a component, needs to be added
                cand.component = 1;
                // also the usernameFragment. TODO: update SDP to take both variants.
                cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

                var serializedCandidate = SDPUtils.writeCandidate(cand);
                event.candidate = Object.assign(event.candidate, SDPUtils.parseCandidate(serializedCandidate));

                event.candidate.candidate = serializedCandidate;
                event.candidate.toJSON = function () {
                  return {
                    candidate: event.candidate.candidate,
                    sdpMid: event.candidate.sdpMid,
                    sdpMLineIndex: event.candidate.sdpMLineIndex,
                    usernameFragment: event.candidate.usernameFragment
                  };
                };
              }

              // update local description.
              var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
              if (!end) {
                sections[event.candidate.sdpMLineIndex] += 'a=' + event.candidate.candidate + '\r\n';
              } else {
                sections[event.candidate.sdpMLineIndex] += 'a=end-of-candidates\r\n';
              }
              pc._localDescription.sdp = SDPUtils.getDescription(pc._localDescription.sdp) + sections.join('');
              var complete = pc.transceivers.every(function (transceiver) {
                return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
              });

              if (pc.iceGatheringState !== 'gathering') {
                pc.iceGatheringState = 'gathering';
                pc._emitGatheringStateChange();
              }

              // Emit candidate. Also emit null candidate when all gatherers are
              // complete.
              if (!end) {
                pc._dispatchEvent('icecandidate', event);
              }
              if (complete) {
                pc._dispatchEvent('icecandidate', new Event('icecandidate'));
                pc.iceGatheringState = 'complete';
                pc._emitGatheringStateChange();
              }
            };

            // emit already gathered candidates.
            window.setTimeout(function () {
              bufferedCandidateEvents.forEach(function (e) {
                iceGatherer.onlocalcandidate(e);
              });
            }, 0);
          };

          // Create ICE transport and DTLS transport.
          RTCPeerConnection.prototype._createIceAndDtlsTransports = function () {
            var pc = this;
            var iceTransport = new window.RTCIceTransport(null);
            iceTransport.onicestatechange = function () {
              pc._updateIceConnectionState();
              pc._updateConnectionState();
            };

            var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
            dtlsTransport.ondtlsstatechange = function () {
              pc._updateConnectionState();
            };
            dtlsTransport.onerror = function () {
              // onerror does not set state to failed by itself.
              Object.defineProperty(dtlsTransport, 'state', { value: 'failed', writable: true });
              pc._updateConnectionState();
            };

            return {
              iceTransport: iceTransport,
              dtlsTransport: dtlsTransport
            };
          };

          // Destroy ICE gatherer, ICE transport and DTLS transport.
          // Without triggering the callbacks.
          RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function (sdpMLineIndex) {
            var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
            if (iceGatherer) {
              delete iceGatherer.onlocalcandidate;
              delete this.transceivers[sdpMLineIndex].iceGatherer;
            }
            var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
            if (iceTransport) {
              delete iceTransport.onicestatechange;
              delete this.transceivers[sdpMLineIndex].iceTransport;
            }
            var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
            if (dtlsTransport) {
              delete dtlsTransport.ondtlsstatechange;
              delete dtlsTransport.onerror;
              delete this.transceivers[sdpMLineIndex].dtlsTransport;
            }
          };

          // Start the RTP Sender and Receiver for a transceiver.
          RTCPeerConnection.prototype._transceive = function (transceiver, send, recv) {
            var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
            if (send && transceiver.rtpSender) {
              params.encodings = transceiver.sendEncodingParameters;
              params.rtcp = {
                cname: SDPUtils.localCName,
                compound: transceiver.rtcpParameters.compound
              };
              if (transceiver.recvEncodingParameters.length) {
                params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
              }
              transceiver.rtpSender.send(params);
            }
            if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
              // remove RTX field in Edge 14942
              if (transceiver.kind === 'video' && transceiver.recvEncodingParameters && edgeVersion < 15019) {
                transceiver.recvEncodingParameters.forEach(function (p) {
                  delete p.rtx;
                });
              }
              if (transceiver.recvEncodingParameters.length) {
                params.encodings = transceiver.recvEncodingParameters;
              } else {
                params.encodings = [{}];
              }
              params.rtcp = {
                compound: transceiver.rtcpParameters.compound
              };
              if (transceiver.rtcpParameters.cname) {
                params.rtcp.cname = transceiver.rtcpParameters.cname;
              }
              if (transceiver.sendEncodingParameters.length) {
                params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
              }
              transceiver.rtpReceiver.receive(params);
            }
          };

          RTCPeerConnection.prototype.setLocalDescription = function (description) {
            var pc = this;

            // Note: pranswer is not supported.
            if (['offer', 'answer'].indexOf(description.type) === -1) {
              return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
            }

            if (!isActionAllowedInSignalingState('setLocalDescription', description.type, pc.signalingState) || pc._isClosed) {
              return Promise.reject(makeError('InvalidStateError', 'Can not set local ' + description.type + ' in state ' + pc.signalingState));
            }

            var sections;
            var sessionpart;
            if (description.type === 'offer') {
              // VERY limited support for SDP munging. Limited to:
              // * changing the order of codecs
              sections = SDPUtils.splitSections(description.sdp);
              sessionpart = sections.shift();
              sections.forEach(function (mediaSection, sdpMLineIndex) {
                var caps = SDPUtils.parseRtpParameters(mediaSection);
                pc.transceivers[sdpMLineIndex].localCapabilities = caps;
              });

              pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
                pc._gather(transceiver.mid, sdpMLineIndex);
              });
            } else if (description.type === 'answer') {
              sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
              sessionpart = sections.shift();
              var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
              sections.forEach(function (mediaSection, sdpMLineIndex) {
                var transceiver = pc.transceivers[sdpMLineIndex];
                var iceGatherer = transceiver.iceGatherer;
                var iceTransport = transceiver.iceTransport;
                var dtlsTransport = transceiver.dtlsTransport;
                var localCapabilities = transceiver.localCapabilities;
                var remoteCapabilities = transceiver.remoteCapabilities;

                // treat bundle-only as not-rejected.
                var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

                if (!rejected && !transceiver.rejected) {
                  var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                  var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                  if (isIceLite) {
                    remoteDtlsParameters.role = 'server';
                  }

                  if (!pc.usingBundle || sdpMLineIndex === 0) {
                    pc._gather(transceiver.mid, sdpMLineIndex);
                    if (iceTransport.state === 'new') {
                      iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
                    }
                    if (dtlsTransport.state === 'new') {
                      dtlsTransport.start(remoteDtlsParameters);
                    }
                  }

                  // Calculate intersection of capabilities.
                  var params = getCommonCapabilities(localCapabilities, remoteCapabilities);

                  // Start the RTCRtpSender. The RTCRtpReceiver for this
                  // transceiver has already been started in setRemoteDescription.
                  pc._transceive(transceiver, params.codecs.length > 0, false);
                }
              });
            }

            pc._localDescription = {
              type: description.type,
              sdp: description.sdp
            };
            if (description.type === 'offer') {
              pc._updateSignalingState('have-local-offer');
            } else {
              pc._updateSignalingState('stable');
            }

            return Promise.resolve();
          };

          RTCPeerConnection.prototype.setRemoteDescription = function (description) {
            var pc = this;

            // Note: pranswer is not supported.
            if (['offer', 'answer'].indexOf(description.type) === -1) {
              return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
            }

            if (!isActionAllowedInSignalingState('setRemoteDescription', description.type, pc.signalingState) || pc._isClosed) {
              return Promise.reject(makeError('InvalidStateError', 'Can not set remote ' + description.type + ' in state ' + pc.signalingState));
            }

            var streams = {};
            pc.remoteStreams.forEach(function (stream) {
              streams[stream.id] = stream;
            });
            var receiverList = [];
            var sections = SDPUtils.splitSections(description.sdp);
            var sessionpart = sections.shift();
            var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
            var usingBundle = SDPUtils.matchPrefix(sessionpart, 'a=group:BUNDLE ').length > 0;
            pc.usingBundle = usingBundle;
            var iceOptions = SDPUtils.matchPrefix(sessionpart, 'a=ice-options:')[0];
            if (iceOptions) {
              pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ').indexOf('trickle') >= 0;
            } else {
              pc.canTrickleIceCandidates = false;
            }

            sections.forEach(function (mediaSection, sdpMLineIndex) {
              var lines = SDPUtils.splitLines(mediaSection);
              var kind = SDPUtils.getKind(mediaSection);
              // treat bundle-only as not-rejected.
              var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
              var protocol = lines[0].substr(2).split(' ')[2];

              var direction = SDPUtils.getDirection(mediaSection, sessionpart);
              var remoteMsid = SDPUtils.parseMsid(mediaSection);

              var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

              // Reject datachannels which are not implemented yet.
              if (rejected || kind === 'application' && (protocol === 'DTLS/SCTP' || protocol === 'UDP/DTLS/SCTP')) {
                // TODO: this is dangerous in the case where a non-rejected m-line
                //     becomes rejected.
                pc.transceivers[sdpMLineIndex] = {
                  mid: mid,
                  kind: kind,
                  protocol: protocol,
                  rejected: true
                };
                return;
              }

              if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) {
                // recycle a rejected transceiver.
                pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
              }

              var transceiver;
              var iceGatherer;
              var iceTransport;
              var dtlsTransport;
              var rtpReceiver;
              var sendEncodingParameters;
              var recvEncodingParameters;
              var localCapabilities;

              var track;
              // FIXME: ensure the mediaSection has rtcp-mux set.
              var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
              var remoteIceParameters;
              var remoteDtlsParameters;
              if (!rejected) {
                remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                remoteDtlsParameters.role = 'client';
              }
              recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);

              var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

              var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates', sessionpart).length > 0;
              var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function (cand) {
                return SDPUtils.parseCandidate(cand);
              }).filter(function (cand) {
                return cand.component === 1;
              });

              // Check if we can use BUNDLE and dispose transports.
              if ((description.type === 'offer' || description.type === 'answer') && !rejected && usingBundle && sdpMLineIndex > 0 && pc.transceivers[sdpMLineIndex]) {
                pc._disposeIceAndDtlsTransports(sdpMLineIndex);
                pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
                pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
                pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;
                if (pc.transceivers[sdpMLineIndex].rtpSender) {
                  pc.transceivers[sdpMLineIndex].rtpSender.setTransport(pc.transceivers[0].dtlsTransport);
                }
                if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
                  pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(pc.transceivers[0].dtlsTransport);
                }
              }
              if (description.type === 'offer' && !rejected) {
                transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
                transceiver.mid = mid;

                if (!transceiver.iceGatherer) {
                  transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, usingBundle);
                }

                if (cands.length && transceiver.iceTransport.state === 'new') {
                  if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                    transceiver.iceTransport.setRemoteCandidates(cands);
                  } else {
                    cands.forEach(function (candidate) {
                      maybeAddCandidate(transceiver.iceTransport, candidate);
                    });
                  }
                }

                localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

                // filter RTX until additional stuff needed for RTX is implemented
                // in adapter.js
                if (edgeVersion < 15019) {
                  localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
                    return codec.name !== 'rtx';
                  });
                }

                sendEncodingParameters = transceiver.sendEncodingParameters || [{
                  ssrc: (2 * sdpMLineIndex + 2) * 1001
                }];

                // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                var isNewTrack = false;
                if (direction === 'sendrecv' || direction === 'sendonly') {
                  isNewTrack = !transceiver.rtpReceiver;
                  rtpReceiver = transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

                  if (isNewTrack) {
                    var stream;
                    track = rtpReceiver.track;
                    // FIXME: does not work with Plan B.
                    if (remoteMsid && remoteMsid.stream === '-') ; else if (remoteMsid) {
                      if (!streams[remoteMsid.stream]) {
                        streams[remoteMsid.stream] = new window.MediaStream();
                        Object.defineProperty(streams[remoteMsid.stream], 'id', {
                          get: function get$$1() {
                            return remoteMsid.stream;
                          }
                        });
                      }
                      Object.defineProperty(track, 'id', {
                        get: function get$$1() {
                          return remoteMsid.track;
                        }
                      });
                      stream = streams[remoteMsid.stream];
                    } else {
                      if (!streams.default) {
                        streams.default = new window.MediaStream();
                      }
                      stream = streams.default;
                    }
                    if (stream) {
                      addTrackToStreamAndFireEvent(track, stream);
                      transceiver.associatedRemoteMediaStreams.push(stream);
                    }
                    receiverList.push([track, rtpReceiver, stream]);
                  }
                } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                  transceiver.associatedRemoteMediaStreams.forEach(function (s) {
                    var nativeTrack = s.getTracks().find(function (t) {
                      return t.id === transceiver.rtpReceiver.track.id;
                    });
                    if (nativeTrack) {
                      removeTrackFromStreamAndFireEvent(nativeTrack, s);
                    }
                  });
                  transceiver.associatedRemoteMediaStreams = [];
                }

                transceiver.localCapabilities = localCapabilities;
                transceiver.remoteCapabilities = remoteCapabilities;
                transceiver.rtpReceiver = rtpReceiver;
                transceiver.rtcpParameters = rtcpParameters;
                transceiver.sendEncodingParameters = sendEncodingParameters;
                transceiver.recvEncodingParameters = recvEncodingParameters;

                // Start the RTCRtpReceiver now. The RTPSender is started in
                // setLocalDescription.
                pc._transceive(pc.transceivers[sdpMLineIndex], false, isNewTrack);
              } else if (description.type === 'answer' && !rejected) {
                transceiver = pc.transceivers[sdpMLineIndex];
                iceGatherer = transceiver.iceGatherer;
                iceTransport = transceiver.iceTransport;
                dtlsTransport = transceiver.dtlsTransport;
                rtpReceiver = transceiver.rtpReceiver;
                sendEncodingParameters = transceiver.sendEncodingParameters;
                localCapabilities = transceiver.localCapabilities;

                pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
                pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
                pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

                if (cands.length && iceTransport.state === 'new') {
                  if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) {
                    iceTransport.setRemoteCandidates(cands);
                  } else {
                    cands.forEach(function (candidate) {
                      maybeAddCandidate(transceiver.iceTransport, candidate);
                    });
                  }
                }

                if (!usingBundle || sdpMLineIndex === 0) {
                  if (iceTransport.state === 'new') {
                    iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
                  }
                  if (dtlsTransport.state === 'new') {
                    dtlsTransport.start(remoteDtlsParameters);
                  }
                }

                // If the offer contained RTX but the answer did not,
                // remove RTX from sendEncodingParameters.
                var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);

                var hasRtx = commonCapabilities.codecs.filter(function (c) {
                  return c.name.toLowerCase() === 'rtx';
                }).length;
                if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                  delete transceiver.sendEncodingParameters[0].rtx;
                }

                pc._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly');

                // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
                  track = rtpReceiver.track;
                  if (remoteMsid) {
                    if (!streams[remoteMsid.stream]) {
                      streams[remoteMsid.stream] = new window.MediaStream();
                    }
                    addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                    receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
                  } else {
                    if (!streams.default) {
                      streams.default = new window.MediaStream();
                    }
                    addTrackToStreamAndFireEvent(track, streams.default);
                    receiverList.push([track, rtpReceiver, streams.default]);
                  }
                } else {
                  // FIXME: actually the receiver should be created later.
                  delete transceiver.rtpReceiver;
                }
              }
            });

            if (pc._dtlsRole === undefined) {
              pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
            }

            pc._remoteDescription = {
              type: description.type,
              sdp: description.sdp
            };
            if (description.type === 'offer') {
              pc._updateSignalingState('have-remote-offer');
            } else {
              pc._updateSignalingState('stable');
            }
            Object.keys(streams).forEach(function (sid) {
              var stream = streams[sid];
              if (stream.getTracks().length) {
                if (pc.remoteStreams.indexOf(stream) === -1) {
                  pc.remoteStreams.push(stream);
                  var event = new Event('addstream');
                  event.stream = stream;
                  window.setTimeout(function () {
                    pc._dispatchEvent('addstream', event);
                  });
                }

                receiverList.forEach(function (item) {
                  var track = item[0];
                  var receiver = item[1];
                  if (stream.id !== item[2].id) {
                    return;
                  }
                  fireAddTrack(pc, track, receiver, [stream]);
                });
              }
            });
            receiverList.forEach(function (item) {
              if (item[2]) {
                return;
              }
              fireAddTrack(pc, item[0], item[1], []);
            });

            // check whether addIceCandidate({}) was called within four seconds after
            // setRemoteDescription.
            window.setTimeout(function () {
              if (!(pc && pc.transceivers)) {
                return;
              }
              pc.transceivers.forEach(function (transceiver) {
                if (transceiver.iceTransport && transceiver.iceTransport.state === 'new' && transceiver.iceTransport.getRemoteCandidates().length > 0) {
                  console.warn('Timeout for addRemoteCandidate. Consider sending ' + 'an end-of-candidates notification');
                  transceiver.iceTransport.addRemoteCandidate({});
                }
              });
            }, 4000);

            return Promise.resolve();
          };

          RTCPeerConnection.prototype.close = function () {
            this.transceivers.forEach(function (transceiver) {
              /* not yet
              if (transceiver.iceGatherer) {
                transceiver.iceGatherer.close();
              }
              */
              if (transceiver.iceTransport) {
                transceiver.iceTransport.stop();
              }
              if (transceiver.dtlsTransport) {
                transceiver.dtlsTransport.stop();
              }
              if (transceiver.rtpSender) {
                transceiver.rtpSender.stop();
              }
              if (transceiver.rtpReceiver) {
                transceiver.rtpReceiver.stop();
              }
            });
            // FIXME: clean up tracks, local streams, remote streams, etc
            this._isClosed = true;
            this._updateSignalingState('closed');
          };

          // Update the signaling state.
          RTCPeerConnection.prototype._updateSignalingState = function (newState) {
            this.signalingState = newState;
            var event = new Event('signalingstatechange');
            this._dispatchEvent('signalingstatechange', event);
          };

          // Determine whether to fire the negotiationneeded event.
          RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
            var pc = this;
            if (this.signalingState !== 'stable' || this.needNegotiation === true) {
              return;
            }
            this.needNegotiation = true;
            window.setTimeout(function () {
              if (pc.needNegotiation) {
                pc.needNegotiation = false;
                var event = new Event('negotiationneeded');
                pc._dispatchEvent('negotiationneeded', event);
              }
            }, 0);
          };

          // Update the ice connection state.
          RTCPeerConnection.prototype._updateIceConnectionState = function () {
            var newState;
            var states = {
              'new': 0,
              closed: 0,
              checking: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
            };
            this.transceivers.forEach(function (transceiver) {
              if (transceiver.iceTransport && !transceiver.rejected) {
                states[transceiver.iceTransport.state]++;
              }
            });

            newState = 'new';
            if (states.failed > 0) {
              newState = 'failed';
            } else if (states.checking > 0) {
              newState = 'checking';
            } else if (states.disconnected > 0) {
              newState = 'disconnected';
            } else if (states.new > 0) {
              newState = 'new';
            } else if (states.connected > 0) {
              newState = 'connected';
            } else if (states.completed > 0) {
              newState = 'completed';
            }

            if (newState !== this.iceConnectionState) {
              this.iceConnectionState = newState;
              var event = new Event('iceconnectionstatechange');
              this._dispatchEvent('iceconnectionstatechange', event);
            }
          };

          // Update the connection state.
          RTCPeerConnection.prototype._updateConnectionState = function () {
            var newState;
            var states = {
              'new': 0,
              closed: 0,
              connecting: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
            };
            this.transceivers.forEach(function (transceiver) {
              if (transceiver.iceTransport && transceiver.dtlsTransport && !transceiver.rejected) {
                states[transceiver.iceTransport.state]++;
                states[transceiver.dtlsTransport.state]++;
              }
            });
            // ICETransport.completed and connected are the same for this purpose.
            states.connected += states.completed;

            newState = 'new';
            if (states.failed > 0) {
              newState = 'failed';
            } else if (states.connecting > 0) {
              newState = 'connecting';
            } else if (states.disconnected > 0) {
              newState = 'disconnected';
            } else if (states.new > 0) {
              newState = 'new';
            } else if (states.connected > 0) {
              newState = 'connected';
            }

            if (newState !== this.connectionState) {
              this.connectionState = newState;
              var event = new Event('connectionstatechange');
              this._dispatchEvent('connectionstatechange', event);
            }
          };

          RTCPeerConnection.prototype.createOffer = function () {
            var pc = this;

            if (pc._isClosed) {
              return Promise.reject(makeError('InvalidStateError', 'Can not call createOffer after close'));
            }

            var numAudioTracks = pc.transceivers.filter(function (t) {
              return t.kind === 'audio';
            }).length;
            var numVideoTracks = pc.transceivers.filter(function (t) {
              return t.kind === 'video';
            }).length;

            // Determine number of audio and video tracks we need to send/recv.
            var offerOptions = arguments[0];
            if (offerOptions) {
              // Reject Chrome legacy constraints.
              if (offerOptions.mandatory || offerOptions.optional) {
                throw new TypeError('Legacy mandatory/optional constraints not supported.');
              }
              if (offerOptions.offerToReceiveAudio !== undefined) {
                if (offerOptions.offerToReceiveAudio === true) {
                  numAudioTracks = 1;
                } else if (offerOptions.offerToReceiveAudio === false) {
                  numAudioTracks = 0;
                } else {
                  numAudioTracks = offerOptions.offerToReceiveAudio;
                }
              }
              if (offerOptions.offerToReceiveVideo !== undefined) {
                if (offerOptions.offerToReceiveVideo === true) {
                  numVideoTracks = 1;
                } else if (offerOptions.offerToReceiveVideo === false) {
                  numVideoTracks = 0;
                } else {
                  numVideoTracks = offerOptions.offerToReceiveVideo;
                }
              }
            }

            pc.transceivers.forEach(function (transceiver) {
              if (transceiver.kind === 'audio') {
                numAudioTracks--;
                if (numAudioTracks < 0) {
                  transceiver.wantReceive = false;
                }
              } else if (transceiver.kind === 'video') {
                numVideoTracks--;
                if (numVideoTracks < 0) {
                  transceiver.wantReceive = false;
                }
              }
            });

            // Create M-lines for recvonly streams.
            while (numAudioTracks > 0 || numVideoTracks > 0) {
              if (numAudioTracks > 0) {
                pc._createTransceiver('audio');
                numAudioTracks--;
              }
              if (numVideoTracks > 0) {
                pc._createTransceiver('video');
                numVideoTracks--;
              }
            }

            var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
            pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
              // For each track, create an ice gatherer, ice transport,
              // dtls transport, potentially rtpsender and rtpreceiver.
              var track = transceiver.track;
              var kind = transceiver.kind;
              var mid = transceiver.mid || SDPUtils.generateIdentifier();
              transceiver.mid = mid;

              if (!transceiver.iceGatherer) {
                transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, pc.usingBundle);
              }

              var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
              // filter RTX until additional stuff needed for RTX is implemented
              // in adapter.js
              if (edgeVersion < 15019) {
                localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
                  return codec.name !== 'rtx';
                });
              }
              localCapabilities.codecs.forEach(function (codec) {
                // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
                // by adding level-asymmetry-allowed=1
                if (codec.name === 'H264' && codec.parameters['level-asymmetry-allowed'] === undefined) {
                  codec.parameters['level-asymmetry-allowed'] = '1';
                }

                // for subsequent offers, we might have to re-use the payload
                // type of the last offer.
                if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) {
                  transceiver.remoteCapabilities.codecs.forEach(function (remoteCodec) {
                    if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() && codec.clockRate === remoteCodec.clockRate) {
                      codec.preferredPayloadType = remoteCodec.payloadType;
                    }
                  });
                }
              });
              localCapabilities.headerExtensions.forEach(function (hdrExt) {
                var remoteExtensions = transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions || [];
                remoteExtensions.forEach(function (rHdrExt) {
                  if (hdrExt.uri === rHdrExt.uri) {
                    hdrExt.id = rHdrExt.id;
                  }
                });
              });

              // generate an ssrc now, to be used later in rtpSender.send
              var sendEncodingParameters = transceiver.sendEncodingParameters || [{
                ssrc: (2 * sdpMLineIndex + 1) * 1001
              }];
              if (track) {
                // add RTX
                if (edgeVersion >= 15019 && kind === 'video' && !sendEncodingParameters[0].rtx) {
                  sendEncodingParameters[0].rtx = {
                    ssrc: sendEncodingParameters[0].ssrc + 1
                  };
                }
              }

              if (transceiver.wantReceive) {
                transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
              }

              transceiver.localCapabilities = localCapabilities;
              transceiver.sendEncodingParameters = sendEncodingParameters;
            });

            // always offer BUNDLE and dispose on return if not supported.
            if (pc._config.bundlePolicy !== 'max-compat') {
              sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
                return t.mid;
              }).join(' ') + '\r\n';
            }
            sdp += 'a=ice-options:trickle\r\n';

            pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
              sdp += writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', transceiver.stream, pc._dtlsRole);
              sdp += 'a=rtcp-rsize\r\n';

              if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' && (sdpMLineIndex === 0 || !pc.usingBundle)) {
                transceiver.iceGatherer.getLocalCandidates().forEach(function (cand) {
                  cand.component = 1;
                  sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
                });

                if (transceiver.iceGatherer.state === 'completed') {
                  sdp += 'a=end-of-candidates\r\n';
                }
              }
            });

            var desc = new window.RTCSessionDescription({
              type: 'offer',
              sdp: sdp
            });
            return Promise.resolve(desc);
          };

          RTCPeerConnection.prototype.createAnswer = function () {
            var pc = this;

            if (pc._isClosed) {
              return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer after close'));
            }

            if (!(pc.signalingState === 'have-remote-offer' || pc.signalingState === 'have-local-pranswer')) {
              return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer in signalingState ' + pc.signalingState));
            }

            var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
            if (pc.usingBundle) {
              sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
                return t.mid;
              }).join(' ') + '\r\n';
            }
            sdp += 'a=ice-options:trickle\r\n';

            var mediaSectionsInOffer = SDPUtils.getMediaSections(pc._remoteDescription.sdp).length;
            pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
              if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
                return;
              }
              if (transceiver.rejected) {
                if (transceiver.kind === 'application') {
                  if (transceiver.protocol === 'DTLS/SCTP') {
                    // legacy fmt
                    sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
                  } else {
                    sdp += 'm=application 0 ' + transceiver.protocol + ' webrtc-datachannel\r\n';
                  }
                } else if (transceiver.kind === 'audio') {
                  sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' + 'a=rtpmap:0 PCMU/8000\r\n';
                } else if (transceiver.kind === 'video') {
                  sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' + 'a=rtpmap:120 VP8/90000\r\n';
                }
                sdp += 'c=IN IP4 0.0.0.0\r\n' + 'a=inactive\r\n' + 'a=mid:' + transceiver.mid + '\r\n';
                return;
              }

              // FIXME: look at direction.
              if (transceiver.stream) {
                var localTrack;
                if (transceiver.kind === 'audio') {
                  localTrack = transceiver.stream.getAudioTracks()[0];
                } else if (transceiver.kind === 'video') {
                  localTrack = transceiver.stream.getVideoTracks()[0];
                }
                if (localTrack) {
                  // add RTX
                  if (edgeVersion >= 15019 && transceiver.kind === 'video' && !transceiver.sendEncodingParameters[0].rtx) {
                    transceiver.sendEncodingParameters[0].rtx = {
                      ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                    };
                  }
                }
              }

              // Calculate intersection of capabilities.
              var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);

              var hasRtx = commonCapabilities.codecs.filter(function (c) {
                return c.name.toLowerCase() === 'rtx';
              }).length;
              if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                delete transceiver.sendEncodingParameters[0].rtx;
              }

              sdp += writeMediaSection(transceiver, commonCapabilities, 'answer', transceiver.stream, pc._dtlsRole);
              if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) {
                sdp += 'a=rtcp-rsize\r\n';
              }
            });

            var desc = new window.RTCSessionDescription({
              type: 'answer',
              sdp: sdp
            });
            return Promise.resolve(desc);
          };

          RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
            var pc = this;
            var sections;
            if (candidate && !(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) {
              return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
            }

            // TODO: needs to go into ops queue.
            return new Promise(function (resolve, reject) {
              if (!pc._remoteDescription) {
                return reject(makeError('InvalidStateError', 'Can not add ICE candidate without a remote description'));
              } else if (!candidate || candidate.candidate === '') {
                for (var j = 0; j < pc.transceivers.length; j++) {
                  if (pc.transceivers[j].rejected) {
                    continue;
                  }
                  pc.transceivers[j].iceTransport.addRemoteCandidate({});
                  sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                  sections[j] += 'a=end-of-candidates\r\n';
                  pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
                  if (pc.usingBundle) {
                    break;
                  }
                }
              } else {
                var sdpMLineIndex = candidate.sdpMLineIndex;
                if (candidate.sdpMid) {
                  for (var i = 0; i < pc.transceivers.length; i++) {
                    if (pc.transceivers[i].mid === candidate.sdpMid) {
                      sdpMLineIndex = i;
                      break;
                    }
                  }
                }
                var transceiver = pc.transceivers[sdpMLineIndex];
                if (transceiver) {
                  if (transceiver.rejected) {
                    return resolve();
                  }
                  var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
                  // Ignore Chrome's invalid candidates since Edge does not like them.
                  if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
                    return resolve();
                  }
                  // Ignore RTCP candidates, we assume RTCP-MUX.
                  if (cand.component && cand.component !== 1) {
                    return resolve();
                  }
                  // when using bundle, avoid adding candidates to the wrong
                  // ice transport. And avoid adding candidates added in the SDP.
                  if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport) {
                    if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                      return reject(makeError('OperationError', 'Can not add ICE candidate'));
                    }
                  }

                  // update the remoteDescription.
                  var candidateString = candidate.candidate.trim();
                  if (candidateString.indexOf('a=') === 0) {
                    candidateString = candidateString.substr(2);
                  }
                  sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                  sections[sdpMLineIndex] += 'a=' + (cand.type ? candidateString : 'end-of-candidates') + '\r\n';
                  pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
                } else {
                  return reject(makeError('OperationError', 'Can not add ICE candidate'));
                }
              }
              resolve();
            });
          };

          RTCPeerConnection.prototype.getStats = function (selector) {
            if (selector && selector instanceof window.MediaStreamTrack) {
              var senderOrReceiver = null;
              this.transceivers.forEach(function (transceiver) {
                if (transceiver.rtpSender && transceiver.rtpSender.track === selector) {
                  senderOrReceiver = transceiver.rtpSender;
                } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track === selector) {
                  senderOrReceiver = transceiver.rtpReceiver;
                }
              });
              if (!senderOrReceiver) {
                throw makeError('InvalidAccessError', 'Invalid selector.');
              }
              return senderOrReceiver.getStats();
            }

            var promises = [];
            this.transceivers.forEach(function (transceiver) {
              ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function (method) {
                if (transceiver[method]) {
                  promises.push(transceiver[method].getStats());
                }
              });
            });
            return Promise.all(promises).then(function (allStats) {
              var results = new Map();
              allStats.forEach(function (stats) {
                stats.forEach(function (stat) {
                  results.set(stat.id, stat);
                });
              });
              return results;
            });
          };

          // fix low-level stat names and return Map instead of object.
          var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer', 'RTCIceTransport', 'RTCDtlsTransport'];
          ortcObjects.forEach(function (ortcObjectName) {
            var obj = window[ortcObjectName];
            if (obj && obj.prototype && obj.prototype.getStats) {
              var nativeGetstats = obj.prototype.getStats;
              obj.prototype.getStats = function () {
                return nativeGetstats.apply(this).then(function (nativeStats) {
                  var mapStats = new Map();
                  Object.keys(nativeStats).forEach(function (id) {
                    nativeStats[id].type = fixStatsType(nativeStats[id]);
                    mapStats.set(id, nativeStats[id]);
                  });
                  return mapStats;
                });
              };
            }
          });

          // legacy callback shims. Should be moved to adapter.js some days.
          var methods = ['createOffer', 'createAnswer'];
          methods.forEach(function (method) {
            var nativeMethod = RTCPeerConnection.prototype[method];
            RTCPeerConnection.prototype[method] = function () {
              var args = arguments;
              if (typeof args[0] === 'function' || typeof args[1] === 'function') {
                // legacy
                return nativeMethod.apply(this, [arguments[2]]).then(function (description) {
                  if (typeof args[0] === 'function') {
                    args[0].apply(null, [description]);
                  }
                }, function (error) {
                  if (typeof args[1] === 'function') {
                    args[1].apply(null, [error]);
                  }
                });
              }
              return nativeMethod.apply(this, arguments);
            };
          });

          methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
          methods.forEach(function (method) {
            var nativeMethod = RTCPeerConnection.prototype[method];
            RTCPeerConnection.prototype[method] = function () {
              var args = arguments;
              if (typeof args[1] === 'function' || typeof args[2] === 'function') {
                // legacy
                return nativeMethod.apply(this, arguments).then(function () {
                  if (typeof args[1] === 'function') {
                    args[1].apply(null);
                  }
                }, function (error) {
                  if (typeof args[2] === 'function') {
                    args[2].apply(null, [error]);
                  }
                });
              }
              return nativeMethod.apply(this, arguments);
            };
          });

          // getStats is special. It doesn't have a spec legacy method yet we support
          // getStats(something, cb) without error callbacks.
          ['getStats'].forEach(function (method) {
            var nativeMethod = RTCPeerConnection.prototype[method];
            RTCPeerConnection.prototype[method] = function () {
              var args = arguments;
              if (typeof args[1] === 'function') {
                return nativeMethod.apply(this, arguments).then(function () {
                  if (typeof args[1] === 'function') {
                    args[1].apply(null);
                  }
                });
              }
              return nativeMethod.apply(this, arguments);
            };
          });

          return RTCPeerConnection;
        };
      }, { "sdp": 17 }], 17: [function (require, module, exports) {

        // SDP helpers.

        var SDPUtils = {};

        // Generate an alphanumeric identifier for cname or mids.
        // TODO: use UUIDs instead? https://gist.github.com/jed/982883
        SDPUtils.generateIdentifier = function () {
          return Math.random().toString(36).substr(2, 10);
        };

        // The RTCP CNAME used by all peerconnections from the same JS.
        SDPUtils.localCName = SDPUtils.generateIdentifier();

        // Splits SDP into lines, dealing with both CRLF and LF.
        SDPUtils.splitLines = function (blob) {
          return blob.trim().split('\n').map(function (line) {
            return line.trim();
          });
        };
        // Splits SDP into sessionpart and mediasections. Ensures CRLF.
        SDPUtils.splitSections = function (blob) {
          var parts = blob.split('\nm=');
          return parts.map(function (part, index) {
            return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
          });
        };

        // returns the session description.
        SDPUtils.getDescription = function (blob) {
          var sections = SDPUtils.splitSections(blob);
          return sections && sections[0];
        };

        // returns the individual media sections.
        SDPUtils.getMediaSections = function (blob) {
          var sections = SDPUtils.splitSections(blob);
          sections.shift();
          return sections;
        };

        // Returns lines that start with a certain prefix.
        SDPUtils.matchPrefix = function (blob, prefix) {
          return SDPUtils.splitLines(blob).filter(function (line) {
            return line.indexOf(prefix) === 0;
          });
        };

        // Parses an ICE candidate line. Sample input:
        // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
        // rport 55996"
        SDPUtils.parseCandidate = function (line) {
          var parts;
          // Parse both variants.
          if (line.indexOf('a=candidate:') === 0) {
            parts = line.substring(12).split(' ');
          } else {
            parts = line.substring(10).split(' ');
          }

          var candidate = {
            foundation: parts[0],
            component: parseInt(parts[1], 10),
            protocol: parts[2].toLowerCase(),
            priority: parseInt(parts[3], 10),
            ip: parts[4],
            address: parts[4], // address is an alias for ip.
            port: parseInt(parts[5], 10),
            // skip parts[6] == 'typ'
            type: parts[7]
          };

          for (var i = 8; i < parts.length; i += 2) {
            switch (parts[i]) {
              case 'raddr':
                candidate.relatedAddress = parts[i + 1];
                break;
              case 'rport':
                candidate.relatedPort = parseInt(parts[i + 1], 10);
                break;
              case 'tcptype':
                candidate.tcpType = parts[i + 1];
                break;
              case 'ufrag':
                candidate.ufrag = parts[i + 1]; // for backward compability.
                candidate.usernameFragment = parts[i + 1];
                break;
              default:
                // extension handling, in particular ufrag
                candidate[parts[i]] = parts[i + 1];
                break;
            }
          }
          return candidate;
        };

        // Translates a candidate object into SDP candidate attribute.
        SDPUtils.writeCandidate = function (candidate) {
          var sdp = [];
          sdp.push(candidate.foundation);
          sdp.push(candidate.component);
          sdp.push(candidate.protocol.toUpperCase());
          sdp.push(candidate.priority);
          sdp.push(candidate.address || candidate.ip);
          sdp.push(candidate.port);

          var type = candidate.type;
          sdp.push('typ');
          sdp.push(type);
          if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
            sdp.push('raddr');
            sdp.push(candidate.relatedAddress);
            sdp.push('rport');
            sdp.push(candidate.relatedPort);
          }
          if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
            sdp.push('tcptype');
            sdp.push(candidate.tcpType);
          }
          if (candidate.usernameFragment || candidate.ufrag) {
            sdp.push('ufrag');
            sdp.push(candidate.usernameFragment || candidate.ufrag);
          }
          return 'candidate:' + sdp.join(' ');
        };

        // Parses an ice-options line, returns an array of option tags.
        // a=ice-options:foo bar
        SDPUtils.parseIceOptions = function (line) {
          return line.substr(14).split(' ');
        };

        // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
        // a=rtpmap:111 opus/48000/2
        SDPUtils.parseRtpMap = function (line) {
          var parts = line.substr(9).split(' ');
          var parsed = {
            payloadType: parseInt(parts.shift(), 10) // was: id
          };

          parts = parts[0].split('/');

          parsed.name = parts[0];
          parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
          parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
          // legacy alias, got renamed back to channels in ORTC.
          parsed.numChannels = parsed.channels;
          return parsed;
        };

        // Generate an a=rtpmap line from RTCRtpCodecCapability or
        // RTCRtpCodecParameters.
        SDPUtils.writeRtpMap = function (codec) {
          var pt = codec.payloadType;
          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }
          var channels = codec.channels || codec.numChannels || 1;
          return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
        };

        // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
        // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
        // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
        SDPUtils.parseExtmap = function (line) {
          var parts = line.substr(9).split(' ');
          return {
            id: parseInt(parts[0], 10),
            direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
            uri: parts[1]
          };
        };

        // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
        // RTCRtpHeaderExtension.
        SDPUtils.writeExtmap = function (headerExtension) {
          return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
        };

        // Parses an ftmp line, returns dictionary. Sample input:
        // a=fmtp:96 vbr=on;cng=on
        // Also deals with vbr=on; cng=on
        SDPUtils.parseFmtp = function (line) {
          var parsed = {};
          var kv;
          var parts = line.substr(line.indexOf(' ') + 1).split(';');
          for (var j = 0; j < parts.length; j++) {
            kv = parts[j].trim().split('=');
            parsed[kv[0].trim()] = kv[1];
          }
          return parsed;
        };

        // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
        SDPUtils.writeFmtp = function (codec) {
          var line = '';
          var pt = codec.payloadType;
          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }
          if (codec.parameters && Object.keys(codec.parameters).length) {
            var params = [];
            Object.keys(codec.parameters).forEach(function (param) {
              if (codec.parameters[param]) {
                params.push(param + '=' + codec.parameters[param]);
              } else {
                params.push(param);
              }
            });
            line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
          }
          return line;
        };

        // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
        // a=rtcp-fb:98 nack rpsi
        SDPUtils.parseRtcpFb = function (line) {
          var parts = line.substr(line.indexOf(' ') + 1).split(' ');
          return {
            type: parts.shift(),
            parameter: parts.join(' ')
          };
        };
        // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
        SDPUtils.writeRtcpFb = function (codec) {
          var lines = '';
          var pt = codec.payloadType;
          if (codec.preferredPayloadType !== undefined) {
            pt = codec.preferredPayloadType;
          }
          if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
            // FIXME: special handling for trr-int?
            codec.rtcpFeedback.forEach(function (fb) {
              lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
            });
          }
          return lines;
        };

        // Parses an RFC 5576 ssrc media attribute. Sample input:
        // a=ssrc:3735928559 cname:something
        SDPUtils.parseSsrcMedia = function (line) {
          var sp = line.indexOf(' ');
          var parts = {
            ssrc: parseInt(line.substr(7, sp - 7), 10)
          };
          var colon = line.indexOf(':', sp);
          if (colon > -1) {
            parts.attribute = line.substr(sp + 1, colon - sp - 1);
            parts.value = line.substr(colon + 1);
          } else {
            parts.attribute = line.substr(sp + 1);
          }
          return parts;
        };

        SDPUtils.parseSsrcGroup = function (line) {
          var parts = line.substr(13).split(' ');
          return {
            semantics: parts.shift(),
            ssrcs: parts.map(function (ssrc) {
              return parseInt(ssrc, 10);
            })
          };
        };

        // Extracts the MID (RFC 5888) from a media section.
        // returns the MID or undefined if no mid line was found.
        SDPUtils.getMid = function (mediaSection) {
          var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
          if (mid) {
            return mid.substr(6);
          }
        };

        SDPUtils.parseFingerprint = function (line) {
          var parts = line.substr(14).split(' ');
          return {
            algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
            value: parts[1]
          };
        };

        // Extracts DTLS parameters from SDP media section or sessionpart.
        // FIXME: for consistency with other functions this should only
        //   get the fingerprint line as input. See also getIceParameters.
        SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
          var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
          // Note: a=setup line is ignored since we use the 'auto' role.
          // Note2: 'algorithm' is not case sensitive except in Edge.
          return {
            role: 'auto',
            fingerprints: lines.map(SDPUtils.parseFingerprint)
          };
        };

        // Serializes DTLS parameters to SDP.
        SDPUtils.writeDtlsParameters = function (params, setupType) {
          var sdp = 'a=setup:' + setupType + '\r\n';
          params.fingerprints.forEach(function (fp) {
            sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
          });
          return sdp;
        };
        // Parses ICE information from SDP media section or sessionpart.
        // FIXME: for consistency with other functions this should only
        //   get the ice-ufrag and ice-pwd lines as input.
        SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
          var lines = SDPUtils.splitLines(mediaSection);
          // Search in session part, too.
          lines = lines.concat(SDPUtils.splitLines(sessionpart));
          var iceParameters = {
            usernameFragment: lines.filter(function (line) {
              return line.indexOf('a=ice-ufrag:') === 0;
            })[0].substr(12),
            password: lines.filter(function (line) {
              return line.indexOf('a=ice-pwd:') === 0;
            })[0].substr(10)
          };
          return iceParameters;
        };

        // Serializes ICE parameters to SDP.
        SDPUtils.writeIceParameters = function (params) {
          return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
        };

        // Parses the SDP media section and returns RTCRtpParameters.
        SDPUtils.parseRtpParameters = function (mediaSection) {
          var description = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: []
          };
          var lines = SDPUtils.splitLines(mediaSection);
          var mline = lines[0].split(' ');
          for (var i = 3; i < mline.length; i++) {
            // find all codecs from mline[3..]
            var pt = mline[i];
            var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
            if (rtpmapline) {
              var codec = SDPUtils.parseRtpMap(rtpmapline);
              var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
              // Only the first a=fmtp:<pt> is considered.
              codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
              codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
              description.codecs.push(codec);
              // parse FEC mechanisms from rtpmap lines.
              switch (codec.name.toUpperCase()) {
                case 'RED':
                case 'ULPFEC':
                  description.fecMechanisms.push(codec.name.toUpperCase());
                  break;
                default:
                  // only RED and ULPFEC are recognized as FEC mechanisms.
                  break;
              }
            }
          }
          SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
            description.headerExtensions.push(SDPUtils.parseExtmap(line));
          });
          // FIXME: parse rtcp.
          return description;
        };

        // Generates parts of the SDP media section describing the capabilities /
        // parameters.
        SDPUtils.writeRtpDescription = function (kind, caps) {
          var sdp = '';

          // Build the mline.
          sdp += 'm=' + kind + ' ';
          sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
          sdp += ' UDP/TLS/RTP/SAVPF ';
          sdp += caps.codecs.map(function (codec) {
            if (codec.preferredPayloadType !== undefined) {
              return codec.preferredPayloadType;
            }
            return codec.payloadType;
          }).join(' ') + '\r\n';

          sdp += 'c=IN IP4 0.0.0.0\r\n';
          sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

          // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
          caps.codecs.forEach(function (codec) {
            sdp += SDPUtils.writeRtpMap(codec);
            sdp += SDPUtils.writeFmtp(codec);
            sdp += SDPUtils.writeRtcpFb(codec);
          });
          var maxptime = 0;
          caps.codecs.forEach(function (codec) {
            if (codec.maxptime > maxptime) {
              maxptime = codec.maxptime;
            }
          });
          if (maxptime > 0) {
            sdp += 'a=maxptime:' + maxptime + '\r\n';
          }
          sdp += 'a=rtcp-mux\r\n';

          if (caps.headerExtensions) {
            caps.headerExtensions.forEach(function (extension) {
              sdp += SDPUtils.writeExtmap(extension);
            });
          }
          // FIXME: write fecMechanisms.
          return sdp;
        };

        // Parses the SDP media section and returns an array of
        // RTCRtpEncodingParameters.
        SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
          var encodingParameters = [];
          var description = SDPUtils.parseRtpParameters(mediaSection);
          var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
          var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

          // filter a=ssrc:... cname:, ignore PlanB-msid
          var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (parts) {
            return parts.attribute === 'cname';
          });
          var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
          var secondarySsrc;

          var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
            var parts = line.substr(17).split(' ');
            return parts.map(function (part) {
              return parseInt(part, 10);
            });
          });
          if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
            secondarySsrc = flows[0][1];
          }

          description.codecs.forEach(function (codec) {
            if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
              var encParam = {
                ssrc: primarySsrc,
                codecPayloadType: parseInt(codec.parameters.apt, 10)
              };
              if (primarySsrc && secondarySsrc) {
                encParam.rtx = { ssrc: secondarySsrc };
              }
              encodingParameters.push(encParam);
              if (hasRed) {
                encParam = JSON.parse(JSON.stringify(encParam));
                encParam.fec = {
                  ssrc: primarySsrc,
                  mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
                };
                encodingParameters.push(encParam);
              }
            }
          });
          if (encodingParameters.length === 0 && primarySsrc) {
            encodingParameters.push({
              ssrc: primarySsrc
            });
          }

          // we support both b=AS and b=TIAS but interpret AS as TIAS.
          var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
          if (bandwidth.length) {
            if (bandwidth[0].indexOf('b=TIAS:') === 0) {
              bandwidth = parseInt(bandwidth[0].substr(7), 10);
            } else if (bandwidth[0].indexOf('b=AS:') === 0) {
              // use formula from JSEP to convert b=AS to TIAS value.
              bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
            } else {
              bandwidth = undefined;
            }
            encodingParameters.forEach(function (params) {
              params.maxBitrate = bandwidth;
            });
          }
          return encodingParameters;
        };

        // parses http://draft.ortc.org/#rtcrtcpparameters*
        SDPUtils.parseRtcpParameters = function (mediaSection) {
          var rtcpParameters = {};

          // Gets the first SSRC. Note tha with RTX there might be multiple
          // SSRCs.
          var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (obj) {
            return obj.attribute === 'cname';
          })[0];
          if (remoteSsrc) {
            rtcpParameters.cname = remoteSsrc.value;
            rtcpParameters.ssrc = remoteSsrc.ssrc;
          }

          // Edge uses the compound attribute instead of reducedSize
          // compound is !reducedSize
          var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
          rtcpParameters.reducedSize = rsize.length > 0;
          rtcpParameters.compound = rsize.length === 0;

          // parses the rtcp-mux attrіbute.
          // Note that Edge does not support unmuxed RTCP.
          var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
          rtcpParameters.mux = mux.length > 0;

          return rtcpParameters;
        };

        // parses either a=msid: or a=ssrc:... msid lines and returns
        // the id of the MediaStream and MediaStreamTrack.
        SDPUtils.parseMsid = function (mediaSection) {
          var parts;
          var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
          if (spec.length === 1) {
            parts = spec[0].substr(7).split(' ');
            return { stream: parts[0], track: parts[1] };
          }
          var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
            return SDPUtils.parseSsrcMedia(line);
          }).filter(function (msidParts) {
            return msidParts.attribute === 'msid';
          });
          if (planB.length > 0) {
            parts = planB[0].value.split(' ');
            return { stream: parts[0], track: parts[1] };
          }
        };

        // Generate a session ID for SDP.
        // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
        // recommends using a cryptographically random +ve 64-bit value
        // but right now this should be acceptable and within the right range
        SDPUtils.generateSessionId = function () {
          return Math.random().toString().substr(2, 21);
        };

        // Write boilder plate for start of SDP
        // sessId argument is optional - if not supplied it will
        // be generated randomly
        // sessVersion is optional and defaults to 2
        // sessUser is optional and defaults to 'thisisadapterortc'
        SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
          var sessionId;
          var version = sessVer !== undefined ? sessVer : 2;
          if (sessId) {
            sessionId = sessId;
          } else {
            sessionId = SDPUtils.generateSessionId();
          }
          var user = sessUser || 'thisisadapterortc';
          // FIXME: sess-id should be an NTP timestamp.
          return 'v=0\r\n' + 'o=' + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
        };

        SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
          var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

          // Map ICE parameters (ufrag, pwd) to SDP.
          sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

          // Map DTLS parameters to SDP.
          sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');

          sdp += 'a=mid:' + transceiver.mid + '\r\n';

          if (transceiver.direction) {
            sdp += 'a=' + transceiver.direction + '\r\n';
          } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
            sdp += 'a=sendrecv\r\n';
          } else if (transceiver.rtpSender) {
            sdp += 'a=sendonly\r\n';
          } else if (transceiver.rtpReceiver) {
            sdp += 'a=recvonly\r\n';
          } else {
            sdp += 'a=inactive\r\n';
          }

          if (transceiver.rtpSender) {
            // spec.
            var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
            sdp += 'a=' + msid;

            // for Chrome.
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
            if (transceiver.sendEncodingParameters[0].rtx) {
              sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
              sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
            }
          }
          // FIXME: this should be written by writeRtpDescription.
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
          }
          return sdp;
        };

        // Gets the direction from the mediaSection or the sessionpart.
        SDPUtils.getDirection = function (mediaSection, sessionpart) {
          // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
          var lines = SDPUtils.splitLines(mediaSection);
          for (var i = 0; i < lines.length; i++) {
            switch (lines[i]) {
              case 'a=sendrecv':
              case 'a=sendonly':
              case 'a=recvonly':
              case 'a=inactive':
                return lines[i].substr(2);
              default:
              // FIXME: What should happen here?
            }
          }
          if (sessionpart) {
            return SDPUtils.getDirection(sessionpart);
          }
          return 'sendrecv';
        };

        SDPUtils.getKind = function (mediaSection) {
          var lines = SDPUtils.splitLines(mediaSection);
          var mline = lines[0].split(' ');
          return mline[0].substr(2);
        };

        SDPUtils.isRejected = function (mediaSection) {
          return mediaSection.split(' ', 2)[1] === '0';
        };

        SDPUtils.parseMLine = function (mediaSection) {
          var lines = SDPUtils.splitLines(mediaSection);
          var parts = lines[0].substr(2).split(' ');
          return {
            kind: parts[0],
            port: parseInt(parts[1], 10),
            protocol: parts[2],
            fmt: parts.slice(3).join(' ')
          };
        };

        SDPUtils.parseOLine = function (mediaSection) {
          var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
          var parts = line.substr(2).split(' ');
          return {
            username: parts[0],
            sessionId: parts[1],
            sessionVersion: parseInt(parts[2], 10),
            netType: parts[3],
            addressType: parts[4],
            address: parts[5]
          };
        };

        // a very naive interpretation of a valid SDP.
        SDPUtils.isValidSDP = function (blob) {
          if (typeof blob !== 'string' || blob.length === 0) {
            return false;
          }
          var lines = SDPUtils.splitLines(blob);
          for (var i = 0; i < lines.length; i++) {
            if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
              return false;
            }
            // TODO: check the modifier a bit more.
          }
          return true;
        };

        // Expose public methods.
        if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
          module.exports = SDPUtils;
        }
      }, {}] }, {}, [1])(1);
  }

  var init = function init() {
    window.adapter = Adapter();
  };

  var RTCAdapter = {
    init: init
  };

  function ReportHandler(im) {
    var pc = null,
        reportTimer = 0;

    var TrackCache = utils.Cache();
    var TrackStateCache = utils.Cache();
    var setTrackCache = function setTrackCache(stream, user) {
      var tracks = stream.getTracks();
      var id = user.id,
          tag = user.stream.tag;

      utils.forEach(tracks, function (_ref) {
        var trackId = _ref.id;

        TrackCache.set(trackId, {
          id: id,
          stream: { tag: tag }
        });
      });
    };
    var getAudioLevel = function getAudioLevel(level) {
      level = level || 0;
      var index = Math.floor(level / 1000);
      if (index >= AUDIO_LEVEL.length) {
        index = 0;
      }
      return AUDIO_LEVEL[index];
    };
    var resourceHandler = function resourceHandler(stat) {
      var trackId = stat.googTrackId,
          mediaType = stat.mediaType;

      if (utils.isEqual(mediaType, 'audio')) {
        // 不区分 Input、Output 最终对应用层按 user 暴露
        var audioLevel = stat['audioOutputLevel'] || stat['audioInputLevel'];
        audioLevel = getAudioLevel(audioLevel);
        var latestLevel = TrackStateCache.get(trackId);
        if (!utils.isEqual(latestLevel, audioLevel)) {
          var user = TrackCache.get(trackId);
          if (utils.isObject(user)) {
            utils.extend(user.stream, {
              audioLevel: audioLevel
            });
            TrackStateCache.set(trackId, audioLevel);
            im.emit(DownEvent.REPORT_SPOKE, user);
          }
        }
      }
    };
    var statsHandler = function statsHandler(stats) {
      utils.forEach(stats, function (stat) {
        var type = stat.type;

        if (utils.isInclude(type, 'ssrc')) {
          resourceHandler(stat);
        }
      });
    };
    var clear = function clear() {
      if (reportTimer) {
        clearInterval(reportTimer);
      }
    };
    var globalPC = PeerConnection.getInstance();
    if (globalPC) {
      pc = globalPC;
    }
    im.on(CommonEvent.PEERCONN_CREATED, function (error, _pc) {
      if (error) {
        throw error;
      }
      pc = _pc;
    });
    im.on(CommonEvent.PEERCONN_DESTROYED, function (error) {
      if (error) {
        throw error;
      }
      clear();
    });
    im.on(CommonEvent.LEFT, function () {
      TrackCache.clear();
      TrackStateCache.clear();
      clear();
    });
    im.on(CommonEvent.PUBLISHED_STREAM, function (error, data) {
      if (error) {
        throw error;
      }
      var mediaStream = data.mediaStream,
          user = data.user;

      setTrackCache(mediaStream, user);
    });

    var start = function start(_option) {
      var option = {
        frequency: REPORT_FREQUENCY
      };
      if (utils.isObject(_option)) {
        utils.extend(option, _option);
      }
      if (isSafari()) {
        return;
      }
      if (reportTimer) {
        clear();
      }
      reportTimer = setInterval(function () {
        if (!pc) {
          return clear();
        }
        pc.getStats(function (stats) {
          statsHandler(stats);
        });
      }, option.frequency);
      return utils.Defer.resolve();
    };
    var stop = function stop() {
      clear();
      return utils.Defer.resolve();
    };
    var dispatch = function dispatch(event, args) {
      switch (event) {
        case UpEvent.REPORT_START:
          return start.apply(undefined, toConsumableArray(args));
        case UpEvent.REPORT_STOP:
          return stop.apply(undefined, toConsumableArray(args));
      }
    };
    return {
      dispatch: dispatch
    };
  }

  var Client = function (_EventEmitter) {
    inherits(Client, _EventEmitter);

    /* 
      let option = {
        url: 'mediaServer path',
        RongIMLib
      };
    */
    function Client(option, rongRTC) {
      classCallCheck(this, Client);

      var _this = possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this));

      RTCAdapter.init();
      var context = _this;
      var im = new IM(option);
      var RequestHandler = {
        room: RoomHandler(im, option),
        stream: StreamHandler(im, option, rongRTC),
        storage: StorageHandler(im),
        message: MessageHandler(im),
        device: DeviceHandler(im),
        report: ReportHandler(im)
      };
      Stat(im, option);
      var RongIMLib = option.RongIMLib;

      var destroyed = false;
      utils.extend(context, {
        RongIMLib: RongIMLib,
        option: option,
        destroyed: destroyed,
        im: im,
        RequestHandler: RequestHandler,
        rongRTC: rongRTC
      });
      var bindEvent = function bindEvent(event) {
        var name = event.name;

        im.on(name, function (error, user) {
          context.emit(name, user, error);
        });
      };
      // 离开房间时, 需将 client 绑定的 RoomEvents 事件取消, 否则重新加入房间会重复触发前后多次的监听
      var unbindRoomEvents = function unbindRoomEvents() {
        utils.forEach(RoomEvents, function (event) {
          var name = event.name;

          context.off(name);
        });
      };
      utils.forEach(RoomEvents, bindEvent);
      im.on(CommonEvent.JOINED, function () {
        var urls = im.getMSUrl();
        var customUrl = option.url;

        if (!utils.isEmpty(customUrl)) {
          request$1.addUrl(customUrl);
        }
        if (utils.isEmpty(urls)) {
          var Inner = ErrorType.Inner;

          var error = Inner.ENGINE_ERROR;
          return context.emit(DownEvent.RTC_ERROR, error);
        }
        !request$1.isUrlsExisted(urls) && request$1.addUrls(urls);
        context.emit(DownEvent.RTC_MOUNTED);
      });
      im.on(CommonEvent.LEFT, function () {
        unbindRoomEvents();
        context.emit(DownEvent.RTC_UNMOUNTED);
      });
      im.on(CommonEvent.ERROR, function (error, data) {
        context.emit(DownEvent.RTC_ERROR, data, error);
      });
      im.on(DownEvent.MESSAGE_RECEIVED, function (error, message) {
        context.emit(DownEvent.MESSAGE_RECEIVED, message, error);
      });
      im.on(DownEvent.REPORT_SPOKE, function (error, user) {
        context.emit(DownEvent.REPORT_SPOKE, user, error);
      });
      im.on(DownEvent.MONITOR_STATS, function (error, data) {
        context.emit(DownEvent.MONITOR_STATS, data, error);
      });
      var getMSType = function getMSType(uris) {
        var check$$1 = function check$$1(msType) {
          return utils.some(uris, function (_ref) {
            var mediaType = _ref.mediaType;

            // return utils.isEqual(msType, mediaType) && utils.isEqual(state, StreamState.ENABLE);
            // 只区分 track 不区分
            return utils.isEqual(msType, mediaType);
          });
        };
        var type = StreamType.NODE;
        var hasAudio = check$$1(StreamType.AUDIO);
        var hasVideo = check$$1(StreamType.VIDEO);
        if (hasAudio) {
          type = StreamType.AUDIO;
        }
        if (hasVideo) {
          type = StreamType.VIDEO;
        }
        if (hasVideo && hasAudio) {
          type = StreamType.AUDIO_AND_VIDEO;
        }
        return type;
      };
      var eventHandler = function eventHandler(name, result, error) {
        var id = result.id,
            _result$stream = result.stream,
            tag = _result$stream.tag,
            uris = _result$stream.uris;

        var type = getMSType(uris);
        var user = {
          id: id,
          stream: {
            tag: tag,
            type: type
          }
        };
        context.emit(name, user, error);
      };
      im.on(DownEvent.STREAM_PUBLISHED, function (error, user) {
        eventHandler(DownEvent.STREAM_PUBLISHED, user, error);
      });
      im.on(DownEvent.STREAM_UNPUBLISHED, function (error, user) {
        eventHandler(DownEvent.STREAM_UNPUBLISHED, user, error);
      });
      im.on(DownEvent.STREAM_DISABLED, function (error, user) {
        eventHandler(DownEvent.STREAM_DISABLED, user, error);
      });
      im.on(DownEvent.STREAM_ENABLED, function (error, user) {
        eventHandler(DownEvent.STREAM_ENABLED, user, error);
      });
      im.on(DownEvent.STREAM_MUTED, function (error, user) {
        eventHandler(DownEvent.STREAM_MUTED, user, error);
      });
      im.on(DownEvent.STREAM_UNMUTED, function (error, user) {
        eventHandler(DownEvent.STREAM_UNMUTED, user, error);
      });
      return _this;
    }

    createClass(Client, [{
      key: 'exec',
      value: function exec(params) {
        var context = this;
        var im = context.im,
            rongRTC = context.rongRTC;
        // let liveRole = rongRTC.getLiveRole();

        var isLiveAudience$$1 = isLiveAudience(rongRTC);

        if (context.isDestroyed()) {
          return utils.Defer.reject(ErrorType.Inner.INSTANCE_IS_DESTROYED);
        }
        if (!im.isSupportRTC()) {
          return utils.Defer.reject(ErrorType.Inner.IM_SDK_VER_NOT_MATCH);
        }
        var type = params.type,
            args = params.args,
            event = params.event;

        var APIWhitelist = [UpEvent.ROOM_JOIN, UpEvent.DEVICE_GET, UpEvent.STREAM_GET];
        var isNeedJoined = !utils.isInclude(APIWhitelist, event);
        var AudienceEvents = [UpEvent.STREAM_SUBSCRIBE, UpEvent.STREAM_UNSUBSCRIBE];
        var isValidAudienceEvent = utils.isInclude(AudienceEvents, event);

        // 判断是否链接 IM
        if (!im.isIMReady() && isNeedJoined) {
          return utils.Defer.reject(ErrorType.Inner.IM_NOT_CONNECTED);
        }

        // 判断是否加入房间
        if (isNeedJoined && !im.isJoined() && !isLiveAudience$$1) {
          return utils.Defer.reject(ErrorType.Inner.RTC_NOT_JOIN_ROOM);
        }

        // 判断观众端是否非法调用
        if (isLiveAudience$$1 && !isValidAudienceEvent) {
          return utils.Defer.reject(ErrorType.Inner.WRONG_AUDIENCE_EVENT);
        }

        var RequestHandler = this.RequestHandler;

        Logger$1.log(type, {
          func: event,
          type: EventType.REQUEST,
          args: args
        });
        var defer = RequestHandler[type].dispatch(event, args);
        return utils.isPromise(defer) ? defer.then(function (result) {
          Logger$1.log(type, {
            func: event,
            type: EventType.RESPONSE,
            result: result
          });
          return result;
        }, function (error) {
          Logger$1.error(type, {
            func: event,
            type: EventType.RESPONSE,
            error: error
          });
          error = utils.rename(error, {
            resultCode: 'code'
          });
          throw error;
        }) : defer;
      }
    }, {
      key: 'isDestroyed',
      value: function isDestroyed() {
        return this.destroyed;
      }
    }, {
      key: 'extendOption',
      value: function extendOption(_option) {
        var context = this;
        utils.extend(context.option, _option);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var context = this;
        utils.extend(context, {
          destroyed: true
        });
        context.teardown();
        context.im.teardown();
      }
    }]);
    return Client;
  }(EventEmitter);

  var Storage$2 = function () {
    function Storage(_option) {
      classCallCheck(this, Storage);

      _option = _option || {};
      var context = this;
      var client = context.getClient();
      var option = {
        type: StorageType.ROOM
      };
      utils.extend(option, _option);
      utils.extend(context, {
        option: option,
        client: client
      });
    }

    createClass(Storage, [{
      key: 'set',
      value: function set$$1(key, value, message) {
        var _check = check({ key: key, value: value }, ['key', 'value']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_SET,
          type: 'storage',
          args: [type, key, value, message]
        });
      }
    }, {
      key: 'get',
      value: function get$$1(key) {
        var _check2 = check({ key: key }, ['key']),
            isIllegal = _check2.isIllegal,
            name = _check2.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_GET,
          type: 'storage',
          args: [type, key]
        });
      }
    }, {
      key: 'remove',
      value: function remove(key, message) {
        var _check3 = check({ key: key }, ['key']),
            isIllegal = _check3.isIllegal,
            name = _check3.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client,
            type = context.option.type;

        return client.exec({
          event: UpEvent.STORAGE_REMOVE,
          type: 'storage',
          args: [type, key, message]
        });
      }
    }]);
    return Storage;
  }();

  var Message$1 = function () {
    function Message(_option) {
      classCallCheck(this, Message);

      var context = this;
      var client = context.getClient();
      var option = {
        received: function received() {}
      };
      utils.extend(option, _option);
      utils.extend(context, {
        client: client,
        option: option
      });
      utils.forEach(MessageEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, message) {
          event = option[type] || utils.noop;
          event(message, error);
          Logger$1.log(LogTag.MESSAGE, {
            event: type,
            message: message
          });
        });
      });
    }

    createClass(Message, [{
      key: 'send',
      value: function send(message) {
        var _check = check(message, ['name', 'content']),
            isIllegal = _check.isIllegal,
            name = _check.name;

        if (isIllegal) {
          var error = getError(name);
          return utils.Defer.reject(error);
        }
        var context = this;
        var client = context.client;

        return client.exec({
          event: UpEvent.MESSAGE_SEND,
          type: 'message',
          args: [message]
        });
      }
    }]);
    return Message;
  }();

  var Device = function () {
    function Device() {
      classCallCheck(this, Device);

      var context = this;
      var client = context.getClient();
      utils.extend(context, {
        client: client
      });
    }

    createClass(Device, [{
      key: 'get',
      value: function get$$1() {
        var client = this.client;

        return client.exec({
          event: UpEvent.DEVICE_GET,
          type: 'device',
          args: []
        });
      }
    }]);
    return Device;
  }();

  var Report = function () {
    function Report(_option) {
      classCallCheck(this, Report);

      var context = this;
      var client = context.getClient();
      var option = {
        received: function received() {}
      };
      utils.extend(option, _option);
      utils.extend(context, {
        client: client,
        option: option
      });
      utils.forEach(ReportEvents, function (event) {
        var _event = event,
            name = _event.name,
            type = _event.type;

        client.on(name, function (error, report) {
          event = option[type] || utils.noop;
          event(report, error);
        });
      });
    }

    createClass(Report, [{
      key: 'start',
      value: function start(option) {
        var client = this.client;

        return client.exec({
          event: UpEvent.REPORT_START,
          type: 'report',
          args: [option]
        });
      }
    }, {
      key: 'stop',
      value: function stop() {
        var client = this.client;

        return client.exec({
          event: UpEvent.REPORT_STOP,
          type: 'report',
          args: []
        });
      }
    }]);
    return Report;
  }();

  // import { UpEvent } from '../event-name';

  var Monitor = function Monitor(_option) {
    classCallCheck(this, Monitor);

    var context = this;
    var client = context.getClient();
    var option = {
      stats: function stats() {}
    };
    utils.extend(option, _option);
    utils.extend(context, {
      client: client,
      option: option
    });
    utils.forEach(MonitorEvents, function (event) {
      var _event = event,
          name = _event.name,
          type = _event.type;

      client.on(name, function (error, monitor) {
        event = option[type] || utils.noop;
        event(monitor, error);
      });
    });
  };

  var RongRTC = function () {
    function RongRTC(_option) {
      classCallCheck(this, RongRTC);

      var context = this;
      var option = {
        url: '',
        debug: false,
        bitrate: {
          max: 0,
          min: 0,
          start: 0
        },
        mode: RTC_MODE.RTC,
        liveRole: LIVE_ROLE.ANCHOR,
        liveType: LIVE_TYPE.AUDIO_AND_VIDEO,
        setUserId: true,
        created: function created() {},
        mounted: function mounted() {},
        unmounted: function unmounted() {},
        destroyed: function destroyed() {},
        error: function error() {}
      };
      utils.extend(option, _option);

      var logger = option.logger,
          debug = option.debug;
      var Outer = ErrorType.Outer;

      if (utils.isFunction(logger)) {
        Logger$1.watch(logger, true);
      }
      if (debug) {
        Logger$1.watch(function (log) {
          utils.Log.log(log);
        });
      }
      utils.extend(context, {
        Room: Room,
        Stream: Stream,
        Storage: Storage$2,
        StreamType: StreamType,
        StreamSize: StreamSize,
        StorageType: StorageType,
        Mode: RTC_MODE,
        ROLE: LIVE_ROLE,
        LiveType: LIVE_TYPE,
        LayoutMode: LIVE_LAYOUT_MODE,
        RenderMode: LIVE_RENDER_MODE,
        Resolution: RongRTCVideoResolution,
        RongRTCVideoFps: RongRTCVideoFps,
        Message: Message$1,
        Device: Device,
        Report: Report,
        Monitor: Monitor,
        ErrorType: Outer,
        option: option
      });
      IMLogger.init(_option.RongIMLib);
      var client = new Client(option, context);
      utils.forEach([Room, Stream, Storage$2, Message$1, Device, Report, Monitor], function (module) {
        module.prototype.getClient = function () {
          return client;
        };
      });
      utils.extend(context, {
        client: client
      });
      var created = option.created,
          mounted = option.mounted,
          unmounted = option.unmounted,
          error = option.error;

      created();
      Logger$1.log(LogTag.LIFECYCLE, {
        state: 'created'
      });
      client.on(DownEvent.RTC_MOUNTED, function () {
        mounted();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'mounted'
        });
      });
      client.on(DownEvent.RTC_UNMOUNTED, function () {
        unmounted();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'unmounted'
        });
      });
      client.on(DownEvent.RTC_ERROR, function (e, data) {
        if (e) {
          throw new Error(e);
        }
        error(data);
      });
    }

    createClass(RongRTC, [{
      key: 'changeLiveRole',
      value: function changeLiveRole(newRole) {
        var context = this;
        var liveRole = context.option.liveRole,
            im = context.client.im;

        if (isAudienceToAnchor(newRole, liveRole)) {
          context.option.liveRole = newRole;
          im.emit(CommonEvent.CHANGE_ROLE, {
            oldRole: liveRole,
            newRole: newRole
          });
          return utils.Defer.resolve();
        } else {
          return utils.Defer.reject(ErrorType.Inner.WRONG_ROLE_SETTING);
        }
      }
    }, {
      key: 'getLiveRole',
      value: function getLiveRole() {
        var liveRole = this.option.liveRole;

        return liveRole;
      }
    }, {
      key: 'getClientId',
      value: function getClientId() {
        return getClientID();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var destroyed = this.option.destroyed,
            client = this.client;

        destroyed();
        client.destroy();
        Logger$1.log(LogTag.LIFECYCLE, {
          state: 'destroyed'
        });
      }
    }]);
    return RongRTC;
  }();

  utils.extend(RongRTC, {
    StreamType: StreamType,
    StreamSize: StreamSize,
    StorageType: StorageType,
    Mode: RTC_MODE,
    ROLE: LIVE_ROLE,
    LiveType: LIVE_TYPE,
    LayoutMode: LIVE_LAYOUT_MODE,
    RenderMode: LIVE_RENDER_MODE,
    Resolution: RongRTCVideoResolution,
    RongRTCVideoFps: RongRTCVideoFps
  });

  return RongRTC;

})));
