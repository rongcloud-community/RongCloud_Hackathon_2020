import React, {Component} from 'react';
import {StyleSheet, Text, ToastAndroid, Button, FlatList, View, Alert, TouchableOpacity} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import Api from "../api/Api";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.cookie = null
    this.state = {
      friendList: [],
      refreshing: true
    }
    this.userId = props.route.params?.userId ?? '';
  }

  componentDidMount() {
    this.getMyStringValue().then(r => {
      this.cookie = r
      this.getAllFriendList()
    })
  }

  getMyStringValue = async () => {
    try {
      return await AsyncStorage.getItem('cookie')
    } catch (e) {
      console.log(e)
    }
  }

  getAllFriendList = () => {
    fetch(Api.ALL_FRIEND, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        cookie: this.cookie
      }
    })
        .then(res => res.json())
        .then(json => {
          this.setState({
            friendList: json.result.filter(value => {
              if (value.user.id === this.userId) {
                return false
              } else return !(value.status === 30 || value.status === 21);
            }), refreshing: false
          });
        })
        .catch(e => {
          console.log(e)
        });
  }


  handleAgreeFriend = (item) => {
    Alert.alert('提示', '确定通过该好友请求？', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {text: '确定', onPress: () => this.onAgreeFriend(item)},
    ], {cancelable: true});
  }

  handleIgnoreFriend = (item) => {
    Alert.alert('提示', '确定拒绝该好友请求？', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {text: '确定', onPress: () => this.onIgnoreFriend(item)},
    ], {cancelable: true});
  }

  onAgreeFriend = (item) => {
    ToastAndroid.show('处理中，请稍后...', ToastAndroid.SHORT)
    fetch(Api.AGREE_FRIEND, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        friendId: item.user.id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        cookie: this.cookie
      }
    })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          ToastAndroid.show('已通过好友请求', ToastAndroid.LONG)
          this.getAllFriendList()
        })
        .catch(e => {
          console.log(e)
        });
  }

  onIgnoreFriend = (item) => {
    ToastAndroid.show('处理中，请稍后...', ToastAndroid.SHORT)
    fetch(Api.IGNORE_FRIEND, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        friendId: item.user.id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        cookie: this.cookie
      }
    })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          ToastAndroid.show('已拒绝好友请求', ToastAndroid.LONG)
          this.getAllFriendList()
        })
        .catch(e => {
          console.log(e)
        });
  }

  handleItemClick = (item) => {
    if (item.status === 20) {
      this.props.navigation.push('ChatRoom', {
        userName: item.user.nickname,
        otherSideId: item.user.id
      })
    }
  }

  renderItem = ({item}) => {
    let status
    if (item.status === 20) {
      status = '已是好友'
    } else if (item.status === 10) {
      status = '已发送请求，等待对方通过'
    } else if (item.status === 11) {
      status = '请求添加好友'
    } else if (item.status === 21) {
      status = '已忽略'
    } else if (item.status === 30) {
      status = '被删除'
    }
    return (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => this.handleItemClick(item)}>
            <View style={styles.userNameView}>
              <Text style={styles.userName}>{item.user.nickname}</Text>
              <Text style={styles.status}>{status}</Text>
            </View>
            {item.status === 11 && item.message ? <Text style={styles.message}>留言：{item.message}</Text> : null}
          </TouchableOpacity>
          {item.status === 11 ?
              <View style={styles.itemActionView}>
                <Button title={'通过'} color={'green'} onPress={() => this.handleAgreeFriend(item)}/>
                <Button title={'拒绝'} color={'red'} onPress={() => this.handleIgnoreFriend(item)}/>
              </View> : null}
        </View>
    )
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.getAllFriendList()
  }

  renderListEmptyComponent = () => {
    return (
        <Text style={styles.userName}>一个好友也没有哦，快去添加好友吧～</Text>
    )
  }

  render() {
    const {friendList, refreshing} = this.state
    return (
        <View style={styles.container}>
          <FlatList
              data={friendList}
              refreshing={refreshing}
              renderItem={this.renderItem}
              onRefresh={this.onRefresh}
              keyExtractor={item => item.user.id}
              ListEmptyComponent={this.renderListEmptyComponent}
          />
        </View>
    );
  }
}

export default FriendList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  item: {
    paddingHorizontal: 9,
    paddingVertical: 9,
    elevation: 4,
    width: '100%',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userNameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  status: {
    fontSize: 15,
    marginLeft: 7
  },
  message: {
    fontSize: 14,
  },
  itemActionView: {
    flexDirection: 'row',
    width: 95,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
