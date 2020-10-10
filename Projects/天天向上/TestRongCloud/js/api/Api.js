export default class Api {
  static BASE_URL = 'http://chat.linpr.cn:31091';

  // 登录
  static LOGIN_URL = Api.BASE_URL + '/user/login';

  //当前用户注销
  static LOGOUT_URL = Api.BASE_URL + '/user/logout';

  // 注册
  static REGISTER_URL = Api.BASE_URL + '/user/register';

  static SEND_CODE = Api.BASE_URL + '/user/send_code_yp'

  static VERIFY_CODE = Api.BASE_URL + '/user/verify_code_yp'

  // 根据手机号查找用户信息 /user/find/:region/:phone
  static SEARCH_USER = Api.BASE_URL + '/user/find/86/'

  ///user/:id
  static USER_INFO = Api.BASE_URL + '/user/'

  static ALL_FRIEND = Api.BASE_URL + '/friendship/all'

  static INVITE_FRIEND = Api.BASE_URL + '/friendship/invite'

  static AGREE_FRIEND = Api.BASE_URL + '/friendship/agree'

  static IGNORE_FRIEND = Api.BASE_URL + '/friendship/ignore'

}
