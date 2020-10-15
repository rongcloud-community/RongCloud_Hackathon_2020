(function (dependents) {
  var { Thirteen } = dependents;

  var getDom = (selector) => {
    return document.querySelector(selector);
  };

  var isEqual = (source, target) => {
    return source == target;
  }

  var Cache = {
    set: (key, value) => {
      localStorage.setItem(key, value);
    },
    get: (key) => {
      return localStorage.getItem(key);
    }
  }

  var getQueryString = () => {
    var obj = {};
    var strs = location.search.replace('?', '');
    strs = strs.split('&');
    strs.forEach((str) => {
      var kvs = str.split('=');
      obj[kvs[0]] = kvs[1];
    })
    return obj;
  };
  Thirteen.utils = {
    getDom,
    isEqual,
    Cache,
    getQueryString
  };

})({
  Thirteen
})