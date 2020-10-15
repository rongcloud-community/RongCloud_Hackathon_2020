import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  PermissionsAndroid,
  ToastAndroid,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {init, connect, disconnect} from 'react-native-rongcloud-imlib/src';
import {loginApi} from '../api/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  componentDidMount() {
    StatusBar.setBackgroundColor('#8791d4');
    this.getPermission().then(_ => {
      init('lmxuhwaglexid');
    }).catch(e => {
      console.log('getPermission ', e);
    });

    this.getInfo();
  }

  getInfo = () => {
    AsyncStorage.multiGet(['username', 'password']).then(values => {
      let userName, password;
      values && values.forEach(value => {
        if (value && value[0] === 'username') {
          userName = value[1];
        } else if (value && value[0] === 'password') {
          password = value[1];
        }
      });

      if (userName && password) {
        this.setState({
          userName, password,
        });
      }
    });
  };

  getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
      );
      console.log(granted);
    } catch (err) {
      ToastAndroid.show(JSON.stringify(err), ToastAndroid.LONG);
    }
  };

  onSuccess = (userId) => {
    console.log('onSuccess ' + userId);
    ToastAndroid.show('登陆成功', ToastAndroid.SHORT);
    this.props.navigation.replace('Main', {
      userId,
    });
  };

  onError = (errorCode) => {
    ToastAndroid.show('errorCode ' + errorCode, ToastAndroid.SHORT);
    if (errorCode === 34001) {
      disconnect();
    }
  };

  onDatabaseOpenStatus = (databaseOpenStatus) => {
    console.log('databaseOpenStatus ' + databaseOpenStatus);
  };

  pwdLogin = () => {
    Keyboard.dismiss();
    loginApi(this.state.userName, this.state.password)
        .then(res => {
          AsyncStorage.setItem('cookie', res.headers.map['set-cookie']);
          return res.json();
        })
        .then(json => {
          this.toLogin(json.result.token);
        })
        .catch(e => {
          console.log(e);
        });
  };

  toLogin = (token) => {
    connect(token, this.onSuccess, this.onError, this.onDatabaseOpenStatus);
    this.setUserInfo();
  };

  setUserInfo = () => {
    const {userName, password} = this.state;
    const userNameValue = ['username', userName];
    const passwordValue = ['password', password];
    try {
      AsyncStorage.multiSet([userNameValue, passwordValue]);
    } catch (e) {
      console.log('setUserInfo ', e);
    }
  };

  pwdForce = () => {
    this.pwdInput.focus();
  };

  toRegister = () => {
    this.props.navigation.push('Register');
  };

  render() {
    const {userName, password} = this.state;
    return (
        <View style={styles.container}>
          <Text style={styles.title}>登陆APP</Text>

          <View style={styles.userNameView}>
            <View style={styles.innerView}>
              <Text style={styles.inputTitle}>手机 </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={'请输入手机号'}
                  placeholderTextColor="#ffffff"
                  keyboardType="number-pad"
                  value={userName}
                  onSubmitEditing={this.pwdForce}
                  onChangeText={(userName) => this.setState({userName})}
              />
            </View>

            <View style={styles.innerView}>
              <Text style={styles.inputTitle}>密码 </Text>
              <TextInput
                  style={styles.textInput}
                  ref={node => this.pwdInput = node}
                  placeholder={'请输入密码'}
                  placeholderTextColor="#ffffff"
                  keyboardType="number-pad"
                  value={password}
                  onSubmitEditing={this.pwdLogin}
                  secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})}
              />
            </View>

            <View style={styles.buttonView}>
              <Button title={'登陆'} color={'#7986cb'} onPress={this.pwdLogin}/>
            </View>

            <TouchableOpacity onPress={this.toRegister}>
              <View style={{paddingRight: 60}}>
                <Text style={styles.registerTitle}>没有账号？去注册</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8791d4',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
    color: '#ffffff',
  },
  userNameView: {
    paddingTop: 80,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    fontSize: 17,
    borderRadius: 10,
    height: 49,
    width: 200,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    color: '#ffffff',
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 10,
  },
  buttonView: {
    marginTop: 50,
    width: 240,
    alignSelf: 'center',
  },
  registerTitle: {
    textAlign: 'right',
    marginTop: 30,
    color: '#ffffff',
  },
});
