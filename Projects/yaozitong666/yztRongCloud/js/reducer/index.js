import {combineReducers} from 'redux-immutable';
import Login from './Login';
import Contacts from './Contacts';
import ChatList from './ChatList';

const index = combineReducers({
  LoginState: Login,
  ContactsState: Contacts,
  ChatListState: ChatList,
});

export default index;
