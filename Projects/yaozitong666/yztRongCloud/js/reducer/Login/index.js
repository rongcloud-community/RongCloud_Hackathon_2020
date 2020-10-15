import {fromJS} from 'immutable';
import Types from '../../action/actionTypes';

const defaultState = fromJS({
  userName: '',
  userId: '',
  userToken: '',
  userPhone: '',
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case Types.CHANGE_USER_INFO:
      return state.mergeDeep({
        userId: action.userId,
        userToken: action.userToken,
        userPhone: action.userPhone,
      });
    case Types.CHANGE_USER_NAME:
      return state.set('userName', action.userName);
    default:
      return state;
  }
}
