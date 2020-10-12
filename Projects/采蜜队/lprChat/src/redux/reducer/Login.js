import Types from '../action/types';

const defaultState = {
  username: '',
  userId: '',
  rongCloudToken: '',
  userphone: '',
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.USER_INFO_CHANGE:
      return {
        ...state,
        userId: action.userId,
        rongCloudToken: action.rongCloudToken,
        userphone: action.userphone,
      };
    case Types.USER_NAME_CHANGE:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
}
