import React, {Component} from 'react';
import {View, Text, TextInput, ToastAndroid} from 'react-native';
import {Button} from 'react-native-paper';
import * as Api from '../../api';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      userInfo: props.route.params?.userInfo ?? {},
    };
  }

  addFriend = () => {
    const {userInfo, message} = this.state;
    if (!message) {
      ToastAndroid.show('请输入留言信息', ToastAndroid.SHORT);
      return;
    }
    Api.inviteFriend(userInfo.id, message)
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
    const {userInfo, message} = this.state;
    return (
        <View style={{paddingHorizontal: 15, paddingTop: 15}}>
          <Text style={{fontSize: 16, marginTop: 15}}>
            用户昵称：{userInfo.nickname}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput value={message}
                       onChangeText={message => this.setState({message})}
                       placeholder="请留言"
                       onSubmitEditing={this.addFriend}
                       style={{borderBottomWidth: 1, fontSize: 16, flex: 1}}/>
            <Button color={'#FF9800'} onPress={this.addFriend} mode={'contained'}>
              请求添加好友
            </Button>
          </View>
        </View>
    );
  }
}

export default SearchResult;
