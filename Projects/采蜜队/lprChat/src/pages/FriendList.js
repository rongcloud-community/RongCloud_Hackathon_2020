import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Button} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import actionCreators from '../redux/action';
import {connect} from 'react-redux';
import ProgressHUD from '../common/ProgressHUD';

class FriendList extends Component {
  componentDidMount() {
    this._refreshData();
  }

  _refreshData = () => {
    const {onChangeFriendList, userId} = this.props;
    onChangeFriendList(userId);
  };

  itemSeparatorComponent = () => {
    return <View style={{height: 6}}/>;
  };

  listFooterComponent = () => {
    return (
        <View style={styles.bottomfoot}>
          {
            this.props.friendList.length !== 0 ? <Text style={styles.footText}>- 到底啦 -</Text> : null
          }
        </View>
    );
  };

  listEmptyComponent = () => {
    return (
        <View style={styles.noView}>
          <Text style={styles.notext}>快去添加好友聊天吧</Text>
        </View>
    );
  };

  toRoom = (item) => {
    if (item.status === 20) {
      this.props.navigation.push('Room', {
        username: item.user.nickname,
        targetId: item.user.id,
      });
    }
  };

  agree = (item) => {
    const {onAgreeOrIgnoreFriend} = this.props;
    onAgreeOrIgnoreFriend(this.progressHUD, false, item.user.id, () => {
      this._refreshData();
    });
  };

  ignore = (item) => {
    const {onAgreeOrIgnoreFriend} = this.props;
    onAgreeOrIgnoreFriend(this.progressHUD, true, item.user.id, () => {
      this._refreshData();
    });
  };

  _renderItem = ({item, index}) => {
    let status;
    switch (item.status) {
      case 20:
        status = '已经是好友';
        break;
      case 10:
        status = '已发送请求，等待对方通过';
        break;
      case 11:
        status = '请求添加好友';
        break;
      case 21:
        status = '已忽略';
        break;
      case 30:
        status = '被删除';
        break;
    }
    console.log(item);
    return (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => this.toRoom(item)}>
            <View style={styles.userInfoView}>
              <Image source={require('../images/av.png')} style={styles.av}/>
              <View>
                <Text style={styles.textTitle}>昵称：{item.user.nickname}</Text>
                <Text style={styles.textTitle}>手机：{item.user.phone}</Text>
              </View>
            </View>
            <Text style={styles.status}>状态：{status}</Text>
            {
              item.status === 11 && item.message ?
                  <Text style={styles.message}>留言：{item.message}</Text> : null
            }
          </TouchableOpacity>

          {item.status === 11 ?
              <View style={styles.viewBottom}>
                <Button title={'通过'} onPress={() => this.agree(item)} color={'#8BC34A'}/>
                <Button title={'拒绝'} color={'#ef2d20'} onPress={() => this.ignore(item)}/>
              </View> : null
          }
        </View>
    );
  };

  render() {
    const {friendListRefreshing, friendList} = this.props;
    let newList = friendList.reverse();
    return (
        <View style={styles.container}>
          <MaterialIcons.Button name={'person-add-alt-1'}
                                color={'#8BC34A'}
                                size={26}
                                backgroundColor={'#ffffff'}
                                onPress={() => {
                                  this.props.navigation.push('Add');
                                }}>
            去添加好友
          </MaterialIcons.Button>

          <FlatList
              style={styles.mt10}
              data={newList}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.itemSeparatorComponent}
              ListFooterComponent={this.listFooterComponent}
              ListEmptyComponent={this.listEmptyComponent}
              keyExtractor={item => item.user.id}
              onRefresh={this._refreshData}
              refreshing={friendListRefreshing}/>

          <ProgressHUD ref={(ref) => this.progressHUD = ref}/>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  friendList: state.friendList.friendList,
  friendListRefreshing: state.friendList.friendListRefreshing,
  userId: state.login.userId,
});

const mapDispatchToProps = dispatch => ({
  onChangeFriendList: (userId) => dispatch(actionCreators.onChangeFriendList(userId)),
  onAgreeOrIgnoreFriend: (progressHUD, isIgnore, friendId, callback) => dispatch(actionCreators.onAgreeOrIgnoreFriend(progressHUD, isIgnore, friendId, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  newFriendView: {
    paddingVertical: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  newFriendText: {
    color: '#000000',
    fontSize: 17,
    marginLeft: 15,
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
  noView: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notext: {
    fontSize: 18,
    color: '#999999',
  },
  item: {
    paddingHorizontal: 9,
    elevation: 4,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 9,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    alignItems: 'center',
  },
  viewBottom: {
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  av: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  userInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  status: {
    fontSize: 15,
    marginLeft: 7,
    marginTop: 10,
  },
  message: {
    fontSize: 14,
    marginTop: 15,
  },
});
