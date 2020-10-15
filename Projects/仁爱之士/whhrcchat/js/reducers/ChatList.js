import Types from '../actions/types';

const defaultState = {
  chatList: [],
  chatListRefreshing: false,
  globalMessage: {},
  chatLoading: false,
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.CHAT_LIST_CHANGE:
      return {
        ...state,
        chatList: action.chatList,
        chatListRefreshing: action.chatListRefreshing,
      };
    case Types.CHAT_LIST_LOADING_CHANGE:
      return {
        ...state,
        chatListRefreshing: action.chatListRefreshing,
      };
    case Types.GLOBAL_MESSAGE_CHANGE:
      return {
        ...state,
        globalMessage: {
          ...state.globalMessage,
          ...action.globalMessage,
        },
      };
    case Types.CHAT_LOADING_CHANGE:
      return {
        ...state,
        chatLoading: action.chatLoading,
      };
    case Types.CLEAR_MESSAGE:
      return {
        ...state,
        globalMessage: {},
      };
    default:
      return state;
  }
}
