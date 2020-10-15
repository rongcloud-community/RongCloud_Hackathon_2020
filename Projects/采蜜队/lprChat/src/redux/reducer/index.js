import {combineReducers} from 'redux';
import Login from './Login';
import FriendList from './FriendList';
import ConversationList from './ConversationList';

const index = combineReducers({
  login: Login,
  friendList: FriendList,
  conversationList: ConversationList,
});

export default index;
