import Types from '../actions/types';

const defaultState = {
  myName: '',
  myId: '',
  myToken: '',
  myPhone: '',
  loginLoading: false,
  registerLoading: false,
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.MY_INFO_CHANGE:
      return {
        ...state,
        myId: action.myId,
        myToken: action.myToken,
        myPhone: action.myPhone,
      };
    case Types.MY_NAME_CHANGE:
      return {
        ...state,
        myName: action.myName,
      };
    case Types.LOGIN_LOADING_CHANGE:
      return {
        ...state,
        loginLoading: action.loginLoading,
      };
    case Types.REGISTER_LOADING_CHANGE:
      return {
        ...state,
        registerLoading: action.registerLoading,
      };
    default:
      return state;
  }
}
