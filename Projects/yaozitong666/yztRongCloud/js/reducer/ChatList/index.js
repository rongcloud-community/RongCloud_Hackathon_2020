import {fromJS} from 'immutable';
import Types from '../../action/actionTypes';

const defaultState = fromJS({
  conversationList: [],
  conversationListRefreshing: false,
  allMessageList: {},
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case Types.CHANGE_CONVERSATION_LIST:
      return state.set('conversationList', action.conversationList).set('conversationListRefreshing', action.conversationListRefreshing);
    case Types.CHANGE_MESSAGE_LIST:
      return state.set('allMessageList', action.allMessageList);
    case Types.CLEAR_MESSAGE:
      return state.set('allMessageList', fromJS({}));
    default:
      return state;
  }
}
