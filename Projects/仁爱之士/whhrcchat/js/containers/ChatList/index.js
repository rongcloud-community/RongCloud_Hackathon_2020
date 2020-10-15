import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import actionCreators from '../../actions';
import {connect} from 'react-redux';
import * as IMClient from 'react-native-rongcloud-imlib/src/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';

class ChatList extends Component {
  componentDidMount() {
    this._refreshData(true);

    this._navListener = this.props.navigation.addListener('focus', () => {
      this._refreshData(false);
    });

    this.listener = IMClient.addReceiveMessageListener(message => {
      const {content} = message.message;
      if (content.content && content.content.length > 999) {
        content.content = content.content.substr(0, 100) + '...';
      }

      const {onChangeMessage, globalMessage, myId} = this.props;
      console.log(myId, message);
      onChangeMessage(globalMessage, message);
      this._refreshData(false);
    });
  }

  componentWillUnmount() {
    this.listener.remove();
    this._navListener();
  }

  _refreshData = (isShowLoading = true) => {
    const {onChangeChatList, myId} = this.props;
    onChangeChatList(myId, isShowLoading);
  };

  itemSeparatorComponent = () => {
    return <View style={{height: 6}}/>;
  };

  listFooterComponent = () => {
    return (
        <View style={styles.footTextView}>
          {
            this.props.chatList.length !== 0 ? <Text style={styles.footText}>- 我是有底线的 -</Text> : null
          }
        </View>
    );
  };

  listEmptyComponent = () => {
    return (
        <View style={styles.emptyTextView}>
          <Text style={styles.emptyText}>这里啥也没有，快去找好友聊天吧</Text>
        </View>
    );
  };

  toRoom = (item) => {
    this.props.navigation.push('Room', {
      targetName: item.displayName,
      targetId: item.targetId,
    });
  };

  _renderItem = ({item, index}) => {
    return (
        <TouchableOpacity onPress={() => this.toRoom(item)}>
          <View style={styles.item}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name={'user'} size={35} color={'#FF9800'}/>
              <View style={{marginLeft: 8}}>
                <Text style={styles.displayName}>{item.displayName}</Text>
                <Text style={styles.text}>{item.latestMessage}</Text>
              </View>
            </View>

            <Text style={styles.sendtime}>{item.sentTime}</Text>
          </View>
        </TouchableOpacity>
    );
  };

  toLogout = () => {
    const {onExit, navigation} = this.props;
    onExit(navigation);
  };

  render() {
    const {chatListRefreshing, chatList, myPhone, myName} = this.props;
    return (
        <View style={styles.container}>
          <View style={styles.titleViewWrap}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <AntDesign name={'user'} size={40} color={'#FF9800'}/>
              <View>
                <Text numberOfLines={1} style={styles.title}>{myName}</Text>
                <Text numberOfLines={1} style={styles.title2}>{myPhone}</Text>
              </View>
            </View>
            <MaterialCommunityIcons.Button name={'location-exit'}
                                           size={35}
                                           color={'#FF9800'}
                                           backgroundColor={'#ffffff'}
                                           onPress={this.toLogout}>
              退出登陆
            </MaterialCommunityIcons.Button>
          </View>

          <FlatList
              style={{marginTop: 10}}
              data={chatList}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.itemSeparatorComponent}
              ListFooterComponent={this.listFooterComponent}
              ListEmptyComponent={this.listEmptyComponent}
              keyExtractor={item => item.sentTime + Math.random()}
              onRefresh={this._refreshData}
              refreshing={chatListRefreshing}/>

          <Spinner
              visible={this.props.chatLoading}
              textContent={'正在退出...'}
              textStyle={styles.spinnerTextStyle}
          />
        </View>
    );
  }
}

const mapStateToProps = state => ({
  chatListRefreshing: state.chatList.chatListRefreshing,
  chatList: state.chatList.chatList,
  globalMessage: state.chatList.globalMessage,
  chatLoading: state.chatList.chatLoading,
  myId: state.login.myId,
  myName: state.login.myName,
  myPhone: state.login.myPhone,
});

const mapDispatchToProps = dispatch => ({
  onChangeChatList: (myId, isShowLoading) => dispatch(actionCreators.onChangeChatList(myId, isShowLoading)),
  onChangeMessage: (globalMessage, message) => dispatch(actionCreators.onChangeMessage(globalMessage, message)),
  onExit: (navigation) => dispatch(actionCreators.onExit(navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
  },
  titleViewWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3,
  },
  footTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  footText: {
    fontSize: 15,
    color: '#999999',
  },
  emptyTextView: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999999',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title2: {
    fontSize: 14,
    marginTop: 8,
  },
  itemText: {flexDirection: 'row', alignItems: 'center'},
  displayName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    color: '#3b3838',
  },
  sendtime: {
    alignSelf: 'flex-end',
  },
  item: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginHorizontal: 9,
    paddingVertical: 8,
    elevation: 3,
  },
});
