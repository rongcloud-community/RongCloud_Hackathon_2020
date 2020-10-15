import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import * as IMClient from 'react-native-rongcloud-imlib/src';
import actionCreators from '../../actions';
import {connect} from 'react-redux';
import {Button} from 'react-native-paper';

class Room extends Component {
  constructor(props) {
    super(props);
    this._lastDataLength = 0;
    this.state = {
      conversationType: 1,
      messageType: IMClient.ObjectName.Text,
      content: {content: ''},
    };
    this.targetId = props.route.params?.targetId ?? '';
  }

  sendMessage = () => {
    const {conversationType, messageType, content, pushContent} = this.state;
    const {onChangeMessage, globalMessage, myId} = this.props;
    if (!content.content) {
      return;
    }
    const message = {conversationType, targetId: this.targetId, content, pushContent};
    const callback = {
      success: messageId => {
        onChangeMessage(globalMessage, {
          hasPackage: false,
          left: 0,
          message: {
            content: {content, extra: null, objectName: messageType},
            conversationType,
            extra: '',
            messageDirection: IMClient.MessageDirection.SEND,
            messageId,
            objectName: messageType,
            senderUserId: myId,
            sentStatus: 30,
            targetId: this.targetId,
          },
          offline: false,
        });
        this.setState({content: {type: 'text', content: ''}});
      },
      progress: (progress, messageId) => {
        console.log('progress ', progress);
      },
      cancel: () => {
        console.log('取消发送');
      },
      error: (errorCode, messageId, message) => {
        console.log(`消息发送失败：${errorCode}，${message}`);
      },
    };
    IMClient.sendMessage(message, callback);
  };

  onContentChange = content => this.setState({content: {type: 'text', content}});

  onContentSizeChange = (contentWidth, contentHeight) => {
    const newLength = this.props.globalMessage[this.targetId] ? this.props.globalMessage[this.targetId].length : 0;
    newLength > this._lastDataLength && requestAnimationFrame(() => this.flatList && this.flatList.scrollToEnd({animated: true}));
    this._lastDataLength = newLength;
  };

  itemSeparatorComponent = () => {
    return <View style={{height: 6}}/>;
  };

  _renderItem = ({item, index}) => {
    if (item.message.messageDirection === IMClient.MessageDirection.SEND) {
      return (
          (
              <View style={styles.myViewContainer}>
                <View style={styles.myInnerViewContainer}>
                  <Text style={styles.myText}>
                    {item?.message?.content?.content?.content?.toString()}
                  </Text>
                </View>
              </View>
          )
      );
    } else {
      return (
          (
              <View style={styles.targetViewContainer}>
                <View style={styles.targetInnerViewContainer}>
                  <Text>
                    {item?.message?.content?.content?.toString()}
                  </Text>
                </View>
              </View>
          )
      );
    }
  };

  render() {
    const {content} = this.state;
    const {globalMessage} = this.props;
    return (
        <View style={styles.container}>
          <FlatList
              ref={ref => this.flatList = ref}
              style={{marginTop: 10}}
              data={globalMessage[this.targetId] ? globalMessage[this.targetId] : []}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.itemSeparatorComponent}
              keyExtractor={message => message.message.messageId}
              onContentSizeChange={this.onContentSizeChange}
              extraData={globalMessage}
          />

          <View style={styles.viewContainer}>
            <TextInput value={content.content}
                       style={styles.textInput}
                       onChangeText={this.onContentChange}
                       placeholder="请输入文本内容~"
                       onSubmitEditing={this.sendMessage}/>
            <Button color={'#FF9800'} onPress={this.sendMessage}>
              发送
            </Button>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  globalMessage: state.chatList.globalMessage,
  myId: state.login.myId,
});

const mapDispatchToProps = dispatch => ({
  onChangeMessage: (globalMessage, message) => dispatch(actionCreators.onChangeMessage(globalMessage, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginRight: 10,
  },
  targetViewContainer: {
    alignItems: 'flex-start',
    marginBottom: 8,
    marginLeft: 8,
    justifyContent: 'center',
  },
  targetInnerViewContainer: {
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  myInnerViewContainer: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  myViewContainer: {
    marginBottom: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  myText: {
    textAlign: 'right',
    color: '#ffffff',
  },
});
