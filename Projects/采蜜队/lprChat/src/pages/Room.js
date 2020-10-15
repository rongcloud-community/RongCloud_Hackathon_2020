import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import * as IMClient from 'react-native-rongcloud-imlib/src';
import actionCreators from '../redux/action';
import {connect} from 'react-redux';

class Room extends Component {
  constructor(props) {
    super(props);
    this._lastDataLength = 0;
    this.state = {
      conversationType: 1,
      messageType: 'RC:TxtMsg',
      content: {content: ''},
    };
    this.targetId = props.navigation.getParam('targetId', '');
  }

  onContentChange = content => this.setState({content: {type: 'text', content}});

  sendMessage = () => {
    const {conversationType, messageType, content, pushContent} = this.state;
    const {onChangeMessage, allMessageObj, userId} = this.props;
    if (!content.content) {
      return;
    }
    const message = {conversationType, targetId: this.targetId, content, pushContent};
    const callback = {
      success: messageId => {
        console.log('success ', messageId);
        onChangeMessage(allMessageObj, {
          hasPackage: false,
          left: 0,
          message: {
            content: {content, extra: null, objectName: messageType},
            conversationType,
            extra: '',
            messageDirection: IMClient.MessageDirection.SEND,
            messageId,
            objectName: messageType,
            senderUserId: userId,
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

  ltemSeparatorComponent = () => {
    return <View style={{height: 6}}/>;
  };

  _renderItem = ({item, index}) => {
    if (item.message.messageDirection === IMClient.MessageDirection.SEND) {
      return (
          (
              <View style={styles.tesitem}>
                <View style={styles.tesitem2}>
                  <Text style={styles.tesitem3}>
                    {item?.message?.content?.content?.content?.toString()}
                  </Text>
                </View>
              </View>
          )
      );
    } else {
      return (
          (
              <View style={styles.tesitem4}>
                <View style={styles.tesitem5}>
                  <Text>
                    {item?.message?.content?.content?.toString()}
                  </Text>
                </View>
              </View>
          )
      );
    }
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    const newLength = this.props.allMessageObj[this.targetId] ? this.props.allMessageObj[this.targetId].length : 0;
    newLength > this._lastDataLength && requestAnimationFrame(() => this.flatList && this.flatList.scrollToEnd({animated: true}));
    this._lastDataLength = newLength;
  };

  render() {
    const {content} = this.state;
    const {allMessageObj} = this.props;
    return (
        <View style={styles.container}>
          <FlatList
              ref={ref => this.flatList = ref}
              style={styles.testmt}
              data={allMessageObj[this.targetId] ? allMessageObj[this.targetId] : []}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.ltemSeparatorComponent}
              keyExtractor={message => message.message.messageId}
              onContentSizeChange={this.onContentSizeChange}
              extraData={allMessageObj}
          />

          <View style={styles.testView2}>
            <TextInput value={content.content}
                       style={styles.textInput}
                       onChangeText={this.onContentChange}
                       placeholder="请输入文本内容"
                       onSubmitEditing={this.sendMessage}/>
            <Button title={'发送'} color={'#8BC34A'} onPress={this.sendMessage}/>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  allMessageObj: state.conversationList.allMessageObj,
  userId: state.login.userId,
});

const mapDispatchToProps = dispatch => ({
  onChangeMessage: (allMessageObj, message) => dispatch(actionCreators.onChangeMessage(allMessageObj, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  testView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginRight: 10,
  },
  testmt: {
    marginTop: 10,
  },
  tesitem4: {
    alignItems: 'flex-start',
    marginBottom: 8,
    marginLeft: 8,
    justifyContent: 'center',
  },
  tesitem5: {
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  tesitem2: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  tesitem: {
    marginBottom: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tesitem3: {
    textAlign: 'right',
  },
});
