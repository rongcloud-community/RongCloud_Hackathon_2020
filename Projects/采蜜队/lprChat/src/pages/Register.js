import React, {Component} from 'react';
import {Button, StyleSheet, TextInput, View, ToastAndroid} from 'react-native';
import actionCreators from '../redux/action';
import {connect} from 'react-redux';
import ProgressHUD from '../common/ProgressHUD';
import HttpUtil from '../utils/HttpUtil';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      nickname: '',
      password: '',
    };
  }

  toRegister = () => {
    const {onRegister, navigation} = this.props;
    const {phone, code, nickname, password} = this.state;
    onRegister(this.progressHUD, navigation, phone, code, nickname, password);
  };

  sendCode = () => {
    if (!(/^1[3456789]\d{9}$/.test(this.state.phone))) {
      ToastAndroid.show('手机号码有误，请重填', ToastAndroid.SHORT);
    } else {
      HttpUtil.doPost('/user/send_code_yp', {
        phone: this.state.phone,
        region: '86',
      }).then(_ => {
        ToastAndroid.show('验证码已发送', ToastAndroid.SHORT);
      }).catch(e => {
        ToastAndroid.show(e, ToastAndroid.LONG);
      });
    }
  };

  render() {
    const {phone, code, nickname, password} = this.state;
    return (
        <View style={styles.container}>

          <View style={styles.view1}>
            <View style={styles.view2}>
              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         placeholder={'请填写昵称'}
                         placeholderTextColor="#acb2b6"
                         onChangeText={nickname => this.setState({nickname})}
                         onSubmitEditing={() => {
                           this.phoneInput.focus();
                         }}
                         value={nickname}
              />
            </View>

            <View style={styles.view2}>

              <TextInput style={[styles.textInput, {width: 160}]}
                         placeholder={'请填写手机号'}
                         ref={ref => this.phoneInput = ref}
                         keyboardType="number-pad"
                         onChangeText={phone => this.setState({phone})}
                         placeholderTextColor="#acb2b6"
                         value={phone}
                         onSubmitEditing={this.sendCode}
              />
              <Button title={'发送验证码'} onPress={this.sendCode} color={'#8BC34A'}/>
            </View>

            <View style={styles.view2}>

              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         placeholderTextColor="#acb2b6"
                         placeholder={'请填写验证码'}
                         onChangeText={code => this.setState({code})}
                         keyboardType="number-pad"
                         onSubmitEditing={() => {
                           this.passwordInput.focus();
                         }}
                         value={code}
              />
            </View>
            <View style={styles.view2}>

              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         placeholderTextColor="#acb2b6"
                         placeholder={'请填写密码'}
                         secureTextEntry
                         keyboardType="number-pad"
                         onSubmitEditing={this.toRegister}
                         onChangeText={password => this.setState({password})}
                         value={password}
              />
            </View>
            <View style={styles.view3}>
              <Button title={'注册'} onPress={this.toRegister} color={'#8BC34A'}/>
            </View>
          </View>

          <ProgressHUD ref={(ref) => this.progressHUD = ref}/>
        </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onRegister: (progressHUD, navigation, phone, code, nickname, password) => dispatch(actionCreators.onRegister(progressHUD, navigation, phone, code, nickname, password)),
});

export default connect(null, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    flex: 0.18,
    justifyContent: 'flex-end',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#acb2b6',
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 35,
    marginLeft: 35,
  },
  view1: {
    flex: 0.82,
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  countBtnText: {
    fontSize: 12,
    color: '#ffffff',
  },
  view3: {
    width: 280,
    marginTop: 15,
  },

  textInput: {
    fontSize: 16,
    marginLeft: 8,
    width: 240,
    color: '#acb2b6',
  },
});
