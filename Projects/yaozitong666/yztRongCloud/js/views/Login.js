import React, {Component} from 'react';
import {
  Button,
  Image,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingModal from '../components/LoadingModal';
import {connect} from 'react-redux';
import actionCreators from '../action/index';
import UserDao from '../dao/UserDao';
import * as IMClient from 'react-native-rongcloud-imlib/src/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhone: '',
      password: '',
    };
  }

  componentDidMount() {
    IMClient.init('3argexb63s65e');

    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBackgroundColor('#2c374f');
      StatusBar.setBarStyle('light-content');
    });

    PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
    ).then(r => {
      console.log(r);
    }).catch(e => {
      console.log(e);
    });

    this.getUserInfo();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  doLogin = () => {
    const {onPasswordLogin, navigation} = this.props;
    const {
      userPhone,
      password,
    } = this.state;
    onPasswordLogin(this.loadingModal, navigation, userPhone, password);
  };

  toRegisterPage = () => {
    this.props.navigation.push('Register');
  };

  getUserInfo = () => {
    UserDao.getUserInfo()
        .then(result => {
          if (result) {
            this.setState({
              userPhone: result.phone,
              password: result.password,
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
  };

  render() {
    const {
      userPhone,
      password,
    } = this.state;
    return (
        <View style={styles.container}>
          <Image source={require('../images/logo.png')} style={styles.logo}/>
          <View style={styles.loginViewWrap}>
            <View style={styles.textInputView}>
              <AntDesign name='user' color={'#acb2b6'} size={26}/>

              <TextInput style={styles.textInput}
                         placeholder={'请输入手机号'}
                         placeholderTextColor="#acb2b6"
                         keyboardType="number-pad"
                         value={userPhone}
                         onSubmitEditing={() => {
                           this.passwordInput.focus();
                         }}
                         onChangeText={userPhone => this.setState({userPhone})}/>
            </View>
            <View style={styles.textInputView}>
              <AntDesign name='lock' color={'#acb2b6'} size={26}/>

              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         placeholder={'请输入密码'}
                         placeholderTextColor="#acb2b6"
                         keyboardType="number-pad"
                         secureTextEntry
                         value={password}
                         onChangeText={password => this.setState({password})}
                         onSubmitEditing={this.doLogin}
              />
            </View>
          </View>
          <View style={styles.loginButtonView}>
            <Button title={'登陆'} color={'#27918e'} onPress={this.doLogin}/>
          </View>

          <View style={styles.registerView}>
            <TouchableOpacity onPress={this.toRegisterPage}>
              <Text style={styles.registerText}>还没有账号？</Text>
            </TouchableOpacity>
          </View>

          <LoadingModal ref={(ref) => this.loadingModal = ref}/>
        </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onPasswordLogin: (loadingModal, navigation, userPhone, password) => dispatch(actionCreators.onPasswordLogin(loadingModal, navigation, userPhone, password)),
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c374f',
  },
  logo: {
    tintColor: '#ffffff',
    width: 200,
    height: 79.8,
    alignSelf: 'center',
    marginTop: 90,
  },
  loginViewWrap: {
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
    color: '#acb2b6',
  },
  loginButtonView: {
    width: 220,
    alignSelf: 'center',
    marginTop: 20,
  },
  registerView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#ffffff',
  },
});
