import React, {Component} from 'react';
import {StyleSheet, TextInput, View, ToastAndroid} from 'react-native';
import actionCreators from '../../actions';
import {connect} from 'react-redux';
import * as Api from '../../api';
import Spinner from 'react-native-loading-spinner-overlay';
import {Button} from 'react-native-paper';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      nickname: '',
      code: '',
      phone: '',
    };
  }

  toRegister = () => {
    const {onRegister, navigation} = this.props;
    const {phone, code, nickname, password} = this.state;
    onRegister(navigation, phone, code, nickname, password);
  };

  sendCode = () => {
    if (!(/^1[3456789]\d{9}$/.test(this.state.phone))) {
      ToastAndroid.show('手机号码有误，请重填', ToastAndroid.SHORT);
    } else {
      Api.sendCodeYp(this.state.phone)
          .then(_ => {
            ToastAndroid.show('验证码已发送', ToastAndroid.SHORT);
          })
          .catch(e => {
            ToastAndroid.show(e, ToastAndroid.LONG);
          });
    }
  };

  render() {
    const {phone, code, nickname, password} = this.state;
    return (
        <View style={styles.container}>

          <View style={styles.viewContainer}>
            <View style={styles.textInputContainer}>
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

            <View style={styles.textInputContainer}>

              <TextInput style={[styles.textInput, {width: 140}]}
                         placeholder={'请填写手机号'}
                         ref={ref => this.phoneInput = ref}
                         keyboardType="number-pad"
                         onChangeText={phone => this.setState({phone})}
                         placeholderTextColor="#acb2b6"
                         value={phone}
                         onSubmitEditing={this.sendCode}
              />
              <Button onPress={this.sendCode} color={'#FF9800'}>
                发送验证码
              </Button>
            </View>

            <View style={styles.textInputContainer}>

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
            <View style={styles.textInputContainer}>

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
            <View style={styles.buttonContainer}>
              <Button onPress={this.toRegister} color={'#FF9800'} mode={'contained'}>
                注册
              </Button>
            </View>
          </View>

          <Spinner
              visible={this.props.registerLoading}
              textContent={'注册中...'}
              textStyle={styles.spinnerTextStyle}
          />
        </View>
    );
  }
}

const mapStateToProps = state => ({
  registerLoading: state.login.registerLoading,
});

const mapDispatchToProps = dispatch => ({
  onRegister: (navigation, phone, code, nickname, password) => dispatch(actionCreators.onRegister(navigation, phone, code, nickname, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
  },
  titleView: {
    flex: 0.18,
    justifyContent: 'flex-end',
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#acb2b6',
    marginBottom: 20,
  },
  countBtnText: {
    fontSize: 12,
    color: '#ffffff',
  },
  buttonContainer: {
    width: 280,
    marginTop: 15,
  },
  textInput: {
    fontSize: 16,
    marginLeft: 8,
    width: 240,
    color: '#acb2b6',
  },
  title: {
    color: '#ffffff',
    fontSize: 35,
    marginLeft: 35,
  },
  viewContainer: {
    flex: 0.82,
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

});
