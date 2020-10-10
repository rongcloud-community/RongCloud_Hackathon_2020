import React, {Component} from 'react';
import {PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import actionCreators from '../../actions';
import * as IMClient from 'react-native-rongcloud-imlib/src/index';
import Spinner from 'react-native-loading-spinner-overlay';
import {Button} from 'react-native-paper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {password: '', myPhone: ''};
  }

  componentDidMount() {
    IMClient.init('x18ywvqfx584c');

    PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
    );

  }

  doLogin = () => {
    const {onLogin, navigation} = this.props;
    const {myPhone, password} = this.state;
    onLogin(navigation, myPhone, password);
  };

  render() {
    const {
      myPhone,
      password,
    } = this.state;
    return (
        <View style={styles.container}>
          <Text style={styles.title}>登陆</Text>
          <View style={styles.viewContainer}>
            <View style={styles.textInputView}>

              <TextInput style={styles.textInput}
                         value={myPhone}
                         placeholderTextColor="#000000"
                         onSubmitEditing={() => {
                           this.passwordInput.focus();
                         }}
                         keyboardType="number-pad"
                         placeholder={'请输入手机号'}
                         onChangeText={myPhone => this.setState({myPhone})}/>
            </View>
            <View style={styles.textInputView}>

              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         keyboardType="number-pad"
                         placeholderTextColor="#000000"
                         placeholder={'请输入密码'}
                         value={password}
                         onChangeText={password => this.setState({password})}
                         secureTextEntry
                         onSubmitEditing={this.doLogin}
              />
            </View>
          </View>

          <View style={styles.loginButtonView}>
            <Button onPress={this.doLogin} color={'#FF9800'} mode={'contained'}>
              登陆
            </Button>
          </View>

          <View style={styles.registerView}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.push('Register');
            }}>
              <Text style={styles.registerText}>没有账号？去注册</Text>
            </TouchableOpacity>
          </View>

          <Spinner
              visible={this.props.loginLoading}
              textContent={'加载中...'}
              textStyle={styles.spinnerTextStyle}
          />
        </View>
    );
  }
}

const mapStateToProps = state => ({
  loginLoading: state.login.loginLoading,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (navigation, myPhone, password) => dispatch(actionCreators.onLogin(navigation, myPhone, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 50,
  },
  container: {
    flex: 1,
  },
  logo: {
    tintColor: '#ffffff',
    width: 200,
    height: 79.8,
    alignSelf: 'center',
    marginTop: 90,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#acb2b6',
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    marginLeft: 8,
    width: 180,
    color: '#000000',
  },
  loginButtonView: {
    width: 220,
    alignSelf: 'center',
    marginTop: 20,
  },
  registerView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 60,
  },
  registerText: {
    color: '#000000',
  },
});
