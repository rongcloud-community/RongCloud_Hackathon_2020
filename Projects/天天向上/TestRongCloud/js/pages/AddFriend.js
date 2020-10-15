import React, {Component} from 'react';
import {Button, StyleSheet, TextInput, ToastAndroid, View, Text} from 'react-native'
import FormItem from "../components/form-item";
import Api from "../api/Api";
import AsyncStorage from "@react-native-community/async-storage";
import Dialog from "react-native-dialog";

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      userInfo: null,
      dialogVisible: false,
      message: ''
    }
    this.cookie = null
  }

  componentDidMount() {
    this.getMyStringValue().then(r => {
      this.cookie = r
    })
  }

  getMyStringValue = async () => {
    try {
      return await AsyncStorage.getItem('cookie')
    } catch (e) {
      console.log(e)
    }
  }

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  handleAddFriend = () => {
    ToastAndroid.show('请求中，请稍后...', ToastAndroid.SHORT)
    fetch(Api.INVITE_FRIEND, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        friendId: this.state.userInfo.id,
        message: this.state.message
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
          if (json.result.action === 'Added') {
            ToastAndroid.show('已添加', ToastAndroid.LONG)
          } else if (json.result.action === 'None') {
            ToastAndroid.show('在对方黑名单中', ToastAndroid.LONG)
          } else if (json.result.action === 'Sent') {
            ToastAndroid.show('请求已发送', ToastAndroid.LONG)
          } else if (json.result.action === 'AddDirectly') {
            ToastAndroid.show('直接添加对方', ToastAndroid.LONG)
          }
        })
        .catch(e => {
          console.log(e)
        });
    this.handleCancel();
  };

  searchUser = () => {
    const {phone} = this.state
    if (!phone) return;
    fetch(Api.SEARCH_USER + phone, {
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
          console.log(json)
          this.setState({userInfo: json.result});
        })
        .catch(e => {
          console.log(e)
          ToastAndroid.show('用户不存在', ToastAndroid.SHORT)
        });
  }

  addUser = () => {
  }

  render() {
    const {phone, userInfo, dialogVisible} = this.state
    return (
        <View style={styles.container}>
          <FormItem label={'搜索'}>
            <View style={styles.searchInputView}>
              <TextInput style={styles.input}
                         onChangeText={phone => this.setState({phone})}
                         placeholder="请输入手机号码以搜索用户"
                         keyboardType="number-pad"
                         onSubmitEditing={this.searchUser}
                         value={phone}/>
              <Button title={'搜索'} onPress={this.searchUser}/>
            </View>
          </FormItem>

          {
            userInfo ?
                <View style={styles.userInfoView}>
                  <Text style={styles.userName}>用户昵称：{userInfo.nickname.toString()}</Text>
                  <Button title={'添加'} onPress={this.showDialog}/>
                </View> :
                null
          }

          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>请求添加好友</Dialog.Title>
            <Dialog.Input placeholder="请输入留言" onChangeText={message => this.setState({message})}/>
            <Dialog.Button label="取消" onPress={this.handleCancel}/>
            <Dialog.Button label="确定" onPress={this.handleAddFriend}/>
          </Dialog.Container>
        </View>
    );
  }
}

export default AddFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  searchInputView: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    marginRight: 15
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginRight: 20
  },
  userInfoView: {
    flexDirection: "row",
    paddingLeft: 15,
    marginTop: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10
  }
});
