import React, {Component} from 'react';
import {Button, StatusBar, StyleSheet, Text, TextInput, View, VirtualizedList} from 'react-native';
import * as IMClient from 'react-native-rongcloud-imlib/src';
import actionCreators from '../action';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationType: 1,
      messageType: IMClient.ObjectName.Text,
      content: {content: ''},
    };
    this.targetId = props.route.params?.targetId ?? '';
    this._lastDataLength = 0;
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBackgroundColor('#ffffff');
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onContentChange = content => this.setState({content: {type: 'text', content}});

  sendMessage = () => {
    const {conversationType, messageType, content, pushContent} = this.state;
    const {onChangeAllMessage, allMessageList, userId} = this.props;
    if (!content.content) {
      return;
    }
    const message = {conversationType, targetId: this.targetId, content, pushContent};
    const callback = {
      success: messageId => {
        console.log('发送成功', messageId);
        onChangeAllMessage(allMessageList, {
          hasPackage: false,
          left: 0,
          message: {
            content: {content, extra: null, objectName: messageType},
            conversationType,
            extra: '',
            messageDirection: 1,
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

  _getImmutableItem = (data, index) => {
    return data.get(index);
  };

  _getImmutableItemCount = (data) => {
    return data.size;
  };

  _separator = () => {
    return <View style={{height: 6}}/>;
  };

  _renderItem = ({item, index}) => {
    if (item.get('message').get('messageDirection') === 1) {
      return (
          (
              <View style={styles.myItem}>
                <View style={styles.myTextView}>
                  <Text style={styles.myText}>
                    {item.get('message').get('content').get('content').get('content').toString()}
                  </Text>
                </View>
              </View>
          )
      );
    } else {
      return (
          (
              <View style={styles.targetItem}>
                <View style={styles.targetTextView}>
                  <Text>
                    {item.get('message').get('content').get('content').toString()}
                  </Text>
                </View>
              </View>
          )
      );
    }
  };


  onContentSizeChange = (contentWidth, contentHeight) => {
    const newLength = this.props.allMessageList.size;
    newLength > this._lastDataLength && requestAnimationFrame(() => this.virtualizedList && this.virtualizedList.scrollToEnd({animated: true}));
    this._lastDataLength = newLength;
  };

  render() {
    const {content} = this.state;
    const {allMessageList} = this.props;
    return (
        <View style={styles.container}>
          <VirtualizedList
              ref={ref => this.virtualizedList = ref}
              style={styles.mt10}
              data={allMessageList.get(this.targetId) ? allMessageList.get(this.targetId) : fromJS([])}
              renderItem={this._renderItem}
              getItem={this._getImmutableItem}
              getItemCount={this._getImmutableItemCount}
              ItemSeparatorComponent={this._separator}
              onContentSizeChange={this.onContentSizeChange}
              keyExtractor={message => message.get('message').get('messageId')}/>

          <View style={styles.actionViewWrap}>
            <TextInput value={content.content}
                       style={styles.textInput}
                       onChangeText={this.onContentChange}
                       placeholder="请文明发言～"
                       onSubmitEditing={this.sendMessage}/>
            <Button title={'发送'} color={'#27918e'} onPress={this.sendMessage}/>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  allMessageList: state.getIn(['ChatListState', 'allMessageList']),
  userId: state.getIn(['LoginState', 'userId']),
});

const mapDispatchToProps = dispatch => ({
  onChangeContactFriendList: (userId) => dispatch(actionCreators.onChangeContactFriendList(userId)),
  onChangeAllMessage: (allMessageList, message) => dispatch(actionCreators.onChangeAllMessage(allMessageList, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionViewWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginRight: 10,
  },
  mt10: {
    marginTop: 10,
  },
  myItem: {
    marginBottom: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  myTextView: {
    backgroundColor: '#8bf156',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  myText: {
    textAlign: 'right',
  },
  targetItem: {
    alignItems: 'flex-start',
    marginBottom: 8,
    marginLeft: 8,
    justifyContent: 'center',
  },
  targetTextView: {
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
