import * as IMClient from 'react-native-rongcloud-imlib/src';
import Types from '../action/types';
import {ToastAndroid} from 'react-native';
import HttpUtil from '../../utils/HttpUtil';

export function onChangeConversationsList(userId, isShowLoading) {
  return dispatch => {
    if (isShowLoading) {
      dispatch({type: Types.CONVERSATION_LIST_LOADING_CHANGE, conversationListRefreshing: true});
    }
    Promise.all([HttpUtil.doGet('/friendship/all'), IMClient.getConversationList([1])])
        .then(results => {
          let conversationList = [];
          let friendList = results[0].result;
          let conversations = results[1];
          conversations.forEach(conversation => {
            let conversationObj = {};
            conversationObj.latestMessage = conversation.latestMessage.content;
            conversationObj.targetId = conversation.targetId;
            conversationObj.sentTime = processTime(conversation.sentTime);

            if (conversation.senderUserId === userId) {
              conversationObj.senderUserName = '我';
            } else {
              friendList.forEach(friend => {
                if (friend.user.id === conversation.senderUserId) {
                  conversationObj.senderUserName = friend.user.nickname;
                }
              });
            }

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
            type: Types.CONVERSATION_LIST_CHANGE,
            conversationList: conversationList && conversationList.length > 0 ? conversationList : [],
            conversationListRefreshing: false,
          });
        })
        .catch(e => {
          ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
          dispatch({type: Types.CONVERSATION_LIST_LOADING_CHANGE, conversationListRefreshing: false});
        });
  };
}

function processTime(time) {
  let date = new Date(time);
  let h = date.getHours() + ':';
  let m = date.getMinutes();
  return h + m;
}

export function onChangeMessage(allMessageObj, message) {
  return dispatch => {
    let targetId = message.message.targetId;
    if (!allMessageObj.hasOwnProperty(targetId)) {
      allMessageObj[targetId] = [];
    }
    allMessageObj[targetId].push(message);
    dispatch({type: Types.MESSAGE_LIST_CHANGE, allMessageObj});
  };
}

