import {fromJS} from 'immutable';
import Types from '../../action/actionTypes';

const defaultState = fromJS({
  contactFriendList: [],
  contactFriendListRefreshing: false,
  newFriendList: [],
  newFriendListRefreshing: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case Types.CHANGE_CONTACT_FRIEND_LIST:
      return state.set('contactFriendListRefreshing', action.contactFriendListRefreshing).set('contactFriendList', action.contactFriendList);
    case Types.CHANGE_NEW_FRIEND_LIST:
      return state.set('newFriendListRefreshing', action.newFriendListRefreshing).set('newFriendList', action.newFriendList);
    case Types.CHANGE_CONTACT_FRIEND_LIST_LOADING:
      return state.set('contactFriendListRefreshing', action.contactFriendListRefreshing);
    case Types.CHANGE_NEW_FRIEND_LIST_LOADING:
      return state.set('newFriendListRefreshing', action.newFriendListRefreshing);
    default:
      return state;
  }
}
