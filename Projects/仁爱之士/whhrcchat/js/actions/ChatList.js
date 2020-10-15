import * as IMClient from 'react-native-rongcloud-imlib/src';
import Types from './types';
import {ToastAndroid} from 'react-native';
import * as Api from '../api';

export function onChangeChatList(userId, isShowLoading) {
  return dispatch => {
    if (isShowLoading) {
      dispatch({type: Types.CHAT_LIST_LOADING_CHANGE, chatListRefreshing: true});
    }
    Promise.all([Api.getAllFriend(), IMClient.getConversationList([1])])
        .then(results => {
          let conversationList = [];
          let friendList = results[0].result;
          let conversations = results[1];
          conversations.forEach(conversation => {
            let conversationObj = {};
            conversationObj.latestMessage = conversation.latestMessage.content;
            conversationObj.targetId = conversation.targetId;
            conversationObj.sentTime = processTime(conversation.sentTime);

            friendList.forEach(friend => {
              if (friend.user.id === conversation.targetId) {
                conversationObj.displayName = friend.user.nickname;
              }
            });

            if (conversationObj.displayName) {
              conversationList.push(conversationObj);
            }
          });

          dispatch({
            type: Types.CHAT_LIST_CHANGE,
            chatList: conversationList && conversationList.length > 0 ? conversationList : [],
            chatListRefreshing: false,
          });
        })
        .catch(e => {
          ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
          dispatch({type: Types.CHAT_LIST_LOADING_CHANGE, chatListRefreshing: false});
        });
  };
}

export function onChangeMessage(globalMessage, message) {
  return dispatch => {
    let targetId = message.message.targetId;
    if (!globalMessage.hasOwnProperty(targetId)) {
      globalMessage[targetId] = [];
    }
    globalMessage[targetId].push(message);
    dispatch({type: Types.GLOBAL_MESSAGE_CHANGE, globalMessage});
  };
}

function processTime(time) {
  let date = new Date(time);
  let h = date.getHours() + ':';
  let m = date.getMinutes();
  return h + m;
}
