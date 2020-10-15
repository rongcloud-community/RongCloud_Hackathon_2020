import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput, Button, ToastAndroid} from 'react-native'
import * as IMClient from "../components/IMLib";
import FormItem from "../components/form-item";

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.otherSideId = props.route.params?.otherSideId ?? '';
    this.messageId = 0;
    this.state = {
      conversationType: IMClient.ConversationType.PRIVATE,
      messageType: IMClient.ObjectName.Text,
      sentTime: "0",
      count: 10,
      order: 0,
      messages: [],
      result: "",
      content: {content: ''},
      pushContent: "这是推送消息",
    }
  }

  componentDidMount() {
    this.listener = IMClient.addConnectionStatusListener(status => {
      switch (status) {
        case IMClient.ConnectionStatusAndroid.CONNECTED:
          ToastAndroid.show('已成功连接上', ToastAndroid.LONG)
          break;
        case IMClient.ConnectionStatusAndroid.DISCONNECTED:
          ToastAndroid.show('已断开连接', ToastAndroid.LONG)
          break;
        case IMClient.ConnectionStatusAndroid.KICKED_OFFLINE_BY_OTHER_CLIENT:
          ToastAndroid.show('您已被迫下线', ToastAndroid.LONG)
          break;
        case IMClient.ConnectionStatusAndroid.SERVER_INVALID:
          ToastAndroid.show('服务器不可用', ToastAndroid.LONG)
          break
        case IMClient.ConnectionStatusAndroid.TOKEN_INCORRECT:
          ToastAndroid.show('token不正确', ToastAndroid.LONG)
          break
        case IMClient.ConnectionStatusAndroid.NETWORK_UNAVAILABLE:
          ToastAndroid.show('网络连接不可用', ToastAndroid.LONG)
          break;
        case IMClient.ConnectionStatusAndroid.CONNECTING:
          ToastAndroid.show('正在连接中...', ToastAndroid.LONG)
          break
      }
    });
    this.listener2 = IMClient.addReceiveMessageListener(message => {
      const {content} = message.message;
      if (content.content && content.content.length > 999) {
        content.content = content.content.substr(0, 100) + "...";
      }
      console.log(message);
      if (message.message.targetId === this.otherSideId) {
        this.setState({messages: [...this.state.messages, message]}, () => {
          this.scrollViewRef.scrollToEnd()
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener.remove();
    this.listener2.remove();
  }

  setTextContent = content => this.setState({content: {type: "text", content}});

  send = () => {
    const {conversationType, messageType, content, pushContent} = this.state;
    if (!content.content) {
      return
    }
    const message = {conversationType, targetId: this.otherSideId, content, pushContent};
    const callback = {
      success: messageId => {
        this.messageId = messageId;
        this.setState({
          messages: [...this.state.messages, {
            hasPackage: false,
            left: 0,
            message: {
              content: {content, extra: null, objectName: messageType},
              conversationType,
              extra: "",
              messageDirection: IMClient.MessageDirection.SEND,
              messageId,
              objectName: messageType,
              senderUserId: this.otherSideId,
              sentStatus: 30,
              targetId: this.otherSideId
            },
            offline: false
          }],
          result: "消息发送成功",
          content: {type: "text", content: ''}
        }, () => {
          this.scrollViewRef.scrollToEnd()
        });
      },
      progress: (progress, messageId) => {
        this.messageId = messageId;
        this.setState({result: progress + "%"});
      },
      cancel: () => {
        this.setState({result: "取消发送"});
      },
      error: (errorCode, messageId, message) => this.setState({result: `消息发送失败：${errorCode}，${message}`})
    };
    IMClient.sendMessage(message, callback);
  };

  render() {
    const {messages, result, content} = this.state
    return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.body} ref={ref => this.scrollViewRef = ref}>
            {messages.length === 0 && <Text style={styles.item}>No messages.</Text>}
            {messages.map(message => {
              if (message.message.messageDirection === IMClient.MessageDirection.SEND) {
                return (
                    (
                        <View key={message.message.messageId} style={styles.sendItem}>
                          <View style={styles.sendTextView}>
                            <Text style={styles.sendText}>
                              {message.message.content.content.content.toString()}
                            </Text>
                          </View>
                        </View>
                    )
                )
              } else {
                return (
                    (
                        <View key={message.message.messageId} style={styles.receiveItem}>
                          <View style={styles.receiveTextView}>
                            <Text style={styles.receiveText}>
                              {message.message.content.content.toString()}
                            </Text>
                          </View>
                        </View>
                    )
                )
              }
            })}
          </ScrollView>
          <FormItem label="文本内容">
            <TextInput onChangeText={this.setTextContent} placeholder="请输入文本内容" value={content.content} onFocus={() => {
              this.scrollViewRef.scrollToEnd()
            }}/>
            <Text style={{marginVertical: 10}}>结果是：{result}</Text>
            <Button title={'发送'} onPress={this.send}/>
          </FormItem>
        </View>
    );
  }
}

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  message: {marginTop: 16},
  body: {padding: 16},
  sendItem: {
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "menlo" : "monospace",
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  sendTextView: {
    backgroundColor: '#8bf156',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  },
  sendText: {
    textAlign: 'right',
  },
  receiveItem: {
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "menlo" : "monospace",
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  receiveText: {},
  receiveTextView: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  }
});
