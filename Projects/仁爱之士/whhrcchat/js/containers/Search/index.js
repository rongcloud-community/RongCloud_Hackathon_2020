import React, {Component} from 'react';
import {View, ToastAndroid, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import * as Api from '../../api';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }

  searchuser = () => {
    const {phone} = this.state;
    if (phone) {
      Api.findUserByPhone(phone)
          .then(result => {
            this.props.navigation.navigate('SearchResult', {
              userInfo: result.result,
            });
          })
          .catch(e => {
            ToastAndroid.show('用户不存在', ToastAndroid.SHORT);
          });
    }
  };

  render() {
    const {phone} = this.state;
    return (
        <View style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <TextInput value={phone}
                     onChangeText={phone => this.setState({phone})}
                     keyboardType="number-pad"
                     placeholder="请输入手机号码"
                     style={{borderBottomWidth: 1, fontSize: 16, flex: 1}}
                     onSubmitEditing={this.searchuser}/>
          <Button onPress={this.searchuser} color={'#FF9800'} mode={'contained'}>
            搜索
          </Button>
        </View>
    );
  }
}

export default Search;
