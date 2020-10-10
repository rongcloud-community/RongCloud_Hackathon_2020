import {getAllFriend} from '../../api/friendship';
import * as IMClient from 'react-native-rongcloud-imlib/src';
import Types from '../actionTypes';
import {fromJS} from 'immutable';
import {ToastAndroid} from 'react-native';

export function onChangeConversationsList(userId, isShowLoading) {
  return dispatch => {
    if (isShowLoading) {
      dispatch({type: Types.CHANGE_CONVERSATION_LIST_LOADING, conversationListRefreshing: true});
    }
    Promise.all([getAllFriend(), IMClient.getConversationList([1])])
        .then(results => {
          // console.log(JSON.stringify(results));
          let conversationList = [];
          let friendList = results[0].result;
          let conversations = results[1];
          conversations.forEach(conversation => {
            let conversationObj = {};
            conversationObj.latestMessage = conversation.latestMessage.content;
            conversationObj.targetId = conversation.targetId;
            conversationObj.sentTime = converTime(conversation.sentTime);

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
            type: Types.CHANGE_CONVERSATION_LIST,
            conversationList: conversationList && conversationList.length > 0 ? fromJS(conversationList) : fromJS([]),
            conversationListRefreshing: false,
          });
        })
        .catch(e => {
          console.log('onChangeConversationsList ', e);
          ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
          dispatch({type: Types.CHANGE_CONVERSATION_LIST_LOADING, conversationListRefreshing: false});
        });
  };
}

/**
 * 全局消息
 * @param allMessageList {targetId:[{},{},{}...], xxx:[], ooo:[] }
 * 每个人对应的聊天内容
 * eg. {'Y83aQTNK1' : [{},{},...] , xxx:[], ooo:[]}
 *
 * @param message {
    "hasPackage":false,
    "left":0,
    "message":{
        "content":{
            "content":"呵呵哈哈哈",
            "extra":null,
            "objectName":"RC:TxtMsg"
        },
        "conversationType":1,
        "extra":"",
        "messageDirection":2,
        "messageId":4,
        "messageUId":"BKR5-28P4-JT85-SK8H",
        "objectName":"RC:TxtMsg",
        "receivedStatus":0,
        "receivedTime":1601372981715,
        "senderUserId":"Y83aQTNK1",
        "sentStatus":30,
        "sentTime":1601372982418,
        "targetId":"Y83aQTNK1"
    },
    "offline":false
}

 {
            hasPackage: false,
            left: 0,
            message: {
              content: {content, extra: null, objectName: messageType},
              conversationType,
              extra: "",
              messageDirection: IMClient.MessageDirection.SEND,
              messageId,
              objectName: messageType,
              senderUserId: this.userId,
              sentStatus: 30,
              targetId: this.targetId
            },
            offline: false
          }
 * @param userId
 * @returns {function(*)}
 */

export function onChangeAllMessage(allMessageList, message) {
  return dispatch => {
    let targetId = message.message.targetId;
    let newAllMessageObj;
    if (!allMessageList.has(targetId)) {
      newAllMessageObj = allMessageList.set(targetId, fromJS([]));
    } else {
      newAllMessageObj = allMessageList;
    }
    var newMap = newAllMessageObj.updateIn([targetId], (list) => {
      return list.push(fromJS(message));
    });
    dispatch({type: Types.CHANGE_MESSAGE_LIST, allMessageList: newMap});
  };
}

function converTime(time) {
  let date = new Date(time);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D + h + m + s;
}
