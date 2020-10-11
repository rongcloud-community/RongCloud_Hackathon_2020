import React, {Component} from 'react';
import {Button, StyleSheet, TextInput, ToastAndroid, View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DialogInput from 'react-native-dialog-input';
import {inviteFriend, searchFriend} from '../api/friend';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      userInfo: null,
      dialogVisible: false,
    };
    this.cookie = null;
  }

  componentDidMount() {
    this.getCookie();
  }

  getCookie = () => {
    AsyncStorage.getItem('cookie').then(result => {
      this.cookie = result;
    }).catch(e => {
      console.log(e);
    });
  };

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  searchFriend = () => {
    const {phone} = this.state;
    if (!phone) {
      ToastAndroid.show('请输入手机号', ToastAndroid.SHORT);
      return;
    }
    searchFriend(phone, this.cookie)
        .then(res => res.json())
        .then(json => {
          this.setState({userInfo: json.result});
        })
        .catch(_ => {
          ToastAndroid.show('用户不存在', ToastAndroid.SHORT);
        });
  };

  handleInviteFriend = (message) => {
    if (!message) {
      ToastAndroid.show('请输入留言信息', ToastAndroid.LONG);
      return;
    }
    inviteFriend(this.state.userInfo.id, message, this.cookie)
        .then(res => res.json())
        .then(json => {
          switch (json.result.action) {
            case 'Added':
              ToastAndroid.show('已添加好友', ToastAndroid.LONG);
              break;
            case 'None':
              ToastAndroid.show('在黑名单中', ToastAndroid.LONG);
              break;
            case 'Sent':
              ToastAndroid.show('已请求添加好友', ToastAndroid.LONG);
              break;
            case 'AddDirectly':
              ToastAndroid.show('直接添加好友', ToastAndroid.LONG);
              break;
          }
        })
        .catch(e => {
          console.log(e);
        });
    this.handleCancel();
  };

  render() {
    const {phone, userInfo, dialogVisible} = this.state;
    let resultView = null;
    if (userInfo) {
      resultView =
          <View>
            <Text style={styles.searchText}>搜索结果</Text>
            <View style={styles.userInfoView}>
              <Image source={require('../images/touxian.png')} style={{width: 35, height: 35}}/>
              <Text style={styles.userName}>{userInfo.nickname.toString()}</Text>
              <Button title={'请求添加好友'} onPress={this.showDialog} color={'#7986cb'}/>
            </View>
          </View>;
    }

    return (
        <View style={styles.container}>
          <View style={styles.searchInputView}>
            <TextInput style={styles.input}
                       onChangeText={phone => this.setState({phone})}
                       placeholder="请输入手机号码"
                       keyboardType="number-pad"
                       placeholderTextColor="#ffffff"
                       onSubmitEditing={this.searchFriend}
                       value={phone}/>
            <Button title={'搜索'} onPress={this.searchFriend} color={'#7986cb'}/>
          </View>
          {resultView}
          <DialogInput isDialogVisible={dialogVisible}
                       title={'请求添加好友'}
                       message={'请输入请求留言'}
                       hintInput={'请输入请求留言'}
                       submitInput={this.handleInviteFriend}
                       closeDialog={this.handleCancel}
                       cancelText={'取消'}
                       submitText={'确定'}>
          </DialogInput>
        </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#8791d4',
  },
  searchInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    marginRight: 15,
    color: '#ffffff',
    borderBottomColor: '#ffffff',
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
    color: '#ffffff',
    marginLeft: 15,
  },
  userInfoView: {
    flexDirection: 'row',
    paddingLeft: 15,
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 10,
  },
  searchText: {
    color: '#ffffff',
    marginTop: 20,
  },
});
