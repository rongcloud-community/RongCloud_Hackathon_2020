import Types from '../action/types';

const defaultState = {
  conversationList: [],
  conversationListRefreshing: false,
  allMessageObj: {},
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.CONVERSATION_LIST_CHANGE:
      return {
        ...state,
        conversationList: action.conversationList,
        conversationListRefreshing: action.conversationListRefreshing,
      };
    case Types.CLEAR_MESSAGE:
      return {
        ...state,
        allMessageObj: {},
      };
    case Types.MESSAGE_LIST_CHANGE:
      return {
        ...state,
        allMessageObj: {
          ...state.allMessageObj,
          ...action.allMessageObj,
        },
      };
    default:
      return state;
  }
}
