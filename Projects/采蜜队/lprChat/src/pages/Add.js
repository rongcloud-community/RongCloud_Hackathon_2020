import React, {Component} from 'react';
import {Button, TextInput, View, Text, ToastAndroid} from 'react-native';
import HttpUtil from '../utils/HttpUtil';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      message: '',
      userInfo: '',
    };
  }

  search = () => {
    const {phone} = this.state;
    if (!phone) {
      return;
    }
    HttpUtil.doGet(`/user/find/86/${phone}`)
        .then(result => {
          this.setState({userInfo: result.result});
        })
        .catch(e => {
          ToastAndroid.show('用户不存在', ToastAndroid.SHORT);
        });
  };

  add = () => {
    const {userInfo, message} = this.state;
    if (!message) {
      ToastAndroid.show('请输入留言信息', ToastAndroid.SHORT);
      return;
    }
    HttpUtil.doPost('/friendship/invite', {
      friendId: userInfo.id, message,
    })
        .then(response => {
          switch (response.result.action) {
            case 'Added':
              ToastAndroid.show('已添加', ToastAndroid.LONG);
              break;
            case 'None':
              ToastAndroid.show('在对方黑名单中', ToastAndroid.LONG);
              break;
            case 'Sent':
              ToastAndroid.show('已发送请求', ToastAndroid.LONG);
              break;
            case 'AddDirectly':
              ToastAndroid.show('已直接添加对方', ToastAndroid.LONG);
              break;
          }
        })
        .catch(e => {
          ToastAndroid.show(e.toString(), ToastAndroid.LONG);
        });
  };

  render() {
    const {phone, message, userInfo} = this.state;
    return (
        <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 15}}>
          <TextInput value={phone}
                     onChangeText={phone => this.setState({phone})}
                     keyboardType="number-pad"
                     placeholder="请输入手机号码"
                     style={{borderBottomWidth: 1, fontSize: 16}}
                     onSubmitEditing={this.search}/>
          <View style={{marginTop: 8}}>
            <Button title={'搜索'} onPress={this.search} color={'#8BC34A'}/>
          </View>

          {
            userInfo ? <View>
              <Text style={{fontSize: 16, marginTop: 15}}>
                搜索结果为：{userInfo.nickname}
              </Text>

              <TextInput value={message}
                         onChangeText={message => this.setState({message})}
                         placeholder="请留言"
                         onSubmitEditing={this.add}
                         style={{borderBottomWidth: 1, fontSize: 16}}/>
              <View style={{marginTop: 8}}>
                <Button title={'请求添加好友'} color={'#8BC34A'} onPress={this.add}/>
              </View>
            </View> : null
          }


        </View>
    );
  }
}

export default Add;
