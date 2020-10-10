import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  PermissionsAndroid,
  Alert,
  ToastAndroid,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import Config from '../config'
import {init, connect, disconnect} from "../components/IMLib";
import Api from "../api/Api";
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: ''
    }
    this.userToken = ''
  }

  componentDidMount() {
    this.requestExternalStoragePermission().then(r => {
      init(Config.appKey);
    }).catch(e => {
      console.log('requestExternalStoragePermission ', e)
    })

    this.getMultiple().then(r => {
    })
  }

  requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
      );
      let deniedPerms = '';
      Object.keys(granted).forEach(eachPermissions => {
        if (granted[eachPermissions] === PermissionsAndroid.RESULTS.DENIED) {
          switch (eachPermissions) {
            case PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE:
              deniedPerms += ' 读取存储';
              break;
            case  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION:
              deniedPerms += ' 获取位置信息';
              break;
          }
        }
      });
      if (deniedPerms) {
        Alert.alert(
            '警告',
            '获取' + deniedPerms + ' 权限失败，这将导致应用核心功能无法使用！',
            [
              {text: '确定'},
            ],
            {cancelable: false},
        );
      }
    } catch (err) {
      ToastAndroid.show('获取权限失败 ' + JSON.stringify(err) + ' 这将导致应用核心功能无法使用！', ToastAndroid.LONG);
    }
  };

  getMultiple = async () => {
    let values
    try {
      values = await AsyncStorage.multiGet(['username', 'password'])
    } catch (e) {
      // read error
      console.log('getMultiple ', e)
    }
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
    let phone, password;
    values && values.forEach(value => {
      if (value && value[0] === 'username') {
        phone = value[1]
      } else if (value && value[0] === 'password') {
        password = value[1]
      }
    })

    if (phone && password) {
      this.setState({
        phone, password
      });
    }
  }

  onSuccess = (userId) => {
    console.log("连接成功：" + userId);
    ToastAndroid.show('登陆成功！', ToastAndroid.SHORT)
    this.props.navigation.replace('Home', {
      userId,
      userToken: this.userToken,
    })
  }

  onError = (errorCode) => {
    console.log("连接失败：" + errorCode);
    ToastAndroid.show('连接失败，错误码' + errorCode + ' ，请稍后重试', ToastAndroid.SHORT)
    if (errorCode === 34001) {
      disconnect()
    }
  }

  onTokenIncorrect = (databaseOpenStatus) => {
    console.log("databaseOpenStatus " + databaseOpenStatus);
  }

  toLogin = (token) => {
    connect(
        token,
        this.onSuccess,
        this.onError,
        this.onTokenIncorrect)
    this.multiSet()
  }

  multiSet = () => {
    const {phone, password} = this.state;
    const firstPair = ["username", phone]
    const secondPair = ["password", password]
    try {
      AsyncStorage.multiSet([firstPair, secondPair])
    } catch (e) {
      console.log('multiSet ', e)
    }
    console.log("Done.")
  }


  pwdForce = () => {
    this.pwdInput.focus();
  }

  onUserTextChange(text) {
    let input = text.trim();
    this.setState({
      phone: input,
    });
  }

  onPwdTextChange(text) {
    let input = text.trim();
    this.setState({
      password: input,
    });
  }


  setStringValue = async (value) => {
    try {
      await AsyncStorage.setItem('cookie', value)
    } catch (e) {
      // save error
      console.log(e)
    }
  }

  pwdLogin = () => {
    Keyboard.dismiss();
    ToastAndroid.show('正在登陆', ToastAndroid.SHORT)
    fetch(Api.LOGIN_URL, {
      credentials: 'include',
      method: "POST",
      body: JSON.stringify({
        phone: this.state.phone.toString(),
        region: '86',
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      }
    })
        .then(res => {
          console.log(res.headers.map['set-cookie'])
          this.setStringValue(res.headers.map['set-cookie']).then(r => {
            console.log(r)
          }).catch(e => {
            console.log(e)
          })
          return res.json()
        })
        .then(json => {
          console.log(json)
          this.userToken = json.result.token
          this.toLogin(json.result.token)
        })
        .catch(e => {
          console.log(e)
        });
  };

  toRegister = () => {
    this.props.navigation.push('Register')
  }

  render() {
    const {phone, password} = this.state
    return (
        <View style={styles.container}>
          <Image source={require('../images/logo.png')} style={styles.logo}/>

          <View style={styles.infoView}>
            <View style={styles.inputView}>
              <Text style={styles.inputTitle}>账号：</Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={'请输入手机号'}
                  placeholderTextColor="#cacaca"
                  keyboardType="number-pad"
                  value={phone}
                  onSubmitEditing={this.pwdForce}
                  onChangeText={(phone) => this.onUserTextChange(phone)}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputTitle}>密码：</Text>
              <TextInput
                  style={styles.textInput}
                  ref={node => this.pwdInput = node}
                  placeholder={'请输入密码'}
                  placeholderTextColor="#cacaca"
                  keyboardType="number-pad"
                  value={password}
                  onSubmitEditing={this.pwdLogin}
                  secureTextEntry={true}
                  onChangeText={(pwd) => this.onPwdTextChange(pwd)}
              />
            </View>

            <View style={styles.loginBtnView}>
              <Button title={'登陆'} onPress={this.pwdLogin}/>
            </View>

            <TouchableOpacity onPress={this.toRegister}>
              <Text style={styles.registerText}>注册</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    width: 200,
    height: 60.1,
    alignSelf: 'center',
    marginTop: 80
  },
  infoView: {
    paddingTop: 80,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    fontSize: 17,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.22)',
    height: 49,
    width: 200,
    paddingLeft: 10
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  loginBtnView: {
    paddingHorizontal: 35,
    marginTop: 35
  },
  registerText: {
    alignSelf: 'center',
    marginTop: 20,
    textDecorationLine: 'underline'
  }
});
