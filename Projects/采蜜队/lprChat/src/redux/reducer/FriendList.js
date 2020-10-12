import Types from '../action/types';

const defaultState = {
  friendList: [],
  friendListRefreshing: false,
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.CONTACT_FRIEND_LIST_CHANGE:
      return {
        ...state,
        friendList: action.friendList,
        friendListRefreshing: action.friendListRefreshing,
      };
    case Types.CONTACT_FRIEND_LIST_LOADING_CHANGE:
      return {
        ...state,
        friendListRefreshing: action.friendListRefreshing,
      };
    default:
      return state;
  }
}
