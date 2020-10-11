import React, {Component} from 'react';
import {StyleSheet, Text, ToastAndroid, Image, Button, FlatList, View, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getAllFriend} from '../api/main';
import {agreeFriend, ignoreFriend} from '../api/friend';

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: true,
    };
    this.userId = props.navigation.getParam('userId', '');
    this.cookie = null;
  }

  componentDidMount() {
    this.getCookie();
  }

  getCookie = () => {
    AsyncStorage.getItem('cookie')
        .then(result => {
          this.cookie = result;
          this.getList();
        })
        .catch(e => {
          console.log(e);
        });
  };

  getList = () => {
    getAllFriend(this.cookie)
        .then(res => res.json())
        .then(response => {
          let list = response.result.filter(value => {
            if (value.user.id === this.userId) {
              return false;
            } else {
              return !(value.status === 30 || value.status === 21);
            }
          });

          this.setState({
            list: list.reverse(), refreshing: false,
          });
        })
        .catch(e => {
          console.log(e);
        });
  };

  onClick = (item) => {
    if (item.status === 20) {
      this.props.navigation.push('Chat', {
        name: item.user.nickname,
        targetId: item.user.id,
      });
    }
  };

  onAgree = (item) => {
    Alert.alert('提示', '通过该请求？', [
      {
        text: '取消',
        onPress: () => {
        },
        style: 'cancel',
      },
      {
        text: '确定', onPress: () => {
          agreeFriend(item.user.id, this.cookie)
              .then(res => res.json())
              .then(_ => {
                ToastAndroid.show('已通过好友请求', ToastAndroid.LONG);
                this.getList();
              })
              .catch(e => {
                console.log(e);
              });
        },
      },
    ], {cancelable: true});
  };

  onIgnore = (item) => {
    Alert.alert('提示', '拒绝该请求？', [
      {
        text: '取消',
        onPress: () => {
        },
        style: 'cancel',
      },
      {
        text: '确定', onPress: () => {
          ignoreFriend(item.user.id, this.cookie)
              .then(res => res.json())
              .then(_ => {
                ToastAndroid.show('已拒绝', ToastAndroid.LONG);
                this.getList();
              })
              .catch(e => {
                console.log(e);
              });
        },
      },
    ], {cancelable: true});
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    this.getList();
  };

  render() {
    const {list, refreshing} = this.state;
    return (
        <View style={styles.container}>
          <FlatList
              data={list}
              refreshing={refreshing}
              renderItem={this.renderItem}
              onRefresh={this.onRefresh}
              keyExtractor={item => item.user.id}
              ListEmptyComponent={() => {
                return (
                    <Text style={styles.userName}>这里空空如也～</Text>
                );
              }}
          />
        </View>
    );
  }

  renderItem = ({item}) => {
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

    let bottomView = null, messageView = null;
    if (item.status === 11) {
      bottomView =
          <View style={styles.bottomView}>
            <Button title={'通过'} onPress={() => this.onAgree(item)} color={'#7986cb'}/>
            <Button title={'拒绝'} color={'#f44336'} onPress={() => this.onIgnore(item)}/>
          </View>;
    }

    if (item.status === 11 && item.message) {
      messageView = <Text style={styles.message}>留言：{item.message}</Text>;
    }

    return (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => this.onClick(item)}>
            <View style={styles.userInfoView}>
              <Image source={require('../images/touxian.png')} style={styles.touxian}/>
              <Text style={styles.userName}>{item.user.nickname}</Text>
            </View>
            <Text style={styles.status}>{status}</Text>
            {messageView}
            {bottomView}
          </TouchableOpacity>
        </View>
    );
  };
}

export default AddressBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#8791d4',
  },
  item: {
    paddingHorizontal: 9,
    elevation: 4,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 9,
    justifyContent: 'space-between',
    backgroundColor: '#7986cb',
    marginBottom: 10,
    alignItems: 'center',
  },
  touxian: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  userInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#ffffff',
  },
  status: {
    fontSize: 15,
    marginLeft: 7,
    color: '#ffffff',
    marginTop: 10,
  },
  message: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 15,
  },
  bottomView: {
    flexDirection: 'row',
    width: 95,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
});
