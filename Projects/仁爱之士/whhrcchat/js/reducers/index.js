import {combineReducers} from 'redux';
import Login from './Login';
import Contacts from './Contacts';
import ChatList from './ChatList';

const index = combineReducers({
  login: Login,
  contacts: Contacts,
  chatList: ChatList,
});

export default index;
