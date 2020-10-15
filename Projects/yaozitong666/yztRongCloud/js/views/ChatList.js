import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {searchUserByPhone} from '../api/user';
import {inviteFriend} from '../api/friendship';
import actionCreators from '../action';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Dialog, Paragraph, Portal, Button as PaperButton} from 'react-native-paper';
import * as IMClient from 'react-native-rongcloud-imlib/src/index';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriendModalVisible: false,
      searchUserPhone: '',
      userResult: '',
      addFriendMessage: '',
      visible: false,
    };
    this.deleteItem = null;
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBackgroundColor('#eff0f1');
      StatusBar.setBarStyle('dark-content');
    });
    this._refreshData(true);

    this.listener = IMClient.addReceiveMessageListener(message => {
      const {content} = message.message;
      if (content.content && content.content.length > 999) {
        content.content = content.content.substr(0, 100) + '...';
      }

      const {onChangeAllMessage, allMessageList, userId} = this.props;
      console.log(userId, message);
      onChangeAllMessage(allMessageList, message);
      this._refreshData(false);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.listener.remove();
  }

  hideAddFriendModal = () => {
    this.setState({addFriendModalVisible: false});
  };

  searchUser = () => {
    const {searchUserPhone} = this.state;
    if (!searchUserPhone) {
      return;
    }
    searchUserByPhone(searchUserPhone)
        .then(result => {
          console.log(result);
          this.setState({userResult: result.result});
        })
        .catch(e => {
          ToastAndroid.show('用户不存在', ToastAndroid.SHORT);
        });

  };

  addUser = () => {
    const {userResult, addFriendMessage} = this.state;
    inviteFriend(userResult.id, addFriendMessage)
        .then(response => {
          console.log(response);
          if (response.result.action === 'Added') {
            ToastAndroid.show('已添加', ToastAndroid.LONG);
          } else if (response.result.action === 'None') {
            ToastAndroid.show('在对方黑名单中', ToastAndroid.LONG);
          } else if (response.result.action === 'Sent') {
            ToastAndroid.show('请求已发送', ToastAndroid.LONG);
          } else if (response.result.action === 'AddDirectly') {
            ToastAndroid.show('直接添加对方', ToastAndroid.LONG);
          }
          this.setState({addFriendModalVisible: false});
        })
        .catch(e => {
          console.log(e);
        });
  };

  //刷新数据
  _refreshData = (isShowLoading = true) => {
    const {onChangeConversationsList, userId} = this.props;
    onChangeConversationsList(userId, isShowLoading);
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

  _footer = () => {
    return (
        <View style={styles.bottomfoot}>
          {
            this.props.conversationList.size !== 0 ? <Text style={styles.footText}>- 我是有底线的 -</Text> : null
          }
        </View>
    );
  };

  _listEmpty = () => {
    return (
        <View style={styles.noListView}>
          <Text style={styles.noListText}>这里啥也没有，快去找好友聊天吧</Text>
        </View>
    );
  };

  toChatRoom = (item) => {
    this.props.navigation.push('ChatRoom', {
      userName: item.get('displayName'),
      targetId: item.get('targetId'),
    });
  };

  showDeleteDialog = item => {
    this.deleteItem = item;
    this.setState({visible: true});
  };

  _renderItem = ({item, index}) => {
    let LeftContent = props => <MaterialCommunityIcons name={'badge-account'} size={26} color={'#27918e'}/>;
    return (
        <View style={{paddingHorizontal: 15}}>
          <TouchableOpacity onPress={() => this.toChatRoom(item)}
                            onLongPress={() => this.showDeleteDialog(item)}>
            <Card>
              <Card.Title title={item.get('displayName')} left={LeftContent}/>
            </Card>
          </TouchableOpacity>
        </View>

    );
  };

  hideDialog = () => {
    this.setState({visible: false});
  };

  deleteConversation = () => {
    IMClient.removeConversation(1, this.deleteItem.get('targetId'))
        .then(response => {
          this.setState({visible: false});
          ToastAndroid.show('删除成功', ToastAndroid.SHORT);
          this._refreshData(true);
        })
        .catch(e => {
          this.setState({visible: false});
          ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
        });
  };

  render() {
    const {addFriendModalVisible, searchUserPhone, userResult, addFriendMessage, visible} = this.state;
    const {conversationListRefreshing, conversationList} = this.props;
    return (
        <View style={styles.container}>
          <View style={styles.addUserView}>
            <AntDesign.Button name={'adduser'} color={'#27918e'} backgroundColor={'#ffffff'} onPress={() => {
              this.setState({addFriendModalVisible: true});
            }}>
              加好友
            </AntDesign.Button>
          </View>

          <VirtualizedList
              style={styles.mt10}
              data={conversationList}
              renderItem={this._renderItem}
              getItem={this._getImmutableItem}
              getItemCount={this._getImmutableItemCount}
              ItemSeparatorComponent={this._separator}
              ListFooterComponent={this._footer}
              ListEmptyComponent={this._listEmpty}
              keyExtractor={item => item.get('sentTime') + Math.random()}
              onRefresh={this._refreshData}
              refreshing={conversationListRefreshing}/>

          <Modal isVisible={addFriendModalVisible}
                 animationIn="zoomIn"
                 animationOut="zoomOut"
                 useNativeDriver
                 avoidKeyboard
                 statusBarTranslucent
                 onBackdropPress={this.hideAddFriendModal}>
            <View style={styles.addFriendViewWrap}>
              <View style={styles.addFriendTextView}>
                <TextInput value={searchUserPhone}
                           style={styles.addFriendTextInput}
                           keyboardType="number-pad"
                           onChangeText={searchUserPhone => this.setState({searchUserPhone})}
                           placeholder="请输入用户手机号码"
                           onSubmitEditing={this.searchUser}
                />
                <Button title={'搜索'} color={'#27918e'} onPress={this.searchUser}/>
              </View>

              {userResult ? <Text style={styles.addFriendText}>搜索结果：{userResult.nickname.toString()}</Text> : null}

              {userResult ?
                  <View style={styles.addFriendTextView}>
                    <TextInput value={addFriendMessage}
                               style={[styles.addFriendTextInput, {width: 150}]}
                               onChangeText={addFriendMessage => this.setState({addFriendMessage})}
                               placeholder="请留言"
                               onSubmitEditing={this.addUser}/>
                    <Button title={'请求添加好友'} color={'#27918e'} onPress={this.addUser}/>
                  </View> : null}

            </View>
          </Modal>

          <Portal>
            <Dialog visible={visible} onDismiss={this.hideDialog}>
              <Dialog.Title>提示</Dialog.Title>
              <Dialog.Content>
                <Paragraph>确定删除该会话？</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton onPress={this.hideDialog} color={'#000000'} style={{marginRight: 15}}>取消</PaperButton>
                <PaperButton onPress={this.deleteConversation} color={'#000000'}>确定</PaperButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  conversationList: state.getIn(['ChatListState', 'conversationList']),
  conversationListRefreshing: state.getIn(['ChatListState', 'conversationListRefreshing']),
  userId: state.getIn(['LoginState', 'userId']),
  allMessageList: state.getIn(['ChatListState', 'allMessageList']),
});

const mapDispatchToProps = dispatch => ({
  onChangeConversationsList: (userId, isShowLoading) => dispatch(actionCreators.onChangeConversationsList(userId, isShowLoading)),
  onChangeAllMessage: (allMessageList, message) => dispatch(actionCreators.onChangeAllMessage(allMessageList, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addUserView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingTop: 15,
    paddingRight: 15,
  },
  addFriendViewWrap: {
    borderRadius: 10,
    height: 400,
    backgroundColor: '#ffffff',
  },
  addFriendTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  addFriendTextInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 17,
    marginRight: 15,
  },
  addFriendText: {
    fontSize: 16,
    marginLeft: 25,
    marginTop: 25,
  },
  mt10: {
    marginTop: 10,
  },
  bottomfoot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  footText: {
    fontSize: 15,
    color: '#999999',
  },
  noListView: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noListText: {
    fontSize: 18,
    color: '#999999',
  },
});
