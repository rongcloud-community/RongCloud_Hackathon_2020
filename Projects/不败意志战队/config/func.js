const axios = require('axios');

//生成随机id
module.exports.generateMixed = function (n) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

//生成头像
// getTouXiang(urlencode("易成龙"));
module.exports.getTouXiang = function (nickname, callback) {
  axios
    .get(
      `http://hd215.api.yesapi.cn/?s=Ext.Avatar.Show&app_key=BA6BBB3D9C90B515C6CAF6310D2BFFB4&nickname=${nickname}`
    )
    .then((response) => {
      let touXiangURL = response.config.url;
      //   console.log(response);
      //   console.log(response.config.url);
      callback(touXiangURL);
    })
    .catch((error) => {
      //   console.log(error);
      callback(error);
    });
}
