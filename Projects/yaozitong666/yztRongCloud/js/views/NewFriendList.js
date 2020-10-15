import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View, VirtualizedList, TouchableOpacity} from 'react-native';
import actionCreators from '../action';
import {connect} from 'react-redux';
import {Button, Card, Paragraph, Dialog, Portal} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingModal from '../components/LoadingModal';

class NewFriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isDeleteUser: false,
      currentUser: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBackgroundColor('#ffffff');
      StatusBar.setBarStyle('dark-content');
    });
    this._refreshData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  //刷新数据
  _refreshData = () => {
    const {onChangeNewFriendList, userId} = this.props;
    onChangeNewFriendList(userId);
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
            this.props.newFriendList.size !== 0 ? <Text style={styles.footText}>- 我是有底线的 -</Text> : null
          }
        </View>
    );
  };

  _listEmpty = () => {
    return (
        <View style={styles.noListView}>
          <Text style={styles.noListText}>这里啥也没有，快去添加好友吧</Text>
        </View>
    );
  };

  toChatRoom = (item) => {
    if (item.get('status') === 20) {
      this.props.navigation.push('ChatRoom', {
        userName: item.get('user').get('nickname'),
        targetId: item.get('user').get('id'),
      });
    }
  };

  _renderItem = ({item, index}) => {
    let LeftContent = props => <MaterialCommunityIcons name={'badge-account'} size={26} color={'#27918e'}/>;
    let subtitle;
    switch (item.get('status')) {
      case 10:
        subtitle = '已发送好友请求，等待对方同意';
        break;
      case 20:
        subtitle = '已经是好友了，可以聊天啦';
        break;
      case 11:
        subtitle = '请求添加好友';
        break;
      default:
        subtitle = '这个状态码本不应该出现在这里，请联系管理员';
        break;
    }
    return (
        <View style={{paddingHorizontal: 15}}>
          <TouchableOpacity onPress={() => this.toChatRoom(item)}>
            <Card>
              <Card.Title title={item.get('user').get('nickname')} subtitle={subtitle} left={LeftContent}/>
              {item.get('status') === 11 ?
                  <Card.Actions>
                    <Button color={'#27918e'} style={{marginRight: 15}} onPress={() => {
                      this.setState({isDeleteUser: false, visible: true, currentUser: item});
                    }}>同意</Button>
                    <Button color={'#fb6086'} onPress={() => {
                      this.setState({isDeleteUser: true, visible: true, currentUser: item});
                    }}>拒绝</Button>
                  </Card.Actions> : null}
            </Card>
          </TouchableOpacity>
        </View>

    );
  };

  hideDialog = () => {
    this.setState({visible: false});
  };

  addFriend = () => {
    this.hideDialog();
    const {isDeleteUser, currentUser} = this.state;
    const {onAgreeOrIgnoreFriend} = this.props;
    onAgreeOrIgnoreFriend(this.loadingModal, isDeleteUser, currentUser.get('user').get('id'), () => {
      this._refreshData();
    });
  };

  render() {
    const {newFriendList, newFriendListRefreshing} = this.props;
    const {visible, isDeleteUser} = this.state;
    return (
        <View style={styles.container}>
          <VirtualizedList
              style={styles.mt10}
              data={newFriendList}
              renderItem={this._renderItem}
              getItem={this._getImmutableItem}
              getItemCount={this._getImmutableItemCount}
              ItemSeparatorComponent={this._separator}
              ListFooterComponent={this._footer}
              ListEmptyComponent={this._listEmpty}
              keyExtractor={item => item.get('user').get('id')}
              onRefresh={this._refreshData}
              refreshing={newFriendListRefreshing}/>

          <Portal>
            <Dialog visible={visible} onDismiss={this.hideDialog}>
              <Dialog.Title>提示</Dialog.Title>
              <Dialog.Content>
                <Paragraph>确定{isDeleteUser ? '拒绝' : '同意'}该好友请求？</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={this.hideDialog} color={'#000000'} style={{marginRight: 15}}>取消</Button>
                <Button onPress={this.addFriend} color={'#000000'}>确定</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <LoadingModal ref={(ref) => this.loadingModal = ref}/>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  newFriendList: state.getIn(['ContactsState', 'newFriendList']),
  newFriendListRefreshing: state.getIn(['ContactsState', 'newFriendListRefreshing']),
  userId: state.getIn(['LoginState', 'userId']),
});

const mapDispatchToProps = dispatch => ({
  onChangeNewFriendList: (userId) => dispatch(actionCreators.onChangeNewFriendList(userId)),
  onAgreeOrIgnoreFriend: (loadingModal, isDeleteUser, friendId, callback) => dispatch(actionCreators.onAgreeOrIgnoreFriend(loadingModal, isDeleteUser, friendId, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewFriendList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
