import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, ToastAndroid, View, Image} from 'react-native';
import * as IMClient from 'react-native-rongcloud-imlib/src';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentTime: '0',
      count: 10,
      messageType: IMClient.ObjectName.Text,
      result: '',
      messages: [],
      order: 0,
      pushContent: '',
      content: {content: ''},
      conversationType: IMClient.ConversationType.PRIVATE,
    };
    this.targetId = props.navigation.getParam('targetId', '');
    this.messageId = 0;
  }

  componentDidMount() {
    this.listener = IMClient.addReceiveMessageListener(message => {
      const {content} = message.message;
      if (content.content && content.content.length > 999) {
        content.content = content.content.substr(0, 100) + '...';
      }
      if (message.message.targetId === this.targetId) {
        this.setState({messages: [...this.state.messages, message]}, () => {
          this.flatListRef && this.flatListRef.scrollToEnd();
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  send = () => {
    const {conversationType, messageType, content, pushContent} = this.state;
    if (!content.content) {
      return;
    }
    const message = {conversationType, targetId: this.targetId, content, pushContent};
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
              extra: '',
              messageDirection: IMClient.MessageDirection.SEND,
              messageId,
              objectName: messageType,
              senderUserId: this.targetId,
              sentStatus: 30,
              targetId: this.targetId,
            },
            offline: false,
          }],
          content: {type: 'text', content: ''},
        }, () => {
          this.flatListRef && this.flatListRef.scrollToEnd();
        });
      },
      progress: (progress, messageId) => {
        this.messageId = messageId;
        console.log(messageId, progress);
      },
      cancel: () => {
      },
      error: (errorCode, messageId, message) => {
        ToastAndroid.show(`发送失败：${errorCode}，${message}`, ToastAndroid.SHORT);
      },
    };
    IMClient.sendMessage(message, callback);
  };

  renderItem = ({item}) => {
    if (item.message.messageDirection === 1) {
      return (
          (
              <View style={styles.myItem}>
                <View style={styles.myTextView}>
                  <Text style={styles.myText}>
                    {item.message.content.content.content.toString()}
                  </Text>
                  <Image source={require('../images/done.png')} style={styles.doneImage}/>
                </View>
              </View>
          )
      );
    } else {
      return (
          (
              <View style={styles.otherItem}>
                <View style={styles.otherTextView}>
                  <Text style={styles.otherText}>
                    {item.message.content.content.toString()}
                  </Text>
                </View>
              </View>
          )
      );
    }
  };

  render() {
    const {messages, content} = this.state;
    return (
        <View style={styles.container}>
          <FlatList
              ref={ref => this.flatListRef = ref}
              data={messages}
              renderItem={this.renderItem}
              keyExtractor={message => message.message.messageId}
              ListEmptyComponent={() => {
                return (
                    <Text>这里空空如也～</Text>
                );
              }}
          />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput onChangeText={content => this.setState({content: {type: 'text', content}})}
                       placeholder="请输入文本内容"
                       value={content.content}
                       onFocus={() => {
                         this.flatListRef && this.flatListRef.scrollToEnd();
                       }}
                       style={{flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#7986cb'}}/>
            <Button title={'发送'} onPress={this.send} color={'#7986cb'}/>
          </View>
        </View>
    );
  }
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {marginTop: 16},
  body: {padding: 16},
  myItem: {
    marginBottom: 8,
    fontFamily: 'monospace',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  myTextView: {
    backgroundColor: '#8791d4',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  doneImage: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  myText: {
    textAlign: 'right',
    color: '#ffffff',
    fontSize: 16,
  },
  otherItem: {
    marginBottom: 8,
    fontFamily: 'monospace',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  otherText: {
    fontSize: 16,
  },
  otherTextView: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
});
